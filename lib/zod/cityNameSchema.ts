import { z } from 'zod';

export const CityNameSchema = z
  .string()
  .min(3, { message: 'City name must be at least 3 characters long' })
  .transform((val) => val.trim().replace(/[^a-zA-Z]/g, ''))
  .refine((val) => val.length > 0, { message: 'City name must not be empty after trimming and removing non-alphabetic characters' });
