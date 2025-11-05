/* Renders Directions section server-side from Supabase */

import { fetchContentBlock } from '@/lib/content-service';

type DirectionsData = {
  car: string;
  gps: string;
  mapyCzUrl: string;
  buses: { label: string; url: string }[];
};

export default async function Directions() {
  const block = await fetchContentBlock('directions');
  const data = (block?.data as DirectionsData) || null;
  return (
    <section id="directions" className="scroll-mt-20">
      <div className="bg-[#e4f5fc] py-4">
        <div className="container-base">
          <h2 className="text-2xl font-semibold text-center text-primary">Kudy k Dráčkovi?</h2>
        </div>
      </div>
      {data ? (
        <>
          {/* Full-width map stripe with disabled mouse interactions and clickable overlay controls */}
          {(() => {
            const [latStr, lonStr] = (data.gps || '').split(',').map((s) => s.trim());
            const lat = encodeURIComponent(latStr || '50.674628481017855');
            const lon = encodeURIComponent(lonStr || '15.235615571634401');
            const embedSrc = `https://www.google.com/maps?q=${lat},${lon}&hl=cs&z=13&output=embed`;
            const openGoogleUrl = `https://www.google.com/maps?q=${lat},${lon}&hl=cs&z=13`;
            return (
              <div className="w-full bg-white">
                <div className="relative h-80">
                  <iframe
                    title="Mapa k Dráčkovi"
                    src={embedSrc}
                    className="absolute inset-0 h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute right-4 top-4 z-10 flex gap-2">
                    <a
                      href={openGoogleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-sm bg-primary px-3 py-1 text-sm font-medium text-primary-foreground"
                    >
                      <svg aria-hidden="true" className="mr-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13 7h-2a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V9.414l-5.293 5.293a1 1 0 01-1.414-1.414L13 7z" />
                        <path d="M5 4a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V6h3a1 1 0 100-2H5z" />
                      </svg>
                      Otevřít mapu
                    </a>
                  </div>
                </div>
              </div>
            );
          })()}
          <div className="container-base py-8 bg-white">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-primary">Autem</h3>
                {data.car ? <p className="text-sm">{data.car}</p> : null}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-primary">GPS a trasa</h3>
                <div className="space-y-1">
                  <p className="text-sm">GPS souřadnice pro navigaci jsou:</p>
                  <p className="text-sm">{data.gps}</p>
                </div>
                <p>
                  <a
                    className="inline-flex items-center rounded-sm border border-primary px-3 py-1.5 text-sm font-medium text-primary hover:bg-surface"
                    href={data.mapyCzUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg aria-hidden="true" className="mr-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.176 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81H6.93a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                    Naplánovat trasu (mapy.cz)
                  </a>
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-primary">Linkovým autobusem</h3>
                {data.buses?.length ? (
                  <ul className="list-disc pl-5 text-sm">
                    {data.buses.map((b, i) => (
                      <li key={i}>
                        <a className="underline" href={b.url} target="_blank" rel="noopener noreferrer">{b.label}</a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}


