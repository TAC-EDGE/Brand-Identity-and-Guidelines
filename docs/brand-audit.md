# TACEDGE brand audit

Version 1.0 · 14 July 2026
Sources audited: `tacedge/website` (Next.js marketing site, collateral, budget PWA) and `tacedge/geotech` (RockControl multi-tenant product, V1 TACEDGE tenant).
Method: static code audit of both repositories plus rendered review of the website at 1440×900, 1280×800, 1024×768, 768×1024 and 390×844.

This document records what exists. The formal rules derived from it live in the guidelines site, the PDF and `tokens/`. Open questions live in `docs/decisions-required.md`.

---

## 1. The two brand generations

The evidence splits cleanly into two generations of the same brand.

**Generation 1 — Geotech repo (RockControl product, TACEDGE tenant).**
Forest `#2b4721`, cream `#fcf2e8`, olive `#6e7d5c`, sage `#b2b594`. Fonts Play + Be Vietnam Pro (plus Inter as UI base). Glassmorphism theme (`.theme-glass`: blur, gradient buttons, glass cards). Taglines: "Shared Operational Clarity. Simple. Fast.", "One operating picture for the field", "military-grade command-and-control discipline". Mixed-case "TacEdge" throughout. Raster-only logo assets (PNG lockup, rounded-square favicon with white T).

**Generation 2 — Website repo (current).**
Forest deepened to `#112411`, cream cooled to `#F7F5EC`, the same olive/sage family retained. Fonts consolidated to Play (display) + Be Vietnam Pro (UI/body) + JetBrains Mono (utility labels), self-hosted. No glass, no gradients: hairline borders, one soft shadow, flat colour fields. Promise tightened to "Shared Clarity." Category: "For ground-engineering delivery." Uppercase TACEDGE. Vector logo suite (SVG lockups, wordmarks, brandmark, favicon) with softened path geometry.

**Finding:** Generation 2 is the deliberate refinement and matches every approved foundation in the master brief. Generation 1 values, glass treatment and militarised taglines are **superseded** and must not become brand rules. The Geotech repo remains valuable as evidence of product UI principles (field usability, status language, touch targets) — not of visual identity.

---

## 2. Confirmed common patterns (strong evidence, adopted as rules)

### Colour
Defined in `Website/app/globals.css` ("from the product design system. Do not add colours.") and repeated verbatim in the business card and Hunter Civil leave-behind:

| Token | Hex | Role |
|---|---|---|
| `--forest` | `#112411` | Primary dark. Headers, primary buttons, dark sections |
| `--forest-2` | `#1A3219` | Hover / secondary green |
| `--forest-line` | `#1B331A` | Contour linework on forest surfaces |
| `--olive` | `#6E7D5C` | Working mid-tone |
| `--olive-edge` | `#AEB89C` | Green hairline / selected edge |
| `--sage` | `#B2B594` | Quiet surface, labels on dark, the brandmark colour |
| `--sage-tint` | `#E6EBD9` | Soft green fill: chips, tinted panels |
| `--cream` | `#F7F5EC` | Page background — the brand paper |
| `--card` | `#FFFFFF` | Card / surface |
| `--tint` | `#EFF1E4` | Faint green-grey fill, quiet panels |
| `--stage` | `#DDE3D2` | Backdrop behind device frames |
| `--ink` | `#242A1F` | Primary text |
| `--ink-60` | `#5B6253` | Secondary text |
| `--ink-40` | `#646A5A` | Utility text — AA on cream, tint and sage-tint |
| `--rule` / `--line` / `--line-2` | `#CBD2C9` / `#E7E2D6` / `#D9D3C4` | Hairlines |
| `--ochre` / `--ochre-tint` | `#B07D2B` / `#F5EBD4` | Caution status. Product UI only, never decorative |
| `--brick` / `--brick-tint` | `#9E3B2E` / `#F3DDD6` | Alert status. Product UI only, never decorative |

Alpha hairlines: `cream-line rgba(247,245,236,.16)`, `sage-line rgba(178,181,148,.5)`, `olive-line rgba(110,125,92,.28)`. Focus colour = forest (cream on dark surfaces).

The "status colours are never marketing accents" rule is written into the website styleguide and README. Adopted.

### Typography
- Display: **Play** 400/700. Headings are Play 700, letter-spacing .01em, line-height 1.08.
- UI/body: **Be Vietnam Pro** 400/500/600/700, body 18px/1.6.
- Utility: **JetBrains Mono** 400/500/700 — eyebrows and labels, 13px, uppercase, 0.16em tracking.
- All self-hosted woff2 (Google Fonts originals, SIL OFL 1.1).
- Responsive roles: H1 `clamp(52px, 6.3vw, 92px)`, H2 `clamp(33px, 4vw, 48px)`, H3 `clamp(24px, 2.5vw, 34px)`, card title 26px, lead `clamp(18px, 1.5vw, 21px)`, body 18px, card body 16px, label 13px.
- Component scale: 10/11/12/14/15/18/26/30/44/48 px.

### Layout
- Content max-width **1200px**; gutter `clamp(20px, 3.4vw, 32px)`.
- Section rhythm `clamp(64px, 9vw, 120px)`; tight variant `clamp(56px, 7vw, 96px)`.
- Responsive max-width breakpoints in active use: 1080, 980, 880, 720, 640, 420.
- Print margins in collateral: A4 with 12–13mm padding; business card 90×55mm trim + 3mm bleed.

### Shape, border, shadow
- Radii: 10 / 12 / 14 / 20 / 24 / pill; card 16, image 14, panel 20, large panel 24. Buttons 12.
- Borders: 1px hairlines everywhere; 1.5–2px only for emphasis rings.
- Shadows: three soft levels (`0 1px 2px .05` / `0 2px 10px .06` / `0 8px 28px .10`, all on `rgba(27,33,23,…)`) plus one device shadow. No glows, no glass.
- Buttons: 48px min-height, 600 weight, 140ms ease transitions, 1px active translate.

### Logo
- Suite in `Website/public/brand/`: horizontal lockup (sage brandmark + wordmark) in cream / forest / ink; wordmark alone in the same three; brandmark in sage; favicon (rounded-square tile); PNG app icons 192/512 + apple-touch-icon.
- Brandmark geometry is the **softened** version — path data is curve-based (C commands), no earlier sharp-cornered build exists in either repo as vector.
- Usage observed: cream lockup on the forest header/footer; forest lockup on light cards; brandmark used at small sizes and as the favicon tile.

### Graphic language
- **Contour motif**: 6 non-intersecting ridgelines, 1600×500 viewBox, stroke 1.1. On forest: stroke `#1B331A`, opacity .45. On light tinted panels: stroke forest at .055–.07. Rule in source: "behind dark bars and hero panels only, never over body text." Regenerated, not hand-edited.
- **Brandmark peaks over photography**: the Whakaari origin image places flat forest + cream peak silhouettes in front of the island. Respectful, factual captioning ("Whakaari / White Island, 2019").
- **Process diagrams**: one arrow style, hairline connectors, numbered pill markers reserved for Configure/Capture/Confirm.

### Iconography
- Marketing icons are custom single-stroke line icons: 32×32 grid (work types) and 24×24 (leave-behind), **stroke 1.6, round caps/joins, no fills**.
- Six work-type icons exist: Anchoring, Drilling, Shotcrete, Rockfall Protection, Drainage, Piling & Retaining.
- Containered treatment: 48px sage-tint circle with forest-2 line icon (informational); ringed variant with 1.5px olive-edge border (compact/cost lists); sage-ringed outline circles on forest surfaces.
- Product (Geotech) uses lucide-react — consistent stroke-icon philosophy at product scale.

### Messaging (locked copy, from `content/home.ts` + collateral + README rules)
- Promise: **"Shared Clarity."** (two lines in the hero, full stop retained).
- Category: **"For ground-engineering delivery."**
- Proposition: "Set the project up once. Capture the work where it happens. Give your engineer a confirmed report they can trust."
- Tagline: "No chasing. No re-keying. No rebuilding the report."
- Spine: **"Configure. Capture. Confirm."** — *release is the outcome of Confirm, never a fourth stage* (rule stated twice in source).
- Principle: "One work item. One connected record."
- Boilerplate line: "Shared clarity for ground-engineering delivery."
- Origin: "The plan existed. Shared clarity did not." + factual Whakaari 2019 account.
- Mission: "To bring shared clarity to the tactical edge."
- Claims discipline (README): no claims beyond drilling and anchoring in production in New Zealand and Samoa; Rock Control namable as field partner only; NZ spelling; no em dashes.
- CTA: primary "Arrange a demonstration"; secondary "See the workflow".

### Photography and product imagery
- Real documentary field photography: PM at desk configuring, rope-access operator capturing on phone, engineer reviewing a report. Natural light, muted grade that sits with the palette.
- Product imagery is real Geotech V2 prototype screens (QA queue desktop, B12 field capture mobile) in restrained graphite device frames (monitor with neck/base, phone with speaker/power button). Third-party names replaced with generic role labels.

---

## 3. Apparent inconsistencies (resolved where evidence supports it)

| # | Inconsistency | Evidence | Resolution |
|---|---|---|---|
| 1 | `--ink-40` listed as `#8A8F80` on the styleguide page but defined as `#646A5A` in globals.css and used as `#646A5A` in all collateral | globals.css:25 (comment: "AA ≥4.5:1 on cream") vs styleguide/page.tsx:26 | **Resolved: `#646A5A`.** The token was corrected for AA contrast; the styleguide page is stale. |
| 2 | Two forest greens: surfaces/buttons use `#112411`; the "forest" logo SVGs, favicon tile and Budget app use `#2B4721` | lockup/wordmark-forest.svg, favicon.svg, budget/index.css vs globals.css | **Resolved as two roles:** `#112411` is the surface/primary forest; `#2B4721` is the *logo green* used inside mark artwork on light grounds (better weight at logo sizes). Formalised as `logo-forest`, flagged for final confirmation in decisions-required. |
| 3 | Budget PWA palette drift: cream `#fcf2e8`, ink `#1b2117`, forest `#2b4721`, `olive` renamed `moss`, extra tokens (`blackwood`, `cream-deep`) | budget/src/index.css | **Not adopted.** Budget is an internal side product carrying Generation 1 values. Guidelines palette follows the website master tokens. |
| 4 | Geotech V1 tenant: cream `#fcf2e8`, glassmorphism, Inter as UI base, mixed-case "TacEdge", taglines "Shared Operational Clarity. Simple. Fast." / militarised language | tailwind.config.ts, index.css `.theme-glass`, useTenant.tsx, landing pages | **Superseded.** Generation 2 palette, no glass, TACEDGE uppercase, "Shared Clarity." only. Product repo should migrate when it next takes brand work (not done here — reference repos untouched). |
| 5 | Mike Coom's business card reads "Founder"; approved facts list both Mike Coom and Dan McPherson as "Co-Founder" | collateral/business-card html | **Guidelines standardise "Co-Founder"**; existing printed card noted as prior artwork. Listed in decisions-required for reprint timing. |
| 6 | Business card / leave-behind copy token subsets can drift from master tokens | collateral CSS comments | Rule adopted: collateral must consume tokens from this repository, never re-declare them. |
| 7 | Icon grids differ (32px marketing, 24px collateral, lucide 24px product) | WorkTypeIcon.tsx, leave-behind, Geotech | Formalised as one family with two grids (24 display / 32 work-type), stroke 1.6 constant at marketing scale; lucide accepted at product scale. |
| 8 | `favicon.svg` tile green `#2B4721` sits on the site alongside `#112411` surfaces | public/brand | Follows resolution #2 — tile uses logo-forest. Confirm at next favicon regeneration. |

---

## 4. Unresolved decisions

Collected with full context in `docs/decisions-required.md`. Headlines:

1. Final confirmation of `logo-forest #2B4721` inside mark artwork (vs re-inking marks to `#112411`).
2. Dan McPherson business card — no approved artwork exists yet; email confirmed (`dan@tacedge.co.nz`), Mike's title reprint.
3. Print colour: CMYK values in this system are mathematical conversions, unverified on press; no validated Pantone equivalents.
4. Vision statement wording is approved in the brief but appears nowhere in shipped copy yet.
5. Legacy product logo (`tacedge-logo.png` with "operational plans" tagline) retirement schedule.
6. The V2 prototype repo/branch is not in this workspace; product-imagery masters are limited to the two shipped screenshots.

## 5. Missing source assets

- **Vector master of the wordmark/brandmark at design-tool fidelity** (AI/Figma). The shipped SVGs are production-quality and are treated as the masters; they trace cleanly but a design-source file should be archived.
- Dan McPherson business card artwork.
- Land Rover vehicle concept artwork (referenced as approved work; not present in either repo — application guidance written as conceptual specification instead).
- Print-tested CMYK/Pantone values.
- Additional photography (current library: three workflow photos + Whakaari + two product screenshots).
- Apparel / signage artwork (no sources anywhere; documented as conceptual only).

## 6. Implementation details that must NOT become brand rules

- Next.js `basePath` handling, GitHub Pages deployment specifics.
- The website's exact HTML class names (`.hero__qa`, `.problem__aside` …) — the roles are the standard, not the selectors.
- Geotech's shadcn/Radix component internals, "elevate" hover utilities, tactical dashboard charcoals (`#0E1014`/`#16181C`) and Rock Control red palette (`#E23B2E` family) — all tenant/product implementation.
- Budget PWA's extra tokens.
- The device-frame CSS (graphite hex values `#262b25` etc.) is a presentation recipe, documented as the current approved recipe but replaceable by equivalent photographic frames.
- Google-Fonts CDN loading in Geotech (fonts must be self-hosted per Generation 2 practice).
