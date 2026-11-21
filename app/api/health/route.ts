import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<Response> {
  try {
    const rows = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name IN ('users', 'businesses', 'sales', 'expenses', 'kpis')
      ORDER BY table_name
    `;
    const tables = rows.map((row) => row.table_name as string);

    return Response.json({ status: 'ok', database: 'connected', tables });
  } catch (error) {
    console.error('Database health check failed:', error);
    return Response.json({ status: 'error', database: 'unavailable' }, { status: 500 });
  }
}
