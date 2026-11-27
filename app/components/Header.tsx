'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BellIcon, BrandMark } from './icons';
import { logout } from '@/lib/actions/auth';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Sales', href: '/sales' },
  { label: 'Expenses', href: '/expenses' },
];

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (
    parts.length > 1 ? `${parts[0][0]}${parts[parts.length - 1][0]}` : parts[0].slice(0, 2)
  ).toLocaleUpperCase();
}

export default function Header({ userName }: { userName: string | null }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          href="/"
          className="brand"
          aria-label="DataPulse Home"
          onClick={() => setMenuOpen(false)}
        >
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
          {links
            .filter(({ href }) => userName || href === '/')
            .map(({ label, href }) => (
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
          {!userName && (
            <>
              <Link className="nav-link" href="/login" onClick={() => setMenuOpen(false)}>
                Log in
              </Link>
              <Link className="nav-link" href="/signup" onClick={() => setMenuOpen(false)}>
                Sign up
              </Link>
            </>
          )}
          {userName && (
            <form action={logout} className="mobile-logout">
              <button className="nav-link" type="submit">
                Sign out
              </button>
            </form>
          )}
        </nav>

        {userName && (
          <div className="header-actions">
            <span className="header-divider" aria-hidden="true" />
            <button
              className="notification-button"
              type="button"
              aria-label="Notifications (coming soon)"
              disabled
            >
              <BellIcon />
              <span className="notification-dot" aria-hidden="true" />
            </button>
            <span className="user-avatar" aria-label={userName}>
              {getInitials(userName)}
            </span>
            <form action={logout} className="desktop-logout">
              <button className="header-logout" type="submit">
                Sign out
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
