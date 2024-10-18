import { FC } from 'react';
import { WeatherIcon } from './WeatherIcon';
import type { IDailyForecast } from '@/types/openWeatherMap';
import { Temperature } from '@/components/Temperature';
import { DateTime } from '@/components/DateTime';
import { upperFirst } from '@/lib/utils/upperFirst';
import { cn } from '@/lib/utils/cn';

interface DailyForecastProps {
  dailyData: IDailyForecast[];
  maxDays?: number;
  dateFormat?: string;
  layout?: 'cards' | 'list';
}

export const DailyForecast: FC<DailyForecastProps> = ({ dailyData, maxDays, dateFormat, layout = 'list' }) => {
  const isCardsLayout = layout === 'cards';
  return (
    <ul className={cn('', isCardsLayout ? '-mx-4 flex gap-3 overflow-x-auto px-4' : 'w-full space-y-1')}>
      {dailyData.slice(0, maxDays ?? dailyData.length - 1).map((day, index) => (
        <li
          key={index}
          className={cn(
            'flex-1 px-2 leading-none',
            'rounded-[4px] rounded-sm',
            isCardsLayout
              ? 'border border-gray-700/50 bg-gradient-to-t from-gray-900 from-gray-900/40 py-4'
              : 'flex items-center odd:bg-white/5',
          )}
        >
          <div className={cn('m-0 flex items-center', isCardsLayout ? 'flex-col justify-center gap-1 p-2' : 'gap-3')}>
            <DateTime timestamp={day.dt} format={dateFormat} />
            <p className={cn('flex items-center', isCardsLayout && 'flex-col')}>
              <span className="mr-2 font-semibold">
                <Temperature value={day.temp.day} />
              </span>
              <WeatherIcon condition={day.weather[0]} className={cn(isCardsLayout && '-order-1 -my-2 size-[70px]')} />
            </p>
          </div>
          <p className={cn('text-nowrap opacity-50', isCardsLayout ? 'relative -top-1.5 mt-1 px-2 text-center text-xs' : '')}>
            {upperFirst(day.weather[0].description)}
          </p>
        </li>
      ))}
    </ul>
  );
};
