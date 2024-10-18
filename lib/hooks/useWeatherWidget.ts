import { fetchWeatherDataByCoordinates, fetchCoordinates, getCityNameByCoordinates } from '@/lib/api/openWeatherMap';
import { getClientCoordinates } from '@/lib/api/getClientCoordinates';
import { getCurrentLocaleCode } from '@/lib/utils/browser';
import { upperFirst } from '@/lib/utils/upperFirst';
import { useState, useEffect } from 'react';

import type { ICoordinates, IWeatherApiResponse } from '@/types/openWeatherMap';
import type { LocationInfo } from '@/types/widget';
import { LocationInfoSchema } from '@/lib/zod/locationInfoSchema';
import { CityNameSchema } from '@/lib/zod/cityNameSchema';

export interface UseWeatherReturnType {
  location: LocationInfo;
  requestLocation: (city: string) => void;
  loading: boolean;
  error: string | null;
  weatherData: IWeatherApiResponse | null;
}

/**
 * Main hook for WeatherWidget and WeatherWidgetContext
 */
export const useWeatherWidget = (): UseWeatherReturnType => {
  const [location, setLocation] = useState<LocationInfo>({ coordinates: { lat: 0, lon: 0 }, cityName: 'default' });
  const [loading, setLoading] = useState<UseWeatherReturnType['loading']>(true);
  const [error, setError] = useState<UseWeatherReturnType['error']>(null);
  const [weatherData, setWeatherData] = useState<UseWeatherReturnType['weatherData']>(null);

  /**
   * Update location state
   * 1. On initial load (get from browser)
   * 2. On user request (fetch from API)
   */
  const updateLocation = async (cityName: string, coordinates: ICoordinates) => {
    const locationInfo = { cityName: upperFirst(cityName), coordinates };
    setLocation(locationInfo);
    setError(null);
    try {
      const weather = await fetchWeatherDataByCoordinates(coordinates);
      setWeatherData(weather);
      localStorage.setItem('weatherWidget', JSON.stringify(locationInfo));
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

  const requestLocation = async (city: string) => {
    try {
      // Validate city name
      const { success, error, data } = CityNameSchema.safeParse(city);
      if (!success) {
        return setError(error.errors[0].message);
      }
      // Fetch coordinates and update location
      const coordinates = await fetchCoordinates(data);
      await updateLocation(data, coordinates);
    } catch (e) {
      updateError(e);
    }
  };

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        console.log('[init] Load location data from local storage');
        const storedWeather = localStorage.getItem('weatherWidget');

        // Try parse stored LocationInfo
        if (storedWeather) {
          const locationInfo = JSON.parse(storedWeather);
          const { success, data, error } = LocationInfoSchema.safeParse(locationInfo);
          if (success) {
            console.log('[init] Local storage is valid:', data);
            await updateLocation(data.cityName, data.coordinates);
            return;
          } else {
            console.error('Local storage is invalid:', error.errors);
          }
        }

        const loc = getCurrentLocaleCode();
        const coordinates = await getClientCoordinates();
        const defaultCityName = await getCityNameByCoordinates(coordinates, loc);
        await updateLocation(defaultCityName, coordinates);
      } catch (e) {
        updateError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationData();
  }, []);

  return { location, requestLocation, loading, error, weatherData };
};
