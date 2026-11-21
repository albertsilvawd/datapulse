import { auth } from '@/auth';
import { sql } from '@/lib/db';
import type { Business } from '@/lib/definitions';

// Returns the id of the logged-in user, or null if nobody is logged in.
export async function getCurrentUserId(): Promise<number | null> {
  const session = await auth();
  const id = Number(session?.user?.id);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// Returns the first business that belongs to the logged-in user.
export async function getCurrentBusiness(): Promise<Business | null> {
  const userId = await getCurrentUserId();
  if (!userId) {
    return null;
  }

  const rows = await sql`
    SELECT id, user_id AS "userId", name, currency, created_at AS "createdAt"
    FROM businesses
    WHERE user_id = ${userId}
    ORDER BY id
    LIMIT 1
  `;
  return (rows[0] as Business | undefined) ?? null;
}

// Returns a business only if it belongs to the logged-in user.
// Use this whenever a business id comes from the URL or a form.
export async function getOwnedBusiness(businessId: number): Promise<Business | null> {
  const userId = await getCurrentUserId();
  if (!userId) {
    return null;
  }

  const rows = await sql`
    SELECT id, user_id AS "userId", name, currency, created_at AS "createdAt"
    FROM businesses
    WHERE id = ${businessId} AND user_id = ${userId}
  `;
  return (rows[0] as Business | undefined) ?? null;
}
