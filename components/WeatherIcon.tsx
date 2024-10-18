import type { IWeatherCondition } from '@/types/openWeatherMap';
import { cn } from '@/lib/utils/cn';
import { WEATHER_ICONS_URL } from '@/config/const';

interface WeatherIconProps {
  condition: IWeatherCondition;
  className?: string;
}

export const WeatherIcon: FC<WeatherIconProps> = ({ condition, className }) => {
  const getIconUrl = (icon: string) => `${WEATHER_ICONS_URL}/${icon}@2x.png`;

  return (
    <img
      src={getIconUrl(condition.icon)}
      alt={condition.description}
      className={cn('h-8 max-h-[100px] w-8 max-w-[100px]', className)}
      width={32}
      height={32}
    />
  );
};
