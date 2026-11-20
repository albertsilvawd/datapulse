import { CartIcon, CoinsIcon, PercentIcon, StoreIcon } from '../components/icons';
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

// Replace these empty values with the dashboard API response when backend data is available.
export const dashboardData: DashboardData = {
  metrics: [
    { title: 'Total Sales', value: null, icon: CartIcon },
    { title: 'Total Expenses', value: null, icon: StoreIcon },
    { title: 'Net Profit', value: null, icon: CoinsIcon },
    { title: 'Profit Margin', value: null, icon: PercentIcon },
  ],
  salesSeries: [],
  expenseCategories: [],
  expenseTotal: null,
};
