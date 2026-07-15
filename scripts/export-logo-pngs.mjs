// Renders the approved master SVGs to PNG at standard sizes.
// The SVGs are the masters; PNGs are derived outputs. Never edit PNGs directly.
// Usage: npm run export:logo-pngs
import { chromium } from "playwright-core";
import { readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "assets/logos/png");
mkdirSync(out, { recursive: true });

// [source svg, output basename, widths]
const jobs = [
  ["assets/logos/horizontal/tacedge-lockup-forest.svg", "tacedge-lockup-forest", [1200, 2400]],
  ["assets/logos/horizontal/tacedge-lockup-cream.svg", "tacedge-lockup-cream", [1200, 2400]],
  ["assets/logos/horizontal/tacedge-lockup-ink.svg", "tacedge-lockup-ink", [1200, 2400]],
  ["assets/logos/brandmark/tacedge-brandmark-sage.svg", "tacedge-brandmark-sage", [512, 1024]],
  ["assets/logos/light/tacedge-wordmark-forest.svg", "tacedge-wordmark-forest", [1200]],
  ["assets/logos/dark/tacedge-wordmark-cream.svg", "tacedge-wordmark-cream", [1200]],
  ["assets/logos/monochrome/tacedge-wordmark-ink.svg", "tacedge-wordmark-ink", [1200]],
];

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});
const page = await (await browser.newContext({ deviceScaleFactor: 1 })).newPage();

for (const [src, name, widths] of jobs) {
  const svg = readFileSync(join(root, src), "utf8");
  const [, vb] = svg.match(/viewBox="([^"]+)"/) ?? [];
  const [, , vw, vh] = vb.split(/\s+/).map(Number);
  for (const w of widths) {
    const h = Math.round((w * vh) / vw);
    await page.setViewportSize({ width: w, height: h });
    await page.setContent(
      `<style>html,body{margin:0;background:transparent}svg{display:block;width:${w}px;height:${h}px}</style>${svg}`
    );
    await page.screenshot({ path: join(out, `${name}-${w}w.png`), omitBackground: true });
    console.log(`${name}-${w}w.png (${w}x${h})`);
  }
}
await browser.close();
