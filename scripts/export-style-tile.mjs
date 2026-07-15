// Exports the one-page style tile to exports/TACEDGE_Style_Tile_v1.1.pdf and .png.
// Requires the built site to be served (default http://localhost:4173).
// Usage: npm run export:style-tile [-- baseUrl]
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const base = process.argv[2] || "http://localhost:4173";
mkdirSync("exports", { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});
const page = await (await browser.newContext({ viewport: { width: 1754, height: 1240 }, deviceScaleFactor: 2 })).newPage();

await page.goto(`${base}/style-tile.html`, { waitUntil: "networkidle" });
await page.waitForTimeout(600);
await page.evaluate(() => document.fonts.ready);

const overflow = await page.evaluate(() => {
  const t = document.querySelector(".tile");
  return t && t.scrollHeight > t.clientHeight + 2 ? `${t.scrollHeight} > ${t.clientHeight}` : null;
});
if (overflow) {
  console.error(`STYLE TILE OVERFLOWS: ${overflow}`);
  process.exitCode = 1;
}

await page.pdf({
  path: "exports/TACEDGE_Style_Tile_v1.1.pdf",
  printBackground: true,
  preferCSSPageSize: true,
  landscape: false,
});
await page.locator(".tile").screenshot({ path: "exports/TACEDGE_Style_Tile_v1.1.png" });
console.log("wrote exports/TACEDGE_Style_Tile_v1.1.{pdf,png}");
await browser.close();
