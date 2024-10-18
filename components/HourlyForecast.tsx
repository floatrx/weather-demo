'use client';
import { Temperature } from './Temperature';
import type { IHourlyForecast } from '@/types/openWeatherMap';
import { WeatherIcon } from '@/components/WeatherIcon';
import { DateTime } from '@/components/DateTime';
import dayjs from 'dayjs';
import { SimpleCard } from '@/components/SimpleCard';
import { useState } from 'react';
import { upperFirst } from '@/lib/utils/upperFirst';
import { cn } from '@/lib/utils/cn';
import { Tabs } from '@/components/Tabs';
import { ChevronDown } from 'lucide-react';

interface HourlyForecastProps {
  hourlyData: IHourlyForecast[];
  layout?: 'cards' | 'list';
}

export const HourlyForecast: FC<HourlyForecastProps> = ({ hourlyData, layout }) => {
  const isCardsLayout = layout === 'cards';

  // Group hourly data by day
  const groupedData = hourlyData.reduce(
    (acc, hour) => {
      const day = dayjs.unix(hour.dt).format('YYYY-MM-DD');
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(hour);
      return acc;
    },
    {} as Record<string, IHourlyForecast[]>,
  );

  return (
    <section>
      <Tabs
        tabs={Object.entries(groupedData).map(([day, hours]) => ({
          id: day,
          title: <DateTime timestamp={dayjs(day).unix()} format="dddd" />,
          content: (
            <SimpleCard
              key={day}
              className={cn(
                'borderless @3xl:bg-grey-800 @md:m-0 -mx-4 rounded-none border border-none border-gray-800 py-0',
                isCardsLayout ? '' : 'px-0',
              )}
            >
              <ul className={cn(isCardsLayout ? '-mx-8 flex gap-3 overflow-x-auto px-4' : '')}>
                {hours.map((hour, index) => (
                  <li
                    key={index}
                    className={cn(
                      'flex items-center rounded-sm',
                      isCardsLayout
                        ? 'w-full min-w-24 flex-col flex-wrap border border-gray-700/50 bg-gradient-to-t from-gray-950/25 py-2'
                        : '@md:flex-row @md:flex-nowrap flex-wrap p-2 py-0 odd:bg-white/5',
                    )}
                  >
                    <DateTime
                      timestamp={hour.dt}
                      format="h A"
                      className={cn('@md:text-right mr-2', isCardsLayout ? 'text-sm' : 'basis-[5ch]')}
                    />
                    <p className="basis-[3ch] text-center">
                      <WeatherIcon condition={hour.weather[0]} className={cn('mx-auto', isCardsLayout ? 'size-[50px]' : 'size-[4ch]')} />
                    </p>
                    <p className={cn('flex flex-1 items-center', isCardsLayout ? 'flex-col' : 'gap-[2ch]')}>
                      <Temperature value={hour.temp} className={cn(isCardsLayout && 'font-black')} />
                      <span className={cn('leading-1 text-nowrap opacity-50', isCardsLayout && 'px-1 text-xs')}>
                        {upperFirst(hour.weather[0].description)}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </SimpleCard>
          ),
        }))}
      />
    </section>
  );
};
