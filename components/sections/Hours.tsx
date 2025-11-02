/* Renders Hours section content server-side from Supabase */

import { fetchContentBlock } from '@/lib/content-service';

type HoursData = { text: string };

export default async function Hours() {
  const block = await fetchContentBlock('hours');
  const data = (block?.data as HoursData) || null;
  return (
    <section id="hours" className="container-base py-12">
      <h2 className="text-2xl font-semibold">Provozní doba</h2>
      {data?.text ? <p className="mt-3 whitespace-pre-wrap">{data.text}</p> : null}
    </section>
  );
}


