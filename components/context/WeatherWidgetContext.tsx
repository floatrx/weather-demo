'use client';

import React, { createContext, useContext, ReactNode } from 'react';

import { useWeatherWidget, type UseWeatherReturnType } from '@/lib/hooks/useWeatherWidget';

export interface WeatherWidgetContextType extends UseWeatherReturnType {}

const WeatherWidgetContext = createContext<WeatherWidgetContextType | undefined>(undefined);

/**
 * Weather widget provider
 * This provider is used to provide weather data to the nested widget components
 * All logic encapsulated in useWeatherWidget hook
 * @param children
 * @constructor
 */
export const WeatherWidgetProvider = ({ children }: { children: ReactNode }) => {
  const value = useWeatherWidget();
  return <WeatherWidgetContext.Provider value={value}>{children}</WeatherWidgetContext.Provider>;
};

/**
 * Main hook to use weather context
 */
export const useWeatherContext = (): WeatherWidgetContextType => {
  const context = useContext(WeatherWidgetContext);
  if (!context) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
};
