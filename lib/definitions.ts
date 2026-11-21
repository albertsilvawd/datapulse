// Shared TypeScript types for the DataPulse database tables.
// Database columns use snake_case; these types use camelCase,
// so queries should alias columns (for example: user_id AS "userId").

export type KpiPeriod = 'weekly' | 'monthly';

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

// Only used on the server for authentication. Never send it to the browser.
export interface UserWithPassword extends User {
  passwordHash: string;
}

export interface Business {
  id: number;
  userId: number;
  name: string;
  currency: string;
  createdAt: string;
}

export interface Sale {
  id: number;
  businessId: number;
  date: string; // 'YYYY-MM-DD'
  amount: number;
  description: string | null;
  createdAt: string;
}

export interface Expense {
  id: number;
  businessId: number;
  date: string; // 'YYYY-MM-DD'
  amount: number;
  category: string;
  description: string | null;
  createdAt: string;
}

export interface Kpi {
  id: number;
  businessId: number;
  name: string;
  unit: string;
  targetValue: number | null;
  period: KpiPeriod;
  createdAt: string;
}
