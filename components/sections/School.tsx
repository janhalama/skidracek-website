/* Renders Ski school section server-side from Supabase */

import { fetchContentBlock } from '@/lib/content-service';

type SchoolData = {
  description: string;
  pricing: { individual: string; group: string };
  instructor: { name: string; phone: string; email: string };
};

export default async function School() {
  const block = await fetchContentBlock('school');
  const data = (block?.data as SchoolData) || null;
  return (
    <section id="school" className="container-base py-12">
      <h2 className="text-2xl font-semibold">Lyžařská škola</h2>
      {data?.description ? (
        <div className="mt-4 rounded-sm border border-border bg-surface p-4 shadow-sm">
          <p className="whitespace-pre-wrap leading-relaxed">{data.description}</p>
        </div>
      ) : null}
      {data ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-sm border border-border bg-surface p-4 shadow-sm">
            <h3 className="font-medium">Ceny</h3>
            <p className="text-sm">Individuální: {data.pricing.individual}</p>
            <p className="text-sm">Skupinová: {data.pricing.group}</p>
          </div>
          <div className="rounded-sm border border-border bg-surface p-4 shadow-sm">
            <h3 className="font-medium">Instruktor</h3>
            <p className="text-sm">{data.instructor.name}</p>
            <p className="text-sm">{data.instructor.phone}</p>
            <p className="text-sm">
              <a className="underline" href={`mailto:${data.instructor.email}`}>{data.instructor.email}</a>
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}


