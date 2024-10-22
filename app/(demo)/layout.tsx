import { WeatherWidgetProvider } from '@/components/context/WeatherWidgetContext';
import { fetchWeatherDataByCoordinates } from '@/lib/api/openWeatherMap';
import { readLocationFromCookies } from '@/lib/helpers/readLocationFromCookies';

import type { TWeatherContextDefaults } from '@/types/widget';

/**
 * This layout component includes the WeatherWidgetProvider
 * and fetches location and weather data from cookies.
 * @param children
 * @constructor
 */
export default async function DemoWidgetLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Get location info from cookies -> fetch weather data -> pass to widget context as defaults
  const location = await readLocationFromCookies();

  let defaultsFromCookies: TWeatherContextDefaults = null;

  if (location) {
    const weatherData = await fetchWeatherDataByCoordinates(location.coordinates);
    defaultsFromCookies = { location, weatherData };
  }

  return <WeatherWidgetProvider defaults={defaultsFromCookies}>{children}</WeatherWidgetProvider>;
}
