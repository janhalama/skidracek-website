### Theme Rules — Tokens, Colors, and Component Styles

Defines theme tokens and styling conventions to achieve a look-and-feel close to the current public site while remaining maintainable and responsive. Reference site: https://www.skidracek.cz/.

Notes
- Use semantic tokens, not raw hex, in components. Calibrate hex values by sampling the current site where appropriate.
- Dark mode is not required now; tokens anticipate future extension.

## Color palette (semantic tokens)
Base
- `--color-bg`: page background (default)
- `--color-surface`: card/section background
- `--color-text`: primary body text
- `--color-text-muted`: secondary text
- `--color-border`: hairline borders and dividers

Brand and actions
- `--color-primary`: primary brand color (links, primary buttons)
- `--color-primary-foreground`: text/icons on primary
- `--color-accent`: subtle accents (badges, highlights)
- `--color-accent-foreground`: text/icons on accent

Status
- `--color-success` / `--color-success-foreground`
- `--color-warning` / `--color-warning-foreground`
- `--color-danger` / `--color-danger-foreground`
- `--color-info` / `--color-info-foreground`

Overlays and focus
- `--color-overlay`: scrim for dialogs/menus
- `--color-ring`: focus ring color

Recommended starting values (adjust to match current site)
- `--color-bg`: #ffffff
- `--color-surface`: #f9fafb
- `--color-text`: #0f172a
- `--color-text-muted`: #475569
- `--color-border`: #e5e7eb
- `--color-primary`: #0ea5e9
- `--color-primary-foreground`: #ffffff
- `--color-accent`: #38bdf8
- `--color-accent-foreground`: #0b1220
- `--color-success`: #22c55e / `--color-success-foreground`: #052e12
- `--color-warning`: #f59e0b / `--color-warning-foreground`: #291800
- `--color-danger`: #ef4444 / `--color-danger-foreground`: #300307
- `--color-info`: #3b82f6 / `--color-info-foreground`: #07142e
- `--color-overlay`: rgba(2, 6, 23, 0.6)
- `--color-ring`: #0ea5e9

Rationale
- The site emphasizes clarity and a light, friendly look; a cool primary (sky/blue) maps well to the existing styling while staying legible and accessible.

## Typography
- Font stack (system-first for performance):
  - `--font-sans`: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"
- Sizes (Tailwind scale reference):
  - `--text-xs`: 12px; `--text-sm`: 14px; `--text-base`: 16px; `--text-lg`: 18px
  - `--text-xl`: 20px; `--text-2xl`: 24px; `--text-3xl`: 30px; `--text-4xl`: 36px
- Line heights: 1.5 for body; tighter for headings (1.2–1.3) without clipping diacritics.
- Letter spacing: normal; avoid excessive tracking on headings to preserve readability in Czech.

## Radii and shadows
- Radius tokens
  - `--radius-xs`: 4px; `--radius-sm`: 6px; `--radius-md`: 8px; `--radius-lg`: 12px
- Shadows (subtle, avoid heavy drop shadows)
  - `--shadow-sm`: 0 1px 2px rgba(2, 6, 23, 0.05)
  - `--shadow-md`: 0 4px 10px rgba(2, 6, 23, 0.07)
  - `--shadow-lg`: 0 10px 20px rgba(2, 6, 23, 0.10)

## Spacing and layout
- Spacing scale (4px base): 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80
- Section padding: mobile 24–40px; desktop 48–80px
- Container widths: center content; respect Tailwind container defaults; never full-bleed text.

## Focus, states, and motion
- Focus ring: 2px `--color-ring` with 2px offset on focusable elements.
- Hover/active: 4–8% lightness changes for surfaces and buttons; preserve contrast.
- Motion: subtle transitions (150–200ms); respect `prefers-reduced-motion`.

## Component tokens and rules
Buttons
- Primary: bg `--color-primary`, text `--color-primary-foreground`.
- Secondary: outline with `--color-border`; hover bg `--color-surface`.
- Ghost: transparent bg; hover subtle `--color-surface`.
- Destructive: bg `--color-danger`, text `--color-danger-foreground`.
- Sizes: sm 32px, md 40px, lg 48px height; horizontal padding 12/16/20px.

Links
- Text links: color `--color-primary`; underline on hover; visited color darkened ~10%.
- External: include `rel="noopener noreferrer"`; optional icon.

Badges
- Neutral: bg `--color-surface`, text `--color-text-muted`, border `--color-border`.
- Status: success/warning/danger/info tokens; ensure ≥ 4.5:1 contrast.

Cards/Surfaces
- Background `--color-surface`; border `--color-border`; radius `--radius-md`; shadow `--shadow-sm`.
- Heading spacing top/bottom consistent; avoid dense content blocks.

Tables (Ceník)
- Header: medium weight, `--color-text`.
- Rows: zebra optional using 1–2% bg tint; borders `--color-border`.
- Mobile: stacked or horizontal scroll; keep line-height ≥ 1.4.

Forms
- Input bg: #ffffff; text `--color-text`; border `--color-border`; radius `--radius-sm`.
- Focus: ring `--color-ring`; border slightly darkened primary.
- Error: border `--color-danger`; helper text in `--color-danger`.

Banner (Outage/Notice)
- High visibility: bg blends `--color-warning` at ~10–15% tint; text `--color-text`.
- For critical outages: use `--color-danger` tint; ensure legibility.

Hero
- Clear hierarchy: H1 in `--text-4xl` on desktop, `--text-3xl` mobile.
- Status badges grouped with consistent gap; CTA uses Primary button.

Footer
- Subtle background (slightly darker surface); low-contrast text using `--color-text-muted`.

## CSS variables scaffold
Place in a global stylesheet and reference in Tailwind config via CSS variables.

```css
:root {
  --color-bg: #ffffff;
  --color-surface: #f9fafb;
  --color-text: #0f172a;
  --color-text-muted: #475569;
  --color-border: #e5e7eb;

  --color-primary: #0ea5e9;
  --color-primary-foreground: #ffffff;
  --color-accent: #38bdf8;
  --color-accent-foreground: #0b1220;

  --color-success: #22c55e;
  --color-success-foreground: #052e12;
  --color-warning: #f59e0b;
  --color-warning-foreground: #291800;
  --color-danger: #ef4444;
  --color-danger-foreground: #300307;
  --color-info: #3b82f6;
  --color-info-foreground: #07142e;

  --color-overlay: rgba(2, 6, 23, 0.6);
  --color-ring: #0ea5e9;

  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
}

html { color: var(--color-text); background: var(--color-bg); }
```

## Tailwind config mapping (example)
Extend Tailwind to consume the CSS variables for colors and radius.

```ts
// tailwind.config.ts (excerpt)
import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)'
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)'
        },
        success: {
          DEFAULT: 'var(--color-success)',
          foreground: 'var(--color-success-foreground)'
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          foreground: 'var(--color-warning-foreground)'
        },
        danger: {
          DEFAULT: 'var(--color-danger)',
          foreground: 'var(--color-danger-foreground)'
        },
        info: {
          DEFAULT: 'var(--color-info)',
          foreground: 'var(--color-info-foreground)'
        },
        ring: 'var(--color-ring)'
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)'
      }
    }
  }
} satisfies Config
```

## Calibration checklist against current site
- Sample primary link/button color and update `--color-primary` and `--color-accent`.
- Verify contrast for badges and banners; adjust foreground tokens if needed.
- Ensure heading sizes align visually with the current hero and section titles.
- Match spacing rhythm for sections and cards.
- Validate table readability on mobile and desktop.


