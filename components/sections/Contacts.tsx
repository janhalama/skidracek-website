/* Renders Contacts section server-side from Supabase */

import { fetchContentBlock } from '@/lib/content-service';

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
          <div className="grid gap-4 md:grid-cols-2 max-w-[720px] mx-auto md:translate-x-4">
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
              <a
                className="inline-flex items-center rounded-sm border border-primary px-3 py-1.5 text-sm font-medium text-primary hover:bg-surface"
                href={data.wufooUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg aria-hidden="true" className="mr-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.94 6.34A2 2 0 014.33 6h11.34a2 2 0 011.39.34l-7.06 5.3a1 1 0 01-1.2 0L2.94 6.34z" />
                  <path d="M18 8.12V14a2 2 0 01-2 2H4a2 2 0 01-2-2V8.12l6.47 4.86a3 3 0 003.06 0L18 8.12z" />
                </svg>
                Napište nám (formulář)
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}


