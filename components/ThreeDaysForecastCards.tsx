import { DailyForecastList } from '@/components/DailyForecastList';
import { useWeatherContext } from '@/components/context/WeatherWidgetContext';

export const ThreeDaysForecastCards: RC = () => {
  const { weatherData } = useWeatherContext();

  if (!weatherData) return null;

  return <DailyForecastList dailyData={weatherData.daily} maxDays={3} dateFormat="ddd" layout="list" />;
};
