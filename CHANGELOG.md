# Changelog

All notable changes to the TACEDGE brand system are recorded here.
Versioning: major = visual identity changes · minor = new sections/assets · patch = corrections.

## [Unreleased]

### Added
- **TACEDGE | Field Firing prototype** (branch work, not part of the brand system release): a fourth Vite entry (`field-firing.html`, `src/field-firing/`) demonstrating the All Arms Field Firing Safety planning workflow on the brand tokens — Activities, Create Activity, Activity Overview, Configure and Safety Plan, with a deterministic rules/workflow domain layer, audit trail and localStorage persistence. Demo data only; every requirement is marked SOURCE REQUIRED. Plan: `docs/field-firing/product-plan.md`.
- `npm run test:field-firing` (Node test runner over the deterministic rules), now part of `npm test`.
- `src/styles/fonts.css`: shared @font-face declarations extracted from `global.css` (unchanged rules) so the site and the prototype load the same self-hosted fonts.

## [1.1.0] — 2026-07-15

Brand & Design System: adds the template system to the v1.0 identity release.

### Added
- **Templates area** in the app: grouped navigation (Guidelines / Templates / Library), Template Overview with status cards, and eight guidance pages (Presentation Deck, Meeting Minutes, Pilot Proposal, Technical Report, Letterhead, Legal Documents, One-Page Collateral, Email Signature) with page previews rendered from the real files, an enlarging viewer, do/don't examples and downloads.
- **Template library** (`templates/`): PPTX presentation template (16:9, 22 approved layouts, generated with pptxgenjs); DOCX suite (meeting minutes, pilot proposal + one-page summary, technical report, letterhead, legal visual template — generated with docx.js, brand styles, placeholder fields, page numbering); one-page collateral HTML masters (blank + generic example, word-count limits, QR rules); email signature (HTML + plain text + installation guidance). Every template ships with PDF example, PNG previews, README and manifest metadata.
- **Template manifest** (`templates/manifest.json`): machine-readable register of versions, status, owners and paths.
- Generation/export pipeline: `generate-pptx.mjs`, `generate-docx.mjs`, `export-one-page.mjs`, `pdf-to-pngs.mjs`, npm scripts (`export:templates` etc.).
- PDF edition: new Templates chapter (now 31 pages); exports renamed to v1.1.
- Governance: template ownership, versioning, status, review, deprecation, customer-copy and source-vs-export rules (site + `docs/governance.md`); decisions D9, D10.
- `docs/templates-expansion-audit.md` (Phase 1 audit) and `docs/qa-report-v1.1.md`.

### Changed
- Site renamed to **TACEDGE Brand & Design System**; version 1.1 across app, PDF and style tile.
- Downloads page gains a Templates section driven by the manifest.

### Deprecated
- v1.0 export filenames (`TACEDGE_Brand_Identity_and_Guidelines_v1.0.pdf`, `TACEDGE_Style_Tile_v1.0.*`) replaced by v1.1 equivalents.

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
