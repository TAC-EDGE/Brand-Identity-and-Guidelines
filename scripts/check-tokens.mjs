// Token consistency + contrast checks. Run with: npm test
// 1. Every hex in colors.json must appear identically in tokens.css, colors.css and tokens.ts.
// 2. Declared AA combinations must actually meet WCAG 2.1 AA (>= 4.5:1, or >= 3:1 large-text-only roles).
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");

const colorsJson = JSON.parse(read("tokens/colors.json"));
const files = {
  "tokens/tokens.css": read("tokens/tokens.css"),
  "tokens/colors.css": read("tokens/colors.css"),
  "tokens/tokens.ts": read("tokens/tokens.ts"),
};

let failures = 0;
const fail = (msg) => { failures++; console.error(`  ✗ ${msg}`); };
const pass = (msg) => console.log(`  ✓ ${msg}`);

console.log("Token hex consistency");
for (const [name, def] of Object.entries(colorsJson.colors)) {
  for (const [file, content] of Object.entries(files)) {
    if (!content.toUpperCase().includes(def.value.toUpperCase())) {
      fail(`${name} ${def.value} missing from ${file}`);
    }
  }
}
if (!failures) pass("every colors.json hex present in tokens.css, colors.css and tokens.ts");

console.log("Contrast (WCAG 2.1)");
const hex2rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lum = ([r, g, b]) => {
  const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => {
  const l1 = lum(hex2rgb(a)), l2 = lum(hex2rgb(b));
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};
const c = Object.fromEntries(Object.entries(colorsJson.colors).map(([k, v]) => [k, v.value]));

// [foreground, background, minimum, description]
const checks = [
  [c["primary-text"], c["warm-cream"], 7, "primary text on cream (AAA)"],
  [c["primary-text"], c["card-surface"], 7, "primary text on card (AAA)"],
  [c["primary-text"], c["sage-tint"], 7, "primary text on sage-tint (AAA)"],
  [c["secondary-text"], c["warm-cream"], 4.5, "secondary text on cream (AA)"],
  [c["secondary-text"], c["card-surface"], 4.5, "secondary text on card (AA)"],
  [c["muted-text"], c["warm-cream"], 4.5, "muted text on cream (AA)"],
  [c["muted-text"], c["quiet-tint"], 4.5, "muted text on quiet-tint (AA)"],
  [c["muted-text"], c["sage-tint"], 4.5, "muted text on sage-tint (AA)"],
  [c["warm-cream"], c["primary-dark"], 4.5, "cream text on forest (AA)"],
  [c["pale-sage"], c["primary-dark"], 4.5, "sage labels on forest (AA)"],
  [c["sage-tint"], c["primary-dark"], 4.5, "sage-tint lead copy on forest (AA)"],
  [c["primary-dark"], c["warm-cream"], 4.5, "forest links/buttons text on cream (AA)"],
  [c["utility-sage"], c["warm-cream"], 3, "utility-sage icons/large text on cream (AA large)"],
  [c["warning"], c["card-surface"], 3, "warning icons/large text on card (AA large)"],
  [c["error"], c["card-surface"], 4.5, "error text on card (AA)"],
  [c["error"], c["error-tint"], 4.5, "error text on error-tint (AA)"],
  [c["primary-text"], c["warning-tint"], 4.5, "primary text on warning-tint (AA)"],
  [c["primary-text"], c["error-tint"], 4.5, "primary text on error-tint (AA)"],
  [c["focus"], c["warm-cream"], 3, "focus outline on cream (non-text)"],
];
for (const [fg, bg, min, desc] of checks) {
  const r = ratio(fg, bg);
  if (r >= min) pass(`${desc}: ${r.toFixed(2)}:1 >= ${min}:1`);
  else fail(`${desc}: ${r.toFixed(2)}:1 < ${min}:1`);
}

if (failures) { console.error(`\n${failures} check(s) failed`); process.exit(1); }
console.log("\nAll token checks passed");
