/* Renders News section server-side from Supabase */

import { fetchContentBlock } from '@/lib/content-service';

type NewsItem = { id: string; title: string; body: string; dateIso: string; isVisible?: boolean };
type NewsData = { items: NewsItem[] };

export default async function News() {
  const block = await fetchContentBlock('news');
  const data = (block?.data as NewsData) || null;
  return (
    <section id="news" className="container-base py-12">
      <h2 className="text-2xl font-semibold">Novinky</h2>
      <div className="mt-4 space-y-6">
        {data?.items?.filter((i) => i.isVisible !== false).map((item) => (
          <article key={item.id} className="border-b border-border pb-4">
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-sm text-[color:var(--color-text-muted)]">{new Date(item.dateIso).toLocaleDateString()}</p>
            <p className="mt-2 whitespace-pre-wrap">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}


