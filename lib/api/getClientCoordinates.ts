export const getClientCoordinates = (): Promise<{ lat: number; lon: number }> => {
  if (typeof window === 'undefined') {
    console.log('Window is not defined');
    return Promise.reject(new Error('Geolocation is not supported by your browser'));
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
