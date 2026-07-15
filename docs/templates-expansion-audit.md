# Templates expansion audit (v1.0 → v1.1)

Date: 15 July 2026. Scope: Phase 1 audit before adding the Templates area to the approved Brand Guidelines app.

## Existing architecture (v1.0)

- **Framework:** React 19 + Vite 6 + TypeScript, hash-routed SPA (`src/App.tsx` maps slugs to page components). Three Vite entries: site (`index.html`), PDF edition (`print.html`), style tile (`style-tile.html`).
- **Content model:** all copy and data live in `src/content/*.ts` and `tokens/*.json`; pages are thin presenters. This is the pattern templates must follow.
- **Tokens:** `tokens/` JSON + `tokens.css` (+`tokens.ts`), enforced by `npm test` (consistency + WCAG contrast).
- **Navigation:** flat 15-item sidebar (forest, numbered mono labels, `aria-current`, mobile drawer under 880px).
- **Download system:** `DownloadCard` component; the Vite `repoStatics` plugin serves `/assets`, `/tokens`, `/exports`, `/docs` in dev and copies them into `dist/` on build. Adding `templates/` to this list is a one-line change.
- **PDF generation:** Playwright drives Chromium over the built preview; overflow-checked `.sheet` pages. Same approach is reusable for template PDF examples.
- **Asset organisation:** `assets/` + `assets/asset-manifest.md` with approved/provisional status; governance in `docs/governance.md`.
- **Current application examples:** business card and Hunter Civil leave-behind under `assets/application-examples/` (prior artwork, HTML+PDF+PNG) — the one-page collateral template formalises this format.

## Components reusable for the Templates area

`Section`, `PageHero`, `RuleList`, `TokenTable`, `DoDont`, `Flag`, `CopyChip`, `DownloadCard`, `ContourMotif`, status pills (`.status--*`), card/panel/grid CSS. The sidebar needs group headers but no rewrite.

## New components required

- **Grouped sidebar navigation** (Guidelines / Templates / Library separators).
- **TemplateCard** — name, purpose, format, version, status label, last-updated, preview thumbnail, download, guidance link.
- **TemplateDetail page (single generic component)** — driven by `src/content/templates.ts` + `templates/manifest.json`, so eight template pages share one presenter.
- **PagePreview** — framed A4/16:9 preview image with an "open full size" action (native link; no lightbox dependency).

## Recommended repository changes

- New top-level `templates/` library (one folder per template: editable source, exported PDF, PNG preview, README, metadata) with `templates/manifest.json` as the machine-readable manifest.
- Generation is **programmatic and repeatable**: `scripts/generate-pptx.mjs` (pptxgenjs), `scripts/generate-docx.mjs` (docx), shared brand constants in `scripts/template-src/brand.mjs`, HTML print twins in `scripts/template-src/html/` rendered by `scripts/export-template-previews.mjs` (Playwright) to PDF + PNG.
- Add `templates` to the `repoStatics` dirs so downloads work in dev and build.
- Version bump to 1.1 across site, PDF edition and changelog (`TACEDGE Brand & Design System`).

## Missing assets or fonts

- **Fonts in office files:** PPTX/DOCX reference fonts by name only (no embedding — fonts are not distributed). Machines without Play / Be Vietnam Pro / JetBrains Mono installed fall back per-file to Arial (body/headings) and Consolas/Courier New (mono). Documented on every template page and README. Install links: fonts.google.com.
- No design-tool (Figma/AI) sources exist for templates; the generation scripts are the editable master pipeline, and the PPTX/DOCX outputs are the user-editable sources.

## Risks to current functionality

| Risk | Mitigation |
|---|---|
| Nav overload with 9 new pages | Grouped sidebar with mono group headers; mobile drawer unchanged |
| Slug/route collisions | Template slugs namespaced under existing hash router; `templates` overview + `template-*` detail slugs |
| Larger repo (PPTX/PNG previews) | Previews at 1280px width, deck previews only per layout, no duplicate exports |
| PDF edition drift | v1.1 re-export in the same change; version stamped from one constant |
| Office-file corruption | Automated structural validation (unzip + XML checks) in QA; files also opened via archive inspection |

## Decisions requiring approval (added to decisions-required)

- **D9:** Template ownership defaults (owner: Mike Coom; approver: both founders) — confirm.
- **D10:** All eight v1.0 templates ship as **Provisional** until a founder reviews the exported files, at which point the manifest flips them to Approved. (Status labels are wired in the app; flipping is a one-line manifest change.)
