/**
 * TACEDGE design tokens — v1.0.0
 * Authoritative typed token package. Mirrors tokens/*.json and tokens.css.
 * Do not add colours.
 */

export const colors = {
  /** Primary TACEDGE hero green. Dark surfaces, primary buttons. */
  forest: "#112411",
  forestHover: "#1A3219",
  /** Contour linework on forest surfaces only. */
  forestLine: "#1B331A",
  /** Logo artwork on light grounds only. PROVISIONAL — see docs/decisions-required.md D1. */
  logoForest: "#2B4721",
  /** Working mid-tone. Large text and icons only on light surfaces. */
  olive: "#6E7D5C",
  oliveEdge: "#AEB89C",
  /** Quiet surface, labels on dark, the brandmark colour. */
  sage: "#B2B594",
  sageTint: "#E6EBD9",
  /** Page background — the brand paper. */
  cream: "#F7F5EC",
  card: "#FFFFFF",
  tint: "#EFF1E4",
  /** Backdrop behind device frames only. */
  stage: "#DDE3D2",
  ink: "#242A1F",
  ink60: "#5B6253",
  /** Muted text. AA on cream, tint and sage-tint. */
  ink40: "#646A5A",
  rule: "#CBD2C9",
  line: "#E7E2D6",
  line2: "#D9D3C4",
  creamLine: "rgba(247, 245, 236, 0.16)",
  sageLine: "rgba(178, 181, 148, 0.5)",
  oliveLine: "rgba(110, 125, 92, 0.28)",
  /** Status colours: product UI and faithful mocks only. Never decorative. */
  ochre: "#B07D2B",
  ochreTint: "#F5EBD4",
  brick: "#9E3B2E",
  brickTint: "#F3DDD6",
} as const;

export const fonts = {
  display: "'Play', system-ui, sans-serif",
  ui: "'Be Vietnam Pro', system-ui, -apple-system, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace",
} as const;

export const type = {
  h1: "clamp(52px, 6.3vw, 92px)",
  h2: "clamp(33px, 4vw, 48px)",
  h3: "clamp(24px, 2.5vw, 34px)",
  cardTitle: "26px",
  lead: "clamp(18px, 1.5vw, 21px)",
  body: "18px",
  cardBody: "16px",
  label: "13px",
  caption: "14px",
  trackLabel: "0.16em",
} as const;

export const fontSize = {
  "2xs": 10, xs: 11, sm: 12, base: 14, md: 15,
  lg: 18, xl: 26, "2xl": 30, "3xl": 44, "4xl": 48,
} as const;

export const spacing = {
  "2xs": 4, xs: 8, sm: 12, md: 16, lg: 20,
  xl: 24, "2xl": 28, "3xl": 36, "4xl": 48, "5xl": 56,
} as const;

export const layout = {
  contentMax: "1200px",
  gutter: "clamp(20px, 3.4vw, 32px)",
  section: "clamp(64px, 9vw, 120px)",
  sectionTight: "clamp(56px, 7vw, 96px)",
} as const;

export const radii = {
  sm: 10, md: 12, lg: 14, xl: 20, "2xl": 24, pill: 999,
  card: 16, image: 14, panel: 20, panelLg: 24, button: 12,
} as const;

export const shadows = {
  sm: "0 1px 2px rgba(27, 33, 23, 0.05)",
  md: "0 2px 10px rgba(27, 33, 23, 0.06)",
  lg: "0 8px 28px rgba(27, 33, 23, 0.10)",
  device: "0 18px 40px rgba(0, 0, 0, 0.32)",
} as const;

export const breakpoints = {
  wide: 1080, desktop: 980, tablet: 880,
  tabletNarrow: 720, mobile: 640, mobileNarrow: 420,
} as const;

export const motion = {
  standard: "140ms ease",
} as const;

export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radii;
