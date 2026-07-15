// Colour display data, derived from tokens/colors.json (the source of truth).
import colorsJson from "../../tokens/colors.json";

export type ColourEntry = {
  key: string;
  name: string;
  value: string;
  rgb: number[];
  hsl: number[];
  cmyk: number[];
  role: string;
  status: "approved" | "provisional";
  a11y?: string;
};

const displayNames: Record<string, string> = {
  "primary-dark": "Primary Dark",
  "primary-dark-hover": "Primary Dark Hover",
  "contour-on-dark": "Contour on Dark",
  "logo-forest": "Logo Forest",
  "utility-sage": "Utility Sage",
  "sage-edge": "Sage Edge",
  "pale-sage": "Pale Sage",
  "sage-tint": "Sage Tint",
  "warm-cream": "Warm Cream",
  "card-surface": "Card Surface",
  "quiet-tint": "Quiet Tint",
  "stage": "Stage",
  "primary-text": "Primary Text",
  "secondary-text": "Secondary Text",
  "muted-text": "Muted Text",
  "border": "Border",
  "border-strong": "Border Strong",
  "divider": "Divider",
  "focus": "Focus",
  "success": "Success",
  "warning": "Warning",
  "warning-tint": "Warning Tint",
  "error": "Error",
  "error-tint": "Error Tint",
  "information": "Information",
};

export const colours: ColourEntry[] = Object.entries(colorsJson.colors).map(([key, def]) => ({
  key,
  name: displayNames[key] ?? key,
  value: def.value,
  rgb: def.rgb,
  hsl: def.hsl,
  cmyk: def.cmykIndicative,
  role: def.role,
  status: def.status as "approved" | "provisional",
  a11y: (def as { a11y?: string }).a11y,
}));

export const groups: { title: string; note?: string; keys: string[] }[] = [
  {
    title: "Brand",
    keys: ["primary-dark", "primary-dark-hover", "utility-sage", "sage-edge", "pale-sage", "sage-tint"],
  },
  {
    title: "Neutrals and surfaces",
    keys: ["warm-cream", "card-surface", "quiet-tint", "stage"],
  },
  {
    title: "Ink",
    keys: ["primary-text", "secondary-text", "muted-text"],
  },
  {
    title: "Hairlines",
    keys: ["border", "border-strong", "divider"],
  },
  {
    title: "Status",
    note: "Status colours carry meaning in the product: caution and alert. They appear in marketing only inside an authentic product screenshot or a faithful UI mock. Never decorative. Never a marketing accent.",
    keys: ["success", "warning", "warning-tint", "error", "error-tint", "information"],
  },
  {
    title: "Special-purpose",
    note: "Contour on Dark is decorative linework only. Logo Forest exists only inside logo artwork and the app-icon tile.",
    keys: ["contour-on-dark", "focus", "logo-forest"],
  },
];

export const alphaTokens = Object.entries(colorsJson.alpha).map(([key, def]) => ({
  key,
  value: def.value,
  role: def.role,
}));

export const contrastPairs = [
  { fg: "Primary Text #242A1F", bg: "Warm Cream #F7F5EC", ratio: "13.48:1", level: "AAA", use: "Body copy" },
  { fg: "Primary Text #242A1F", bg: "Card Surface #FFFFFF", ratio: "14.73:1", level: "AAA", use: "Card copy" },
  { fg: "Secondary Text #5B6253", bg: "Warm Cream #F7F5EC", ratio: "5.80:1", level: "AA", use: "Supporting copy" },
  { fg: "Muted Text #646A5A", bg: "Warm Cream #F7F5EC", ratio: "5.13:1", level: "AA", use: "Utility labels, captions" },
  { fg: "Muted Text #646A5A", bg: "Sage Tint #E6EBD9", ratio: "4.60:1", level: "AA", use: "Labels on tinted panels" },
  { fg: "Warm Cream #F7F5EC", bg: "Primary Dark #112411", ratio: "14.97:1", level: "AAA", use: "Text and buttons on dark" },
  { fg: "Pale Sage #B2B594", bg: "Primary Dark #112411", ratio: "7.73:1", level: "AA (AAA large)", use: "Utility labels on dark" },
  { fg: "Sage Tint #E6EBD9", bg: "Primary Dark #112411", ratio: "13.43:1", level: "AAA", use: "Lead copy on dark" },
  { fg: "Primary Dark #112411", bg: "Warm Cream #F7F5EC", ratio: "14.97:1", level: "AAA", use: "Links, button text" },
  { fg: "Utility Sage #6E7D5C", bg: "Warm Cream #F7F5EC", ratio: "4.05:1", level: "AA large only", use: "Icons and large text only" },
  { fg: "Warning #B07D2B", bg: "Card Surface #FFFFFF", ratio: "3.61:1", level: "AA large only", use: "Status icons and badges" },
  { fg: "Error #9E3B2E", bg: "Card Surface #FFFFFF", ratio: "6.73:1", level: "AA", use: "Error text" },
  { fg: "Error #9E3B2E", bg: "Error Tint #F3DDD6", ratio: "5.17:1", level: "AA", use: "Error badges" },
  { fg: "Focus #112411", bg: "Warm Cream #F7F5EC", ratio: "14.97:1", level: "Non-text ≥3:1", use: "Focus outlines" },
];
