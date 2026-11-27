import type { ComponentType, SVGProps } from 'react';

export type KpiMetric = {
  title: string;
  value: string | null;
  trend?: string | null;
  direction?: 'up' | 'down';
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export type SalesPoint = { month: string; value: number };
export type ExpenseCategory = {
  label: string;
  value: number;
  color: 'blue' | 'mid' | 'light' | 'pale';
};

export type DashboardData = {
  metrics: KpiMetric[];
  salesSeries: SalesPoint[];
  expenseCategories: ExpenseCategory[];
  expenseTotal: string | null;
};

// Charts remain empty until issue #11 supplies their data.
export const dashboardData: Omit<DashboardData, 'metrics'> = {
  salesSeries: [],
  expenseCategories: [],
  expenseTotal: null,
};
