'use server';

import { API_KEY, OPEN_WEATHER_MAP_API_URL } from '@/config/const';

import type { IWeatherApiResponse, ICoordinates } from '@/types/openWeatherMap';

/**
 * Fetch coordinates from OpenWeatherMap API
 * @param city
 */
export const getCoordinatesByCityName = async (city: string): Promise<ICoordinates> => {
  const response = await fetch(`${OPEN_WEATHER_MAP_API_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
  const data = await response.json();
  if (!data.length) {
    throw new Error(`[getCoordinatesByCityName] City ${city} not found`);
  }
  return { lat: data[0].lat, lon: data[0].lon };
};

/**
 * Fetch city name by coordinates from OpenWeatherMap API
 */
export const getCityNameByCoordinates = async ({ lat, lon }: ICoordinates, loc: string): Promise<string> => {
  const response = await fetch(`${OPEN_WEATHER_MAP_API_URL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
  const data = await response.json();
  if (data.length > 0) {
    const [variants] = data;
    return variants.local_names[loc] ?? variants.name; // City name
  } else {
    throw new Error(`[getCityNameByCoordinates] City with coordinates ${JSON.stringify({ lat, lon })} not found`);
  }
};

/**
 * Fetch weather data from OpenWeatherMap API
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

/**
 * Fetch weather data by city name
 */
export const fetchWeatherByCityName = async (city: string): Promise<IWeatherApiResponse> => {
  const coordinates = await getCoordinatesByCityName(city);
  return fetchWeatherDataByCoordinates(coordinates);
};
