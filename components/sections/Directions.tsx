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
      <div className="container-base py-8 bg-white">
        {data ? (
          <div className="space-y-3">
            <p className="whitespace-pre-wrap leading-relaxed">{data.car}</p>
            <p className="text-sm">GPS: {data.gps}</p>
            <p className="text-sm">
              <a
                className="inline-flex items-center rounded-sm border border-primary px-3 py-1.5 text-sm font-medium text-[color:var(--color-primary)] hover:bg-surface"
                href={data.mapyCzUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Trasa na Mapy.cz
              </a>
            </p>
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
        ) : null}
      </div>
    </section>
  );
}


