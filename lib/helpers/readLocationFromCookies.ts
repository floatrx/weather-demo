'use server';

import { cookies } from 'next/headers';

import { LOCATION_INFO_STORE_KEY } from '@/config/const';
import { LocationInfoSchema } from '@/lib/zod/locationInfoSchema';

import type { WidgetDefaults } from '@/types/widget';

/**
 * Read location info from cookies (SSR)
 */
export const readLocationFromCookies = async (): Promise<WidgetDefaults> => {
  const cookieStore = cookies();
  const locationInfoRaw = cookieStore.get(LOCATION_INFO_STORE_KEY)?.value;

  let defaults: WidgetDefaults = null;

  try {
    if (!locationInfoRaw) return null;
    // Try to parse location info from cookies
    defaults = JSON.parse(locationInfoRaw);
  } catch (e) {
    console.error('[getDefaultsFromCookies] Error parsing locationInfo:', e);
    return null;
  }

  // Validate location info
  const { success, data: location } = LocationInfoSchema.safeParse(defaults);
  if (!success || !location) {
    console.error('[getDefaultsFromCookies] Invalid location info:', location);
    return null;
  }

  return location;
};
