-- Content blocks table migration
create table if not exists public.content_blocks (
  slug text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create index if not exists idx_content_blocks_gin on public.content_blocks using gin (data);





