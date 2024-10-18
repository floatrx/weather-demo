import { z } from 'zod';
import { CoordinatesSchema } from '@/lib/zod/coordinatesSchema';
import { CityNameSchema } from '@/lib/zod/cityNameSchema';

export const LocationInfoSchema = z.object({
  coordinates: CoordinatesSchema,
  cityName: CityNameSchema,
});
