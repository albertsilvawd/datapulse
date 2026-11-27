import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Expenses',
  description: 'Track and categorize your business expenses in DataPulse.',
};

export default function ExpensesPage() {
  return (
    <main className="coming-soon">
      <span>Expenses</span>
      <h1>Coming Soon</h1>
      <p>The expenses workspace is being prepared.</p>
      <Link className="button button-primary" href="/dashboard">
        Back to Dashboard
      </Link>
    </main>
  );
}
