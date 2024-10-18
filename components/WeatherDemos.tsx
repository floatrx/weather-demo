'use client';

import { Alert } from '@/components/ui/Alert';
import { CurrentForecast } from '@/components/CurrentForecast';
import { SimpleCard } from '@/components/SimpleCard';
import { Spinner } from '@/components/ui/Spinner';
import { useWeatherContext } from '@/components/context/WeatherWidgetContext';
import { DailyHourlyForecastTabs } from '@/components/DailyHourlyForecastTabs';
import { ThreeDaysForecastCards } from '@/components/ThreeDaysForecastCards';

export const DEMO_SIZES = [180, 300, 350, 400, 420, 460, 520];

/**
 * WeatherDemos component - demonstrates the use cases of WeatherWidget
 * @constructor
 */
export const WeatherDemos: RC = () => {
  const { weatherData, loading } = useWeatherContext();

  if (loading) return <Spinner />;

  if (!weatherData) {
    return <Alert>Weather API not available. Pls, provide your City and press Enter.</Alert>;
  }
  // Sizes for render testing (max-width) @container query
  return (
    <>
      {/*
        Render multiple widgets with different container sizes
        to demonstrate @container query cases
      */}
      {DEMO_SIZES.map((maxWidth, index) => (
        <SimpleCard key={index} style={{ maxWidth }}>
          <CurrentForecast aside={<ThreeDaysForecastCards />} />
        </SimpleCard>
      ))}

      {/*
        WeatherWidget / Extended widget
        We can't use @container query with min/max height,
        so we need to pass more weather details in extra prop
      */}
      <SimpleCard className="max-h-[500px] max-w-[520px]">
        <CurrentForecast extra={<DailyHourlyForecastTabs />} />
      </SimpleCard>
    </>
  );
};