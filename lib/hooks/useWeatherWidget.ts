import { useState, useEffect, useCallback } from 'react';

import { useLocale } from '@/components/context/LocaleProvider';
import { LOCATION_INFO_STORE_KEY } from '@/config/const';
import { getCurrentLocaleCode, getClientCoordinates } from '@/lib/api/browserAPIs';
import { fetchWeatherDataByCoordinates, getCoordinatesByCityName, getCityNameByCoordinates } from '@/lib/api/openWeatherMap';
import { setCookie, saveLocationInfoToCookie } from '@/lib/helpers/cookies';
import { readLocationFromCookies } from '@/lib/helpers/readLocationFromCookies';
import { upperFirst } from '@/lib/utils/upperFirst';
import { CityNameSchema } from '@/lib/zod/cityNameSchema';
import { LocationInfoSchema } from '@/lib/zod/locationInfoSchema';

import type { IWeatherApiResponse } from '@/types/openWeatherMap';
import type { ILocationInfo, TWidgetDefaults, TWeatherContextDefaults } from '@/types/widget';

type TRequestLocation = (city: string) => Promise<void>;
type TWeatherData = IWeatherApiResponse | null;
type TErrorMsg = string | null;
type TLoadStatus = boolean;

export interface UseWeatherReturnType {
  location: ILocationInfo;
  requestLocation: TRequestLocation;
  loading: TLoadStatus;
  error: TErrorMsg;
  weatherData: TWeatherData;
}

/**
 * ✨ Main hook for WeatherWidget and WeatherWidgetContext
 * Encapsulates all logic for fetching weather data
 * @param defaults - SSR
 */
export const useWeatherWidget = (defaults?: TWeatherContextDefaults): UseWeatherReturnType => {
  const defaultCityName = defaults?.location?.cityName || '';

  const [location, setLocation] = useState<ILocationInfo>(
    defaults?.location || {
      coordinates: { lat: -999, lon: -999 },
      cityName: 'default',
    },
  );
  const [loading, setLoading] = useState<TLoadStatus>(!defaults?.weatherData);
  const [error, setError] = useState<TErrorMsg>(null);
  const [weatherData, setWeatherData] = useState<TWeatherData>(defaults?.weatherData || null);

  const { lang } = useLocale();

  const getLocationFromCookies = async (cityName?: string): Promise<[TWidgetDefaults, boolean]> => {
    // Fetch coordinates and update location
    const storedLocation = await readLocationFromCookies();
    const isLocationMatch = storedLocation?.cityName.toLowerCase() === cityName?.toLowerCase() && !!storedLocation?.coordinates;
    return [storedLocation, isLocationMatch];
  };

  /**
   * Update location state -> fetch weather data
   * 1. On initial load (get from browser)
   * 2. On user request (fetch from API)
   * 3. Store location info in cookies (for SSR)
   */
  const updateLocation = async ({ cityName, coordinates }: ILocationInfo) => {
    const locationInfo = { cityName: upperFirst(cityName), coordinates };
    setLocation(locationInfo);
    setError(null);
    try {
      const weather = await fetchWeatherDataByCoordinates(coordinates);
      setWeatherData(weather);
      saveLocationInfoToCookie(locationInfo);
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
   * - Validate city name
   * - Try to get default coordinates from cookies if not provided -> fetch coordinates by city name
   */
  const requestLocation: TRequestLocation = useCallback(
    async (rawCityName) => {
      try {
        // Validate city name
        const { success, error, data: cityName } = CityNameSchema.safeParse(rawCityName);
        if (!success) {
          setError(error.errors[0].message);
          return;
        }

        // Fetch coordinates and update location
        const [storedLocation, isLocationMatch] = await getLocationFromCookies(defaultCityName);
        const coordinates = isLocationMatch && storedLocation ? storedLocation.coordinates : await getCoordinatesByCityName(cityName);

        await updateLocation({ cityName, coordinates });
      } catch (e) {
        updateError(e);
      }
    },
    [defaultCityName],
  );

  /**
   * [INITIAL LOAD] -> will be skipped if city name provided or weather data already fetched
   * Try read location from cookies
   * - If found - update location and fetch weather data
   * - If not found - fetch location and get locale code using browser APIs
   */
  useEffect(() => {
    // Skip init phase if city name provided from URL (SSR) | or weather data already fetched
    if (defaultCityName || weatherData) {
      return;
    }

    // Fetch location data from browser API
    const fetchLocationData = async () => {
      try {
        const [storedLocation] = await getLocationFromCookies(defaultCityName);

        // Try restore location from cookies
        if (storedLocation) {
          await updateLocation(storedLocation);
          return;
        }

        // Get current locale and coordinates from browser APIs
        const loc = lang || getCurrentLocaleCode();
        const coordinates = await getClientCoordinates();
        const cityName = await getCityNameByCoordinates(coordinates, loc);

        await updateLocation({ cityName, coordinates });
      } catch (e) {
        updateError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationData();
  }, [defaultCityName, weatherData]);

  return { location, requestLocation, loading, error, weatherData };
};
