/* Renders Pricing section server-side from Supabase; responsive table */

import { fetchContentBlock } from '@/lib/content-service';

type PricingRow = { duration: string; adults: string; kids: string };
type PricingData = { rows: PricingRow[] };

export default async function Pricing() {
  const block = await fetchContentBlock('pricing');
  const data = (block?.data as PricingData) || null;
  return (
    <section id="pricing" className="container-base py-12 scroll-mt-20">
      <h2 className="text-2xl font-semibold">Ceník</h2>
      {data?.rows?.length ? (
        <>
          {/* Mobile: stacked cards */}
          <div className="mt-4 grid gap-3 sm:hidden">
            {data.rows.map((row, idx) => (
              <div key={idx} className="rounded-sm border border-border bg-surface p-4 shadow-sm">
                <div className="text-sm text-(--color-text-muted)">{row.duration}</div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm">Dospělí</span>
                  <span className="font-medium">{row.adults}</span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm">Děti</span>
                  <span className="font-medium">{row.kids}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Tablet/Desktop: table with horizontal scroll safeguard */}
          <div className="mt-4 overflow-x-auto hidden sm:block">
            <table className="min-w-[520px] w-full text-sm">
              <thead>
                <tr className="text-left border-b border-border bg-surface/60">
                  <th className="py-2 pr-3 font-medium text-(--color-text)">Doba</th>
                  <th className="py-2 pr-3 font-medium text-(--color-text)">Dospělí</th>
                  <th className="py-2 pr-3 font-medium text-(--color-text)">Děti</th>
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row, idx) => (
                  <tr key={idx} className={"border-b border-border " + (idx % 2 === 1 ? 'bg-surface/40' : '')}>
                    <td className="py-2 pr-3">{row.duration}</td>
                    <td className="py-2 pr-3">{row.adults}</td>
                    <td className="py-2 pr-3">{row.kids}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </section>
  );
}


