import { DateTime } from '@/components/DateTime';
import { Temperature } from '@/components/Temperature';
import { WeatherIcon } from './WeatherIcon';
import { cn } from '@/lib/utils/cn';
import { upperFirst } from '@/lib/utils/upperFirst';
import { useWeatherContext } from '@/components/context/WeatherWidgetContext';

interface DailyForecastProps {
  maxDays?: number;
  dateFormat?: string;
  layout?: 'cards' | 'list';
}

export const DailyForecastList: FC<DailyForecastProps> = ({ maxDays, dateFormat, layout = 'list' }) => {
  const { weatherData } = useWeatherContext();

  if (!weatherData) return null;

  const { daily } = weatherData;

  const isCardsLayout = layout === 'cards';
  return (
    <ul className={cn('card borderless', isCardsLayout ? '-mx-4 flex gap-3 overflow-x-auto px-4' : '@sm:space-y-1 w-full')}>
      {daily.slice(0, maxDays ?? daily.length - 1).map((day, index) => (
        <li
          key={index}
          className={cn(
            'flex-1 px-2 leading-none',
            'rounded-[4px] rounded-sm',
            isCardsLayout
              ? 'border border-gray-700/50 bg-gradient-to-t from-gray-900 from-gray-900/40 py-[15px]'
              : '@sm:py-0 flex flex-wrap items-center pb-1 odd:bg-white/5',
          )}
        >
          <div
            className={cn(
              'm-0 flex items-center',
              isCardsLayout ? 'flex-col justify-center gap-1 p-2' : '@sm:w-fit w-full justify-between gap-3',
            )}
          >
            <DateTime timestamp={day.dt} format={dateFormat} />
            <p className={cn('flex items-center', isCardsLayout && 'flex-col')}>
              <span className="mr-2 font-semibold">
                <Temperature value={day.temp.day} />
              </span>
              <WeatherIcon condition={day.weather[0]} className={cn(isCardsLayout && '-order-1 -my-2 size-[70px]')} />
            </p>
          </div>
          <p
            className={cn(
              'text-nowrap text-xs opacity-50',
              isCardsLayout ? 'relative -top-1.5 mt-1 px-2 text-center' : '@sm:text-md @lg:text-[15px] @sm:inline-block hidden',
            )}
          >
            {upperFirst(day.weather[0].description)}
          </p>
        </li>
      ))}
    </ul>
  );
};
