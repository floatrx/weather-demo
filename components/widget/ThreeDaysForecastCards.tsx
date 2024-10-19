import { DailyForecastList } from '@/components/widget/DailyForecastList';
import { useWeatherContext } from '@/components/context/WeatherWidgetContext';

/**
 * Display THREE DAYS forecast LIST with SHORT DAY NAMES
 * @constructor
 */
export const ThreeDaysForecastCards: RC = () => {
  const { weatherData } = useWeatherContext();

  if (!weatherData) return null;

  return <DailyForecastList maxDays={3} dateFormat="ddd" layout="list" />;
};