import { WeatherWidgetProvider } from './WeatherWidgetContext';

/**
 * Uses for wrapping all providers
 * At this moment we have only one provider
 * @param children
 * @constructor
 */
export const Providers: FC = ({ children }) => <WeatherWidgetProvider>{children}</WeatherWidgetProvider>;
