"use client";

/* Client shell for TopNav; accepts an optional rightSlot for server-rendered content */

import { useState } from 'react';
import Link from 'next/link';

export default function TopNavClient({ rightSlot, webcamUrl }: { rightSlot?: React.ReactNode; webcamUrl?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() { setIsOpen(prev => !prev); }

  function handleNavClick(e: React.MouseEvent, href: string) {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    const el = document.querySelector(href) as HTMLElement | null;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', href);
    }
    setIsOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 h-14 border-b border-primary bg-primary shadow-sm">
      <div className="container-base relative flex h-full items-center justify-center py-0">
        <button
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={toggleMenu}
          className="absolute right-0 inline-flex h-10 w-10 items-center justify-center rounded-sm border border-primary-foreground/40 text-primary-foreground hover:opacity-90 sm:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
        <div className="absolute right-0 hidden sm:block">{rightSlot}</div>
        <nav className="hidden gap-3 md:gap-4 text-base sm:flex">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="text-primary-foreground no-underline hover:no-underline hover:bg-danger rounded-[3px] px-4 py-1.5 leading-none"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
      {isOpen && (
        <div className="sm:hidden border-t border-primary bg-primary">
          <nav className="container-base py-2 grid grid-cols-1 gap-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="py-2 text-primary-foreground no-underline hover:no-underline hover:opacity-90"
              >
                {label}
              </Link>
            ))}
            {webcamUrl ? (
              <div className="mt-1 border-t border-primary-foreground/30 pt-2">
                <a
                  href={webcamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 text-primary-foreground no-underline hover:no-underline inline-flex items-center gap-2"
                  title="Otevře se v novém okně"
                >
                  <svg aria-hidden className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 7h-2a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V9.414l-5.293 5.293a1 1 0 01-1.414-1.414L13 7z" />
                    <path d="M5 4a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V6h3a1 1 0 100-2H5z" />
                  </svg>
                  Webkamera online
                </a>
              </div>
            ) : null}
          </nav>
        </div>
      )}
    </header>
  );
}

const links = [
  { href: '#news', label: 'Aktuální akce' },
  { href: '#params', label: 'Parametry vleku' },
  { href: '#school', label: 'Lyžařská škola' },
  { href: '#pricing', label: 'Ceník' },
  { href: '#directions', label: 'Kudy k Dráčkovi?' },
  { href: '#contacts', label: 'Kontakty' },
  { href: '#gallery', label: 'Dráček v obrazech' },
];


