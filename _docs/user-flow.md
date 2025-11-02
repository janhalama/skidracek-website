### User Flow — SkiDráček 1:1 Rebuild

This document defines the user journey for a 1:1 content copy of the current public site, with a mostly matching design and fully responsive mobile experience. Admins can edit designated sections in place after Google authentication and membership in a page-configured allowed-admins list (via `/admin`).

## Actors
- **Visitor (anonymous)**: Browses public content on the single page; no login.
- **Admin (Google-authenticated)**: Accesses `/admin`, passes allowed-admins check, enables in-place editing on `/`.

## Surface Areas
- **Public Single Page (`/`)** with these sections/anchors (order reflects current site):
  1. **Hero + Status**
     - Webkamera online (link)
     - Teplota (from external provider, cached 1 hour)
     - Stav sněhu (from external provider, cached 1 hour) and potential outage/notice banner
     - Tagline: "Dětský vlek pro zimní radovánky vašich ratolestí."
     - CTA: Kontaktujte nás
  2. **Aktuální akce a novinky** (news/announcements)
  3. **Provozní doba** (operating hours)
     - Example: "Lyžařský vlek je v provozu o víkendech od 9:00 do 17:00."
  4. **Parametry vleku** (lift parameters)
     - Délka vleku: 154 m
     - Převýšení: 21 m
     - Nadmořská výška: 550 m n. m.
     - Obtížnost: modrá (dětská)
     - Kapacita: 350 osob/hod.
  5. **Lyžařská škola**
     - Popis, pro koho je škola určena, pomůcky
     - Objednání: po předchozí tel./e‑mail domluvě s instruktorem
     - Ceník lyžařské školy:
       - Individuální výuka (1 osoba): 500 Kč / 50 min
       - Skupinová výuka (2+ osoby): 300 Kč / osoba / hod
     - Instruktor: Marek Matouš — Tel.: 721 638 175 — E‑mail: skola@skidracek.cz
     - CTA: Objednávka kurzu
  6. **Ceník** (lift pricing)
     - Tabulka: Doba jízdy × Dospělí × Děti (např. 1/2/3 hod)
  7. **Kudy k Dráčkovi?** (how to get there)
     - Autem: 2 malá parkoviště, cca 12 aut, parkování zdarma
     - GPS: 50.674512, 15.235718 — Mapy.cz trasa (exact URL, opens in new tab)
     - Linkovým autobusem: přesné odkazy na jízdní řády (Jablonec n. N., Železný Brod) — otevřít v novém okně
     - Schématická mapka vleku
  8. **Kontakty**
     - Správce vleku: Karel Daníček — Tel.: 603 584 505 — E‑mail: info@skidracek.cz
     - Provozovatel: TJ Sokol Alšovice (adresa, IČO, web)
     - CTA: Napište nám (Wufoo formulář)
  9. **Dráček v obrazech** (galerie)
     - Odkaz na Flickr profil s aktuálními fotkami (link, bez embed)
  10. **Patička**
     - Copyright, credits (Powered by…)
- **Admin Page (`/admin`)**: Hidden entry for Google sign‑in, allowed‑admins check, edit‑mode toggle, and config visibility (including editable allowed admins list).

## Visitor Journey (Anonymous)
1. Lands on `/` and immediately sees Hero with Webkamera, Teplota, Stav sněhu, and any outage/notice banner.
2. Uses navbar anchors to jump to sections: Aktuální akce → Provozní doba → Parametry vleku → Lyžařská škola → Ceník → Kudy k Dráčkovi? → Kontakty → Dráček v obrazech.
3. Reviews details: hours, parameters, school info and pricing, lift pricing, directions (auto/bus, GPS link), contacts, and gallery.
4. Optionally clicks Kontaktujte nás / Napište nám to initiate contact.
5. On mobile, uses a collapsed menu (hamburger) and scrolls; tables and media are fluid; embeds are responsive.
6. Exits; no authentication prompts occur.

## Admin Journeys
### A) Authenticate and Enable Editing
1. Navigates to `/admin` (not publicly linked).
2. Signs in with Google.
3. System checks account against allowed admins list in page config.
   - Not allowed: access denied + sign‑out.
   - Allowed: show admin controls.
4. Enables edit mode for in‑place editing on `/`.

### B) In‑Place Editing on `/`
Editable scope mirrors public sections for 1:1 content parity:
- Hero/status: tagline, outage/notice banner text, webcam link URL; temperature and snow status are auto‑fetched (not manually edited), cached 1 hour.
- Aktuální akce a novinky: list items, ordering, visibility.
- Provozní doba: hours text.
- Parametry vleku: static (not editable).
- Lyžařská škola: descriptions, pricing (school), instructor contact.
- Ceník (lift pricing): table rows and values.
- Kontakty: manager contact, operator details, Wufoo contact form.

Edit flow:
1. Navigates to `/` with edit mode on; sees inline edit controls in scope.
2. Makes edits; previews updated content inline.
3. Saves; changes persist to Supabase (free instance).
4. Disables edit mode; public view reflects updates.
5. Signs out (optional).

## Connections Between Areas
- `/admin` controls authentication, authorization, and edit‑mode state affecting inline editing on `/`.
- Allowed admins list in config gates access to admin features.
- Edit‑mode state is session‑scoped; anonymous visitors never see edit controls.

## Mobile‑First and Responsiveness Requirements
- Navigation collapses on small screens; anchors are accessible via a mobile menu.
- Tables (Ceník) are readable on mobile (stacked, scrollable, or condensed layout).
- Images, gallery, and map scale fluidly with the viewport.
- Typography and spacing adapt for legibility on small screens; touch targets ≥ 44px.
- No horizontal scrolling on standard viewports; content fits within viewport width.

## Acceptance Criteria for the 1:1 Rebuild
- Section order, anchors, and Czech copy match the current public site.
- Content parity for all listed sections, including parameters, prices, contacts, links, and CTAs.
- Webkamera, Teplota, and Stav sněhu are present; Teplota/Stav sněhu are fetched from a free, reliable provider and cached for 1 hour.
- Mobile experience is fully responsive and usable across common breakpoints.
- Admin access is restricted to Google‑authenticated users in the allowed admins list.
- In‑place editing allows updates to the editable scope above and persists changes reliably.
- Design is mostly copied (layout, spacing, color/typography cues) within modern responsive best practices.
 - Contact form integrates existing Wufoo form.
 - Persistence for editable content uses a free Supabase instance.
 - Lift parameters remain static (not editable).
 - External links (Mapy.cz, bus schedules) open in a new tab.

## Connections (Systems)
- Supabase stores editable content and admin configuration.
- External services: weather provider (cached 1 hour), Mapy.cz, bus schedules, Flickr (links), Wufoo (contact form).