import { API_KEY, OPEN_WEATHER_MAP_API_URL } from '@/config/const';
import type { Coordinates } from '@/types/coordinates';
import type { WeatherApiResponse } from '@/types/openWeatherMap';

export const fetchCoordinates = async (city: string): Promise<Coordinates> => {
  const response = await fetch(`${OPEN_WEATHER_MAP_API_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
  const data = await response.json();
  if (!data.length) {
    throw new Error('City not found');
  }
  return { lat: data[0].lat, lon: data[0].lon };
};

export const fetchWeatherData = async (city: string): Promise<WeatherApiResponse> => {
  try {
    const { lat, lon } = await fetchCoordinates(city);
    const response = await fetch(`${OPEN_WEATHER_MAP_API_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    return response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
