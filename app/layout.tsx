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
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: {
    default: 'DataPulse | Business Analytics',
    template: '%s | DataPulse',
  },
  description:
    'Track sales, manage expenses, and monitor your business performance with DataPulse.',
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const session = await auth();
  const userName = session?.user ? session.user.name?.trim() || session.user.email || 'User' : null;
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header userName={userName} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
