import { z } from 'zod';

// A real calendar date in the YYYY-MM-DD format (rejects things like 2026-02-30).
export const DateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must use the YYYY-MM-DD format.')
  .refine((value) => {
    const date = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }, 'Enter a valid date.');

// A positive money amount that fits in NUMERIC(12,2).
export const AmountSchema = z.coerce
  .number({ message: 'Amount must be a number.' })
  .positive('Amount must be greater than zero.')
  .max(9_999_999_999.99, 'Amount is too large.');

// Optional text: empty strings become null.
export const OptionalTextSchema = z
  .string()
  .trim()
  .max(500, 'Description must have at most 500 characters.')
  .optional()
  .transform((value) => (value ? value : null));

// The result returned by the create functions, so API routes and forms can show clear errors.
export type MutationResult<T> =
  { ok: true; data: T } | { ok: false; status: number; error: string };
