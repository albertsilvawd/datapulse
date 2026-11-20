import type { Metadata } from 'next';
import KpiCard from '../components/KpiCard';
import { ExpenseCategories, SalesPerformance } from '../components/DashboardOverview';
import { dashboardData } from '../lib/dashboard-data';

export const metadata: Metadata = { title: 'Dashboard' };

export default function DashboardPage() {
  return (
    <main className="dashboard-main">
      <div className="dashboard-heading">
        <div>
          <p className="demo-badge">
            <span /> NO DATA YET
          </p>
          <h1>Dashboard</h1>
          <p className="dashboard-subtitle">Track your business KPIs and performance.</p>
        </div>
        <span className="period-select" aria-label="Reporting period: last 6 months">
          <span aria-hidden="true">▦</span> Last 6 Months <span aria-hidden="true">⌄</span>
        </span>
      </div>

      <section className="kpi-grid" aria-label="Key performance indicators">
        {dashboardData.metrics.map((kpi) => (
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
