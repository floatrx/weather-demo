import type { ICoordinates, IWeatherApiResponse } from '@/types/openWeatherMap';

export interface ILocationInfo {
  coordinates: ICoordinates; // this data includes in IWeatherApiResponse, but we need it to restore location from localStorage
  cityName: string;
}

export type TWidgetDefaults = ILocationInfo | null;

// SSR
export type TWeatherContextDefaults = PossibleNull<{
  weatherData: IWeatherApiResponse;
  location: ILocationInfo;
}>;
