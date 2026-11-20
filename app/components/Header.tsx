'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BellIcon, BrandMark } from './icons';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Sales', href: '/sales' },
  { label: 'Expenses', href: '/expenses' },
];

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="DataPulse Home" onClick={() => setMenuOpen(false)}>
          <BrandMark className="brand-mark" />
          <span>DataPulse</span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={`primary-navigation${menuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link${isActive(pathname, href) ? ' is-active' : ''}`}
              aria-current={isActive(pathname, href) ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <span className="header-divider" aria-hidden="true" />
          <button className="notification-button" type="button" aria-label="Notifications (coming soon)" disabled>
            <BellIcon />
            <span className="notification-dot" aria-hidden="true" />
          </button>
          <span className="user-avatar" aria-label="William Francia">WH</span>
        </div>
      </div>
    </header>
  );
}
