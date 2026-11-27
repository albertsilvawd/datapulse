import { sql } from '@/lib/db';
import { getCurrentBusiness } from './business';

export type DashboardTotals = {
  currency: string;
  salesCount: number;
  expenseCount: number;
  sales: number;
  expenses: number;
  profit: number;
  margin: number | null;
};

// PostgreSQL performs the arithmetic in NUMERIC before values reach JavaScript.
export async function getDashboardTotals(): Promise<DashboardTotals | null> {
  const business = await getCurrentBusiness();
  if (!business) return null;

  const rows = await sql`
    SELECT
      sales.total::text AS "sales",
      sales.record_count::int AS "salesCount",
      expenses.total::text AS "expenses",
      expenses.record_count::int AS "expenseCount",
      (sales.total - expenses.total)::text AS "profit",
      ((sales.total - expenses.total) / NULLIF(sales.total, 0) * 100)::text AS "margin"
    FROM (
      SELECT COALESCE(SUM(amount), 0) AS total, COUNT(*) AS record_count
      FROM sales WHERE business_id = ${business.id}
    ) sales
    CROSS JOIN (
      SELECT COALESCE(SUM(amount), 0) AS total, COUNT(*) AS record_count
      FROM expenses WHERE business_id = ${business.id}
    ) expenses
  `;
  const row = rows[0];

  return {
    currency: business.currency.trim(),
    salesCount: Number(row.salesCount),
    expenseCount: Number(row.expenseCount),
    sales: Number(row.sales),
    expenses: Number(row.expenses),
    profit: Number(row.profit),
    margin: row.margin === null ? null : Number(row.margin),
  };
}
