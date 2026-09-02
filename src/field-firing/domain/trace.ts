// TACEDGE | Field Firing — trace template geometry.
//
// DEMO DATA — NOT AUTHORITATIVE.
// Weapon danger area template dimensions, arcs and distances are
// safety-critical figures. None have been supplied to this repository,
// so every template below is a generic placeholder shape in unitless
// "map units" with no claimed relationship to any real weapon danger
// area. The geometry pipeline is deterministic and parameterised so
// that authoritative WDA parameters can replace these placeholders
// without changing any rendering or interaction code.
//
// Pure functions only. No React, no browser APIs. Tested in trace.test.ts.

import type { DoctrineRef, TracePlacement } from "./types";

export interface Point {
  x: number;
  y: number;
}

/** Parameterised template shapes. All dimensions are demo map units. */
export type TemplateGeometry =
  | { kind: "fan"; halfAngleDeg: number; radius: number }
  | { kind: "corridor"; width: number; length: number }
  | { kind: "trapezoid"; nearWidth: number; farWidth: number; length: number };

export interface TraceTemplateDef {
  id: string;
  /** Weapon system this template belongs to (progressive disclosure). */
  weaponSystemId: string;
  name: string;
  geometry: TemplateGeometry;
  source: DoctrineRef;
  /** Always true until authoritative WDA parameters are supplied. */
  demo: boolean;
}

const SOURCE_REQUIRED: DoctrineRef = {
  publication: "SOURCE REQUIRED — weapon danger area template not yet supplied",
  status: "source-required",
};

/** Demonstration templates: generic shapes, unitless, clearly fictional. */
export const traceTemplates: TraceTemplateDef[] = [
  {
    id: "tpl-rifle",
    weaponSystemId: "ws-rifle",
    name: "Individual weapon template (demo)",
    geometry: { kind: "fan", halfAngleDeg: 25, radius: 180 },
    source: SOURCE_REQUIRED,
    demo: true,
  },
  {
    id: "tpl-lsw",
    weaponSystemId: "ws-lsw",
    name: "Light support weapon template (demo)",
    geometry: { kind: "fan", halfAngleDeg: 30, radius: 220 },
    source: SOURCE_REQUIRED,
    demo: true,
  },
  {
    id: "tpl-pistol",
    weaponSystemId: "ws-pistol",
    name: "Pistol template (demo)",
    geometry: { kind: "fan", halfAngleDeg: 20, radius: 90 },
    source: SOURCE_REQUIRED,
    demo: true,
  },
  {
    id: "tpl-gpmg",
    weaponSystemId: "ws-gpmg",
    name: "Machine gun SF template (demo)",
    geometry: { kind: "trapezoid", nearWidth: 26, farWidth: 96, length: 260 },
    source: SOURCE_REQUIRED,
    demo: true,
  },
];

export function templateById(id: string): TraceTemplateDef | undefined {
  return traceTemplates.find((t) => t.id === id);
}

const DEG = Math.PI / 180;

/**
 * Template outline in local space: firing point at the origin,
 * direction of fire along -Y (map north / up), y grows downward (SVG).
 * Deterministic: same geometry always yields the same points.
 */
export function templateOutline(geometry: TemplateGeometry): Point[] {
  switch (geometry.kind) {
    case "fan": {
      const points: Point[] = [{ x: 0, y: 0 }];
      const step = 5;
      for (let a = -geometry.halfAngleDeg; a <= geometry.halfAngleDeg; a += step) {
        points.push({ x: Math.sin(a * DEG) * geometry.radius, y: -Math.cos(a * DEG) * geometry.radius });
      }
      // Ensure the far edge always ends exactly on the right arc limit.
      const last = geometry.halfAngleDeg;
      const end = points[points.length - 1];
      const exact = { x: Math.sin(last * DEG) * geometry.radius, y: -Math.cos(last * DEG) * geometry.radius };
      if (Math.abs(end.x - exact.x) > 1e-9 || Math.abs(end.y - exact.y) > 1e-9) points.push(exact);
      return points;
    }
    case "corridor": {
      const h = geometry.width / 2;
      return [
        { x: -h, y: 0 },
        { x: -h, y: -geometry.length },
        { x: h, y: -geometry.length },
        { x: h, y: 0 },
      ];
    }
    case "trapezoid": {
      const n = geometry.nearWidth / 2;
      const f = geometry.farWidth / 2;
      return [
        { x: -n, y: 0 },
        { x: -f, y: -geometry.length },
        { x: f, y: -geometry.length },
        { x: n, y: 0 },
      ];
    }
  }
}

/** Rotates a local point clockwise by deg and translates to the placement. */
export function transformPoint(p: Point, placement: Pick<TracePlacement, "x" | "y" | "rotationDeg">): Point {
  const r = placement.rotationDeg * DEG;
  const cos = Math.cos(r);
  const sin = Math.sin(r);
  return {
    x: placement.x + p.x * cos - p.y * sin,
    y: placement.y + p.x * sin + p.y * cos,
  };
}

/** Template outline in map coordinates for a placement. */
export function placementOutline(geometry: TemplateGeometry, placement: Pick<TracePlacement, "x" | "y" | "rotationDeg">): Point[] {
  return templateOutline(geometry).map((p) => transformPoint(p, placement));
}

/** SVG path string for a closed outline. */
export function outlinePath(points: Point[]): string {
  if (points.length === 0) return "";
  const [first, ...rest] = points;
  return `M ${first.x.toFixed(2)} ${first.y.toFixed(2)} ${rest.map((p) => `L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ")} Z`;
}

/** Reach of the template from the firing point, for handle placement. */
export function templateReach(geometry: TemplateGeometry): number {
  switch (geometry.kind) {
    case "fan":
      return geometry.radius;
    case "corridor":
    case "trapezoid":
      return geometry.length;
  }
}

/** Normalises a rotation to [0, 360). */
export function normaliseDeg(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

/** Clamps a placement position to the map extent. */
export function clampToMap(p: Point, width: number, height: number): Point {
  return {
    x: Math.min(Math.max(p.x, 0), width),
    y: Math.min(Math.max(p.y, 0), height),
  };
}
