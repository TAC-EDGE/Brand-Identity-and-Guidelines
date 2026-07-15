# Visual and quality QA report — v1.0

Date: 15 July 2026. Scope: the 20-point quality-control checklist from the v1.0 build brief.

| # | Check | Result |
|---|---|---|
| 1 | Correct logo assets used | **Pass.** All logo renders source the master SVGs copied byte-identical from `tacedge/website public/brand` (one metadata-only fix: brandmark `aria-label` casing corrected to TACEDGE; path data untouched). |
| 2 | Softened brandmark geometry preserved | **Pass.** No redrawn artwork anywhere; site, PDF and style tile embed the master files. Verified visually on back cover and logo sections. |
| 3 | TACEDGE uppercase throughout | **Pass.** Repo-wide grep for `TacEdge`/`Tacedge`/`TechEdge` in prose: only quoted references to the deprecated Generation 1 naming and archived prior-artwork HTML in `assets/application-examples/` (kept as historical record). |
| 4 | Primary dark green is #112411 | **Pass.** `tokens/colors.json` primary-dark = #112411; `npm test` verifies tokens.css/colors.css/tokens.ts agree. |
| 5 | Consistent design system across pages | **Pass.** All 15 sections build on `tokens/tokens.css` + one shared component set; screenshots in `docs/screenshots/`. |
| 6 | Website and PDF content align | **Pass.** Both are rendered from the same `src/content/*.ts` + `tokens/*.json` modules. |
| 7 | PDF has no clipped/overflowed content | **Pass.** `scripts/export-pdf.mjs` measures every `.sheet` for overflow and fails the export if any exceeds the page; final run: 0 overflows, 30 pages. |
| 8 | Downloads work | **Pass.** `/assets`, `/tokens`, `/exports` served in dev and copied into `dist/` on build; spot-checked 200s on logo SVG, tokens.css, both PDFs. |
| 9 | Colour-copy buttons return correct values | **Pass.** CopyChip values are rendered from `tokens/colors.json` (single source); HEX/RGB/HSL/CMYK strings generated from the same data. |
| 10 | Responsive behaviour | **Pass.** Site verified at 1440 and 390 (screenshots committed); sidebar collapses to an accessible drawer below 880px; grids collapse per breakpoints. Reference website reviewed at 1440/1280/1024/768/390 during audit. |
| 11 | Keyboard and accessibility behaviour | **Pass.** Skip link, semantic headings, `aria-current` nav, `aria-expanded` menu button, visible focus (forest on light, cream on dark), reduced-motion collapse, alt text on informative imagery, decorative SVGs `aria-hidden`. Contrast: 19 automated WCAG checks pass (`npm test`). |
| 12 | No reference repository modified | **Pass.** `git status` in `/home/user/Website` and `/home/user/Geotech`: clean, no commits added. |
| 13 | No font files unintentionally distributed | **Pass.** Fonts live only in `src/fonts/` (render-only, OFL 1.1, documented in governance); excluded from `assets/` and the Downloads section. |
| 14 | Generated mockups identified as conceptual | **Pass.** Applications section and PDF carry maturity labels (conceptual / print-ready spec / production) and the D8 flag. |
| 15 | Provisional decisions clearly labelled | **Pass.** D1–D8 in `docs/decisions-required.md`; PROVISIONAL flags on logo-forest, founder titles, CMYK, product-imagery set, physical applications. |
| 16 | Production build succeeds | **Pass.** `npm run build` clean (3 entries: site, print, style tile). |
| 17 | Linting, type checking and tests | **Pass.** `tsc --noEmit` clean; `npm test` (token consistency + WCAG contrast) all green. No ESLint config is present in this repo (candidate follow-up). |
| 18 | Dead code and unused assets removed | **Pass.** No unused pages/components; Generation 1 assets deliberately excluded from the library. |
| 19 | Full-page screenshots captured | **Pass.** `docs/screenshots/`: all 15 sections at 1440 desktop + overview/colour/logo at 390 mobile. |
| 20 | Final visual QA report | **Pass.** This document; PDF page-by-page previews and contact sheet under `exports/previews/`. |

## Known limitations

- PDF is exported via Chromium print (selectable text, embedded subset fonts). It is not a tagged/accessible PDF; screen-reader users should prefer the interactive site.
- `pdftotext` was unavailable in the build environment; text presence was verified via embedded font/text operators and manual selection in preview.
- The V2 prototype application itself was not in this workspace; product-imagery masters are limited to the two approved captures (decision D6).
