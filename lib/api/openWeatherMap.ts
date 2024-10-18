'use server';

import { API_KEY, OPEN_WEATHER_MAP_API_URL } from '@/config/const';
import type { IWeatherApiResponse, ICoordinates } from '@/types/openWeatherMap';

/**
 * Fetch coordinates from OpenWeatherMap API
 * @param city
 */
export const fetchCoordinates = async (city: string): Promise<ICoordinates> => {
  const response = await fetch(`${OPEN_WEATHER_MAP_API_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
  const data = await response.json();
  if (!data.length) {
    throw new Error('City not found');
  }
  return { lat: data[0].lat, lon: data[0].lon };
};

/**
 * Fetch city name by coordinates from OpenWeatherMap API
 * @param lat
 * @param lon
 */
export const getCityNameByCoordinates = async ({ lat, lon }: ICoordinates, locale: string = 'en') => {
  const response = await fetch(`${OPEN_WEATHER_MAP_API_URL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
  const data = await response.json();
  if (data.length > 0) {
    const [variants] = data;
    return variants['locale'] ?? variants.name; // City name
  } else {
    throw new Error('City not found');
  }
};

/**
 * Fetch weather data from OpenWeatherMap API
 * @param lat
 * @param lon
 */
export const fetchWeatherDataByCoordinates = async ({ lat, lon }: ICoordinates): Promise<IWeatherApiResponse> => {
  try {
    const response = await fetch(`${OPEN_WEATHER_MAP_API_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    return response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
