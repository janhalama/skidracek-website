### Project Tasks — Phased Checklist

Single source of truth for building SkiDráček iteratively. Tasks are grouped by phase; each item is actionable and ≤5 steps. Check off as you go.

Reference: `_docs/project-overview.md`, `_docs/user-flow.md`, `_docs/tech-stack.md`, `_docs/project-rules.md`, `_docs/ui-rules.md`, `_docs/theme-rules.md`, https://www.skidracek.cz/

## Phase 01 — Setup (Barebones Running App)
- [x] Create Next.js 14 App Router project with TypeScript and ESLint
- [x] Enable TypeScript strict mode and configure npm scripts
- [x] Add Prettier and .editorconfig
- [x] Add README with run/build instructions

- [x] Install Tailwind and add `styles/globals.css` with base layers
- [x] Add `styles/variables.css` using tokens from theme rules
- [x] Extend `tailwind.config.ts` to map CSS variables
- [x] Add base typography and container utilities

- [x] Scaffold `app/(public)/page.tsx` with all section anchors
- [x] Add `components/sections/*` placeholders (Hero, News, Hours, Params, School, Pricing, Directions, Contacts, Gallery, Footer)
- [x] Implement top navigation + hamburger shell
- [x] Add `app/(public)/loading.tsx` and `error.tsx`

- [x] Stub `app/api/content/route.ts` (GET sample JSON, PUT 501)
- [x] Stub `app/api/weather/route.ts` (static sample, `revalidate: 3600`)
- [x] Ensure content route uses Node runtime and safe caching headers

- [x] Create Vercel project and enable Preview deployments
- [x] Add `.env.example` with NEXTAUTH_*, SUPABASE_* placeholders
- [x] Enable Vercel Web Analytics; verify build + preview URL
- [x] Document env setup in README

## Phase 02 — MVP (Usable Public Site with Admin Editing)
- [x] Create `content_blocks` table in Supabase (slug, data jsonb, updated_at)
- [x] Add `lib/supabase-server.ts` (server-only client)
- [x] Define Zod schemas in `lib/schemas/content.ts`
- [x] Add `lib/content-service.ts` typed read/write helpers

- [x] Configure Auth.js (Google, Node runtime)
- [x] Store allowed-admins list (content block or small table)
- [x] Guard `/admin` and API writes server-side
- [x] Add access-denied UI with sign-out

- [x] Build `/admin` with edit-mode toggle (client)
- [ ] Render editable fields via RHF + Zod per section
- [x] Implement `PUT /api/content` save with server validation
- [ ] Show success/error toasts and update timestamps

- [ ] Render all sections as Server Components from `GET /api/content`
- [ ] Add outage/notice banner, webcam link, CTA in Hero
- [ ] Implement responsive Ceník table (stacked or horizontal scroll)
- [ ] Ensure external links open in new tabs (`rel="noopener noreferrer"`)

- [ ] Implement `GET /api/weather` (provider call, `revalidate: 3600`)
- [ ] Normalize provider data (units, last-updated)
- [ ] Handle timeouts/errors with neutral fallback
- [ ] Display temperature and snow status in Hero

- [ ] Set Vercel envs (NEXTAUTH, Google, Supabase service role)
- [ ] Configure `images.remotePatterns` in `next.config.js`
- [ ] Verify preview + production deploys and caching behavior
- [ ] Confirm Vercel Analytics events appear

## Phase 03 — Enhancements (UX, Performance, Maintainability)
- [ ] Highlight editable regions (subtle outlines + labels)
- [ ] Add per-field validation messages and helper text
- [ ] Confirm dialog for destructive edits/clears
- [ ] Show last-saved timestamp and `updated_by`

- [ ] Split content into granular blocks (hours, pricing, school, etc.)
- [ ] Store `updated_by` from session on server
- [ ] Refine Zod schemas per block (narrow types)
- [ ] Add small util for safe merging/version bump if needed

- [ ] Robust mobile table pattern for Ceník (stacked variant)
- [ ] Ensure hero status blocks wrap on small screens
- [ ] Accessible hamburger menu with focus trap
- [ ] Verify touch targets ≥ 44px and spacing consistency

- [ ] Add provider timeout + retry with backoff in weather API
- [ ] Surface "last updated" and subdued stale indicator
- [ ] Add console timing for fetch durations
- [ ] Document provider SLA in tech stack

- [ ] Add `generateMetadata` (title, description, Open Graph)
- [ ] Optimize images (`next/image` sizes + dims)
- [ ] Defer non-critical scripts (Wufoo) and lazy-load media
- [ ] Ensure route-level `revalidate` where applicable

## Phase 04 — Polish (Reliability, Accessibility, Launch Readiness)
- [ ] A11y audit: keyboard, focus rings, labels, contrast; fix issues
- [ ] Ensure external links have `rel="noopener noreferrer"` and useful titles
- [ ] Verify anchors, heading hierarchy, and `lang="cs"`
- [ ] Add skip-to-content and visible focus outlines

- [ ] Friendly copy for failed weather loads and stale data
- [ ] Implement `not-found.tsx`; refine route `error.tsx`
- [ ] Add maintenance banner mode (content-driven)
- [ ] Prevent admin-only errors from leaking to public

- [ ] Implement canonical URL + OG image in `generateMetadata`
- [ ] Add static sitemap and robots.txt
- [ ] Verify headings/meta/link titles; validate social previews
- [ ] Smoke test share previews on major platforms

- [ ] Verify Vercel envs for preview/prod and document
- [ ] Add uptime monitoring (Better Stack or UptimeRobot)
- [ ] Document incident response basics in README
- [ ] Review `next.config.js` images domains

- [ ] Update tech-stack and project-rules with implementation deltas
- [ ] Remove dead code and unused components
- [ ] Remove sample stubs
- [ ] Tag a release and list known limitations


