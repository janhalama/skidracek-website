/* Renders Lift parameters from Supabase */

import { fetchContentBlock } from '@/lib/content-service';

type ParamsData = {
  subtitle?: string;
  items: { header: string; value: string; unit: string }[];
};

export default async function Params() {
  const block = await fetchContentBlock('params');
  const data = (block?.data as ParamsData) || null;
  return (
    <section id="params" className="container-base py-12">
      <h2 className="text-2xl font-semibold">Parametry vleku</h2>
      {data?.subtitle ? <h3 className="mt-2 text-[color:var(--color-text-muted)]">{data.subtitle}</h3> : null}
      {data?.items?.length ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {data.items.map((p, idx) => (
            <div key={idx} className="rounded-md border border-border bg-surface p-4 text-center">
              <div className="text-sm text-[color:var(--color-text-muted)]">{p.header}</div>
              <div className="text-3xl font-semibold">{p.value}</div>
              <div className="text-xs uppercase tracking-wide text-[color:var(--color-text-muted)]">{p.unit}</div>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}


