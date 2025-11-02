### Tech Stack — Best Practices, Limitations, and Conventions

This document defines how we use our selected technologies to build a simple, fast, and maintainable site for SkiDráček. It covers best practices, conventions, limitations, and common pitfalls. Keep the stack minimal; optimize for clarity over abstraction.

## Scope and principles
- **Keep it simple**: Prefer built-in Next.js features; avoid extra infra (no ORM, no Redis, no CI initially).
- **Server-first**: Render with Server Components; keep Client Components minimal.
- **Typed and explicit**: TypeScript in strict mode. Validate external inputs with Zod.
- **Secure by default**: Never expose secrets to the client. Mutations only via server.
- **Fast by default**: Cache public data with ISR; minimize client JavaScript.

## Selected stack overview
- **Framework**: Next.js 14+ App Router (Node runtime by default)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS
- **UI primitives**: Radix UI + shadcn/ui
- **Forms/validation**: React Hook Form + Zod
- **Auth**: Auth.js (NextAuth) with Google
- **Data**: Supabase Postgres via `@supabase/supabase-js` (no ORM)
- **APIs**: Next.js Route Handlers (`app/api/*`)
- **Caching**: Next.js fetch cache / ISR (`revalidate`)
- **Hosting & analytics**: Vercel + Vercel Web Analytics
- **External services**: Weather provider (hourly cache), Mapy.cz, bus schedules, Flickr (links), Wufoo (embed)

## App structure and conventions
- `app/` with App Router; group routes by surface:
  - `app/(public)/page.tsx` — single public page
  - `app/admin/page.tsx` — admin UI (gated)
  - `app/api/*` — route handlers for content and integrations
- **Server Components by default**; mark Client Components with `'use client'` only when needed (form inputs, event handlers).
- **File size**: keep files under ~500 lines; prefer small modules.
- **Naming**: descriptive, explicit. Avoid abbreviations.
- **Error strategy**: throw errors; handle at boundaries with error routes.

## Next.js App Router
Best practices
- Use Server Components for static/readonly UI; use Client Components for interactivity only.
- Choose runtime per route:
  - Node runtime for NextAuth, Supabase (service key), and any server-only code.
  - Edge runtime for simple, stateless fetch proxies (e.g., weather) if desired.
- Co-locate `loading.tsx`, `error.tsx`, and `not-found.tsx` per route where useful.
- Use `generateMetadata` for SEO (title, description, open graph).

Limitations
- Edge runtime cannot safely use server-only secrets like Supabase service role keys.
- Caching can be invalidated by cookies/headers; personalized responses must be `no-store`.

Common pitfalls
- Accidental Client Components increase bundle size. Prefer server where possible.
- Mixing Edge and Node inadvertently (e.g., importing Node-only code into Edge route).
- Forgetting to set `revalidate` or `cache: 'no-store'` appropriately, causing stale or uncacheable responses.

## TypeScript
Best practices
- Enable `strict: true`, `noUncheckedIndexedAccess: true`.
- Use precise types for content payloads; infer Zod schemas to TS types.
- Prefer function declarations over classes; avoid `any`.

Pitfalls
- Casting to silence errors hides bugs; fix the types instead.
- Leaking client-only types into server code or vice versa.

## Tailwind CSS
Best practices
- Use semantic component wrappers from shadcn/ui; keep Tailwind utilities focused on layout/spacing.
- Extract reusable patterns into small components; avoid large class strings.
- Configure a minimal, brand-aligned color palette; ensure contrast ratios.

Pitfalls
- Overusing arbitrary values leads to inconsistent design.
- Duplicating style logic in multiple components instead of extracting.

## Radix UI + shadcn/ui
Best practices
- Prefer accessible primitives (Dialog, Popover, Tabs) from shadcn/ui built on Radix.
- Keep components headless where possible; customize via Tailwind.
- Limit dependencies: generate only the components you actually use.

Pitfalls
- Forgetting to forward refs breaks composition.
- Styling primitives directly instead of generated wrappers increases coupling.

## Forms: React Hook Form + Zod
Best practices
- Define a Zod schema per form; infer types with `z.infer`.
- Use `Controller` only for fully controlled inputs; prefer native registration.
- Validate on submit; show inline errors with accessible markup.

Pitfalls
- Mutating default values after mount causes RHF state drift.
- Divergent schema vs UI constraints; always drive from the Zod schema.

## Auth: Auth.js (NextAuth) with Google
Best practices
- Session strategy: JWT (no DB). Store minimal claims (email, name).
- Protect `/admin` via server-side checks, not client-only guards.
- Maintain an allowed-admins email list in the database; check inside route handlers.
- Put Auth in Node runtime routes only. Set `NEXTAUTH_SECRET` and Google OAuth creds in env.

Pitfalls
- OAuth redirect URI mismatch across preview and production. Configure both in Google Console.
- Using Edge runtime with NextAuth causes subtle issues; stick to Node.
- Trusting client-side checks for admin access.

## Data: Supabase Postgres via supabase-js (no ORM)
Approach
- Use `@supabase/supabase-js` with the service role key on the server only (Route Handlers). Never expose it to the client.
- Public content fetching goes through server route handlers; do not query Supabase directly from the client.
- Simple content model: `content_blocks(slug text primary key, data jsonb not null, updated_at timestamptz not null default now())`.

Best practices
- Create a small server utility to instantiate Supabase with the service key using environment variables; import only in Node runtime code.
- Validate all incoming admin mutations with Zod; audit with `updated_at` and `updated_by` if needed.
- Keep SQL changes as plain `.sql` files committed to the repo or managed via the Supabase SQL editor; document changes.

Limitations
- No Row Level Security (RLS) in this minimal setup; all access funnels through server route handlers.
- No migrations framework; apply SQL manually and keep scripts under version control.

Pitfalls
- Using the anon key on the client for writes creates security risks.
- Importing the Supabase server client into Edge routes (secrets exposure).

## APIs: Next.js Route Handlers (`app/api/*`)
Patterns
- CRUD for content blocks: `GET /api/content?slug=...`, `PUT /api/content` (admin only).
- Weather proxy: `GET /api/weather` with `revalidate: 3600` to cache for 1 hour.

Best practices
- Node runtime for content/admin endpoints; Edge acceptable for stateless proxies without secrets.
- Validate request bodies/queries with Zod; return typed responses.
- Use `Response.json()` and set caching headers consistently with ISR config.

Pitfalls
- Forgetting to verify admin allowlist before writes.
- Returning `Set-Cookie` or reading cookies in cached routes, which disables caching.

## Caching and revalidation
Guidelines
- Public content: fetch via server with `revalidate: 3600` for one-hour caching.
- Admin pages and write endpoints: `cache: 'no-store'`.
- Use `export const revalidate = 3600` at the route level when appropriate.

Pitfalls
- Requests with cookies default to dynamic; avoid auth cookies on public fetches.
- Assuming `revalidate` applies to client-side fetch; it only applies on the server.

## Images and media
Best practices
- Configure `next.config.js` `images.remotePatterns` for external domains.
- Use `next/image` for responsive, optimized images; specify width/height when possible.
- Keep gallery as outbound links (Flickr) and webcam as external link per requirements.

Pitfalls
- Missing remotePatterns causes runtime errors on image load.
- Overusing `fill` without proper container sizing leads to layout shifts.

## External services
- **Weather provider**: access via server route; set a conservative timeout; cache for 1 hour; return a fallback structure on failure.
- **Mapy.cz / bus schedules / Flickr**: external links opening in a new tab; no embeds.
- **Wufoo**: use their embed code; ensure it’s loaded only on demand.

## Analytics, monitoring, and logging
- **Analytics**: Enable Vercel Web Analytics for traffic insights without cookies.
- **Logging**: Use `console.*` on the server; logs are visible in Vercel. Consider adding Sentry later if errors become non-trivial.

## Quality: linting and formatting
- **ESLint + Prettier** with sensible Next.js/TypeScript configs.
- No tests initially; add Playwright for E2E if regressions appear.

## Deployment and environments (Vercel)
Best practices
- Use Vercel Preview deployments for branches; production on `main`.
- Define environment variables in Vercel for each environment and mirror locally in `.env.local`:
  - `NEXTAUTH_URL`, `NEXTAUTH_SECRET`
  - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
  - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (server-only)
- Pin the default region close to Supabase region for lower latency.

Pitfalls
- Missing `NEXTAUTH_URL` per environment causes callback failures.
- Leaking service role key to the client via accidental import in Client Components.

## Accessibility and SEO
- Use shadcn/ui components which include accessible patterns by default; verify focus states and labels.
- Provide meaningful alt text for images; ensure color contrast meets WCAG AA.
- Use Next.js Metadata API for titles/descriptions; set canonical URL; mark external links with `rel="noopener noreferrer"`.

## Conventions checklist
- Server-only code: Node runtime, never imported by Client Components.
- Public data: cache with `revalidate: 3600` and avoid auth cookies.
- Admin writes: validate with Zod; check allowlist; `no-store` caching.
- TypeScript strict; avoid `any`; infer from Zod.
- UI via shadcn/ui; tailor styles with Tailwind; keep components small.
- Keep secrets in Vercel env vars; never in the client bundle.

## Future extensions (optional)
- Add Sentry for error monitoring.
- Add Playwright for critical flows (admin save, public render).
- Add RLS and client anon reads if we later expose read-only content directly from Supabase.


