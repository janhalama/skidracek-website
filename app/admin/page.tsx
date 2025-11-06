/**
 * Admin page skeleton. Server-rendered with Node runtime and dynamic mode.
 * When Auth is wired, this performs a server-side allowlist check.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { getCurrentUserEmail, isEmailAllowed } from '@/lib/auth';
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

  if (!isAllowed) {
    return (
      <main className="container mx-auto px-6 py-16">
        <h1 className="text-3xl font-semibold mb-4">Administrace</h1>
        <div className="rounded-md border border-border bg-surface p-6">
          <p className="mb-2">Přístup odepřen.</p>
          <p className="text-sm text-gray-600">
            Tato stránka vyžaduje přihlášení Google a povolení v seznamu správců.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="/" className="underline text-primary">Zpět na hlavní stránku</a>
            <a href="/api/auth/signin?provider=google&callbackUrl=%2Fadmin" className="underline">Přihlásit se Google</a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-4">Administrace</h1>
      <div className="rounded-md border border-border bg-surface p-6">
        <p className="mb-2">Vítejte{email ? `, ${email}` : ''}.</p>
        <EditorClient />
        <form action="/api/auth/signout" method="post" className="mt-6">
          <button type="submit" className="underline">Odhlásit se</button>
        </form>
      </div>
    </main>
  );
}


