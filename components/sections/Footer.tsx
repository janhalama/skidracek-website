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
              href="https://www.flickr.com/photos/130261563@N08/sets"
              target="_blank"
              rel="noopener noreferrer"
              title="Flickr"
              aria-label="Flickr"
            >
              <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
                <circle cx="9" cy="12" r="4" fill="#0063dc" />
                <circle cx="15" cy="12" r="4" fill="#ff0084" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


