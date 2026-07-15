# Decisions required

Items the audit could not resolve with confidence. Each is marked in the guidelines as **PROVISIONAL — REQUIRES FINAL APPROVAL**. None block use of Version 1.0.

Approver: TACEDGE founders (see `docs/governance.md`).

---

## D1. Logo green (`#2B4721`) inside mark artwork

The approved primary dark green is `#112411`. The shipped logo SVGs (`tacedge-lockup-forest`, `tacedge-wordmark-forest`, `favicon.svg` tile) fill with `#2B4721` — a lighter forest that reads with more weight at logo sizes and is the green the mark has always carried (it is also Generation 1's primary).

**v1.0 position (provisional):** `#2B4721` is formalised as `logo-forest`, permitted **only inside logo artwork on light grounds and the app-icon tile**. It is not a UI or surface colour.
**Alternative:** re-ink the marks to `#112411` and retire `#2B4721` entirely. Requires regenerating the SVG suite from master artwork — do not redraw by hand.
**Decide:** keep `logo-forest`, or re-ink.

## D2. Founder titles and second business card

- Mike Coom's printed card reads **"Founder"**; the approved facts list **"Co-Founder"** for both founders. v1.0 templates use "Co-Founder".
- No Dan McPherson card artwork exists. Approved details on file: Co-Founder, +64 27 444 2483, dan@tacedge.co.nz.
- Mike's card shows mike@tacedge.co.nz and `www.tacedge.co.nz`; brand standard elsewhere drops `www.` → templates use `tacedge.co.nz`.

**Decide:** confirm titles, confirm both email addresses as printed, approve Dan's card for production, and whether existing "Founder" stock is used up or reprinted.

## D3. Print colour values

All CMYK values in this system are mathematical conversions from RGB and are labelled *"Indicative CMYK — verify with the selected printer and stock."* No Pantone equivalents are published — candidates exist (e.g. deep greens in the 5605/3435 region) but must be drawn down on stock before approval.

**Decide:** commission a print test (forest, cream, sage, olive on coated + uncoated) and lock CMYK/Pantone builds.

## D4. Vision statement in public copy

Approved vision: *"To make shared clarity the standard for field teams operating in dynamic, high-risk environments."* It appears in the foundations here but in no shipped copy. **Decide:** where (if anywhere) the vision appears publicly — About page is the natural home.

## D5. Legacy Generation 1 assets in the product

The product still ships `tacedge-logo.png` / `telogo1.png` (tagline "Shared Operational Clarity. Simple. Fast."), cream `#fcf2e8`, glass theme and mixed-case "TacEdge" strings. These are superseded. **Decide:** schedule for migrating the product tenant to Generation 2 tokens and the SVG logo suite. (Out of scope here — reference repos were not modified.)

## D6. Product-imagery masters

Only two approved V2 prototype captures exist (QA queue desktop, B12 field capture mobile). The V2 prototype itself is not in this workspace. **Decide:** capture an approved screenshot set (list in the Product Imagery section) at 2× resolution from the live prototype.

## D7. Design-source master for the logo

The production SVGs are adopted as the master assets. No design-tool source (AI/Figma) is archived in either repo. **Decide:** locate or commission the design source and archive it under `assets/logos/source/`. Until then, the SVGs in this repository are canonical and must never be redrawn or traced.

## D8. Physical applications

Vehicle (Land Rover concept), apparel and signage guidance in v1.0 is **conceptual specification only** — no supplier-ready artwork exists in the audited repos. **Decide:** which physical applications proceed to supplier-ready artwork, produced from the master SVGs with the print-tested colours from D3.

## D9. Template ownership defaults

v1.1 assigns every template `owner: Mike Coom`, `approver: TACEDGE founders` in `templates/manifest.json`. **Decide:** confirm or reassign per template.

## D10. Template approval (v1.1)

All eight v1.0 templates (presentation deck, meeting minutes, pilot proposal + summary, technical report, letterhead, legal visual template, one-page collateral, email signature) ship as **Provisional** pending founder review of the exported files. **Decide:** review each template's PDF example and flip its manifest status to `approved` (a one-line change per template).
