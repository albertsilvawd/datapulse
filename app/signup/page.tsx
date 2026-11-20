import type { Metadata } from 'next';
import SignupForm from '../components/SignupForm';

export const metadata: Metadata = { title: 'Sign up' };

export default function SignupPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-slate-900">Create your account</h1>
      <p className="mb-6 text-slate-600">Start tracking your business numbers with DataPulse.</p>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <SignupForm />
      </div>
    </main>
  );
}
