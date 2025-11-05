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
              href="https://twitter.com/skidracek"
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter"
              aria-label="Twitter"
            >
              <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="2" ry="2" fill="none" stroke="currentColor" />
                <path d="M22 7.5c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.2-.8.5-1.7.8-2.6 1-1.6-1.7-4.5-.7-4.5 1.8 0 .3 0 .5.1.8-3.7-.2-7-2-9.2-4.9-.4.7-.6 1.4-.6 2.2 0 1.5.8 2.8 2 3.6-.6 0-1.2-.2-1.7-.5 0 2.1 1.5 3.8 3.5 4.2-.4.1-.8.1-1.2.1-.3 0-.6 0-.9-.1.6 1.8 2.3 3.1 4.3 3.2-1.6 1.3-3.6 2.1-5.8 2.1H4c2.1 1.3 4.6 2.1 7.2 2.1 8.6 0 13.3-7.2 13.3-13.3v-.6c.9-.7 1.6-1.4 2.2-2.3z" fill="currentColor" />
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
          Powered by <a className="underline" href="http://marekbrumlich.cz" target="_blank" rel="noopener noreferrer">Marek Brumlich</a>,&nbsp;
          <a className="underline" href="http://janhalama.cz" target="_blank" rel="noopener noreferrer">Jan Halama</a>
        </div>
      </div>
    </footer>
  );
}


