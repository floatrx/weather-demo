import type { ICoordinates } from '@/types/openWeatherMap';

/**
 * Helper functions to check if the code is running
 * in the browser and to get the current locale code.
 */
export const isBrowser = (): boolean => typeof window !== 'undefined'; //The approach recommended by Next.js

/**
 * Get the current locale code
 * @returns {string} - The current locale code
 */
export const getCurrentLocaleCode = (): string => {
  if (!isBrowser()) return 'en';
  const locale = navigator.language || navigator.language;
  return locale.split('-')[0]; // Extract the language code (e.g., "en" from "en-US")
};

/**
 * Get client coordinates using browser Geolocation API
 */
export const getClientCoordinates = async (): Promise<ICoordinates> => {
  if (!isBrowser()) {
    throw new Error('Not available in server-side');
  }

  if (!navigator.geolocation) {
    throw new Error('Geolocation is not supported');
  }

  return new Promise<ICoordinates>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ lat: latitude, lon: longitude });
      },
      (error) => {
        reject(error);
      },
    );
  });
};
