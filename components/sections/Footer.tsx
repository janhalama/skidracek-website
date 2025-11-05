/* Footer with copyright and social links */

export default function Footer() {
  return (
    <footer id="footer" className="mt-12 border-t border-border bg-surface/70">
      <div className="container-base py-6 text-sm text-[color:var(--color-text-muted)]">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div>© {new Date().getFullYear()} SkiDráček</div>
          <div className="flex items-center gap-3">
            <a
              className="inline-flex items-center rounded-sm border border-transparent px-2 py-1 hover:bg-white/40"
              href="https://www.facebook.com/SkiDracek/timeline"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              aria-label="Facebook"
            >
              <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="2" ry="2" fill="none" stroke="currentColor" />
                <path d="M14 8h2V5h-2c-2.21 0-4 1.79-4 4v2H8v3h2v5h3v-5h2.1l.4-3H13V9c0-.55.45-1 1-1z" fill="currentColor" />
              </svg>
            </a>
            <a
              className="inline-flex items-center rounded-sm border border-transparent px-2 py-1 hover:bg-white/40"
              href="https://x.com/skidracek"
              target="_blank"
              rel="noopener noreferrer"
              title="X (dříve Twitter)"
              aria-label="X"
            >
              <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="2" ry="2" fill="none" stroke="currentColor" />
                <path d="M6 4h3l3 4 3-4h3l-4.5 6L18 20h-3l-3-4-3 4H6l4.5-6L6 4z" fill="currentColor" />
              </svg>
            </a>
            <a
              className="inline-flex items-center rounded-sm border border-transparent px-2 py-1 hover:bg-white/40"
              href="https://www.flickr.com/photos/130261563@N08/sets"
              target="_blank"
              rel="noopener noreferrer"
              title="Flickr"
              aria-label="Flickr"
            >
              <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="2" ry="2" fill="none" stroke="currentColor" />
                <circle cx="10" cy="12" r="2.5" fill="currentColor" />
                <circle cx="14" cy="12" r="2.5" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
        <div className="mt-2 text-center text-xs">
          Powered by <a href="http://marekbrumlich.cz" target="_blank" rel="noopener noreferrer">Marek Brumlich</a>,&nbsp;
          <a href="http://janhalama.cz" target="_blank" rel="noopener noreferrer">Jan Halama</a>
        </div>
      </div>
    </footer>
  );
}


