/* Static Gallery section with image placeholder and links (no CMS content) */

export default function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-20">
      <div className="bg-[#e4f5fc] py-4">
        <div className="container-base">
          <h2 className="text-2xl font-semibold text-center text-primary">Dráček v obrazech</h2>
        </div>
      </div>
      <div className="container-base py-8 bg-white">
        <p className="text-sm text-(--color-text)">Aktuální fotky najdete na našem Flickr profilu.</p>
        <p className="mt-2">
          <a
            className="inline-flex items-center rounded-sm border border-primary px-3 py-1.5 text-sm font-medium text-primary hover:bg-surface"
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


