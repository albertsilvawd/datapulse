import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sales',
  description: 'Record and review your business sales in DataPulse.',
};

export default function SalesPage() {
  return (
    <main className="coming-soon">
      <span>Sales</span>
      <h1>Coming Soon</h1>
      <p>The sales workspace is being prepared.</p>
      <Link className="button button-primary" href="/dashboard">
        Back to Dashboard
      </Link>
    </main>
  );
}
