// Rasterises each page of a PDF to PNG using pdf.js inside Chromium.
// Usage: node scripts/pdf-to-pngs.mjs <input.pdf> <outDir> [prefix] [scale]
import { chromium } from "playwright-core";
import { readFileSync, mkdirSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const [, , input, outDir, prefix = "page", scaleArg = "1.5"] = process.argv;
if (!input || !outDir) {
  console.error("usage: node scripts/pdf-to-pngs.mjs <input.pdf> <outDir> [prefix] [scale]");
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pdfjsDir = join(root, "node_modules", "pdfjs-dist", "legacy", "build");
const pdfjs = readFileSync(join(pdfjsDir, "pdf.min.mjs"), "utf8");
const worker = readFileSync(join(pdfjsDir, "pdf.worker.min.mjs"), "utf8");
const pdfB64 = readFileSync(input).toString("base64");

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});
const page = await browser.newPage();
await page.setContent("<body></body>");
await page.addScriptTag({ content: pdfjs, type: "module" });

const pages = await page.evaluate(
  async ([b64, workerSrc, scale]) => {
    const blob = new Blob([workerSrc], { type: "text/javascript" });
    // pdfjsLib is attached to globalThis by the module build
    const lib = globalThis.pdfjsLib;
    lib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(blob);
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const doc = await lib.getDocument({ data: bytes }).promise;
    const out = [];
    for (let i = 1; i <= doc.numPages; i++) {
      const p = await doc.getPage(i);
      const vp = p.getViewport({ scale: Number(scale) });
      const canvas = document.createElement("canvas");
      canvas.width = vp.width;
      canvas.height = vp.height;
      await p.render({ canvasContext: canvas.getContext("2d"), viewport: vp }).promise;
      out.push(canvas.toDataURL("image/png").split(",")[1]);
    }
    return out;
  },
  [pdfB64, worker, scaleArg]
);

pages.forEach((b64, i) => {
  writeFileSync(join(outDir, `${prefix}-${String(i + 1).padStart(2, "0")}.png`), Buffer.from(b64, "base64"));
});
console.log(`${pages.length} pages -> ${outDir}`);
await browser.close();
console.log(readdirSync(outDir).length, "files in outDir");
