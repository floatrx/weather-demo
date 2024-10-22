import { z } from 'zod';

/**
 * A schema for validating city names.
 * City names must be at least 3 characters long and contain only alphabetic characters.
 */
export const CityNameSchema = z
  .string()
  .min(3, { message: 'City name must be at least 3 characters long' })
  .transform((val) => val.trim().replace(/\w/g, ''))
  .refine((val) => val.length > 0, { message: 'City name must not be empty after trimming and removing non-alphabetic characters' });
