// Site-wide metadata and navigation. Content lives in content files, not components.

export const VERSION = "1.0";
export const LAST_UPDATED = "15 July 2026";

export const sections = [
  { slug: "overview", num: "01", label: "Overview" },
  { slug: "foundations", num: "02", label: "Foundations" },
  { slug: "messaging", num: "03", label: "Messaging" },
  { slug: "logo", num: "04", label: "Logo" },
  { slug: "colour", num: "05", label: "Colour" },
  { slug: "typography", num: "06", label: "Typography" },
  { slug: "layout", num: "07", label: "Layout" },
  { slug: "iconography", num: "08", label: "Iconography" },
  { slug: "graphic-language", num: "09", label: "Graphic Language" },
  { slug: "photography", num: "10", label: "Photography" },
  { slug: "product-imagery", num: "11", label: "Product Imagery" },
  { slug: "digital-ui", num: "12", label: "Digital UI" },
  { slug: "applications", num: "13", label: "Applications" },
  { slug: "downloads", num: "14", label: "Downloads" },
  { slug: "governance", num: "15", label: "Governance" },
] as const;

export type Slug = (typeof sections)[number]["slug"];
