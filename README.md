# TACEDGE Brand & Design System

**Version 1.1 — the authoritative source of truth for the TACEDGE brand, and the practical source of truth for creating TACEDGE artefacts.**

This repository holds the brand system (foundations, messaging, logo standards, colour, typography, layout, iconography, graphic language, imagery direction, digital UI principles, applications), the approved asset library, machine-readable design tokens, the **template library** (presentation deck, meeting minutes, pilot proposal, technical report, letterhead, legal formatting, one-page collateral, email signature), an interactive guidelines-and-templates app and the printable PDF edition.

Authority flows downward:

```
TACEDGE Brand System  →  Website  →  Product interfaces  →  Documents and physical applications
```

The `tacedge/website` and Geotech V2 prototype repositories are **read-only references**: they consume this system and must never be treated as its source.

## Quick start

```bash
npm install
npm run dev        # interactive guidelines site at http://localhost:5173
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Run the guidelines site locally |
| `npm run build` | Production build to `dist/` (site + print + style-tile entries, plus `assets/`, `tokens/`, `exports/`, `docs/` copied in) |
| `npm run preview` | Serve the production build at http://localhost:4173 |
| `npm run typecheck` | TypeScript check |
| `npm test` | Token consistency + WCAG contrast checks (`scripts/check-tokens.mjs`) |
| `npm run export:templates` | Regenerate the PPTX deck, DOCX suite and one-page collateral exports |
| `npm run generate:pptx` / `generate:docx` / `export:one-page` | Individual template generators |
| `npm run export:pdf` | Export `exports/TACEDGE_Brand_Identity_and_Guidelines_v1.1.pdf` + page previews + contact sheet (needs `npm run preview` running) |
| `npm run export:style-tile` | Export `exports/TACEDGE_Style_Tile_v1.1.{pdf,png}` (needs preview running) |
| `npm run export:logo-pngs` | Regenerate PNG logo derivatives from the master SVGs |
| `npm run screenshots` | Full-page screenshots of every section to `docs/screenshots/` |

The export scripts drive the pre-installed Chromium via `playwright-core` (`CHROMIUM_PATH` overrides the executable path).

## Repository map

```
templates/     Template library: editable sources, PDF examples, PNG
               previews, per-template READMEs + manifest.json
assets/        Approved asset library (logos, icons, patterns, photography,
               product imagery, application examples) + asset-manifest.md
tokens/        Design tokens: JSON sources + tokens.css + tokens.ts
src/           Guidelines site (React + Vite). content/ holds all copy and
               data; pages/ are thin presenters; print/ is the PDF edition
docs/          brand-audit.md, decisions-required.md, governance.md,
               qa-report.md, screenshots/
exports/       PDF edition, style tile, page previews
scripts/       Export, screenshot and token-check scripts
```

Content is separated from presentation: guideline copy lives in `src/content/*.ts` and `tokens/*.json`, never hard-coded in page components.

## Updating tokens

1. Edit the JSON source in `tokens/` (e.g. `colors.json`).
2. Mirror the value in `tokens/tokens.css`, `tokens/colors.css` and `tokens/tokens.ts`.
3. Run `npm test` — it fails if any file disagrees or an approved combination breaks WCAG AA.
4. Rebuild and re-export the PDF so the site and PDF stay aligned.

**Do not add colours.** The palette is closed; see the Colour section and `docs/governance.md`.

## Adding approved assets

1. Place the file in the right `assets/` subfolder.
2. Add a row to `assets/asset-manifest.md` with format, intended use, background suitability, status (**approved** or **provisional**) and source.
3. Provisional assets must reference an open decision in `docs/decisions-required.md`.
4. Record the addition in `CHANGELOG.md`.

Never redraw or regenerate the logo artwork. The SVGs in `assets/logos/` are the masters.

## Fonts

Play, Be Vietnam Pro and JetBrains Mono are Google Fonts under the SIL Open Font Licence 1.1. The woff2 files in `src/fonts/` exist **solely to render this site and the PDF**; they are not part of the downloadable asset library. Consuming projects self-host their own copies from Google Fonts.

## Versioning

Semantic versioning, governed in `docs/governance.md`:
- **major** — visual identity changes (logo, palette, promise)
- **minor** — new sections, assets or applications
- **patch** — corrections

The site header, PDF cover and `CHANGELOG.md` must always state the same version. Open decisions awaiting founder approval are catalogued in `docs/decisions-required.md` and flagged **PROVISIONAL** wherever they surface.

## Templates

`templates/` is the template library; `templates/manifest.json` is its machine-readable register (version, status, owner, paths). Sources are generated programmatically — `scripts/generate-pptx.mjs`, `scripts/generate-docx.mjs`, the one-page HTML masters — so a brand change regenerates the whole suite. PDF examples come from LibreOffice conversion of the real files; PNG previews from `scripts/pdf-to-pngs.mjs`. Never edit exports by hand. Office files reference fonts by name (Play, Be Vietnam Pro, JetBrains Mono, from Google Fonts) with Arial/Consolas fallbacks; fonts are not distributed.
