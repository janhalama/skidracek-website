## SkiDráček — Simple, Fast, Responsive

Compact presentation website for a local ski lift.

### What it includes
- Public single page (`/`): Hero (webcam link, temperature, snow status, outage banner, tagline, CTA) → News → Hours → Lift parameters → Ski school → Pricing → Directions → Contacts → Gallery → Footer
- Admin page (`/admin`): Google sign‑in, allowlist check, edit‑mode toggle, in‑place editing that persists to Supabase
- Hourly‑cached weather/snow via server route

### Stack (minimal by design)
- Next.js 14 App Router, TypeScript (strict)
- Tailwind CSS, shadcn/ui + Radix
- Supabase Postgres via `@supabase/supabase-js` (no ORM)
- Auth.js (NextAuth) with Google
- Vercel hosting + Vercel Web Analytics

### Conventions (no fluff)
- Server‑first: Server Components by default; Client Components only for interactivity
- TypeScript strict; files ≤ 500 lines; descriptive names; small modules
- Exported functions documented with JSDoc/TSDoc
- APIs in `app/api/*` (JSON). Node runtime for anything touching secrets
- No secrets in client. Admin writes validated with Zod + allowlist check
- Public data cached with `revalidate: 3600`; admin/mutations `no-store`
- External links (Mapy.cz, bus schedules, Flickr) open in new tab
- ESLint + Prettier

### Key routes
- `/` public page (Server Components)
- `/admin` admin UI (Google auth, allowlist)
- `/api/content` read/write content blocks (admin writes only)
- `/api/weather` hourly‑cached provider proxy

### Env vars
- `NEXTAUTH_URL`, `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (server‑only)

### Email forwarding

- Using ImprovMX for domain email forwarding.
  - Configure MX records at your DNS to ImprovMX’s MX hosts.
  - Create aliases in the ImprovMX dashboard to forward to target inboxes.
  - The site uses Wufoo for contact submissions; no SMTP sending is configured.

### Docs
- `_docs/project-overview.md`, `_docs/user-flow.md`
- `_docs/tech-stack.md`, `_docs/project-rules.md`
- `_docs/ui-rules.md`, `_docs/theme-rules.md`
- `_docs/todo.md` (phased checklist)


### Getting started

- Install dependencies: `npm install`
- Run dev server: `npm run dev` then open `http://localhost:3000`
- Lint: `npm run lint` / auto-fix: `npm run lint:fix`
- Format: `npm run format`
- Typecheck: `npm run typecheck`

### Environment

- Copy `env.example` to `.env.local` and fill values
- Required vars: `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`


