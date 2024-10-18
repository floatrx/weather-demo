import type { ICoordinates } from '@/types/openWeatherMap';

export interface LocationInfo {
  coordinates: ICoordinates;
  cityName: string;
}
