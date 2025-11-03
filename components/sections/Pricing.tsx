/* Renders Pricing section server-side from Supabase; responsive table */

import { fetchContentBlock } from '@/lib/content-service';

type PricingRow = { duration: string; adults: string; kids: string };
type PricingData = { rows: PricingRow[] };

export default async function Pricing() {
  const block = await fetchContentBlock('pricing');
  const data = (block?.data as PricingData) || null;
  return (
    <section id="pricing" className="scroll-mt-20">
      <div className="bg-[#e4f5fc] py-4">
        <div className="container-base">
          <h2 className="text-2xl font-semibold text-center text-primary">Ceník</h2>
        </div>
      </div>
      <div className="container-base py-8 bg-white">
        {data?.rows?.length ? (
          <>
          {/* Mobile: stacked cards */}
          <div className="mt-4 grid gap-3 sm:hidden">
            {data.rows.map((row, idx) => (
              <div key={idx} className="rounded-sm bg-white p-4">
                <div className="text-sm text-primary font-medium">{row.duration}</div>
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
            <table className="w-full max-w-[600px] mx-auto table-fixed text-sm border-collapse">
              <colgroup>
                <col className="w-1/3" />
                <col className="w-1/3" />
                <col className="w-1/3" />
              </colgroup>
              <thead>
                <tr className="bg-white">
                  <th className="py-2 pr-3 font-semibold text-primary text-left text-base sm:text-lg">Doba</th>
                  <th className="py-2 pr-3 font-semibold text-primary text-center text-base sm:text-lg">Dospělí</th>
                  <th className="py-2 pr-3 font-semibold text-primary text-right text-base sm:text-lg">Děti</th>
                </tr>
                <tr>
                  <th colSpan={3} className="p-0">
                    <div className="h-px w-full bg-border" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-2 pr-3 text-left">{row.duration}</td>
                    <td className="py-2 pr-3 text-center">{row.adults}</td>
                    <td className="py-2 pr-3 text-right">{row.kids}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </>
        ) : null}
      </div>
    </section>
  );
}


