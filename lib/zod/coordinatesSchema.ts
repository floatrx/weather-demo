import { z } from 'zod';

/**
 * A schema for validating coordinates.
 * Latitude must be between -90 and 90.
 */
export const CoordinatesSchema = z.object({
  lat: z.number().min(-90).max(90, { message: 'Latitude must be between -90 and 90' }),
  lon: z.number().min(-180).max(180, { message: 'Longitude must be between -180 and 180' }),
});
