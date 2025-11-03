/* Renders Hours section content server-side from Supabase */

import { fetchContentBlock } from '@/lib/content-service';

type HoursData = { text: string };

export default async function Hours() {
  const block = await fetchContentBlock('hours');
  const data = (block?.data as HoursData) || null;
  return (
    <section id="hours" className="container-base py-12">
      <h2 className="text-2xl font-semibold">Provozní doba</h2>
      {data?.text ? (
        <div className="mt-4 rounded-sm border border-border bg-surface p-4 shadow-sm">
          <p className="whitespace-pre-wrap leading-relaxed">{data.text}</p>
        </div>
      ) : null}
    </section>
  );
}


