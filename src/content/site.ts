// Site-wide metadata and navigation. Content lives in content files, not components.

export const VERSION = "1.1";
export const LAST_UPDATED = "15 July 2026";
export const SITE_NAME = "Brand & Design System";
export const PDF_EXPORT = "exports/TACEDGE_Brand_Identity_and_Guidelines_v1.1.pdf";
export const STYLE_TILE_PDF = "exports/TACEDGE_Style_Tile_v1.1.pdf";

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
  { slug: "templates", num: "16", label: "Template Overview" },
  { slug: "template-presentation", num: "17", label: "Presentation Deck" },
  { slug: "template-meeting-minutes", num: "18", label: "Meeting Minutes" },
  { slug: "template-pilot-proposal", num: "19", label: "Pilot Proposal" },
  { slug: "template-technical-report", num: "20", label: "Technical Report" },
  { slug: "template-letterhead", num: "21", label: "Letterhead" },
  { slug: "template-legal", num: "22", label: "Legal Documents" },
  { slug: "template-one-page", num: "23", label: "One-Page Collateral" },
  { slug: "template-email-signature", num: "24", label: "Email Signature" },
  { slug: "downloads", num: "14", label: "Downloads" },
  { slug: "governance", num: "15", label: "Governance" },
] as const;

export type Slug = (typeof sections)[number]["slug"];

/** Sidebar grouping. Order here is display order. */
export const navGroups: { title: string; slugs: Slug[] }[] = [
  {
    title: "Guidelines",
    slugs: [
      "overview", "foundations", "messaging", "logo", "colour", "typography",
      "layout", "iconography", "graphic-language", "photography",
      "product-imagery", "digital-ui", "applications",
    ],
  },
  {
    title: "Templates",
    slugs: [
      "templates", "template-presentation", "template-meeting-minutes",
      "template-pilot-proposal", "template-technical-report", "template-letterhead",
      "template-legal", "template-one-page", "template-email-signature",
    ],
  },
  {
    title: "Library",
    slugs: ["downloads", "governance"],
  },
];
