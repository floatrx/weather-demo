'use client';

import { WeatherWidgetProvider } from './WeatherWidgetContext';

import type { TWeatherContextDefaults } from '@/types/widget';
import type { ReactNode } from 'react';

interface Props {
  defaultWeatherData?: TWeatherContextDefaults;
  children: ReactNode;
}

/**
 * Uses for wrapping all providers
 * At this moment we have only one provider
 * @param children
 * @param defaults - SSR
 * @constructor
 */
export const Providers: FC<Props> = ({ children, defaultWeatherData }) => (
  <WeatherWidgetProvider defaults={defaultWeatherData}>{children}</WeatherWidgetProvider>
);
