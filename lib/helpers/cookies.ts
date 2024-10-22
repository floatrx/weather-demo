'use client';

import { LOCATION_INFO_STORE_KEY } from '@/config/const';

import type { ILocationInfo } from '@/types/widget';

/**
 * Sets a cookie with the given name, value, and expiration days.
 * This helper function is used to store the location information in a cookie on client side only!
 * To read the cookie, I use the builtin Next.js cookie function see readLocationFromCookies.ts
 * @param name - cookie name
 * @param value - string value
 * @param days - the number of days until the cookie expires (default is 360 days)
 */
export function setCookie(name: string, value: string, days: number = 360) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

// render readCookie function
export function readCookie(name: string): string | null {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export const saveLocationInfoToCookie = (locationInfo: ILocationInfo): void => {
  const safeData = JSON.stringify({ ...locationInfo, cityName: encodeURIComponent(locationInfo.cityName) });
  setCookie(LOCATION_INFO_STORE_KEY, safeData);
};
