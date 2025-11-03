/* Renders Ski school section server-side from Supabase */

import { fetchContentBlock } from '@/lib/content-service';
import Image from 'next/image';

type SchoolData = {
  subtitle?: string;
  description: string;
  pricing: { individual: string; group: string };
  instructor: { name: string; phone: string; email: string };
  licenseImageUrl?: string;
};

export default async function School() {
  const block = await fetchContentBlock('school');
  const data = (block?.data as SchoolData) || null;
  const paras = (data?.description || '')
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(Boolean);
  const derivedSubtitle = (data?.subtitle?.trim() || paras[0] || '').trim();
  const bodyParas = data?.subtitle ? paras.filter(p => p !== derivedSubtitle) : paras.slice(1);
  return (
    <section id="school" className="">
      <div className="bg-[#e4f5fc] py-4">
        <div className="container-base">
          <h2 className="text-2xl font-semibold text-center text-primary">Lyžařská škola</h2>
          {derivedSubtitle ? (
            <p className="mt-1 text-center text-primary">{derivedSubtitle}</p>
          ) : null}
        </div>
      </div>
      <div className="container-base py-8 bg-white text-base">
        {data ? (
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-start md:row-span-3">
              <Image
                src={data.licenseImageUrl || '/images/original/new-license.jpg'}
                alt="Licence instruktora"
                width={800}
                height={560}
                className="w-full h-auto"
                priority={false}
              />
            </div>
            <div>
              <div className="space-y-3">
                {bodyParas.map((para, i) => (
                  <p key={i} className="whitespace-pre-wrap leading-relaxed text-(--color-text)">{para}</p>
                ))}
                <h3 className="font-medium text-primary">Pro koho je škola určena?</h3>
                <p className="leading-relaxed text-(--color-text)">Pro děti a lyžaře začátečníky.</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-primary">Výuka lyžování</h3>
              <p className="leading-relaxed text-(--color-text)">Výuka lyžování je možná po předchozí telefonické nebo e-mailové domluvě s instruktorem.</p>
            </div>
            <div>
              <h3 className="font-medium text-primary">Sjezdovka je vybavena potřebnými pomůckami pro výuku lyžování</h3>
              <p className="leading-relaxed text-(--color-text)">Průjezdné branky, dětský slalom apod.</p>
            </div>
            <div>
              <h3 className="font-medium text-primary">Ceník lyžařské školy</h3>
              <p>individuální výuka (pouze 1 osoba): {data.pricing.individual || '500 Kč/osoba/50min'}</p>
              <p>skupinová výuka (2 a více osob): {data.pricing.group || '300 Kč/osoba/hodina'}</p>
            </div>
            <div>
              <h3 className="font-medium text-primary">Instruktor</h3>
              <p>{data.instructor.name || 'Marek Matouš'}</p>
              <p>Tel.: {data.instructor.phone || '721 638 175'}</p>
              <p>E-mail: <a className="underline" href={`mailto:${data.instructor.email || 'skola@skidracek.cz'}`}>{data.instructor.email || 'skola@skidracek.cz'}</a></p>
            </div>
            <div>
              <h3 className="font-medium text-primary">Objednávka</h3>
              <p>Výuka je možná po předchozí tel./e‑mail domluvě s instruktorem.</p>
            </div>
          </div>
        ) : null}

      </div>
    </section>
  );
}


