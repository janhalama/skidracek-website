/* Static Gallery section with representative image and Flickr link */
import Image from 'next/image';

export default function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-20">
      <div className="bg-[#e4f5fc] py-4">
        <div className="container-base">
          <h2 className="text-2xl font-semibold text-center text-primary">Dráček v obrazech</h2>
        </div>
      </div>
      {/* Full-bleed image aligned with header edges */}
      <div className="w-full bg-white">
        <Image
          src="/images/original/gallery.jpg"
          alt="Dráček v obrazech"
          width={1920}
          height={1080}
          className="block w-full h-auto"
          sizes="100vw"
          priority={false}
        />
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
            <svg aria-hidden="true" className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <circle cx="9" cy="12" r="4" fill="#0063dc" />
              <circle cx="15" cy="12" r="4" fill="#ff0084" />
            </svg>
            Fotky na Flickru
          </a>
        </p>
      </div>
    </section>
  );
}


