import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

import Header from './components/Header';
import Footer from './components/Footer';

// Vercel sets VERCEL_PROJECT_PRODUCTION_URL automatically; localhost is the fallback for development
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'DataPulse | Business Analytics',
    template: '%s | DataPulse',
  },
  description:
    'Track sales, manage expenses, and monitor your business performance with DataPulse.',
  openGraph: {
    title: 'DataPulse | Business Analytics',
    description: 'A simple KPI dashboard for small businesses: track sales, expenses, and profit.',
    siteName: 'DataPulse',
    type: 'website',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
