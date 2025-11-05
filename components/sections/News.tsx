/* Renders News section server-side from Supabase */

import { fetchContentBlock } from '@/lib/content-service';

type NewsItem = { id: string; title: string; body: string; dateIso: string; isVisible?: boolean };
type NewsData = { items: NewsItem[] };

export default async function News() {
  const block = await fetchContentBlock('news');
  const data = (block?.data as NewsData) || null;
  const items = (data?.items || []).filter((i) => i.isVisible !== false);
  return (
    <section id="news" className="py-12 scroll-mt-20 bg-primary">
      <div className="container-base">
        <h2 className="text-2xl font-semibold text-center text-primary-foreground">Aktuální akce a novinky</h2>
        <div className="mt-4 space-y-4">
          {items.length ? (
            items.map((item) => (
              <article key={item.id} className="rounded-sm border border-border bg-surface p-4 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-medium text-[color:var(--color-text)]">{item.title}</h3>
                  <p className="text-xs text-[color:var(--color-text-muted)]">{new Date(item.dateIso).toLocaleDateString()}</p>
                </div>
                <p className="mt-2 whitespace-pre-wrap leading-relaxed">{item.body}</p>
              </article>
            ))
          ) : (
            <div className="rounded-sm border border-border bg-surface p-4 text-center text-[color:var(--color-text-muted)]">
              Momentálně nejsou naplánovány žádné akce.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


