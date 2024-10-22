import { notFound } from 'next/navigation';

import { WeatherWidgetProvider } from '@/components/context/WeatherWidgetContext';
import { fetchWeatherDataByCoordinates, getCoordinatesByCityName } from '@/lib/api/openWeatherMap';
import { LocationInfoSchema } from '@/lib/zod/locationInfoSchema';

import type { ICoordinates } from '@/types/openWeatherMap';
import type { TWeatherContextDefaults, ILocationInfo } from '@/types/widget';

interface Props {
  params: { cityName: string };
  children: React.ReactNode;
}

/**
 * This layout component includes the WeatherWidgetProvider
 * and fetches location and weather data by city name.
 * @param children
 * @param params - city name from route params
 * @constructor
 */
export default async function CityWidgetLayout({ children, params }: Props) {
  const cityName = params.cityName;
  let defaults: TWeatherContextDefaults = null;

  try {
    const coordinates: ICoordinates = await getCoordinatesByCityName(cityName);
    const location: ILocationInfo = { cityName, coordinates };

    // Fetch weather data if location info is valid
    if (LocationInfoSchema.safeParse(location).success) {
      const weatherData = await fetchWeatherDataByCoordinates(location.coordinates);
      defaults = { location, weatherData };
    }
  } catch (e) {
    console.error(e);
    notFound();
  }

  return <WeatherWidgetProvider defaults={defaults}>{children}</WeatherWidgetProvider>;
}
