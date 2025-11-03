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
    <section id="contacts" className="container-base py-12">
      <h2 className="text-2xl font-semibold">Kontakty</h2>
      {data ? (
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div className="rounded-sm border border-border bg-surface p-4 shadow-sm">
            <h3 className="font-medium">Správce</h3>
            <p className="text-sm">{data.manager.name}</p>
            <p className="text-sm">{data.manager.phone}</p>
            <p className="text-sm">
              <a className="underline" href={`mailto:${data.manager.email}`}>{data.manager.email}</a>
            </p>
          </div>
          <div className="rounded-sm border border-border bg-surface p-4 shadow-sm">
            <h3 className="font-medium">Provozovatel</h3>
            <p className="text-sm">{data.operator.name}</p>
            <p className="text-sm whitespace-pre-wrap">{data.operator.address}</p>
            <p className="text-sm">IČO: {data.operator.ico}</p>
            <p className="text-sm">
              <a className="underline" href={data.operator.web} target="_blank" rel="noopener noreferrer">{data.operator.web}</a>
            </p>
          </div>
          <div className="md:col-span-2">
            <a
              className="inline-flex items-center rounded-sm border border-primary px-3 py-1.5 text-sm font-medium text-[color:var(--color-primary)] hover:bg-surface"
              href={data.wufooUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Napište nám (formulář)
            </a>
          </div>
        </div>
      ) : null}
    </section>
  );
}


