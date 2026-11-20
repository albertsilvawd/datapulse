import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <span>© 2026 DataPulse. All rights reserved.</span>
      <nav className="footer-links" aria-label="Footer navigation">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/sales">Sales</Link>
        <Link href="/expenses">Expenses</Link>
      </nav>
    </footer>
  );
}
