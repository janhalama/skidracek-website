/* Custom sign-in page explaining admin access and linking directly to Google sign-in */

import Link from 'next/link';

export default function SignInPage({ searchParams }: { searchParams: { callbackUrl?: string } }) {
  const callbackUrl = encodeURIComponent(searchParams?.callbackUrl || '/admin');
  return (
    <main className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-2">Přihlášení</h1>
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


