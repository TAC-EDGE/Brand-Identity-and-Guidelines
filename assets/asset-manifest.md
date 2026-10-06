# TACEDGE asset manifest

Status values: **approved** (use freely within the rules) · **provisional** (usable, pending a decision in `docs/decisions-required.md`) · **derived** (generated from an approved master — regenerate, never edit).

The SVG files are the master logo assets. Never redraw, trace, approximate or regenerate the artwork itself. Fonts are not distributed here — see `docs/governance.md` for sources and licences.

## Logos

| File | Format | Intended use | Background | Status | Source |
|---|---|---|---|---|---|
| `logos/horizontal/tacedge-lockup-cream.svg` | SVG | Primary horizontal lockup on dark/forest surfaces | Forest, dark photography | approved | Website `public/brand` |
| `logos/horizontal/tacedge-lockup-forest.svg` | SVG | Primary horizontal lockup on light surfaces | Cream, white, sage-tint | approved (wordmark green: provisional, D1) | Website `public/brand` |
| `logos/horizontal/tacedge-lockup-ink.svg` | SVG | Monochrome lockup: single-colour print, fax-grade reproduction, embossing | Light | approved | Website `public/brand` |
| `logos/brandmark/tacedge-brandmark-sage.svg` | SVG | Standalone brandmark: small spaces, watermarks, geometric crops | Forest or cream | approved | Website `public/brand` |
| `logos/light/tacedge-wordmark-forest.svg` | SVG | Wordmark alone on light surfaces (only where the brandmark appears nearby) | Cream, white | approved (green: provisional, D1) | Website `public/brand` |
| `logos/dark/tacedge-wordmark-cream.svg` | SVG | Wordmark alone on forest surfaces | Forest | approved | Website `public/brand` |
| `logos/monochrome/tacedge-wordmark-ink.svg` | SVG | Monochrome wordmark | Light | approved | Website `public/brand` |
| `logos/app-icon/tacedge-app-icon.svg` | SVG | App icon / favicon master (rounded-square tile) | Any | provisional (tile green, D1) | Website `public/brand/favicon.svg` |
| `logos/app-icon/icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | PNG | Web manifest and home-screen icons | Any | derived | Website `public/brand` |
| `logos/social/tacedge-avatar-forest.svg` | SVG | Social and messaging avatar (WhatsApp, LinkedIn, Teams): brandmark centred on primary dark, sized for a circular crop | Any (square, cropped round by the platform) | provisional (D1: chosen by the founders 6 Oct 2026; primary dark, not logo-forest) | This repository |
| `logos/social/tacedge-avatar-forest-1024.png` | PNG | Upload-ready 1024 × 1024 avatar | Any | derived | Rendered from the SVG above |
| `logos/png/*.png` | PNG | Raster exports for Office documents, signatures, suppliers without SVG support | As per source | derived | `npm run export:logo-pngs` |

## Icons

| File | Format | Intended use | Status | Source |
|---|---|---|---|---|
| `icons/worktype-anchoring.svg` | SVG 32px, stroke 1.6 | Anchoring work type | approved | Website `WorkTypeIcon.tsx` |
| `icons/worktype-drilling.svg` | SVG | Drilling work type | approved | Website `WorkTypeIcon.tsx` |
| `icons/worktype-shotcrete.svg` | SVG | Shotcrete work type | approved | Website `WorkTypeIcon.tsx` |
| `icons/worktype-rockfall-protection.svg` | SVG | Rockfall protection work type | approved | Website `WorkTypeIcon.tsx` |
| `icons/worktype-drainage.svg` | SVG | Drainage work type | approved | Website `WorkTypeIcon.tsx` |
| `icons/worktype-piling-retaining.svg` | SVG | Piling & retaining work type | approved | Website `WorkTypeIcon.tsx` |

General informational icons come from an existing consistent line-icon family (product uses Lucide). Do not invent detailed custom icons where a suitable one exists.

## Patterns

| File | Format | Intended use | Status | Source |
|---|---|---|---|---|
| `patterns/tacedge-contour-dark.svg` | SVG 1600×500 | Topographic motif on forest surfaces (stroke #1B331A, 0.45) | derived (from approved path data) | Website `contour-paths.ts` |
| `patterns/tacedge-contour-light.svg` | SVG 1600×500 | Topographic motif on light tinted panels (stroke forest, 0.07) | derived | Website `contour-paths.ts` |
| `patterns/tacedge-contour-lines-only.svg` | SVG | currentColor version for developers | derived | Website `contour-paths.ts` |

## Photography

| File | Format | Intended use | Status | Source |
|---|---|---|---|---|
| `photography/photo-configure-pm.webp` | WebP | Configure phase: PM at desktop | approved | Website `public/product` |
| `photography/photo-capture-abseil.webp` | WebP | Capture phase: rope-access operator recording on phone | approved | Website `public/product` |
| `photography/photo-confirm-engineer.webp` | WebP | Confirm phase: engineer reviewing report | approved | Website `public/product` |
| `photography/photo-whakaari-peaks.webp` | WebP | Origin story: Whakaari / White Island 2019 with brandmark peaks. Use respectfully and factually, always captioned | approved | Website `public/product` |
| `photography/photo-whakaari-peaks-master.jpeg` | JPEG (967×628) | Master of the above | approved | Supplied by founder, July 2026 |

## Product imagery

| File | Format | Intended use | Status | Source |
|---|---|---|---|---|
| `product-imagery/tacedge-qa-queue-desktop.webp` | WebP | Real V2 prototype QA queue (desktop). Present in device frame per Product Imagery rules | approved | Website `public/product` |
| `product-imagery/tacedge-field-capture-b12.webp` | WebP | Real V2 prototype field capture (mobile) | approved | Website `public/product` |

## Application examples

| File | Format | Intended use | Status | Source |
|---|---|---|---|---|
| `application-examples/business-card/TACEDGE_Business_Card_Mike_Coom*.{html,pdf,png}` | HTML/PDF/PNG | Business card 90×55mm +3mm bleed. Title reads "Founder" — see D2 before reprinting | approved (prior artwork) | Website `collateral/` |
| `application-examples/leave-behind/TACEDGE_Hunter_Civil_Leave_Behind_15_July_2026.*` | HTML/PDF/PNG | A4 one-page leave-behind, reference layout | approved (prior artwork) | Website `collateral/` |

## Explicitly excluded

- **Fonts** — not redistributed. Play, Be Vietnam Pro, JetBrains Mono: Google Fonts, SIL OFL 1.1. (The guidelines site self-hosts copies solely to render itself; they are not download assets.)
- **Generation 1 logos** (`tacedge-logo.png`, `telogo1.png`, rounded-square "T" favicon from the Geotech repo) — superseded; kept out of the library to prevent reuse.
- **Land Rover vehicle concept** — referenced approved work, artwork not present in audited repos (D8).
