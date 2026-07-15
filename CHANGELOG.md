# Changelog

All notable changes to the TACEDGE brand system are recorded here.
Versioning: major = visual identity changes · minor = new sections/assets · patch = corrections.

## [1.0.0] — 2026-07-15

First authoritative release.

### Added
- Brand audit of the website and Geotech product repositories (`docs/brand-audit.md`), rendered review at 1440/1280/1024/768/390.
- Open-decision register (`docs/decisions-required.md`, D1–D8).
- Design token package: `tokens/` (colors, typography, spacing, radii, shadows, breakpoints as JSON; `tokens.css`; `tokens.ts`; per-domain colour/typography files) with automated consistency + WCAG contrast checks (`npm test`).
- Approved asset library under `assets/` with manifest: logo SVG masters + PNG derivatives, six work-type icons, contour patterns (dark/light/currentColor), workflow photography, Whakaari origin image (master JPEG supplied by founder), V2 product captures, business-card and Hunter Civil leave-behind examples.
- Interactive guidelines site (React + Vite): 15 sections — Overview, Foundations, Messaging, Logo, Colour, Typography, Layout, Iconography, Graphic Language, Photography, Product Imagery, Digital UI, Applications, Downloads, Governance — with copy-to-clipboard colour values, live component demos, do/don't galleries and downloadable assets.
- PDF edition: `exports/TACEDGE_Brand_Identity_and_Guidelines_v1.0.pdf` (A4, 30 pages, selectable text, embedded fonts) plus per-page previews and a contact sheet.
- One-page style tile: `exports/TACEDGE_Style_Tile_v1.0.{pdf,png}` (A4 landscape).
- Project documentation: README, CLAUDE.md, `docs/governance.md`.

### Decisions formalised
- Palette locked to the website master tokens; `--ink-40` resolved to `#646A5A` (the stale styleguide value `#8A8F80` is superseded).
- `#2B4721` formalised as `logo-forest`, an artwork-only colour (provisional, D1).
- Success = forest fill (terminal-positive); information = utility sage; no blue in the palette.
- Icon system: one line family, stroke 1.6, 24/32px grids, four treatments, one arrow style.
- Clear space defined as one peak unit (brandmark height); minimum sizes set for lockup, wordmark, brandmark and app icon.
- "Founder" titles standardised to "Co-Founder" in templates (D2); web addresses written without `www.`.

### Deprecated
- Generation 1 brand implementation (Geotech tenant): forest `#2b4721` as a UI colour, cream `#fcf2e8`, glassmorphism theme, Inter as UI base, mixed-case "TacEdge", tagline "Shared Operational Clarity. Simple. Fast.", PNG-only logo lockups.
