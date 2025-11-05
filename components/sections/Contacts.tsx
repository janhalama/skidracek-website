/* Renders Contacts section server-side from Supabase */

import { fetchContentBlock } from '@/lib/content-service';
import WufooModalButton from '@/components/contacts/WufooModalButton';

type ContactsData = {
  manager: { name: string; phone: string; email: string };
  operator: { name: string; address: string; ico: string; web: string };
  wufooUrl: string;
};

export default async function Contacts() {
  const block = await fetchContentBlock('contacts');
  const data = (block?.data as ContactsData) || null;
  return (
    <section id="contacts" className="scroll-mt-20">
      <div className="bg-[#e4f5fc] py-4">
        <div className="container-base">
          <h2 className="text-2xl font-semibold text-center text-primary">Kontakty</h2>
        </div>
      </div>
      <div className="container-base py-8 bg-white text-base">
        {data ? (
          <div className="grid gap-4 md:grid-cols-2 max-w-[720px] mx-auto md:translate-x-6">
            <div>
              <h3 className="font-medium text-primary text-lg sm:text-xl">Správce</h3>
              <p className="leading-relaxed text-(--color-text)">{data.manager.name}</p>
              <p className="leading-relaxed text-(--color-text)">{data.manager.phone}</p>
              <p className="leading-relaxed text-(--color-text)">
                <a className="underline" href={`mailto:${data.manager.email}`}>{data.manager.email}</a>
              </p>
            </div>
            <div>
              <h3 className="font-medium text-primary text-lg sm:text-xl">Provozovatel</h3>
              <p className="leading-relaxed text-(--color-text)">{data.operator.name}</p>
              <p className="leading-relaxed text-(--color-text) whitespace-pre-wrap">{data.operator.address}</p>
              <p className="leading-relaxed text-(--color-text)">IČO: {data.operator.ico}</p>
              <p className="leading-relaxed text-(--color-text)">
                <a className="underline" href={data.operator.web} target="_blank" rel="noopener noreferrer">{data.operator.web}</a>
              </p>
            </div>
            <div className="md:col-span-2">
              <WufooModalButton url={data.wufooUrl} label="Napište nám (formulář)" />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}


