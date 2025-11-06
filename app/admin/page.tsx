/**
 * Admin page skeleton. Server-rendered with Node runtime and dynamic mode.
 * When Auth is wired, this performs a server-side allowlist check.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { getCurrentUserEmail, isEmailAllowed } from '@/lib/auth';
import { redirect } from 'next/navigation';
import EditorClient from './EditorClient';

export default async function AdminPage() {
  let isAllowed = false;
  let email: string | null = null;
  try {
    email = await getCurrentUserEmail();
    isAllowed = await isEmailAllowed(email);
  } catch {
    isAllowed = false;
  }

  if (!isAllowed) redirect('/auth/signin?callbackUrl=%2Fadmin');

  return (
    <main className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-4">Administrace</h1>
      <div className="rounded-md border border-border bg-surface p-6">
        <p className="mb-2">Vítejte{email ? `, ${email}` : ''}.</p>
        <p className="text-sm text-gray-600">Ovládací prvky pro úpravy budou doplněny.</p>
        <EditorClient />
        <form action="/api/auth/signout" method="post" className="mt-6">
          <button type="submit" className="underline">Odhlásit se</button>
        </form>
      </div>
    </main>
  );
}


