/* Static Gallery section with image placeholder and links (no CMS content) */

export default function Gallery() {
  return (
    <section id="gallery" className="container-base py-12">
      <h2 className="text-2xl font-semibold">Dráček v obrazech</h2>
      <div className="mt-6">
        <div className="relative w-full overflow-hidden rounded-md border border-border bg-surface">
          <div className="aspect-[16/9] w-full">
            <svg viewBox="0 0 1600 900" className="h-full w-full" role="img" aria-label="Galerie SkiDráček">
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0%" stopColor="#e5e7eb" />
                  <stop offset="100%" stopColor="#d1d5db" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="1600" height="900" fill="url(#g)" />
              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="64" fill="#6b7280">
                Galerie SkiDráček
              </text>
            </svg>
          </div>
        </div>
        <p className="mt-4 text-sm text-[color:var(--color-text-muted)]">
          Aktuální fotky najdete na našem Flickr profilu.
        </p>
        <p className="mt-2">
          <a
            className="inline-flex items-center rounded-sm border border-primary px-3 py-1.5 text-sm font-medium text-[color:var(--color-primary)] hover:bg-surface"
            href="https://www.flickr.com/photos/130261563@N08/sets"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fotky na Flickru
          </a>
        </p>
      </div>
    </section>
  );
}


