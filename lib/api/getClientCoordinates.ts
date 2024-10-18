import { isBrowser } from '@/lib/utils/browser';

export const getClientCoordinates = (): Promise<{ lat: number; lon: number }> => {
  if (!isBrowser()) {
    return Promise.reject(new Error('Not available in server-side'));
  }
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      console.log('Geolocation is supported by your browser');
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
