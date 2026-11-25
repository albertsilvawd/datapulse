import type { ReactNode } from 'react';
import { auth } from '@/auth';
import { logout } from '@/lib/actions/auth';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  const displayName = session?.user?.name ?? session?.user?.email ?? 'User';

  return (
    <div className="dashboard-shell">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-end gap-4 px-4 pt-4 text-sm text-slate-700">
        <span>
          Signed in as <strong>{displayName}</strong>
        </span>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-medium text-slate-800 hover:bg-slate-100"
          >
            Log out
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}
