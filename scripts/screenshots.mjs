// Full-page screenshots of every guideline section, desktop and mobile.
// Usage: npm run screenshots [-- baseUrl outDir]
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const base = process.argv[2] || "http://localhost:4173";
const out = process.argv[3] || "docs/screenshots";
mkdirSync(out, { recursive: true });

const slugs = [
  "overview", "foundations", "messaging", "logo", "colour", "typography",
  "layout", "iconography", "graphic-language", "photography",
  "product-imagery", "digital-ui", "applications", "downloads", "governance",
];

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});

for (const [w, h, tag] of [[1440, 900, "desktop"], [390, 844, "mobile"]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  const routes = tag === "desktop" ? slugs : ["overview", "colour", "logo"];
  for (const slug of routes) {
    await page.goto(`${base}/#/${slug}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    // fullPage screenshots need lazy images loaded: scroll through first
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${out}/${slug}-${tag}.png`, fullPage: true });
    console.log(`${slug}-${tag}.png`);
  }
  await ctx.close();
}
await browser.close();
