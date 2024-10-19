'use client';

import { isBrowser } from '@/lib/utils/browser';
import type { ICoordinates } from '@/types/openWeatherMap';

/**
 * Get client coordinates using browser Geolocation API
 */
export const getClientCoordinates = (): Promise<ICoordinates> => {
  if (!isBrowser()) {
    return Promise.reject(new Error('Not available in server-side'));
  }
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, lon: longitude });
        },
        (error) => {
          reject(error);
        },
      );
    }
  });
};
