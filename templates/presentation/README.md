# TACEDGE presentation deck template v1.0

Status: provisional (D10) · Owner: Mike Coom · Updated: 2026-07-15
Fonts: Play, Be Vietnam Pro, JetBrains Mono (install from Google Fonts; not distributed). Office fallbacks: Arial / Consolas.
Regenerate outputs with the scripts in /scripts — never edit exported PDFs or previews by hand.

## Files
- `TACEDGE_Presentation_Template_v1.0.pptx` — editable source, 16:9, 22 approved slide layouts.
- `TACEDGE_Presentation_Template_v1.0_preview.pdf` — rendered preview of every layout.
- `previews/slide-NN.png` — per-layout previews.

## Rules
- One message per slide. Short headlines, minimal body copy, evidence before claims.
- Maximum five bullets per slide; a slide needing more needs a document.
- Duplicate a layout slide and replace its content; do not draw new layouts.
- Real product screens only; status colours never decorative.
- Regenerate: `node scripts/generate-pptx.mjs` then convert/rasterise per README.
