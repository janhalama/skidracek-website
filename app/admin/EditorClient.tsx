/**
 * Admin editor client component with edit-mode toggle and simple forms.
 * Implements forms for editable blocks using RHF + Zod.
 * Simple inputs for primitives; JSON textareas for array/nested lists to keep UI compact.
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

/* Hero schema and form */
const heroSchema = z.object({
  tagline: z.string().min(1),
  webcamUrl: z.string().url().optional().or(z.literal('').transform(() => undefined)),
  backgroundImageUrl: z.string().url().optional().or(z.literal('').transform(() => undefined)),
  noticeBannerText: z.string().optional(),
  noticeBannerVisible: z.boolean().default(false),
  ctaLabel: z.string().optional(),
  ctaUrl: z.string().url().optional().or(z.literal('').transform(() => undefined)),
});
type HeroForm = z.infer<typeof heroSchema>;

/* Directions */
const directionsSchema = z.object({
  car: z.string().min(1),
  gps: z.string().min(1),
  mapyCzUrl: z.string().url(),
  busesJson: z.string().optional(), // JSON array of {label,url}
});
type DirectionsForm = z.infer<typeof directionsSchema>;

/* Contacts */
const contactsSchema = z.object({
  managerName: z.string().min(1),
  managerPhone: z.string().min(1),
  managerEmail: z.string().email(),
  operatorName: z.string().min(1),
  operatorAddress: z.string().min(1),
  operatorIco: z.string().min(1),
  operatorWeb: z.string().url(),
  wufooUrl: z.string().url(),
});
type ContactsForm = z.infer<typeof contactsSchema>;

/* Params */
const paramsSchema = z.object({
  subtitle: z.string().optional(),
  itemsJson: z.string().optional(), // JSON array of {header,value,unit}
});
type ParamsForm = z.infer<typeof paramsSchema>;

/* School */
const schoolSchema = z.object({
  subtitle: z.string().optional(),
  description: z.string().min(1),
  pricingIndividual: z.string().min(1),
  pricingGroup: z.string().min(1),
  instructorName: z.string().min(1),
  instructorPhone: z.string().min(1),
  instructorEmail: z.string().email(),
  licenseImageUrl: z.string().url().optional().or(z.literal('').transform(() => undefined)),
});
type SchoolForm = z.infer<typeof schoolSchema>;

/* Pricing rows */
const pricingSchema = z.object({ rowsJson: z.string().optional() }); // JSON array of {duration,adults,kids}
type PricingForm = z.infer<typeof pricingSchema>;

/* News */
const newsSchema = z.object({ itemsJson: z.string().optional() }); // JSON array of items
type NewsForm = z.infer<typeof newsSchema>;

export default function EditorClient() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; variant: 'success' | 'error' }>>([]);

  function addToast(message: string, variant: 'success' | 'error') {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2500);
  }

  const hoursForm = useForm<HoursForm>({ resolver: zodResolver(hoursSchema), defaultValues: { text: '' } });
  const heroForm = useForm<HeroForm>({ resolver: zodResolver(heroSchema), defaultValues: { tagline: '', webcamUrl: '', backgroundImageUrl: '', noticeBannerText: '', noticeBannerVisible: false, ctaLabel: '', ctaUrl: '' } });
  const directionsForm = useForm<DirectionsForm>({ resolver: zodResolver(directionsSchema), defaultValues: { car: '', gps: '', mapyCzUrl: '', busesJson: '' } });
  const contactsForm = useForm<ContactsForm>({ resolver: zodResolver(contactsSchema), defaultValues: { managerName: '', managerPhone: '', managerEmail: '', operatorName: '', operatorAddress: '', operatorIco: '', operatorWeb: '', wufooUrl: '' } });
  const paramsForm = useForm<ParamsForm>({ resolver: zodResolver(paramsSchema), defaultValues: { subtitle: '', itemsJson: '' } });
  const schoolForm = useForm<SchoolForm>({ resolver: zodResolver(schoolSchema), defaultValues: { subtitle: '', description: '', pricingIndividual: '', pricingGroup: '', instructorName: '', instructorPhone: '', instructorEmail: '', licenseImageUrl: '' } });
  const pricingForm = useForm<PricingForm>({ resolver: zodResolver(pricingSchema), defaultValues: { rowsJson: '' } });
  const newsForm = useForm<NewsForm>({ resolver: zodResolver(newsSchema), defaultValues: { itemsJson: '' } });

  useEffect(() => {
    if (!isEditMode) return;
    let cancelled = false;
    (async () => {
      try {
        const [hours, hero, directions, contacts, params, school, pricing, news] = await Promise.all([
          fetchBlock('hours'),
          fetchBlock('hero'),
          fetchBlock('directions'),
          fetchBlock('contacts'),
          fetchBlock('params'),
          fetchBlock('school'),
          fetchBlock('pricing'),
          fetchBlock('news'),
        ]);
        if (cancelled) return;
        if (hours?.data?.text) hoursForm.reset({ text: String(hours.data.text) });
        if (hero?.data) heroForm.reset({
          tagline: String(hero.data.tagline || ''),
          webcamUrl: String(hero.data.webcamUrl || ''),
          backgroundImageUrl: String(hero.data.backgroundImageUrl || ''),
          noticeBannerText: String(hero.data.noticeBanner?.text || ''),
          noticeBannerVisible: Boolean(hero.data.noticeBanner?.isVisible || false),
          ctaLabel: String(hero.data.cta?.label || ''),
          ctaUrl: String(hero.data.cta?.url || ''),
        });
        if (directions?.data) directionsForm.reset({
          car: String(directions.data.car || ''),
          gps: String(directions.data.gps || ''),
          mapyCzUrl: String(directions.data.mapyCzUrl || ''),
          busesJson: JSON.stringify(directions.data.buses || [], null, 2),
        });
        if (contacts?.data) contactsForm.reset({
          managerName: String(contacts.data.manager?.name || ''),
          managerPhone: String(contacts.data.manager?.phone || ''),
          managerEmail: String(contacts.data.manager?.email || ''),
          operatorName: String(contacts.data.operator?.name || ''),
          operatorAddress: String(contacts.data.operator?.address || ''),
          operatorIco: String(contacts.data.operator?.ico || ''),
          operatorWeb: String(contacts.data.operator?.web || ''),
          wufooUrl: String(contacts.data.wufooUrl || ''),
        });
        if (params?.data) paramsForm.reset({
          subtitle: String(params.data.subtitle || ''),
          itemsJson: JSON.stringify(params.data.items || [], null, 2),
        });
        if (school?.data) schoolForm.reset({
          subtitle: String(school.data.subtitle || ''),
          description: String(school.data.description || ''),
          pricingIndividual: String(school.data.pricing?.individual || ''),
          pricingGroup: String(school.data.pricing?.group || ''),
          instructorName: String(school.data.instructor?.name || ''),
          instructorPhone: String(school.data.instructor?.phone || ''),
          instructorEmail: String(school.data.instructor?.email || ''),
          licenseImageUrl: String(school.data.licenseImageUrl || ''),
        });
        if (pricing?.data) pricingForm.reset({ rowsJson: JSON.stringify(pricing.data.rows || [], null, 2) });
        if (news?.data) newsForm.reset({ itemsJson: JSON.stringify(news.data.items || [], null, 2) });
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
      addToast('Uloženo.', 'success');
    } catch (e: any) {
      setStatus(e?.message || 'Chyba při ukládání.');
      addToast(e?.message || 'Chyba při ukládání.', 'error');
    }
  }

  async function onSaveHero(values: HeroForm) {
    setStatus(null);
    try {
      const payload = {
        tagline: values.tagline,
        webcamUrl: values.webcamUrl || undefined,
        backgroundImageUrl: values.backgroundImageUrl || undefined,
        noticeBanner: { isVisible: !!values.noticeBannerVisible, text: values.noticeBannerText || '' },
        cta: values.ctaLabel && values.ctaUrl ? { label: values.ctaLabel, url: values.ctaUrl } : undefined,
      };
      const saved = await saveBlock('hero', payload);
      setLastSavedAt(new Date(saved.updated_at).toLocaleString());
      setStatus('Uloženo.');
      addToast('Uloženo.', 'success');
    } catch (e: any) {
      setStatus(e?.message || 'Chyba při ukládání.');
      addToast(e?.message || 'Chyba při ukládání.', 'error');
    }
  }

  async function onSaveDirections(values: DirectionsForm) {
    setStatus(null);
    try {
      const buses = values.busesJson ? JSON.parse(values.busesJson) : [];
      const saved = await saveBlock('directions', { car: values.car, gps: values.gps, mapyCzUrl: values.mapyCzUrl, buses });
      setLastSavedAt(new Date(saved.updated_at).toLocaleString());
      setStatus('Uloženo.');
      addToast('Uloženo.', 'success');
    } catch (e: any) {
      setStatus(e?.message || 'Chyba při ukládání.');
      addToast(e?.message || 'Chyba při ukládání.', 'error');
    }
  }

  async function onSaveContacts(values: ContactsForm) {
    setStatus(null);
    try {
      const saved = await saveBlock('contacts', {
        manager: { name: values.managerName, phone: values.managerPhone, email: values.managerEmail },
        operator: { name: values.operatorName, address: values.operatorAddress, ico: values.operatorIco, web: values.operatorWeb },
        wufooUrl: values.wufooUrl,
      });
      setLastSavedAt(new Date(saved.updated_at).toLocaleString());
      setStatus('Uloženo.');
      addToast('Uloženo.', 'success');
    } catch (e: any) {
      setStatus(e?.message || 'Chyba při ukládání.');
      addToast(e?.message || 'Chyba při ukládání.', 'error');
    }
  }

  async function onSaveParams(values: ParamsForm) {
    setStatus(null);
    try {
      const items = values.itemsJson ? JSON.parse(values.itemsJson) : [];
      const saved = await saveBlock('params', { subtitle: values.subtitle || undefined, items });
      setLastSavedAt(new Date(saved.updated_at).toLocaleString());
      setStatus('Uloženo.');
      addToast('Uloženo.', 'success');
    } catch (e: any) {
      setStatus(e?.message || 'Chyba při ukládání.');
      addToast(e?.message || 'Chyba při ukládání.', 'error');
    }
  }

  async function onSaveSchool(values: SchoolForm) {
    setStatus(null);
    try {
      const saved = await saveBlock('school', {
        subtitle: values.subtitle || undefined,
        description: values.description,
        pricing: { individual: values.pricingIndividual, group: values.pricingGroup },
        instructor: { name: values.instructorName, phone: values.instructorPhone, email: values.instructorEmail },
        licenseImageUrl: values.licenseImageUrl || undefined,
      });
      setLastSavedAt(new Date(saved.updated_at).toLocaleString());
      setStatus('Uloženo.');
      addToast('Uloženo.', 'success');
    } catch (e: any) {
      setStatus(e?.message || 'Chyba při ukládání.');
      addToast(e?.message || 'Chyba při ukládání.', 'error');
    }
  }

  async function onSavePricing(values: PricingForm) {
    setStatus(null);
    try {
      const rows = values.rowsJson ? JSON.parse(values.rowsJson) : [];
      const saved = await saveBlock('pricing', { rows });
      setLastSavedAt(new Date(saved.updated_at).toLocaleString());
      setStatus('Uloženo.');
      addToast('Uloženo.', 'success');
    } catch (e: any) {
      setStatus(e?.message || 'Chyba při ukládání.');
      addToast(e?.message || 'Chyba při ukládání.', 'error');
    }
  }

  async function onSaveNews(values: NewsForm) {
    setStatus(null);
    try {
      const items = values.itemsJson ? JSON.parse(values.itemsJson) : [];
      const saved = await saveBlock('news', { items });
      setLastSavedAt(new Date(saved.updated_at).toLocaleString());
      setStatus('Uloženo.');
      addToast('Uloženo.', 'success');
    } catch (e: any) {
      setStatus(e?.message || 'Chyba při ukládání.');
      addToast(e?.message || 'Chyba při ukládání.', 'error');
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
            <button type="submit" className="inline-flex items-center rounded-sm bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90">
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
            <input type="url" className="w-full border rounded p-2" {...heroForm.register('webcamUrl')} placeholder="Webkamera URL" />
            <input type="url" className="w-full border rounded p-2" {...heroForm.register('backgroundImageUrl')} placeholder="Pozadí (URL)" />
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" {...heroForm.register('noticeBannerVisible')} /> Zobrazit upozornění
            </label>
            <input type="text" className="w-full border rounded p-2" {...heroForm.register('noticeBannerText')} placeholder="Text upozornění" />
            <div className="grid grid-cols-2 gap-2">
              <input type="text" className="w-full border rounded p-2" {...heroForm.register('ctaLabel')} placeholder="CTA text" />
              <input type="url" className="w-full border rounded p-2" {...heroForm.register('ctaUrl')} placeholder="CTA URL" />
            </div>
            {heroForm.formState.errors.tagline ? (
              <p className="text-sm text-red-600">{heroForm.formState.errors.tagline.message}</p>
            ) : null}
            <button type="submit" className="inline-flex items-center rounded-sm bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90">
              Uložit
            </button>
          </form>

          <form className="rounded-md border border-border bg-surface p-4 space-y-3" onSubmit={directionsForm.handleSubmit(onSaveDirections)}>
            <h3 className="text-lg font-semibold">Kudy k Dráčkovi</h3>
            <input type="text" className="w-full border rounded p-2" {...directionsForm.register('car')} placeholder="Popis cesty autem" />
            <input type="text" className="w-full border rounded p-2" {...directionsForm.register('gps')} placeholder="GPS (lat, lon)" />
            <input type="url" className="w-full border rounded p-2" {...directionsForm.register('mapyCzUrl')} placeholder="Mapy.cz trasa URL" />
            <textarea className="w-full border rounded p-2 min-h-[120px]" {...directionsForm.register('busesJson')} placeholder='Seznam autobusů (JSON: [{"label":"..","url":".."}])' />
            <button type="submit" className="inline-flex items-center rounded-sm bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90">Uložit</button>
          </form>

          <form className="rounded-md border border-border bg-surface p-4 space-y-3" onSubmit={contactsForm.handleSubmit(onSaveContacts)}>
            <h3 className="text-lg font-semibold">Kontakty</h3>
            <input type="text" className="w-full border rounded p-2" {...contactsForm.register('managerName')} placeholder="Správce: jméno" />
            <input type="text" className="w-full border rounded p-2" {...contactsForm.register('managerPhone')} placeholder="Správce: telefon" />
            <input type="email" className="w-full border rounded p-2" {...contactsForm.register('managerEmail')} placeholder="Správce: e‑mail" />
            <input type="text" className="w-full border rounded p-2" {...contactsForm.register('operatorName')} placeholder="Provozovatel: jméno" />
            <textarea className="w-full border rounded p-2 min-h-[80px]" {...contactsForm.register('operatorAddress')} placeholder="Provozovatel: adresa" />
            <input type="text" className="w-full border rounded p-2" {...contactsForm.register('operatorIco')} placeholder="Provozovatel: IČO" />
            <input type="url" className="w-full border rounded p-2" {...contactsForm.register('operatorWeb')} placeholder="Provozovatel: web" />
            <input type="url" className="w-full border rounded p-2" {...contactsForm.register('wufooUrl')} placeholder="Wufoo URL" />
            <button type="submit" className="inline-flex items-center rounded-sm bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90">Uložit</button>
          </form>

          <form className="rounded-md border border-border bg-surface p-4 space-y-3" onSubmit={paramsForm.handleSubmit(onSaveParams)}>
            <h3 className="text-lg font-semibold">Parametry vleku</h3>
            <input type="text" className="w-full border rounded p-2" {...paramsForm.register('subtitle')} placeholder="Podtitulek" />
            <textarea className="w-full border rounded p-2 min-h-[120px]" {...paramsForm.register('itemsJson')} placeholder='Položky (JSON: [{"header":"..","value":"..","unit":".."}])' />
            <button type="submit" className="inline-flex items-center rounded-sm bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90">Uložit</button>
          </form>

          <form className="rounded-md border border-border bg-surface p-4 space-y-3" onSubmit={schoolForm.handleSubmit(onSaveSchool)}>
            <h3 className="text-lg font-semibold">Lyžařská škola</h3>
            <input type="text" className="w-full border rounded p-2" {...schoolForm.register('subtitle')} placeholder="Podtitulek" />
            <textarea className="w-full border rounded p-2 min-h-[120px]" {...schoolForm.register('description')} placeholder="Popis" />
            <div className="grid grid-cols-2 gap-2">
              <input type="text" className="w-full border rounded p-2" {...schoolForm.register('pricingIndividual')} placeholder="Ceník: individuální" />
              <input type="text" className="w-full border rounded p-2" {...schoolForm.register('pricingGroup')} placeholder="Ceník: skupinový" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <input type="text" className="w-full border rounded p-2" {...schoolForm.register('instructorName')} placeholder="Instruktor: jméno" />
              <input type="text" className="w-full border rounded p-2" {...schoolForm.register('instructorPhone')} placeholder="Instruktor: telefon" />
              <input type="email" className="w-full border rounded p-2" {...schoolForm.register('instructorEmail')} placeholder="Instruktor: e‑mail" />
            </div>
            <input type="url" className="w-full border rounded p-2" {...schoolForm.register('licenseImageUrl')} placeholder="Licence (URL)" />
            <button type="submit" className="inline-flex items-center rounded-sm bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90">Uložit</button>
          </form>

          <form className="rounded-md border border-border bg-surface p-4 space-y-3" onSubmit={pricingForm.handleSubmit(onSavePricing)}>
            <h3 className="text-lg font-semibold">Ceník (řádky)</h3>
            <textarea className="w-full border rounded p-2 min-h-[120px]" {...pricingForm.register('rowsJson')} placeholder='Řádky (JSON: [{"duration":"..","adults":"..","kids":".."}])' />
            <button type="submit" className="inline-flex items-center rounded-sm bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90">Uložit</button>
          </form>

          <form className="rounded-md border border-border bg-surface p-4 space-y-3" onSubmit={newsForm.handleSubmit(onSaveNews)}>
            <h3 className="text-lg font-semibold">Aktuální akce a novinky</h3>
            <textarea className="w-full border rounded p-2 min-h-[160px]" {...newsForm.register('itemsJson')} placeholder='Položky (JSON pole objektů s id,title,body,dateIso,isVisible)' />
            <button type="submit" className="inline-flex items-center rounded-sm bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90">Uložit</button>
          </form>
        </div>
      ) : null}

      {/* Toasts */}
      {toasts.length ? (
        <div className="fixed bottom-4 right-4 z-[100] space-y-2">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={
                'min-w-[220px] rounded-sm border px-3 py-2 text-sm shadow ' +
                (t.variant === 'success'
                  ? 'border-green-600/30 bg-green-50 text-green-800'
                  : 'border-red-600/30 bg-red-50 text-red-800')
              }
            >
              {t.message}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}


