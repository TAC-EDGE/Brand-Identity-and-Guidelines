// Exports the print edition to exports/TACEDGE_Brand_Identity_and_Guidelines_v1.1.pdf
// plus per-page preview PNGs and a contact sheet under exports/previews/.
// Requires the built site to be served (default http://localhost:4173).
// Usage: npm run export:pdf [-- baseUrl]
import { chromium } from "playwright-core";
import { mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const base = process.argv[2] || "http://localhost:4173";
const outDir = "exports";
const prevDir = join(outDir, "previews");
mkdirSync(prevDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});
const page = await (await browser.newContext({ viewport: { width: 1240, height: 1754 } })).newPage();

await page.goto(`${base}/print.html`, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.evaluate(() => document.fonts.ready);

// Overflow check: every .sheet must contain its content.
const overflows = await page.evaluate(() =>
  [...document.querySelectorAll(".sheet")].flatMap((s, i) =>
    s.scrollHeight > s.clientHeight + 2 ? [`sheet ${i + 1}: ${s.scrollHeight}px > ${s.clientHeight}px`] : []
  )
);
if (overflows.length) {
  console.error("OVERFLOWING SHEETS:\n" + overflows.join("\n"));
  process.exitCode = 1;
}

const pdfPath = join(outDir, "TACEDGE_Brand_Identity_and_Guidelines_v1.1.pdf");
await page.pdf({ path: pdfPath, format: "A4", printBackground: true, preferCSSPageSize: true });
console.log(`wrote ${pdfPath}`);

// Page previews
const sheets = await page.locator(".sheet").count();
for (let i = 0; i < sheets; i++) {
  await page.locator(".sheet").nth(i).screenshot({
    path: join(prevDir, `page-${String(i + 1).padStart(2, "0")}.png`),
  });
}
console.log(`wrote ${sheets} page previews`);

// Contact sheet: grid of small pages
const cols = 6;
const rows = Math.ceil(sheets / cols);
const thumbW = 210, thumbH = 297;
const contact = await browser.newPage();
await contact.setViewportSize({ width: cols * (thumbW + 12) + 12, height: rows * (thumbH + 12) + 12 });
const tags = Array.from({ length: sheets }, (_, i) => {
  const b64 = readFileSync(join(prevDir, `page-${String(i + 1).padStart(2, "0")}.png`)).toString("base64");
  return `<div><img src="data:image/png;base64,${b64}" style="width:${thumbW}px;height:${thumbH}px" /><p>${i + 1}</p></div>`;
}).join("");
await contact.setContent(
  `<style>body{margin:12px;background:#DDE3D2;font:10px 'DejaVu Sans',sans-serif;display:grid;grid-template-columns:repeat(${cols},${thumbW}px);gap:12px}img{display:block;box-shadow:0 1px 4px rgba(0,0,0,.3)}p{margin:2px 0 0;text-align:center;color:#333}</style>${tags}`
);
await contact.screenshot({ path: join(prevDir, "contact-sheet.png"), fullPage: true });
console.log("wrote contact sheet");

await browser.close();
