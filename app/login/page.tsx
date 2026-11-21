import type { Metadata } from 'next';
import LoginForm from '../components/LoginForm';

export const metadata: Metadata = { title: 'Log in' };

export default function LoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-slate-900">Log in to DataPulse</h1>
      <p className="mb-6 text-slate-600">Track your business KPIs in one place.</p>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <LoginForm />
      </div>
    </main>
  );
}
