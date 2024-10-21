import type { ICoordinates } from '@/types/openWeatherMap';

export interface LocationInfo {
  coordinates: ICoordinates; // this data includes in IWeatherApiResponse, but we need it to restore location from localStorage
  cityName: string;
}

export type WidgetDefaults = LocationInfo | null;
