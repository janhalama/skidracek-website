/* Renders Pricing section server-side from Supabase */

import { fetchContentBlock } from '@/lib/content-service';

type PricingRow = { duration: string; adults: string; kids: string };
type PricingData = { rows: PricingRow[] };

export default async function Pricing() {
  const block = await fetchContentBlock('pricing');
  const data = (block?.data as PricingData) || null;
  return (
    <section id="pricing" className="container-base py-12">
      <h2 className="text-2xl font-semibold">Ceník</h2>
      {data?.rows?.length ? (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-[520px] w-full text-sm">
            <thead>
              <tr className="text-left border-b border-border">
                <th className="py-2 pr-3">Doba</th>
                <th className="py-2 pr-3">Dospělí</th>
                <th className="py-2 pr-3">Děti</th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row, idx) => (
                <tr key={idx} className="border-b border-border">
                  <td className="py-2 pr-3">{row.duration}</td>
                  <td className="py-2 pr-3">{row.adults}</td>
                  <td className="py-2 pr-3">{row.kids}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}


