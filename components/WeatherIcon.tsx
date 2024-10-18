/*
  DOC: https://openweathermap.org/weather-conditions#Icon-list
 */
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';

import type { IWeatherCondition } from '@/types/openWeatherMap';

interface WeatherIconProps {
  condition: IWeatherCondition;
  className?: string;
}

const iconToEmoji = (icon: string) => {
  const emojis: Record<string, string> = {
    '01d': '☀️',
    '02d': '⛅️',
    '03d': '☁️',
    '04d': '☁️',
    '09d': '\uD83C\uDF27',
    '10d': '\uD83C\uDF26',
    '11d': '⛈',
    '13d': '❄️',
    '50d': '\uD83C\uDF2B',
    '01n': '\uD83C\uDF11',
    '02n': '\uD83C\uDF11 ☁',
    '03n': '☁️',
    '04n': '️️☁☁',
    '09n': '\uD83C\uDF27',
    '10n': '☔️',
    '11n': '⛈',
    '13n': '❄️',
    '50n': '\uD83C\uDF2B',
  };
  return emojis[icon] || '😀';
};

const WeatherImage: FC<WeatherIconProps> = ({ condition, className }) => {
  // const getIconUrl = (icon: string) => `${WEATHER_ICONS_URL}/${icon}@2x.png`;
  const getIconUrl = (icon: string) => `/ico/3d/${icon}.png`;
  return (
    <Image
      src={getIconUrl(condition.icon)}
      alt={condition.description}
      className={cn('h-8 max-h-[100px] w-8 max-w-[100px]', className)}
      width={100}
      height={100}
      quality={100}
    />
  );
};

/**
 * Experiments with weather icons
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const WeatherEmoji: FC<WeatherIconProps> = ({ condition, className }) => {
  return <span className={cn('text-7xl', className)}>{iconToEmoji(condition.icon)}</span>;
};

export const WeatherIcon: FC<WeatherIconProps> = ({ condition, className }) => {
  return <WeatherImage condition={condition} className={className} />;
};
