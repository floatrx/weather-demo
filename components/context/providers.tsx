'use client';

import { ThemeProvider } from '@/components/context/ThemeProvider';

import { WeatherWidgetProvider } from './WeatherWidgetContext';

/**
 * Uses for wrapping all providers
 * At this moment we have only one provider
 * @param children
 * @constructor
 */
export const Providers: FC = ({ children }) => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
    <WeatherWidgetProvider>{children}</WeatherWidgetProvider>
  </ThemeProvider>
);
