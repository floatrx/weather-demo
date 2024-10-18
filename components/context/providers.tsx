import { WeatherWidgetProvider } from './WeatherWidgetContext';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <WeatherWidgetProvider>{children}</WeatherWidgetProvider>;
};
