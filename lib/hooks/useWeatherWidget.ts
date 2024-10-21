import { useState, useEffect, useCallback } from 'react';

import { LOCATION_INFO_STORE_KEY } from '@/config/const';
import { getCurrentLocaleCode, getClientCoordinates } from '@/lib/api/browserAPIs';
import { fetchWeatherDataByCoordinates, getCoordinatesByCityName, getCityNameByCoordinates } from '@/lib/api/openWeatherMap';
import { setCookie, readCookie } from '@/lib/helpers/cookies';
import { readLocationFromCookies } from '@/lib/helpers/readLocationFromCookies';
import { upperFirst } from '@/lib/utils/upperFirst';
import { CityNameSchema } from '@/lib/zod/cityNameSchema';

import type { IWeatherApiResponse } from '@/types/openWeatherMap';
import type { LocationInfo, WidgetDefaults } from '@/types/widget';

export interface UseWeatherReturnType {
  location: LocationInfo;
  requestLocation: (city: string) => void;
  loading: boolean;
  error: string | null;
  weatherData: IWeatherApiResponse | null;
}

/**
 * ✨ Main hook for WeatherWidget and WeatherWidgetContext
 * Encapsulates all logic for fetching weather data
 * @param cityNameFromParam - City name to fetch weather data on initial load, if not provided - get from browser API
 */
export const useWeatherWidget = (cityNameFromParam?: string): UseWeatherReturnType => {
  const [location, setLocation] = useState<LocationInfo>({ coordinates: { lat: 0, lon: 0 }, cityName: cityNameFromParam || 'default' });
  const [loading, setLoading] = useState<UseWeatherReturnType['loading']>(true);
  const [error, setError] = useState<UseWeatherReturnType['error']>(null);
  const [weatherData, setWeatherData] = useState<UseWeatherReturnType['weatherData']>(null);

  const getLocationFromCookies = async (cityName?: string): Promise<[WidgetDefaults, boolean]> => {
    // Fetch coordinates and update location
    const storedLocation = await readLocationFromCookies();
    const isLocationMatch = storedLocation?.cityName.toLowerCase() === cityName?.toLowerCase() && !!storedLocation?.coordinates;
    return [storedLocation, isLocationMatch];
  };

  /**
   * Update location state
   * 1. On initial load (get from browser)
   * 2. On user request (fetch from API)
   */
  const updateLocation = async ({ cityName, coordinates }: LocationInfo) => {
    const locationInfo = { cityName: upperFirst(cityName), coordinates };
    setLocation(locationInfo);
    setError(null);
    try {
      const weather = await fetchWeatherDataByCoordinates(coordinates);
      setWeatherData(weather);
      setCookie(LOCATION_INFO_STORE_KEY, JSON.stringify(locationInfo), 7); // Expires in 7 days
    } catch (e) {
      console.log('[updateLocation] Error fetching weather data:', e);
    }
  };

  /**
   * Get error message from Error
   */
  const updateError = (e: unknown) => {
    setError(e instanceof Error ? e.message : 'Unknown error');
  };

  /**
   * Request location by city name
   * NOTE: This function also passed to the context and should be wrapped in useCallback!
   * 1. Validate city name
   * 2. Try to get default coordinates from cookies if not provided -> fetch coordinates by city name
   */
  const requestLocation = useCallback(
    async (rawCityName: string) => {
      try {
        // Validate city name
        const { success, error, data: cityName } = CityNameSchema.safeParse(rawCityName);
        if (!success) {
          return setError(error.errors[0].message);
        }

        // Fetch coordinates and update location
        const [storedLocation, isLocationMatch] = await getLocationFromCookies(cityNameFromParam);
        const coordinates = isLocationMatch && storedLocation ? storedLocation.coordinates : await getCoordinatesByCityName(cityName);

        await updateLocation({ cityName, coordinates });
      } catch (e) {
        updateError(e);
      }
    },
    [cityNameFromParam],
  );

  /**
   * [INITIAL LOAD]
   * 1. Try read location from cookies
   * 1.2. If found - update location and fetch weather data
   * 1.3. If not found - fetch location and get locale code using browser APIs
   * 2. If weather data already fetched - skip re-fetch (re-render case)
   */
  useEffect(() => {
    // When default city provided - fetch weather data and don't try to get location from browser
    if (cityNameFromParam) {
      // requestLocation(defaultCity);
      return;
    }

    // Fetch location data from browser API
    const fetchLocationData = async () => {
      try {
        const [storedLocation] = await getLocationFromCookies(cityNameFromParam);

        // Try restore location from cookies
        if (storedLocation) {
          await updateLocation(storedLocation);
          return;
        }

        // Get current locale and coordinates from browser APIs
        const loc = getCurrentLocaleCode();
        const coordinates = await getClientCoordinates();
        const cityName = await getCityNameByCoordinates(coordinates, loc);

        if (weatherData) return; // re-render case

        await updateLocation({ cityName, coordinates });
      } catch (e) {
        updateError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationData();
  }, [cityNameFromParam, requestLocation]);

  return { location, requestLocation, loading, error, weatherData };
};
