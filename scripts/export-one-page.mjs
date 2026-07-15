// Exports the one-page collateral masters to PDF + PNG previews.
// Usage: node scripts/export-one-page.mjs
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const files = [
  ["templates/one-page/TACEDGE_One_Page_Template_v1.0.html", "TACEDGE_One_Page_Template_v1.0"],
  ["templates/one-page/TACEDGE_One_Page_Example_v1.0.html", "TACEDGE_One_Page_Example_v1.0"],
];
mkdirSync("templates/one-page/previews", { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});
const page = await (await browser.newContext({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2 })).newPage();

for (const [src, name] of files) {
  await page.goto("file://" + resolve(src), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: `templates/one-page/${name}.pdf`, preferCSSPageSize: true, printBackground: true });
  await page.screenshot({ path: `templates/one-page/previews/${name.toLowerCase().replace(/tacedge_|_v1\.0/g, "")}-01.png`, fullPage: true });
  console.log(name, "-> pdf + png");
}
await browser.close();
