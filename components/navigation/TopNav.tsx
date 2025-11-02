"use client";

/*
  Responsive top navigation with hamburger toggle.
  Minimal shell to be refined later; uses semantic links to page section anchors.
*/

import { useState } from 'react';
import Link from 'next/link';

export default function TopNav() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(prev => !prev);
  }

  return (
    <header className="border-b border-border bg-surface/60 backdrop-blur supports-[backdrop-filter]:bg-surface/60">
      <div className="container-base flex items-center justify-between py-3">
        <Link href="#hero" className="text-lg font-semibold text-[color:var(--color-text)]">
          SkiDráček
        </Link>
        <button
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={toggleMenu}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-[color:var(--color-text)] sm:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
        <nav className="hidden gap-6 text-sm sm:flex">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:underline">
              {label}
            </Link>
          ))}
        </nav>
      </div>
      {isOpen && (
        <div className="sm:hidden border-t border-border">
          <nav className="container-base py-2 grid grid-cols-2 gap-2">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} className="py-2">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

const links = [
  { href: '#news', label: 'Novinky' },
  { href: '#hours', label: 'Provozní doba' },
  { href: '#params', label: 'Parametry' },
  { href: '#school', label: 'Lyžařská škola' },
  { href: '#pricing', label: 'Ceník' },
  { href: '#directions', label: 'Jak k nám' },
  { href: '#contacts', label: 'Kontakty' },
  { href: '#gallery', label: 'Galerie' },
];


