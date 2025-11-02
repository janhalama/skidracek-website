/**
 * Content service helpers for reading and writing content blocks in Supabase.
 * Encapsulates validation and storage access for route handlers and admin UI.
 */

import { getSupabaseServerClient } from './supabase-server';
import { validateContentData } from './schemas/content';

export type ContentBlock<T = unknown> = {
  slug: string;
  data: T;
  updated_at: string;
};

/*
  Reads a single content block by slug; returns null if it does not exist.
*/
export async function fetchContentBlock(slug: string): Promise<ContentBlock | null> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('content_blocks')
    .select('slug, data, updated_at')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw new Error(`Failed to fetch content block: ${error.message}`);
  if (!data) return null;
  return data as ContentBlock;
}

/*
  Reads all content blocks; returns an empty array if none exist.
*/
export async function fetchAllContentBlocks(): Promise<ContentBlock[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('content_blocks')
    .select('slug, data, updated_at')
    .order('slug');

  if (error) throw new Error(`Failed to fetch content blocks: ${error.message}`);
  return (data ?? []) as ContentBlock[];
}

/*
  Validates and upserts a content block. Returns the persisted row.
*/
export async function upsertContentBlock(slug: string, rawData: unknown): Promise<ContentBlock> {
  const supabase = getSupabaseServerClient();
  const data = validateContentData(slug, rawData);

  const { data: upserted, error } = await supabase
    .from('content_blocks')
    .upsert({ slug, data })
    .select('slug, data, updated_at')
    .single();

  if (error) throw new Error(`Failed to save content block: ${error.message}`);
  return upserted as ContentBlock;
}




