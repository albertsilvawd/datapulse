import { CartIcon, CoinsIcon, PercentIcon, StoreIcon } from '../components/icons';

export const kpiData = [
  { title: 'Total Sales', value: '$42,680', trend: '+6.4%', direction: 'up', icon: CartIcon },
  { title: 'Total Expenses', value: '$16,320', trend: '−3.8%', direction: 'down', icon: StoreIcon },
  { title: 'Net Profit', value: '$26,360', trend: '+10.9%', direction: 'up', icon: CoinsIcon },
  { title: 'Profit Margin', value: '61.8%', trend: '+2.6 pp', direction: 'up', icon: PercentIcon },
] as const;

export const salesSeries = [
  { month: 'Jul', value: 22 },
  { month: 'Aug', value: 27 },
  { month: 'Sep', value: 25 },
  { month: 'Oct', value: 32 },
  { month: 'Nov', value: 38 },
  { month: 'Dec', value: 45 },
];

export const expenseCategories = [
  { label: 'Operations', value: '34.2%', color: 'expense-blue' },
  { label: 'Payroll', value: '28.7%', color: 'expense-mid' },
  { label: 'Marketing', value: '14.9%', color: 'expense-light' },
  { label: 'Other', value: '22.2%', color: 'expense-pale' },
];
