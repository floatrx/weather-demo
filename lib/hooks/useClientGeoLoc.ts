import { useState, useEffect, useCallback } from 'react';
import { getClientCoordinates } from '@/lib/api/getClientCoordinates';

import type { ICoordinates } from '@/types/openWeatherMap';

/**
 * Get client coordinates using browser Geolocation API
 */
export const useClientGeoLoc = (): { coordinates: ICoordinates | null; loading: boolean } => {
  const [coordinates, setCoordinates] = useState<ICoordinates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCoordinates = useCallback(async () => {
    try {
      const data = await getClientCoordinates();
      setCoordinates(data);
    } catch (error) {
      setCoordinates(null);
      throw error; // pass error to the caller
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoordinates();
  }, [fetchCoordinates]);

  return { coordinates, loading };
};
