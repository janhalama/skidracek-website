### UI Rules — Structure, Responsiveness, Accessibility

Defines common design principles, component conventions, and interaction patterns for SkiDráček. These rules align with the existing public site’s content and feel while modernizing responsiveness and accessibility. Reference site: https://www.skidracek.cz/.

## Core principles
- **Mobile-first**: Design for small screens first, progressively enhance for larger viewports.
- **Clarity over flair**: Prioritize readability, strong hierarchy, and predictable navigation.
- **Server-first**: Minimize client JS; prefer Server Components and semantic HTML.
- **Accessible by default**: Keyboard-friendly, screen-reader compatible, adequate color contrast.
- **Consistent spacing and sizing**: Use a standard spacing scale and component sizes.
- **Content parity**: Section order, anchors, and Czech copy mirror the current site.

## Information architecture and sections
Public single page (`/`) follows this order (anchors must exist):
1) Hero + Status (#hero) — webcam link, temperature, snow status, outage/notice banner, tagline, CTA.
2) Aktuální akce a novinky (#aktualni-akce)
3) Provozní doba (#provozni-doba)
4) Parametry vleku (#parametry-vleku)
5) Lyžařská škola (#lyzarska-skola)
6) Ceník (#cenik)
7) Kudy k Dráčkovi? (#kudy-k-drackovi)
8) Kontakty (#kontakty)
9) Dráček v obrazech (#dracek-v-obrazech)
10) Patička (#paticka)

Rules
- Section headings use clear hierarchy: H2 for sections, H3/H4 for subcontent.
- External links (Mapy.cz, bus schedules, Flickr) open in a new tab with `rel="noopener noreferrer"`.
- Phone and email are clickable (`tel:`, `mailto:`).
- Anchors use kebab-case and Czech section names for parity with the public site.

## Navigation
- Desktop: top navigation with anchor links; highlight current section on scroll.
- Mobile: collapsible hamburger menu; full-width tap targets (≥ 44px height).
- Sticky behavior: header may be sticky; ensure unobtrusive height and shadow at scroll.

## Responsiveness
- Breakpoints: Tailwind defaults (sm 640px, md 768px, lg 1024px, xl 1280px, 2xl 1536px).
- Containers: center content; use max-widths per breakpoint; maintain generous side padding on mobile.
- Grids: prefer 12-column mental model; use responsive `grid-cols-*` utilities.
- Images: fluid by default; constrain aspect ratio; avoid layout shifts.
- Tables (Ceník):
  - Mobile: either stacked rows (labels above values) or horizontal scroll with `overflow-x-auto` and sticky header.
  - Desktop: standard table with clear column headers and zebra rows optional.
- Cards/blocks: maintain consistent padding; avoid cramped content.

## Accessibility
- Color contrast meets WCAG AA; verify in theme tokens.
- Keyboard navigation: all interactive elements tabbable; visible focus ring.
- ARIA: descriptive labels for toggles, menus, and externally embedded content (Wufoo).
- Motion: respect `prefers-reduced-motion`; avoid large parallax or auto-rotating carousels.
- Language: set document lang to `cs`.

## Status and data states
- Temperature and snow status:
  - Loading: show a subtle placeholder (e.g., "Načítám…") with a spinner or skeleton.
  - Success: show value and units; include last-updated when available.
  - Error: show a neutral fallback text and hide non-critical chrome.
- Outage/notice banner: high-visibility inline banner above the fold; dismissible is optional but not required.
- Badges: use color-coded badges for statuses; ensure sufficient contrast and accessible text.

## Buttons and links
- Button types: primary (CTA), secondary (outline), subtle (ghost), and destructive.
- Sizes: sm, md, lg; default md for most UI; hit area ≥ 44px.
- Link style: underline on hover; external links include icon or `title` attribute indicating new tab.

## Forms (Admin)
- Inline editing only for editable areas defined in user flow; non-editable areas remain static.
- Validation: Zod schema-driven; show inline errors with clear copy.
- Controls: use shadcn/ui inputs, selects, switches; label every field; include help text as needed.
- Save flow: optimistic UI is optional; show clear success/failure feedback.

## Content layout specifics by section
- Hero + Status: prominent tagline and clear status blocks (webcam link, temperature, snow status). CTA "Kontaktujte nás" visible.
- Aktuální akce a novinky: list format with dates optional; newest first.
- Provozní doba: concise sentence, avoid long paragraphs.
- Parametry vleku: present as key-value grid (two columns on desktop, stacked on mobile).
- Lyžařská škola: subsections for description, pricing, instructor; action button to order course.
- Ceník: 3-column table (Doba jízdy, Dospělí, Děti) mirroring current site.
- Kudy k Dráčkovi?: subsections for car, bus, GPS; Mapy.cz link styled as button.
- Kontakty: split by Správce vleku and Provozovatel; use definition list or cards.
- Dráček v obrazech: external link to Flickr; no heavy embed.
- Patička: credits and copyright; low-contrast text on subtle background.

## Iconography
- Use Lucide icons; keep a consistent stroke width and size rhythm (e.g., 16/20/24px).
- Use icons as affordances, not decoration; always pair with text for clarity.

## Typography and copy
- Heading scale: H1 (hero), H2 (sections), H3/H4 (subsections).
- Body text: 16px base on mobile; scale up slightly on larger screens.
- Line length: 60–75 characters ideal for paragraphs; shorter for sidebars.
- Czech diacritics must render correctly; test fonts across platforms.

## Spacing and layout
- Use a 4px-based spacing scale; typical section padding: 24–40px mobile, 48–80px desktop.
- Maintain consistent gaps between headings, paragraphs, and lists.
- Avoid edge-to-edge text; keep comfortable side padding on mobile.

## Media
- Optimize images; provide width/height or aspect ratio to prevent layout shift.
- Use `next/image` where possible; define remote patterns for external sources.
- Avoid autoplaying media; never auto-play sound.

## Error and empty states
- Provide friendly, concise messaging in Czech.
- Offer a clear path back (e.g., anchor links) when content is missing.

## Admin UX safeguards
- Gate `/admin` via Google auth and allowlist; don’t render edit controls for non-admins.
- In edit mode, clearly delineate editable regions with subtle outlines; show Save/Cancel affordances.
- Autosave is optional; prefer explicit Save with confirmation.

## Performance
- Favor static/ISR content; avoid unnecessary client state.
- Lazy-load heavy embeds (Wufoo) and non-critical images below the fold.
- Minimize render-blocking CSS/JS; keep component trees shallow.


