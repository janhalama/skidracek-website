/* Renders Lift parameters from Supabase */

import { fetchContentBlock } from '@/lib/content-service';
import Image from 'next/image';

type ParamsData = {
  subtitle?: string;
  items: { header: string; value: string; unit: string }[];
};

export default async function Params() {
  const block = await fetchContentBlock('params');
  const data = (block?.data as ParamsData) || null;
  return (
    <section id="params" className="scroll-mt-20">
      <div className="bg-[#e4f5fc] py-4">
        <div className="container-base">
          <h2 className="text-2xl font-semibold text-center text-primary">Parametry vleku</h2>
          {data?.subtitle ? (
            <p className="mt-1 text-center text-primary">{data.subtitle}</p>
          ) : null}
        </div>
      </div>
      <div className="container-base py-8 bg-white">
        <div className="mx-auto w-full max-w-[900px]">
          {data?.items?.length ? (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-2 md:grid-cols-3 lg:grid-cols-5">
              {data.items.map((p, idx) => (
                <div key={idx} className="text-center p-0">
                  <div className="text-xs uppercase tracking-wide text-primary">{p.header}</div>
                  <div className="mt-0.5 text-3xl font-semibold text-(--color-text)">{p.value}</div>
                  <div className="text-[10px] uppercase tracking-wider text-(--color-text-muted)">{p.unit}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      {/* Image below parameters, as on the original site */}
      <div className="w-full bg-white">
        <div className="container-base py-4">
          <div
            className="w-full h-64 rounded-sm border border-border shadow-sm bg-white bg-no-repeat bg-bottom"
            style={{ backgroundImage: 'url(/images/original/maskarak.jpg)' }}
            aria-label="Schématická mapka vleku"
            role="img"
          />
        </div>
      </div>
      {/* Parameters footer gradient strip (visual separator like original) */}
      <div className="w-full">
        <div className="h-3 bg-gradient-to-b from-white to-[#e4f5fc]" />
      </div>
    </section>
  );
}


