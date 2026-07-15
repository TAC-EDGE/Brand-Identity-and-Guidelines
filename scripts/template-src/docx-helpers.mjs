// Shared docx builders for TACEDGE document templates.
import {
  Document, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  BorderStyle, AlignmentType, Header, Footer, PageNumber, TabStopType,
  convertMillimetersToTwip as mm, ShadingType, ImageRun, TableLayoutType,
} from "docx";
import { readFileSync } from "node:fs";
import { C, F, COMPANY } from "./brand.mjs";

export { mm };

export const HAIRLINE = { style: BorderStyle.SINGLE, size: 4, color: C.line };
export const NO_BORDER = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const borders = (b) => ({ top: b, bottom: b, left: b, right: b, insideHorizontal: b, insideVertical: b });

/** Base document options: A4, brand styles. Extra paragraph styles may be appended. */
export function baseDoc({ sections, description }) {
  return new Document({
    creator: "TACEDGE Limited",
    description,
    styles: {
      default: {
        document: { run: { font: F.ui, size: 21, color: C.ink } }, // 10.5pt
      },
      paragraphStyles: [
        { id: "Normal", name: "Normal", run: { font: F.ui, size: 21, color: C.ink }, paragraph: { spacing: { after: 160, line: 300 } } },
        { id: "Title", name: "Title", basedOn: "Normal", run: { font: F.display, size: 56, bold: true, color: C.ink }, paragraph: { spacing: { after: 240 } } },
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: F.display, size: 32, bold: true, color: C.ink }, paragraph: { spacing: { before: 420, after: 180 }, outlineLevel: 0 } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: F.display, size: 26, bold: true, color: C.ink }, paragraph: { spacing: { before: 320, after: 140 }, outlineLevel: 1 } },
        { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: F.ui, size: 22, bold: true, color: C.ink }, paragraph: { spacing: { before: 240, after: 100 }, outlineLevel: 2 } },
        { id: "Eyebrow", name: "Eyebrow", basedOn: "Normal", run: { font: F.mono, size: 16, color: C.ink40, allCaps: true, characterSpacing: 30 }, paragraph: { spacing: { after: 120 } } },
        { id: "Caption", name: "Caption", basedOn: "Normal", run: { size: 18, color: C.ink40 }, paragraph: { spacing: { after: 120 } } },
        { id: "Quote", name: "Quote", basedOn: "Normal", run: { size: 22, italics: false, color: C.ink60 }, paragraph: { indent: { left: mm(6) }, border: { left: { style: BorderStyle.SINGLE, size: 12, color: C.sage } }, spacing: { after: 200 } } },
        { id: "Note", name: "Note", basedOn: "Normal", run: { size: 19, color: C.ink60 }, paragraph: { shading: { type: ShadingType.CLEAR, fill: C.sageTint }, spacing: { after: 200 } } },
        { id: "Warning", name: "Warning", basedOn: "Normal", run: { size: 19, color: C.brick }, paragraph: { shading: { type: ShadingType.CLEAR, fill: C.brickTint }, spacing: { after: 200 } } },
        { id: "Placeholder", name: "Placeholder", basedOn: "Normal", run: { color: C.olive } },
        { id: "Mono", name: "Mono", basedOn: "Normal", run: { font: F.mono, size: 18, color: C.ink60 } },
      ],
    },
    sections,
  });
}

export const A4_PAGE = {
  page: {
    size: { width: mm(210), height: mm(297) },
    margin: { top: mm(22), bottom: mm(22), left: mm(20), right: mm(20) },
  },
};

/** Cream/forest logo header used on interior pages. */
export function brandHeader(docTitle, { logo = "ink" } = {}) {
  const img = readFileSync(`assets/logos/png/tacedge-lockup-${logo}-1200w.png`);
  return new Header({
    children: [
      new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: mm(170) }],
        spacing: { after: 120 },
        children: [
          new ImageRun({ type: "png", data: img, transformation: { width: 96, height: 19 } }),
          new TextRun({ text: `\t${docTitle}`, font: F.mono, size: 14, color: C.ink40, allCaps: true, characterSpacing: 20 }),
        ],
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: C.line2 } },
      }),
    ],
  });
}

export function brandFooter(leftText = COMPANY.legal) {
  return new Footer({
    children: [
      new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: mm(170) }],
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: C.line2 } },
        spacing: { before: 80 },
        children: [
          new TextRun({ text: leftText, font: F.mono, size: 14, color: C.ink40 }),
          new TextRun({ text: "\tPage ", font: F.mono, size: 14, color: C.ink40 }),
          new TextRun({ children: [PageNumber.CURRENT], font: F.mono, size: 14, color: C.ink40 }),
          new TextRun({ text: " of ", font: F.mono, size: 14, color: C.ink40 }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], font: F.mono, size: 14, color: C.ink40 }),
        ],
      }),
    ],
  });
}

export const h1 = (t) => new Paragraph({ style: "Heading1", text: t });
export const h2 = (t) => new Paragraph({ style: "Heading2", text: t });
export const h3 = (t) => new Paragraph({ style: "Heading3", text: t });
export const p = (t, style) => new Paragraph({ style: style ?? "Normal", text: t });
export const ph = (t) => new Paragraph({ style: "Placeholder", text: t });
export const eyebrow = (t) => new Paragraph({ style: "Eyebrow", text: t });
export const bullet = (t, style) => new Paragraph({ style: style ?? "Normal", text: t, bullet: { level: 0 } });
export const spacer = () => new Paragraph({ text: "" });

/** Hairline-bordered table with sage-tint header row. rows: string[][] (first row = header). */
export function brandTable(rows, { widths, headerRow = true } = {}) {
  const total = mm(170);
  const colW = widths ?? rows[0].map(() => Math.floor(total / rows[0].length));
  return new Table({
    width: { size: total, type: WidthType.DXA },
    layout: TableLayoutType.FIXED,
    borders: borders(HAIRLINE),
    rows: rows.map(
      (cells, r) =>
        new TableRow({
          tableHeader: headerRow && r === 0,
          children: cells.map(
            (cell, i) =>
              new TableCell({
                width: { size: colW[i], type: WidthType.DXA },
                shading: headerRow && r === 0 ? { type: ShadingType.CLEAR, fill: C.sageTint } : undefined,
                margins: { top: 90, bottom: 90, left: 110, right: 110 },
                children: [
                  new Paragraph({
                    spacing: { after: 0 },
                    children: [
                      new TextRun({
                        text: cell,
                        font: F.ui,
                        size: 19,
                        bold: headerRow && r === 0,
                        color: headerRow && r === 0 ? C.forest : cell.startsWith("[") ? C.olive : C.ink60,
                      }),
                    ],
                  }),
                ],
              })
          ),
        })
    ),
  });
}

/** Two-column label/value metadata table without header shading. */
export function metaTable(pairs) {
  return new Table({
    width: { size: mm(170), type: WidthType.DXA },
    layout: TableLayoutType.FIXED,
    borders: borders(HAIRLINE),
    rows: pairs.map(
      ([k, v]) =>
        new TableRow({
          children: [
            new TableCell({
              width: { size: mm(48), type: WidthType.DXA },
              shading: { type: ShadingType.CLEAR, fill: C.tint },
              margins: { top: 80, bottom: 80, left: 110, right: 110 },
              children: [new Paragraph({ spacing: { after: 0 }, children: [new TextRun({ text: k, font: F.ui, size: 19, bold: true, color: C.forest })] })],
            }),
            new TableCell({
              width: { size: mm(122), type: WidthType.DXA },
              margins: { top: 80, bottom: 80, left: 110, right: 110 },
              children: [new Paragraph({ spacing: { after: 0 }, children: [new TextRun({ text: v, font: F.ui, size: 19, color: v.startsWith("[") ? C.olive : C.ink60 })] })],
            }),
          ],
        })
    ),
  });
}

/** Forest cover block used on document covers (as a full-width shaded table cell). */
export function coverBlock({ eyebrowText, title, subtitle, footerLine }) {
  const img = readFileSync("assets/logos/png/tacedge-lockup-cream-2400w.png");
  const cell = (children) =>
    new TableCell({
      shading: { type: ShadingType.CLEAR, fill: C.forest },
      margins: { top: mm(10), bottom: mm(10), left: mm(10), right: mm(10) },
      borders: borders(NO_BORDER),
      children,
    });
  return new Table({
    width: { size: mm(170), type: WidthType.DXA },
    layout: TableLayoutType.FIXED,
    borders: borders(NO_BORDER),
    rows: [
      new TableRow({
        children: [
          cell([
            new Paragraph({ spacing: { after: 600 }, children: [new ImageRun({ type: "png", data: img, transformation: { width: 150, height: 30 } })] }),
            new Paragraph({ spacing: { after: 160 }, children: [new TextRun({ text: eyebrowText, font: F.mono, size: 16, color: C.sage, allCaps: true, characterSpacing: 30 })] }),
            new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: title, font: F.display, size: 60, bold: true, color: C.cream })] }),
            new Paragraph({ spacing: { after: 900 }, children: [new TextRun({ text: subtitle, font: F.ui, size: 24, color: C.sageTint })] }),
            new Paragraph({ spacing: { after: 0 }, children: [new TextRun({ text: footerLine, font: F.mono, size: 16, color: C.sage })] }),
          ]),
        ],
      }),
    ],
  });
}
