/* Server component that renders the logged-in admin identity in the top nav */

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export default async function NavUser() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) return null;

  const label = user.name || user.email || 'Admin';
  return (
    <div className="inline-flex items-center gap-2 rounded-sm bg-white/15 px-2 py-1 text-xs text-primary-foreground">
      <span className="truncate max-w-[200px]" title={label}>{label}</span>
      <form action="/api/auth/signout" method="post">
        <button
          type="submit"
          className="inline-flex items-center rounded-sm border border-primary-foreground/30 px-2 py-0.5 hover:bg-white/20"
          title="Odhlásit"
        >
          <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 4a2 2 0 012-2h5a2 2 0 012 2v2a1 1 0 11-2 0V4H5v12h5v-2a1 1 0 112 0v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4z" />
            <path d="M13.293 7.293a1 1 0 011.414 0L18 10.586l-3.293 3.293a1 1 0 01-1.414-1.414L14.586 11H9a1 1 0 110-2h5.586l-1.293-1.293a1 1 0 010-1.414z" />
          </svg>
        </button>
      </form>
    </div>
  );
}


