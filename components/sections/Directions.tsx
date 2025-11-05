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
                      className="rounded-sm bg-primary px-3 py-1 text-sm font-medium text-primary-foreground"
                    >
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
                    className="inline-flex items-center rounded-sm border border-primary px-3 py-1.5 text-sm font-medium text-[color:var(--color-primary)] hover:bg-surface"
                    href={data.mapyCzUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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


