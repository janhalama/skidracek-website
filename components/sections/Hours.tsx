/* Renders Hours section content server-side from Supabase */

import { fetchContentBlock } from '@/lib/content-service';

type HoursData = { text: string };

export default async function Hours() {
  const block = await fetchContentBlock('hours');
  const data = (block?.data as HoursData) || null;
  return (
    <section id="hours" className="scroll-mt-20">
      <div className="bg-[#e4f5fc] py-4">
        <div className="container-base">
          <h2 className="text-2xl font-semibold text-center text-primary">Provozní doba</h2>
        </div>
      </div>
      <div className="container-base py-8 bg-white">
        {data?.text ? (
          <p className="whitespace-pre-wrap leading-relaxed text-center text-primary">{data.text}</p>
        ) : null}
      </div>
    </section>
  );
}


