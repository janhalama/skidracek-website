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
    <section id="directions" className="container-base py-12">
      <h2 className="text-2xl font-semibold">Jak k nám</h2>
      {data ? (
        <div className="mt-3 space-y-3">
          <p className="whitespace-pre-wrap">{data.car}</p>
          <p className="text-sm">GPS: {data.gps}</p>
          <p className="text-sm">
            <a className="underline" href={data.mapyCzUrl} target="_blank" rel="noopener noreferrer">Mapa</a>
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
    </section>
  );
}


