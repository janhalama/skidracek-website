### Project Rules — Structure, Conventions, and Quality Bar

Defines mandatory conventions for SkiDráček’s AI‑first codebase. This doc consolidates decisions from tech-stack, user-flow, project overview, UI and theme rules. Goals: modular, scalable, easy to navigate and read, responsive, and production‑safe on Vercel.

Sources
- Tech stack: `_docs/tech-stack.md`
- User flow: `_docs/user-flow.md`
- Project overview: `_docs/project-overview.md`
- UI rules: `_docs/ui-rules.md`
- Theme rules: `_docs/theme-rules.md`

## Core principles
- **AI‑first clarity**: Short, focused files (< 500 lines), descriptive filenames, clear headers, cohesive modules.
- **Server‑first**: Prefer Server Components and Route Handlers. Keep client JS minimal.
- **Typed and documented**: TypeScript strict; all exported functions documented with JSDoc/TSDoc.
- **Security by default**: Secrets server‑only; verify admin allowlist on all mutations.
- **Performance by default**: ISR for public data; zero‑cost abstractions; minimal dependencies.

## Directory structure (App Router)
Project layout favors quick discovery and low coupling. Keep top‑level clean and predictable.

```
app/
  (public)/
    page.tsx                 # Public single page (sections per user-flow)
    loading.tsx              # Optional loading UI
    error.tsx                # Route error boundary
  admin/
    page.tsx                 # Admin UI (server-gated)
    loading.tsx
    error.tsx
  api/
    content/route.ts         # GET/PUT content blocks (admin writes)
    weather/route.ts         # Weather proxy (hourly cache)

components/
  common/                    # Shared primitives (Buttons, Badges, Cards)
  sections/                  # Page sections (Hero, PricingTable, etc.)
  forms/                     # Admin form pieces (Field, Form, Submit)

lib/
  auth.ts                    # NextAuth helpers and admin allowlist checks
  supabase-server.ts         # Server-only Supabase client factory
  content-service.ts         # CRUD helpers for content blocks
  schemas/                   # Zod schemas (content, forms)
  types/                     # Shared TypeScript types

styles/
  globals.css                # Tailwind base and resets
  variables.css              # CSS variables from theme tokens

data/sql/                    # Plain .sql files for table setup/changes

public/                      # Static assets (favicons, images that are truly static)

_docs/                       # Architecture and product docs (this folder)

config/                      # Optional: lint/format configs if separated

tests/                       # Only if/when tests are added later

next.config.js               # Next.js config
tailwind.config.ts           # Tailwind config (maps to CSS variables)
postcss.config.js            # PostCSS config
``` 

Rules
- Keep module boundaries clear: `components` (UI only), `lib` (logic only), `app` (routing + orchestration only).
- Server‑only modules live in `lib` and must not be imported by Client Components.
- Co‑locate small component styles/types next to the component if not shared.

## File naming and headers
- Filenames: kebab‑case for utilities and non‑components (`content-service.ts`), PascalCase for components (`PricingTable.tsx`).
- Directories: kebab‑case.
- Route handlers: always `route.ts` under `app/api/<name>/`.
- Every file starts with a brief explanation comment (what it contains and why it exists).

Example header (TS/TSX)
```ts
/**
 * Content service utilities for reading/writing content blocks.
 * Exposes server-only helpers used by route handlers and admin UI.
 */
```

## Function documentation (required)
- All exported functions include concise JSDoc/TSDoc with purpose, parameters, return type, and potential errors.
  - Use `@param`, `@returns`, `@throws`.
  - Prefer describing constraints and invariants over restating types.

Template
```ts
/**
 * Saves a content block to storage, replacing existing data atomically.
 * @param slug Unique content identifier (e.g., "cenik", "provozni-doba").
 * @param data Validated JSON payload matching the corresponding schema.
 * @returns The persisted block including updated_at.
 * @throws If the user is not an allowed admin or the write fails.
 */
export async function saveContentBlock(slug: string, data: unknown) { /* ... */ }
```

## Modularity and size limits
- Aim for modules focused on a single responsibility; split when a file approaches 400–500 lines.
- Avoid deep nesting in folders; prefer more, flatter folders to aid discoverability.
- Avoid circular dependencies; prefer dependency injection via function parameters.

## Server vs client boundaries
- Server Components by default; mark Client Components with `'use client'` only when needed (event handlers, RHF inputs).
- Do not import server‑only modules (`supabase-server.ts`, `content-service.ts`) into Client Components.
- Node runtime for routes needing secrets (Auth.js, Supabase service key). Edge only for stateless proxies.
- Never expose secrets in the client bundle. All mutations happen via server routes.

## Data, schemas, and storage
- Data source: Supabase Postgres via `@supabase/supabase-js` (no ORM).
- Content model: `content_blocks(slug text primary key, data jsonb not null, updated_at timestamptz default now())`.
- Validation: Define Zod schemas under `lib/schemas`; infer types with `z.infer`.
- Reads: server route handler → supabase; cache public reads with ISR.
- Writes: admin‑only route handler; `cache: 'no-store'`; validate with Zod; check allowlist.

## Routing and APIs
- Public page lives at `app/(public)/page.tsx` and mirrors section order and anchors from `_docs/user-flow.md`.
- APIs under `app/api/*` follow RESTful JSON conventions with clear status codes.
- Weather proxy uses `revalidate: 3600` and sanitizes provider responses.

## Caching and performance
- Public data: set `export const revalidate = 3600` or per‑fetch `next: { revalidate: 3600 }`.
- Admin and mutations: `cache: 'no-store'`.
- Avoid cookies in cached routes; they force dynamic rendering.
- Lazy‑load heavy embeds (Wufoo) and below‑the‑fold images.

## Auth and authorization
- Auth.js (NextAuth) with Google provider; JWT strategy; minimal claims (email, name).
- Admin allowlist stored in DB (or config JSON) and checked on the server.
- Gate `/admin` with a server check; never rely solely on client guards.

## Styling and theme
- Use Tailwind for layout and utilities; avoid excessive arbitrary values.
- Consume CSS variables from `_docs/theme-rules.md` (via `variables.css`) through Tailwind config extensions.
- Use shadcn/ui components for accessible primitives; generate only what we need.
- Keep spacing, radii, and shadows consistent with theme tokens.

## Accessibility and SEO
- WCAG AA color contrast; visible focus rings; keyboard navigability.
- Language set to `cs`; headings hierarchical (H1/H2/H3).
- External links open in new tab with `rel="noopener noreferrer"`.
- Use Next.js Metadata API for titles/descriptions and canonical URLs.

## Logging, analytics, and errors
- Server logs via `console.*` (visible in Vercel). Consider Sentry later.
- Use friendly, localized error messages in UI; never leak internals to users.
- API errors return JSON with stable shape `{ error: { code, message } }`.

## Linting, formatting, and checks
- ESLint + Prettier required; TypeScript strict mode enabled.
- PRs should remain small and focused; update `_docs/*` when adding new surface areas/components.
- No tests initially; if added later, prefer Playwright for critical flows.

## Commit, branch, and PR conventions
- Branch names: `feature/<short-desc>`, `fix/<short-desc>`, `docs/<short-desc>`.
- Commits: imperative mood, scoped if useful (e.g., `app: add pricing table section`).
- PR description: purpose, screenshots/GIFs for UI changes, risk notes, and rollout plan.

## Code review readiness checklist
- File under 500 lines and single responsibility.
- Top‑of‑file explanation present and accurate.
- All exported functions documented with JSDoc/TSDoc, including `@throws` when relevant.
- Server/client boundaries respected; no secret exposure.
- Caching headers correct for the route.
- Accessibility verified (focus, labels, contrast).
- Section order and anchors match `_docs/user-flow.md`.

## Common pitfalls (avoid)
- Importing server‑only modules into Client Components.
- Using Edge runtime for routes needing secrets (Auth, Supabase service key).
- Breaking ISR by reading cookies in public routes.
- Missing `images.remotePatterns` for external images.
- Weak contrast for status banners or buttons.
- Tables unreadable on mobile; ensure stacked or scrollable pattern is applied.

## How to add a new component (example workflow)
1) Create `components/sections/<ComponentName>.tsx` with a top header comment.
2) Implement as Server Component if possible; add `'use client'` only when needed.
3) Style with Tailwind, consuming theme tokens; ensure responsive behavior.
4) Document props with JSDoc; export a typed props interface.
5) Add to `app/(public)/page.tsx` in the correct order; add an anchor.
6) Validate any inputs with Zod if the component handles forms.
7) Update `_docs/ui-rules.md` if you introduce a new pattern.


