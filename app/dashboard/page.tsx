import type { Metadata } from 'next';
import KpiCard from '../components/KpiCard';
import { CartIcon, CoinsIcon, PercentIcon, StoreIcon } from '../components/icons';
import { ExpenseCategories, SalesPerformance } from '../components/DashboardOverview';
import { dashboardData, type KpiMetric } from '../lib/dashboard-data';
import { getDashboardTotals } from '@/lib/data/dashboard';

export const metadata: Metadata = { title: 'Dashboard' };

export default async function DashboardPage() {
  const totals = await getDashboardTotals();
  const hasRecords = Boolean(totals && (totals.salesCount > 0 || totals.expenseCount > 0));
  const money = totals
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: totals.currency })
    : null;
  const percent = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const metrics: KpiMetric[] = [
    {
      title: 'Total Sales',
      value: totals?.salesCount ? money!.format(totals.sales) : null,
      icon: CartIcon,
    },
    {
      title: 'Total Expenses',
      value: totals?.expenseCount ? money!.format(totals.expenses) : null,
      icon: StoreIcon,
    },
    {
      title: 'Net Profit',
      value: hasRecords ? money!.format(totals!.profit) : null,
      icon: CoinsIcon,
    },
    {
      title: 'Profit Margin',
      value: totals?.margin == null ? null : percent.format(totals.margin / 100),
      icon: PercentIcon,
    },
  ];
  return (
    <main className="dashboard-main">
      <div className="dashboard-heading">
        <div>
          {!hasRecords && (
            <p className="demo-badge">
              <span /> NO DATA YET
            </p>
          )}
          <h1>Dashboard</h1>
          <p className="dashboard-subtitle">Track your business KPIs and performance.</p>
        </div>
        <span className="period-select" aria-label="Reporting period: all time">
          All Time
        </span>
      </div>

      <section className="kpi-grid" aria-label="Key performance indicators">
        {metrics.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </section>

      <section className="dashboard-charts" aria-label="Business performance charts">
        <SalesPerformance data={dashboardData.salesSeries} />
        <ExpenseCategories
          categories={dashboardData.expenseCategories}
          total={dashboardData.expenseTotal}
        />
      </section>
    </main>
  );
}
