/**
 * Admin editor client component with edit-mode toggle and simple forms.
 * Implements forms for 'hours' and 'hero' blocks using RHF + Zod.
 */

'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type ContentBlock = { slug: string; data: any; updated_at: string };

/* Fetcher for one block */
async function fetchBlock(slug: string): Promise<ContentBlock | null> {
  const res = await fetch(`/api/content?slug=${encodeURIComponent(slug)}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load content');
  const json = await res.json();
  return (json?.block ?? null) as ContentBlock | null;
}

/* Saver for one block */
async function saveBlock(slug: string, data: unknown): Promise<ContentBlock> {
  const res = await fetch('/api/content', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug, data }),
  });
  const json = await res.json();
  if (!res.ok || !json?.ok) throw new Error(json?.error || 'Save failed');
  return json.block as ContentBlock;
}

/* Hours schema and form */
const hoursSchema = z.object({ text: z.string().min(1) });
type HoursForm = z.infer<typeof hoursSchema>;

/* Hero schema and form (subset) */
const heroSchema = z.object({ tagline: z.string().min(1) });
type HeroForm = z.infer<typeof heroSchema>;

export default function EditorClient() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  const hoursForm = useForm<HoursForm>({ resolver: zodResolver(hoursSchema), defaultValues: { text: '' } });
  const heroForm = useForm<HeroForm>({ resolver: zodResolver(heroSchema), defaultValues: { tagline: '' } });

  useEffect(() => {
    if (!isEditMode) return;
    let cancelled = false;
    (async () => {
      try {
        const [hours, hero] = await Promise.all([fetchBlock('hours'), fetchBlock('hero')]);
        if (cancelled) return;
        if (hours?.data?.text) hoursForm.reset({ text: String(hours.data.text) });
        if (hero?.data?.tagline) heroForm.reset({ tagline: String(hero.data.tagline) });
      } catch (e) {
        setStatus('Nepodařilo se načíst obsah.');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isEditMode]);

  async function onSaveHours(values: HoursForm) {
    setStatus(null);
    try {
      const saved = await saveBlock('hours', values);
      setLastSavedAt(new Date(saved.updated_at).toLocaleString());
      setStatus('Uloženo.');
    } catch (e: any) {
      setStatus(e?.message || 'Chyba při ukládání.');
    }
  }

  async function onSaveHero(values: HeroForm) {
    setStatus(null);
    try {
      const saved = await saveBlock('hero', values);
      setLastSavedAt(new Date(saved.updated_at).toLocaleString());
      setStatus('Uloženo.');
    } catch (e: any) {
      setStatus(e?.message || 'Chyba při ukládání.');
    }
  }

  return (
    <div className="mt-6 space-y-8">
      <div className="flex items-center gap-3">
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={isEditMode}
            onChange={(e) => setIsEditMode(e.target.checked)}
          />
          <span>Režim úprav</span>
        </label>
        {lastSavedAt ? <span className="text-sm text-gray-600">Naposledy uloženo: {lastSavedAt}</span> : null}
      </div>

      {status ? (
        <div className="rounded-md border border-border bg-surface p-3 text-sm">{status}</div>
      ) : null}

      {isEditMode ? (
        <div className="grid gap-8 md:grid-cols-2">
          <form
            className="rounded-md border border-border bg-surface p-4 space-y-3"
            onSubmit={hoursForm.handleSubmit(onSaveHours)}
          >
            <h3 className="text-lg font-semibold">Otevírací doba</h3>
            <textarea
              className="w-full border rounded p-2 min-h-[120px]"
              {...hoursForm.register('text')}
              placeholder="Text otevírací doby"
            />
            {hoursForm.formState.errors.text ? (
              <p className="text-sm text-red-600">{hoursForm.formState.errors.text.message}</p>
            ) : null}
            <button type="submit" className="underline">
              Uložit
            </button>
          </form>

          <form className="rounded-md border border-border bg-surface p-4 space-y-3" onSubmit={heroForm.handleSubmit(onSaveHero)}>
            <h3 className="text-lg font-semibold">Hero</h3>
            <input
              type="text"
              className="w-full border rounded p-2"
              {...heroForm.register('tagline')}
              placeholder="Hlavní tagline"
            />
            {heroForm.formState.errors.tagline ? (
              <p className="text-sm text-red-600">{heroForm.formState.errors.tagline.message}</p>
            ) : null}
            <button type="submit" className="underline">
              Uložit
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}


