'use client';
import type { IWeatherApiResponse } from '@/types/openWeatherMap';
import { SimpleCard } from '@/components/SimpleCard';
import { CurrentForecast } from '@/components/CurrentForecast';
import { DailyForecast } from '@/components/DailyForecast';
import { FC, useState } from 'react';
import { HourlyForecast } from '@/components/HourlyForecast';
import { Tabs } from '@/components/Tabs';
import { Grid, List } from 'lucide-react';
import { useWeatherContext } from '@/components/context/WeatherWidgetContext';
import { Spinner } from '@/components/Spinner';

interface WeatherViewProps {}

export const WeatherView: FC<WeatherViewProps> = () => {
  const [currentLayout, setLayout] = useState<'cards' | 'list'>('cards');

  const { weatherData, loading } = useWeatherContext();

  if (loading) return <Spinner />;

  if (!weatherData) {
    return <>Weather API not available</>;
  }
  const { current, hourly, daily, timezone } = weatherData;

  const toggleLayout = () => {
    // Switch between 'cards' and 'list' layout
    setLayout((prev) => (prev === 'cards' ? 'list' : 'cards'));
  };

  const ToggleIcon = currentLayout === 'cards' ? Grid : List;

  const sizes = ['max-w-[180px]', 'max-w-[300px]', 'max-w-[350px]', 'max-w-[400px]', 'max-w-[420px]', 'max-w-[460px]', 'max-w-[520px]'];

  return (
    <>
      {sizes.map((size, index) => (
        <SimpleCard key={index} className={size}>
          <CurrentForecast current={current} title={timezone}>
            <DailyForecast dailyData={daily} maxDays={3} dateFormat="ddd" layout="list" />
          </CurrentForecast>
        </SimpleCard>
      ))}

      <SimpleCard className="max-w-[520px]">
        <CurrentForecast
          current={current}
          title={timezone}
          extra={
            <Tabs
              extra={
                <button className="" onClick={toggleLayout}>
                  <ToggleIcon size={22} />
                </button>
              }
              tabs={[
                { id: 'd', title: 'Daily', content: <DailyForecast layout={currentLayout} dailyData={daily} /> },
                { id: 'h', title: 'Hourly', content: <HourlyForecast layout={currentLayout} hourlyData={hourly} /> },
              ]}
            />
          }
        />
      </SimpleCard>
    </>
  );
};
