import { useState, useEffect, useCallback } from 'react';
import { getClientCoordinates } from '@/lib/api/getClientCoordinates';

interface Coordinates {
  lat: number;
  lon: number;
}

export const useClientGeoLoc = (): { coordinates: Coordinates | null; loading: boolean } => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCoordinates = useCallback(async () => {
    try {
      const data = await getClientCoordinates();
      setCoordinates(data);
    } catch (error) {
      console.log('Error fetching coordinates:', error);
      setCoordinates(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoordinates();
  }, [fetchCoordinates]);

  return { coordinates, loading };
};
