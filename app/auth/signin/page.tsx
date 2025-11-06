/* Custom sign-in page: by default immediately redirects to Google; add ?show=1 to display info */

import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function SignInPage({ searchParams }: { searchParams: { callbackUrl?: string; show?: string; error?: string } }) {
  const callbackUrl = encodeURIComponent(searchParams?.callbackUrl || '/admin');
  if (!searchParams?.show && !searchParams?.error) {
    redirect(`/api/auth/signin/google?callbackUrl=${callbackUrl}`);
  }
  return (
    <main className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-2">Přihlášení</h1>
      {searchParams?.error ? (
        <div className="mb-3 rounded-sm border border-danger/40 bg-danger/10 p-3 text-sm text-(--color-text)">
          Přístup odepřen. Váš účet není v seznamu správců nebo došlo k chybě přihlášení.
        </div>
      ) : null}
      <p className="text-sm text-(--color-text)">Pro vstup do administrace je vyžadováno přihlášení pomocí Google účtu a povolení v seznamu správců.</p>
      <div className="mt-6">
        <Link
          href={`/api/auth/signin/google?callbackUrl=${callbackUrl}`}
          className="inline-flex items-center rounded-sm bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
        >
          Pokračovat přes Google
        </Link>
      </div>
      <div className="mt-4">
        <Link href="/" className="underline text-primary">Zpět na hlavní stránku</Link>
      </div>
    </main>
  );
}


