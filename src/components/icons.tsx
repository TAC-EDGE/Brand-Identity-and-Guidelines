// Approved icon artwork. Work-type icons: 32px grid, stroke 1.6, round caps,
// no fills. Source: tacedge/website components/WorkTypeIcon.tsx.
import type { ReactNode, CSSProperties } from "react";

export const workTypeIcons: Record<string, ReactNode> = {
  Anchoring: (
    <>
      <path d="M4 7h24" /><path d="M16 7v16" />
      <path d="M16 23c0 2.4-2 4-4.5 4M16 23c0 2.4 2 4 4.5 4" />
      <path d="M12 15h8M12 19h8" />
    </>
  ),
  Drilling: (
    <>
      <path d="M8 27h16" /><path d="M12 27V9l8-4v22" /><path d="M20 12l6 3M20 18l6 3" />
    </>
  ),
  Shotcrete: (
    <>
      <path d="M25 5v22" /><path d="M5 14h7l3 2" />
      <path d="M19 10.5 21.5 9M20 16h2.5M19 21.5l2.5 1.5" />
    </>
  ),
  "Rockfall Protection": (
    <>
      <path d="M5 27 27 5" /><path d="M9 15l8 8M15 9l8 8" /><path d="M12 12l8 8" opacity=".55" />
    </>
  ),
  Drainage: (
    <>
      <path d="M5 8h14a4 4 0 0 1 4 4v3" /><path d="M5 13h13" />
      <path d="M23 20v1M23 25v1M19 22v1" />
    </>
  ),
  "Piling & Retaining": (
    <>
      <path d="M6 27V9M12 27V6M18 27V9" /><path d="M4 27h20" /><path d="M22 12h6M22 17h6M22 22h6" />
    </>
  ),
};

export function WorkTypeIcon({ type, size = 32 }: { type: keyof typeof workTypeIcons; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {workTypeIcons[type]}
    </svg>
  );
}

/** The single approved arrow: 1.6 stroke, round caps, straight shaft, open head. */
export function Arrow({ size = 20, direction = "right", style }: { size?: number; direction?: "right" | "down"; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"
      style={{ transform: direction === "down" ? "rotate(90deg)" : undefined, ...style }}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

/** Generic 24px line icons used in informational containers. */
export const lineIcons: Record<string, ReactNode> = {
  clipboard: <><rect x="6" y="4" width="12" height="17" rx="2" /><path d="M9 4.5V3h6v1.5" /><path d="M9 10h6M9 14h6" /></>,
  camera: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8.5 7 10 4.5h4L15.5 7" /><circle cx="12" cy="13" r="3.4" /></>,
  shield: <><path d="M12 3l7 3v5c0 4.4-2.9 7.6-7 10-4.1-2.4-7-5.6-7-10V6l7-3z" /><path d="M9 11.6l2.1 2.1L15.4 9" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  doc: <><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4" /><path d="M10 12h5M10 16h5" /></>,
  warn: <><path d="M12 4 21 20H3L12 4z" /><path d="M12 10v4.5M12 17.4v.1" /></>,
};

export function LineIcon({ name, size = 22 }: { name: keyof typeof lineIcons; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {lineIcons[name]}
    </svg>
  );
}
