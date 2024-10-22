'use client';

import React, { memo } from 'react';

import { useWeatherContext } from '@/components/context/WeatherWidgetContext';
import { InfoRow } from '@/components/ui/InfoRow';
import { DailyHourlyForecastTabs } from '@/components/widget/DailyHourlyForecastTabs';
import { Temperature } from '@/components/widget/Temperature';
import { ThreeDaysForecastCards } from '@/components/widget/ThreeDaysForecastCards';
import { WeatherIcon } from '@/components/widget/WeatherIcon';
import { upperFirst, formatCityName } from '@/lib/utils/upperFirst';

interface CurrentForecastProps {
  extended?: boolean;
  initial?: boolean; // widget initial view 1x1 (icon, temperature)
}

/**
 * Current weather forecast widget (main)
 * @param extra - extra widget details (for extended view)
 * @param extended - render only initial widget info (icon, temperature)
 * @constructor
 */
export const CurrentForecast: RC<CurrentForecastProps> = memo(({ extended, initial }) => {
  const { location, weatherData } = useWeatherContext(); // get location from context / city name

  if (!weatherData) return null;

  const { temp, feels_like, humidity, wind_speed } = weatherData.current;
  const [condition] = weatherData.current.weather;

  const description = upperFirst(condition.description);

  // [1x1] Render initial view
  if (initial) {
    return (
      <div className="relative">
        <WeatherIcon condition={condition} className="size-[80px] mx-auto" />
        <Temperature className="absolute bottom-1 right-1 bg-background/50 backdrop-blur-sm px-1 font-black rounded" value={temp} />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center @6xl:gap-4">
        {/* Default info */}
        <div className="flex-1">
          <header className="flex flex-col items-center justify-between @sm:flex-row">
            <div className="group max-w-full flex-1 text-center @sm:text-left">
              <h2 className="flex flex-1 items-center text-transparent">
                <span className="to-wg-700 from-wg-600 bg-gradient-to-r bg-clip-text text-2xl font-black leading-none dark:from-[#9abc26] dark:to-[#fe955e]">
                  {formatCityName(location.cityName)}
                </span>
              </h2>
              <p className="hidden text-sm opacity-50 @xs:block">{description}</p>
            </div>
            <WeatherIcon condition={condition} className="-my-3 mx-auto size-[80px] max-h-fit transition-all @xs:-my-2 @lg:size-[100px]" />
          </header>

          {/* Temperature, Feels Like, Humidity, Wind Speed */}
          <div className="flex flex-col text-center @xs:flex-row @xs:gap-2 @sm:text-left [&_p]:flex-1">
            <InfoRow label="Temperature" classNames={{ value: 'text-3xl @xs:text-xl' }}>
              <Temperature value={temp} />
            </InfoRow>
            <InfoRow className="hidden @xs:flex" label="Feels Like">
              <Temperature value={feels_like} />
            </InfoRow>
            <InfoRow className="hidden @lg:flex" label="Humidity">
              {humidity}%
            </InfoRow>
            <InfoRow className="hidden @3xl:flex" label="Wind Speed">
              {wind_speed} m/s
            </InfoRow>
          </div>
        </div>

        {/* [2x2] Visible only for wide parent @container if extended info not enabled */}
        {!extended && (
          <aside className="hidden items-center border-l border-gray-700/30 pl-2 @container @6xl:flex @6xl:flex-1">
            <ThreeDaysForecastCards />
          </aside>
        )}
      </div>

      {/* [4x4] Pass extra weather widget */}
      {extended && (
        <footer className="hidden @lg:block">
          <DailyHourlyForecastTabs />
        </footer>
      )}
    </>
  );
});
