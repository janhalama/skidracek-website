-- SQL schema for content storage.
-- Creates a simple key-value table using JSONB for flexible section data.

create table if not exists public.content_blocks (
  slug text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- Helpful index for containment queries if ever needed later.
create index if not exists idx_content_blocks_gin on public.content_blocks using gin (data);




