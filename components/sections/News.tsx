/* Renders News section server-side from Supabase */

import { fetchContentBlock } from '@/lib/content-service';

type NewsItem = { id: string; title: string; body: string; dateIso: string; isVisible?: boolean };
type NewsData = { items: NewsItem[] };

export default async function News() {
  const block = await fetchContentBlock('news');
  const data = (block?.data as NewsData) || null;
  const items = (data?.items || []).filter((i) => i.isVisible !== false);
  return (
    <section id="news" className="scroll-mt-20">
      <div className="bg-primary py-4">
        <div className="container-base">
          <h2 className="text-2xl font-semibold text-center text-primary-foreground">Aktuální akce a novinky</h2>
        </div>
      </div>
      <div className="container-base py-8 bg-white">
        {items.length ? (
          <div className="space-y-4">
            {items.map((item) => (
              <article key={item.id} className="rounded-sm border border-border bg-surface p-4 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-medium text-(--color-text)">{item.title}</h3>
                  <p className="text-xs text-(--color-text-muted)">{new Date(item.dateIso).toLocaleDateString()}</p>
                </div>
                <p className="mt-2 whitespace-pre-wrap leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-center text-primary">Momentálně nejsou naplánovány žádné akce.</p>
        )}
      </div>
    </section>
  );
}


