import { API_KEY, OPEN_WEATHER_MAP_API_URL } from '@/config/const';
import type { IWeatherApiResponse, ICoordinates } from '@/types/openWeatherMap';
import apiMockResponse from '@/lib/api/api.mock.response';

/**
 * Fetch coordinates from OpenWeatherMap API
 * @param city
 */
const fetchCoordinates = async (city: string): Promise<ICoordinates> => {
  const response = await fetch(`${OPEN_WEATHER_MAP_API_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
  const data = await response.json();
  if (!data.length) {
    throw new Error('City not found');
  }
  return { lat: data[0].lat, lon: data[0].lon };
};

/**
 * Fetch weather data from OpenWeatherMap API
 * @param city
 */
export const fetchWeatherData = async (city: string): Promise<IWeatherApiResponse> => {
  try {
    const { lat, lon } = await fetchCoordinates(city);
    const response = await fetch(`${OPEN_WEATHER_MAP_API_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    return response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

/**
 * Fetch mock weather data
 * For testing and debugging purposes -> use mock data
 * OpenWeatherMap API has a limits for free usage
 * TODO: Remove this function in production
 * @param _city (added for compatibility with fetchWeatherData)
 */
export const fetchMockWeatherData = async (_city: string): Promise<IWeatherApiResponse> => {
  return apiMockResponse as IWeatherApiResponse;
};
