// Generates templates/presentation/TACEDGE_Presentation_Template_v1.0.pptx
// 16:9, 22 approved layouts, editable text, brand tokens throughout.
// Usage: node scripts/generate-pptx.mjs
import pptxgen from "pptxgenjs";
import { C, F, COMPANY, ASSETS } from "./template-src/brand.mjs";

const pptx = new pptxgen();
pptx.defineLayout({ name: "WIDE", width: 13.333, height: 7.5 });
pptx.layout = "WIDE";
pptx.author = "TACEDGE Limited";
pptx.company = "TACEDGE Limited";
pptx.subject = "TACEDGE presentation template v1.0";
pptx.title = "TACEDGE Presentation Template";

const W = 13.333, H = 7.5, M = 0.7;          // page, margin (inches)
const CW = W - M * 2;                          // content width

/* ---------------- masters ---------------- */

pptx.defineSlideMaster({
  title: "COVER",
  background: { color: C.forest },
  objects: [
    { image: { path: ASSETS.contourDarkPng, x: 0, y: 4.4, w: W, h: 3.1, transparency: 40 } },
    { image: { path: ASSETS.lockupCreamPng, x: M, y: 0.55, w: 2.6, h: 0.51 } },
  ],
});

pptx.defineSlideMaster({
  title: "DARK",
  background: { color: C.forest },
  objects: [
    { image: { path: ASSETS.contourDarkPng, x: 0, y: 4.4, w: W, h: 3.1, transparency: 40 } },
  ],
  slideNumber: { x: W - 1.0, y: H - 0.42, w: 0.5, color: C.sage, fontFace: F.mono, fontSize: 8 },
});

pptx.defineSlideMaster({
  title: "CONTENT",
  background: { color: C.cream },
  objects: [
    { line: { x: M, y: H - 0.52, w: CW, h: 0, line: { color: C.line2, width: 0.75 } } },
    { text: {
        text: "TACEDGE · [Presentation title]",
        options: { x: M, y: H - 0.46, w: 6, h: 0.3, fontFace: F.mono, fontSize: 8, color: C.ink40, charSpacing: 2 },
    } },
  ],
  slideNumber: { x: W - 1.0, y: H - 0.46, w: 0.5, color: C.ink40, fontFace: F.mono, fontSize: 8 },
});

/* ---------------- helpers ---------------- */

const eyebrow = (slide, text, opts = {}) =>
  slide.addText(text.toUpperCase(), {
    x: M, y: 0.55, w: CW, h: 0.32, fontFace: F.mono, fontSize: 11,
    color: opts.dark ? C.sage : C.ink40, charSpacing: 4, ...opts,
  });

const title = (slide, text, opts = {}) =>
  slide.addText(text, {
    x: M, y: 0.92, w: opts.w ?? CW, h: opts.h ?? 0.9, fontFace: F.display, bold: true,
    fontSize: opts.fontSize ?? 28, color: opts.color ?? C.ink, ...opts,
  });

const body = (slide, text, opts = {}) =>
  slide.addText(text, {
    x: M, y: 2.0, w: CW, h: 4.4, fontFace: F.ui, fontSize: 14, color: C.ink60,
    lineSpacingMultiple: 1.35, valign: "top", ...opts,
  });

const card = (slide, x, y, w, h) =>
  slide.addShape("roundRect", {
    x, y, w, h, rectRadius: 0.08, fill: { color: C.card },
    line: { color: C.line, width: 0.75 },
  });

const bullets = (text) => text.map((t) => ({ text: t, options: { bullet: { characterCode: "2022", indent: 14 }, paraSpaceAfter: 8 } }));

/* ---------------- 22 layouts ---------------- */

// 1 · Cover
let s = pptx.addSlide({ masterName: "COVER" });
s.addText(COMPANY.promise, { x: M, y: 2.3, w: 9, h: 1.9, fontFace: F.display, bold: true, fontSize: 54, color: C.cream });
s.addText(COMPANY.category, { x: M, y: 4.15, w: 9, h: 0.4, fontFace: F.ui, bold: true, fontSize: 15, color: C.sage });
s.addText("[Presentation title] · [Audience] · [Date]", { x: M, y: 6.6, w: 9, h: 0.35, fontFace: F.mono, fontSize: 10, color: C.sage, charSpacing: 2 });

// 2 · Minimal cover
s = pptx.addSlide({ masterName: "DARK" });
s.addImage({ path: ASSETS.brandmarkPng, x: W / 2 - 0.55, y: 2.35, w: 1.1, h: 1.01 });
s.addText("[Presentation title]", { x: 1.5, y: 3.75, w: W - 3, h: 0.85, align: "center", fontFace: F.display, bold: true, fontSize: 32, color: C.cream });
s.addText("[Subtitle or date]", { x: 1.5, y: 4.6, w: W - 3, h: 0.4, align: "center", fontFace: F.ui, fontSize: 14, color: C.sage });

// 3 · Agenda
s = pptx.addSlide({ masterName: "CONTENT" });
eyebrow(s, "Agenda");
title(s, "What we will cover.");
["The problem we keep seeing", "How TACEDGE structures the workflow", "What a pilot looks like", "Evidence from live work", "Next steps and decision point"].forEach((item, i) => {
  const y = 2.15 + i * 0.82;
  s.addText(String(i + 1).padStart(2, "0"), { x: M, y, w: 0.6, h: 0.5, fontFace: F.mono, fontSize: 13, color: C.olive });
  s.addText(item, { x: M + 0.7, y, w: CW - 0.7, h: 0.5, fontFace: F.ui, fontSize: 16, color: C.ink });
  s.addShape("line", { x: M, y: y + 0.62, w: CW, h: 0, line: { color: C.line, width: 0.75 } });
});

// 4 · Section divider
s = pptx.addSlide({ masterName: "DARK" });
s.addText("01".toUpperCase(), { x: M, y: 2.2, w: 2, h: 0.5, fontFace: F.mono, fontSize: 14, color: C.sage, charSpacing: 4 });
s.addText("[Section title]", { x: M, y: 2.75, w: 10.5, h: 1.3, fontFace: F.display, bold: true, fontSize: 40, color: C.cream });

// 5 · Headline + body
s = pptx.addSlide({ masterName: "CONTENT" });
eyebrow(s, "[Section]");
title(s, "One clear message per slide.");
body(s, [
  { text: "Lead with the outcome. Support it with two or three short sentences at most. If the slide needs a paragraph, it needs a document instead.", options: {} },
], { w: 8.5 });

// 6 · Two-column content
s = pptx.addSlide({ masterName: "CONTENT" });
eyebrow(s, "[Section]");
title(s, "Two-column content.");
const colW = (CW - 0.5) / 2;
[["Before TACEDGE", ["Field records arrive fragmented", "Hours of data entry and chasing", "Reports rebuilt from fragments"]],
 ["With TACEDGE", ["Captured once at the workface", "Live picture for the PM", "Confirmed report released to the engineer"]]].forEach(([h, items], i) => {
  const x = M + i * (colW + 0.5);
  s.addText(h, { x, y: 2.05, w: colW, h: 0.4, fontFace: F.ui, bold: true, fontSize: 15, color: C.ink });
  s.addText(bullets(items), { x, y: 2.55, w: colW, h: 3.6, fontFace: F.ui, fontSize: 13.5, color: C.ink60, lineSpacingMultiple: 1.3, valign: "top" });
});

// 7 · Three-column content
s = pptx.addSlide({ masterName: "CONTENT" });
eyebrow(s, "[Section]");
title(s, "Three supporting points.");
const c3 = (CW - 0.8) / 3;
[["Field usability", "Simple crew controls, offline-first capture, large touch targets."],
 ["Evidence integrity", "Photos, tests and measurements attach to the work item as it happens."],
 ["QA visibility", "Exceptions surface for judgement. Everything else flows through."]].forEach(([h, t], i) => {
  const x = M + i * (c3 + 0.4);
  card(s, x, 2.1, c3, 3.2);
  s.addText(h, { x: x + 0.25, y: 2.4, w: c3 - 0.5, h: 0.6, fontFace: F.display, bold: true, fontSize: 16, color: C.ink });
  s.addText(t, { x: x + 0.25, y: 3.05, w: c3 - 0.5, h: 2.0, fontFace: F.ui, fontSize: 12.5, color: C.ink60, lineSpacingMultiple: 1.3, valign: "top" });
});

// 8 · Full-width image
s = pptx.addSlide({ masterName: "CONTENT" });
eyebrow(s, "[Section]");
title(s, "Full-width image.");
s.addImage({ path: "scripts/template-src/img-photo-capture.png", x: M, y: 2.0, w: CW, h: 4.4, sizing: { type: "cover", w: CW, h: 4.4 } });
s.addText("Caption: place, activity, year. [Replace with your image]", { x: M, y: 6.5, w: CW, h: 0.3, fontFace: F.ui, fontSize: 10.5, color: C.ink40 });

// 9 · Image + text
s = pptx.addSlide({ masterName: "CONTENT" });
eyebrow(s, "[Section]");
title(s, "Image and text.");
s.addImage({ path: "scripts/template-src/img-photo-configure.png", x: M, y: 2.0, w: 5.9, h: 4.3, sizing: { type: "cover", w: 5.9, h: 4.3 } });
s.addText("Say one thing about the image.", { x: M + 6.4, y: 2.1, w: CW - 6.4, h: 0.9, fontFace: F.ui, bold: true, fontSize: 16, color: C.ink });
s.addText(bullets(["Set the project up once", "Capture the work where it happens", "Give the engineer a confirmed report"]), { x: M + 6.4, y: 3.0, w: CW - 6.4, h: 3.0, fontFace: F.ui, fontSize: 13.5, color: C.ink60, lineSpacingMultiple: 1.3, valign: "top" });

// 10 · Product screenshot
s = pptx.addSlide({ masterName: "CONTENT" });
eyebrow(s, "Product");
title(s, "Real screens only.");
s.addShape("roundRect", { x: 2.4, y: 1.95, w: 8.5, h: 4.65, rectRadius: 0.1, fill: { color: "262B25" } });
s.addImage({ path: "scripts/template-src/img-qa-queue.png", x: 2.62, y: 2.18, w: 8.06, h: 4.2 });
s.addText("TACEDGE QA queue · [replace with the screen relevant to your story]", { x: 2.4, y: 6.72, w: 8.5, h: 0.3, align: "center", fontFace: F.ui, fontSize: 10.5, color: C.ink40 });

// 11 · Problem / solution
s = pptx.addSlide({ masterName: "CONTENT" });
eyebrow(s, "The problem");
title(s, "Field data becomes project overhead.");
card(s, M, 2.1, colW, 3.4);
s.addText("THE CURRENT WAY", { x: M + 0.25, y: 2.35, w: colW - 0.5, h: 0.3, fontFace: F.mono, fontSize: 10, color: C.brick, charSpacing: 3 });
s.addText(bullets(["Paper, forms, apps, calls and photos", "PMs compile instead of assuring", "Engineers receive reconstructed reports"]), { x: M + 0.25, y: 2.75, w: colW - 0.5, h: 2.5, fontFace: F.ui, fontSize: 12.5, color: C.ink60, lineSpacingMultiple: 1.3, valign: "top" });
s.addShape("roundRect", { x: M + colW + 0.5, y: 2.1, w: colW, h: 3.4, rectRadius: 0.08, fill: { color: C.sageTint }, line: { color: C.oliveEdge, width: 0.75 } });
s.addText("WITH TACEDGE", { x: M + colW + 0.75, y: 2.35, w: colW - 0.5, h: 0.3, fontFace: F.mono, fontSize: 10, color: C.forest, charSpacing: 3 });
s.addText(bullets(["One shared system from setup to release", "Live, structured field data", "A confirmed report the engineer can trust"]), { x: M + colW + 0.75, y: 2.75, w: colW - 0.5, h: 2.5, fontFace: F.ui, fontSize: 12.5, color: C.ink, lineSpacingMultiple: 1.3, valign: "top" });

// 12 · Configure–Capture–Confirm
s = pptx.addSlide({ masterName: "CONTENT" });
eyebrow(s, "The workflow");
title(s, "Configure. Capture. Confirm.");
[["1", "Configure", "Set the project up once."], ["2", "Capture", "Record the work where it happens."], ["3", "Confirm", "Verify and release."]].forEach(([n, h, t], i) => {
  const x = M + i * (c3 + 0.4);
  card(s, x, 2.2, c3, 3.0);
  s.addShape("ellipse", { x: x + 0.25, y: 2.5, w: 0.42, h: 0.42, fill: { color: C.sageTint }, line: { color: C.forestHover, width: 1 } });
  s.addText(n, { x: x + 0.25, y: 2.5, w: 0.42, h: 0.42, align: "center", fontFace: F.display, bold: true, fontSize: 13, color: C.forest });
  s.addText(h, { x: x + 0.8, y: 2.52, w: c3 - 1, h: 0.4, fontFace: F.display, bold: true, fontSize: 17, color: C.ink });
  s.addText(t, { x: x + 0.25, y: 3.15, w: c3 - 0.5, h: 1.6, fontFace: F.ui, fontSize: 12.5, color: C.ink60, lineSpacingMultiple: 1.3, valign: "top" });
  if (i < 2) s.addText("→", { x: x + c3 + 0.02, y: 3.4, w: 0.4, h: 0.4, fontFace: F.ui, fontSize: 18, color: C.olive, align: "center" });
});
s.addText("Release is the outcome of Confirm. It is never a fourth stage.", { x: M, y: 5.6, w: CW, h: 0.35, fontFace: F.ui, fontSize: 12, italic: false, color: C.ink40 });

// 13 · Process flow
s = pptx.addSlide({ masterName: "CONTENT" });
eyebrow(s, "[Section]");
title(s, "Process flow.");
["Configured", "Captured", "Submitted", "Confirmed"].forEach((stage, i) => {
  const w4 = (CW - 1.5) / 4, x = M + i * (w4 + 0.5);
  const last = i === 3;
  s.addShape("roundRect", { x, y: 3.2, w: w4, h: 0.75, rectRadius: 0.08, fill: { color: last ? C.forest : C.card }, line: { color: last ? C.forest : C.oliveEdge, width: 1 } });
  s.addText(stage, { x, y: 3.2, w: w4, h: 0.75, align: "center", fontFace: F.ui, bold: true, fontSize: 13, color: last ? C.cream : C.forest });
  if (!last) s.addText("→", { x: x + w4 + 0.05, y: 3.32, w: 0.4, h: 0.5, fontFace: F.ui, fontSize: 16, color: C.olive, align: "center" });
});
s.addText("One arrow style. Single-word stage labels. Forest fill marks the terminal-positive stage only.", { x: M, y: 4.5, w: CW, h: 0.35, fontFace: F.ui, fontSize: 12, color: C.ink40 });

// 14 · Metrics / key numbers
s = pptx.addSlide({ masterName: "CONTENT" });
eyebrow(s, "[Section]");
title(s, "Key numbers.");
[["[12]", "records confirmed per shift"], ["[0]", "re-keying steps"], ["[15 min]", "from capture to PM visibility"]].forEach(([n, t], i) => {
  const x = M + i * (c3 + 0.4);
  card(s, x, 2.2, c3, 2.6);
  s.addText(n, { x: x + 0.25, y: 2.5, w: c3 - 0.5, h: 0.9, fontFace: F.display, bold: true, fontSize: 36, color: C.forest });
  s.addText(t, { x: x + 0.25, y: 3.5, w: c3 - 0.5, h: 0.9, fontFace: F.ui, fontSize: 12.5, color: C.ink60, valign: "top" });
});
s.addText("Numbers must be evidenced. Source note: [source, date]", { x: M, y: 5.2, w: CW, h: 0.3, fontFace: F.mono, fontSize: 9, color: C.ink40, charSpacing: 1 });

// 15 · Comparison
s = pptx.addSlide({ masterName: "CONTENT" });
eyebrow(s, "[Section]");
title(s, "Comparison.");
s.addTable(
  [
    [{ text: "", options: {} }, { text: "Current way", options: { bold: true } }, { text: "With TACEDGE", options: { bold: true } }],
    ["Capture", "Paper and re-keying", "Once, at the workface"],
    ["Visibility", "End of week", "Live"],
    ["Report", "Rebuilt by the PM", "Released from confirmed records"],
  ],
  {
    x: M, y: 2.1, w: CW, colW: [2.6, (CW - 2.6) / 2, (CW - 2.6) / 2],
    fontFace: F.ui, fontSize: 13, color: C.ink60, valign: "middle",
    border: { type: "solid", color: C.line, pt: 0.75 },
    fill: { color: C.card }, rowH: 0.55,
  }
);

// 16 · Quote
s = pptx.addSlide({ masterName: "CONTENT" });
eyebrow(s, "[Voice of the customer]");
s.addShape("line", { x: M, y: 2.4, w: 0, h: 2.2, line: { color: C.sage, width: 3 } });
s.addText("“[Short, verifiable quote from a named role. Two sentences at most.]”", { x: M + 0.4, y: 2.4, w: 10.5, h: 1.6, fontFace: F.display, bold: true, fontSize: 22, color: C.ink, lineSpacingMultiple: 1.2 });
s.addText("[Name or role] · [Organisation] · [Date]", { x: M + 0.4, y: 4.15, w: 10, h: 0.35, fontFace: F.mono, fontSize: 10, color: C.ink40, charSpacing: 2 });

// 17 · Timeline
s = pptx.addSlide({ masterName: "CONTENT" });
eyebrow(s, "[Section]");
title(s, "Timeline.");
s.addShape("line", { x: M, y: 3.6, w: CW, h: 0, line: { color: C.rule, width: 1 } });
[["Week 0", "Configure"], ["Weeks 1–4", "Capture on live work"], ["Week 5", "Review evidence"], ["Week 6", "Decision point"]].forEach(([when, what], i) => {
  const x = M + 0.4 + i * ((CW - 0.8) / 3.2);
  s.addShape("ellipse", { x: x - 0.07, y: 3.53, w: 0.14, h: 0.14, fill: { color: i === 3 ? C.forest : C.olive } });
  s.addText(when, { x: x - 0.9, y: 2.95, w: 1.8, h: 0.3, align: "center", fontFace: F.mono, fontSize: 9.5, color: C.ink40, charSpacing: 1 });
  s.addText(what, { x: x - 1.1, y: 3.85, w: 2.2, h: 0.6, align: "center", fontFace: F.ui, bold: true, fontSize: 12.5, color: C.ink });
});

// 18 · Case study
s = pptx.addSlide({ masterName: "CONTENT" });
eyebrow(s, "Case study");
title(s, "[Project name]: what the evidence showed.");
s.addImage({ path: "scripts/template-src/img-field-capture.png", x: M, y: 2.05, w: 3.0, h: 4.35, sizing: { type: "cover", w: 3.0, h: 4.35 } });
[["Context", "[Work type, location, crew size.]"], ["What we did", "[Configured the workflow, captured live work, confirmed the record.]"], ["Result", "[Evidenced outcome with numbers where possible.]"]].forEach(([h, t], i) => {
  const y = 2.05 + i * 1.5;
  s.addText(h.toUpperCase(), { x: M + 3.5, y, w: CW - 3.5, h: 0.28, fontFace: F.mono, fontSize: 9.5, color: C.ink40, charSpacing: 3 });
  s.addText(t, { x: M + 3.5, y: y + 0.32, w: CW - 3.5, h: 0.85, fontFace: F.ui, fontSize: 13, color: C.ink60, lineSpacingMultiple: 1.25, valign: "top" });
});

// 19 · Next steps
s = pptx.addSlide({ masterName: "CONTENT" });
eyebrow(s, "Next steps");
title(s, "A small validation, not a broad rollout.");
[["1", "Choose one workflow"], ["2", "Configure it together"], ["3", "Validate it on live work"], ["4", "Decide from evidence"]].forEach(([n, t], i) => {
  const y = 2.2 + i * 0.95;
  s.addShape("ellipse", { x: M, y, w: 0.42, h: 0.42, fill: { color: C.sageTint }, line: { color: C.forestHover, width: 1 } });
  s.addText(n, { x: M, y, w: 0.42, h: 0.42, align: "center", fontFace: F.display, bold: true, fontSize: 13, color: C.forest });
  s.addText(t, { x: M + 0.65, y: y + 0.02, w: 9, h: 0.42, fontFace: F.ui, fontSize: 15, color: C.ink, valign: "middle" });
});

// 20 · Closing / contact
s = pptx.addSlide({ masterName: "COVER" });
s.addText("See TACEDGE on your project.", { x: M, y: 2.6, w: 10.5, h: 1.0, fontFace: F.display, bold: true, fontSize: 38, color: C.cream });
s.addText("Bring a current project or reporting problem. In 15 minutes, we'll show how TACEDGE would structure the workflow.", { x: M, y: 3.7, w: 8.5, h: 0.8, fontFace: F.ui, fontSize: 14, color: C.sageTint, lineSpacingMultiple: 1.3 });
s.addText(`[Name] · [Role] · [Phone]\n${COMPANY.email} · ${COMPANY.web} · ${COMPANY.location}`, { x: M, y: 6.2, w: 9, h: 0.7, fontFace: F.mono, fontSize: 10, color: C.sage, charSpacing: 1, lineSpacingMultiple: 1.5 });

// 21 · Appendix divider
s = pptx.addSlide({ masterName: "DARK" });
s.addText("APPENDIX", { x: M, y: 2.2, w: 4, h: 0.5, fontFace: F.mono, fontSize: 14, color: C.sage, charSpacing: 4 });
s.addText("[Supporting detail]", { x: M, y: 2.75, w: 10.5, h: 1.2, fontFace: F.display, bold: true, fontSize: 36, color: C.cream });

// 22 · Appendix content
s = pptx.addSlide({ masterName: "CONTENT" });
eyebrow(s, "Appendix A");
title(s, "[Supporting detail].", { fontSize: 24 });
s.addTable(
  [
    [{ text: "Item", options: { bold: true } }, { text: "Detail", options: { bold: true } }, { text: "Source", options: { bold: true } }],
    ["[Item]", "[Detail]", "[Source, date]"],
    ["[Item]", "[Detail]", "[Source, date]"],
    ["[Item]", "[Detail]", "[Source, date]"],
  ],
  { x: M, y: 1.95, w: CW, colW: [3, CW - 6, 3], fontFace: F.ui, fontSize: 12, color: C.ink60, border: { type: "solid", color: C.line, pt: 0.75 }, fill: { color: C.card }, rowH: 0.5 }
);
s.addText("Appendix slides carry the detail so the main deck stays light.", { x: M, y: 5.6, w: CW, h: 0.3, fontFace: F.ui, fontSize: 11, color: C.ink40 });

await pptx.writeFile({ fileName: "templates/presentation/TACEDGE_Presentation_Template_v1.0.pptx" });
console.log("wrote templates/presentation/TACEDGE_Presentation_Template_v1.0.pptx (22 slides)");
