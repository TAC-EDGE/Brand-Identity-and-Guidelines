import { contourPaths } from "../content/contour-paths";

/** Topographic contour motif. Decorative only — behind dark bars and
 *  hero panels, never over body text. Light variant for tinted panels. */
export default function ContourMotif({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <svg
      className={variant === "light" ? "contour contour--light" : "contour"}
      viewBox="0 0 1600 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {contourPaths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
