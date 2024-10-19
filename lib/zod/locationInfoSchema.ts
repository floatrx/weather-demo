import { z } from 'zod';

import { CityNameSchema } from '@/lib/zod/cityNameSchema';
import { CoordinatesSchema } from '@/lib/zod/coordinatesSchema';

/**
 * A schema for validating location info.
 * Location info must contain valid {coordinates, cityName}.
 * This validator uses for validating location info from LocalStorage only.
 */
export const LocationInfoSchema = z.object({
  coordinates: CoordinatesSchema,
  cityName: CityNameSchema,
});
