import { z } from 'zod';
import { sql } from '@/lib/db';
import type { Sale } from '@/lib/definitions';
import {
  AmountSchema,
  DateSchema,
  OptionalTextSchema,
  type MutationResult,
} from '@/lib/validation';
import { getCurrentBusiness } from './business';

export const SaleInputSchema = z.object({
  date: DateSchema,
  amount: AmountSchema,
  description: OptionalTextSchema,
});

// Returns the sales of the logged-in user's business, or null if nobody is logged in.
export async function getSalesForCurrentUser(): Promise<Sale[] | null> {
  const business = await getCurrentBusiness();
  if (!business) {
    return null;
  }

  const rows = await sql`
    SELECT
      id,
      business_id                 AS "businessId",
      to_char(date, 'YYYY-MM-DD') AS "date",
      amount::float8              AS "amount",
      description,
      created_at                  AS "createdAt"
    FROM sales
    WHERE business_id = ${business.id}
    ORDER BY date DESC, id DESC
  `;
  return rows as unknown as Sale[];
}

// Validates the input and saves a sale for the logged-in user's business.
export async function createSaleForCurrentUser(input: unknown): Promise<MutationResult<Sale>> {
  const business = await getCurrentBusiness();
  if (!business) {
    return { ok: false, status: 401, error: 'You must be logged in.' };
  }

  const parsed = SaleInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      status: 400,
      error: parsed.error.issues[0]?.message ?? 'Invalid sale data.',
    };
  }

  const { date, amount, description } = parsed.data;
  const rows = await sql`
    INSERT INTO sales (business_id, date, amount, description)
    VALUES (${business.id}, ${date}, ${amount}, ${description})
    RETURNING
      id,
      business_id                 AS "businessId",
      to_char(date, 'YYYY-MM-DD') AS "date",
      amount::float8              AS "amount",
      description,
      created_at                  AS "createdAt"
  `;
  return { ok: true, data: rows[0] as Sale };
}
