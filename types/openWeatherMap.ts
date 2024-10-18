/**
 * This module generated using tool "Transform":
 * https://transform.tools/json-to-typescript
 */
export interface IWeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface ICurrentWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: IWeatherCondition[];
}

export interface IMinutelyForecast {
  dt: number;
  precipitation: number;
}

export interface IHourlyForecast {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: IWeatherCondition[];
  pop: number;
  rain?: Record<string, number>;
}

export interface IDailyTemperature {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface IDailyFeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface IDailyForecast {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: IDailyTemperature;
  feels_like: IDailyFeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: IWeatherCondition[];
  clouds: number;
  pop: number;
  rain?: number;
  uvi: number;
}

export interface ICoordinates {
  lat: number;
  lon: number;
}

export interface IWeatherApiResponse {
  coordinates: ICoordinates;
  loading: boolean;
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: ICurrentWeather;
  minutely: IMinutelyForecast[];
  hourly: IHourlyForecast[];
  daily: IDailyForecast[];
}
