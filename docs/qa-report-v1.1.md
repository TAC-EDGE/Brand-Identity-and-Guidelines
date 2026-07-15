# QA report — v1.1 (Templates expansion)

Date: 15 July 2026. Scope: the template system added to the approved v1.0 app. The v1.0 report (`docs/qa-report.md`) remains valid for the foundation.

## App

| Check | Result |
|---|---|
| Existing guideline content, navigation, assets, tokens preserved | **Pass.** No v1.0 page content changed; nav gained grouped sections (Guidelines / Templates / Library) without removing anything. |
| Build / typecheck / tests | **Pass.** `vite build` clean (3 entries), `tsc --noEmit` clean, `npm test` (token consistency + 19 WCAG checks) green. |
| Templates overview + 8 detail pages | **Pass.** Manifest-driven cards (name, purpose, format, version, status, updated, preview, download, guidance link); status labels Approved / Provisional / In development / Deprecated wired; only Approved templates render as primary downloads. |
| Previews match exports | **Pass by construction.** Every preview PNG is rasterised (pdf.js) from the PDF that LibreOffice converted from the actual editable file. |
| Keyboard/accessibility | **Pass.** Preview strip buttons and dialog are keyboard-operable with aria labels; status badges are text, not colour alone; grouped nav keeps `aria-current`. |
| Tablet/mobile | **Pass.** Existing drawer nav handles the grouped list; template cards collapse to one column; preview strip scrolls horizontally. |
| Downloads work in dev and build | **Pass.** `templates/` added to the statics plugin; spot-checked 200s for PPTX, manifest.json and previews on the production preview. |

## Template files

| Check | Result |
|---|---|
| Archive integrity (7 office files) | **Pass.** `unzip -t` clean on the PPTX and all six DOCX. |
| Opens in standard software | **Pass (LibreOffice).** Impress/Writer load and convert every file; PowerPoint/Word validation on a founder machine is part of the D10 review. |
| Fonts | **Pass.** Files reference Play / Be Vietnam Pro / JetBrains Mono by name; no fonts embedded or distributed; Arial/Consolas fallbacks documented. |
| Correct logo + softened brandmark | **Pass.** All artwork placed from `assets/logos/png/` derivatives of the master SVGs. |
| #112411 primary dark | **Pass.** `scripts/template-src/brand.mjs` mirrors tokens; forest = 112411 in every generator. |
| Page sizes | **Pass.** Documents 210×297 mm (A4); deck 13.333×7.5 in (16:9). |
| Margins, headers, footers, page numbers | **Pass.** A4 docs: 20/22 mm margins, lockup header rule, `Page X of Y` footer. Deck: consistent footer + slide numbers on content master. |
| Editable placeholders, no lorem ipsum | **Pass.** [Bracketed] fields (olive in documents); meaningful example text only; repo-wide grep: no lorem ipsum. |
| No customer data in masters | **Pass.** Grep for Hunter Civil / Rock Control / Lyttelton: only the manifest's governance note referencing archived prior artwork. |
| No clipping/overflow | **Pass.** Deck inspected slide-by-slide via rendered contact sheet (image-ellipse defect found and fixed); document PDFs inspected page-by-page; one-page masters overflow-checked by the export script. |
| PDF text selectable | **Pass.** All PDF examples produced via LibreOffice/Chromium with real text operators. |

## Limitations

- LibreOffice (24.2) stands in for Microsoft Office in this environment; a native PowerPoint/Word open-and-edit check is included in the D10 founder review.
- The deck's PDF preview reflects LibreOffice rendering; minor metric differences in PowerPoint are possible (same fonts, so drift should be minimal).
- Email signature has no PDF/preview by nature; its HTML renders in the browser and is pasted per the README instructions.

## Items requiring final visual approval

All eight templates ship **Provisional** pending founder review (D10); template ownership defaults need confirmation (D9).
