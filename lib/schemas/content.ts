/**
 * Content schemas for editable blocks on the public site.
 * Provides slug-to-schema mapping and helpers for validation and type inference.
 */

import { z } from 'zod';

// Slugs for content blocks used across the site. Using literals instead of enums.
export const contentSlugs = [
  'hero',
  'news',
  'hours',
  'school',
  'pricing',
  'directions',
  'contacts',
  'admin-allowlist',
] as const;

export type ContentSlug = (typeof contentSlugs)[number];

/*
  Schema for hero content (editable pieces only; weather is provider-driven).
*/
const heroSchema = z.object({
  tagline: z.string().min(1),
  webcamUrl: z.string().url(),
  noticeBanner: z
    .object({
      isVisible: z.boolean(),
      text: z.string().max(300).default(''),
    })
    .default({ isVisible: false, text: '' }),
});

/*
  Schema for news items; newest first recommended at write-time.
*/
const newsSchema = z.object({
  items: z.array(
    z.object({
      id: z.string().min(1),
      title: z.string().min(1),
      body: z.string().min(1),
      dateIso: z.string().datetime(),
      isVisible: z.boolean().default(true),
    }),
  ),
});

/*
  Schema for operating hours text block.
*/
const hoursSchema = z.object({
  text: z.string().min(1),
});

/*
  Schema for school info including pricing and instructor contact.
*/
const schoolSchema = z.object({
  description: z.string().min(1),
  pricing: z.object({
    individual: z.string().min(1),
    group: z.string().min(1),
  }),
  instructor: z.object({
    name: z.string().min(1),
    phone: z.string().min(3),
    email: z.string().email(),
  }),
});

/*
  Schema for pricing table rows (lift pricing).
*/
const pricingSchema = z.object({
  rows: z.array(
    z.object({
      duration: z.string().min(1),
      adults: z.string().min(1),
      kids: z.string().min(1),
    }),
  ),
});

/*
  Schema for directions and external links.
*/
const directionsSchema = z.object({
  car: z.string().min(1),
  gps: z.string().min(1),
  mapyCzUrl: z.string().url(),
  buses: z.array(
    z.object({ label: z.string().min(1), url: z.string().url() }),
  ),
});

/*
  Schema for contacts (manager and operator details, plus Wufoo link).
*/
const contactsSchema = z.object({
  manager: z.object({
    name: z.string().min(1),
    phone: z.string().min(3),
    email: z.string().email(),
  }),
  operator: z.object({
    name: z.string().min(1),
    address: z.string().min(1),
    ico: z.string().min(1),
    web: z.string().url(),
  }),
  wufooUrl: z.string().url(),
});

/*
  Schema for admin allowlist (emails allowed to edit content).
*/
const adminAllowlistSchema = z.object({ emails: z.array(z.string().email()) });

export const schemasBySlug: Record<ContentSlug, z.ZodTypeAny> = {
  hero: heroSchema,
  news: newsSchema,
  hours: hoursSchema,
  school: schoolSchema,
  pricing: pricingSchema,
  directions: directionsSchema,
  contacts: contactsSchema,
  'admin-allowlist': adminAllowlistSchema,
};

/*
  Returns the Zod schema for a content slug or throws if not found.
*/
export function getSchemaForSlug(slug: string) {
  const key = slug as ContentSlug;
  const schema = (schemasBySlug as Record<string, z.ZodTypeAny>)[key];
  if (!schema) throw new Error(`Unknown content slug: ${slug}`);
  return schema;
}

/*
  Validates arbitrary data against the schema for the given slug and returns parsed data.
*/
export function validateContentData(slug: string, data: unknown) {
  return getSchemaForSlug(slug).parse(data);
}




