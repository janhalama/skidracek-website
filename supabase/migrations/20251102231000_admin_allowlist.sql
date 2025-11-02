-- Admin allowlist table for editor access
create table if not exists public.admin_allowlist (
  email text primary key,
  added_at timestamptz not null default now()
);

create index if not exists idx_admin_allowlist_email_lower on public.admin_allowlist ((lower(email)));


