// Deterministic trace geometry tests. Run via: npm run test:field-firing
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  clampToMap,
  normaliseDeg,
  outlinePath,
  placementOutline,
  templateOutline,
  templateReach,
  traceTemplates,
  transformPoint,
} from "./trace.ts";

function near(a: number, b: number, eps = 1e-9) {
  assert.ok(Math.abs(a - b) < eps, `${a} !≈ ${b}`);
}

test("templateOutline is deterministic", () => {
  const g = { kind: "fan", halfAngleDeg: 25, radius: 180 } as const;
  assert.deepEqual(templateOutline(g), templateOutline(g));
});

test("fan outline starts at the firing point and stays within radius", () => {
  const g = { kind: "fan", halfAngleDeg: 30, radius: 200 } as const;
  const points = templateOutline(g);
  assert.deepEqual(points[0], { x: 0, y: 0 });
  for (const p of points.slice(1)) {
    const d = Math.hypot(p.x, p.y);
    assert.ok(d <= g.radius + 1e-6, `arc point beyond radius: ${d}`);
    near(d, g.radius, 1e-6); // every arc point sits on the radius
    assert.ok(p.y < 0, "fan points forward (up) in local space");
  }
});

test("fan outline is symmetric about the direction of fire", () => {
  const points = templateOutline({ kind: "fan", halfAngleDeg: 25, radius: 180 });
  const arc = points.slice(1);
  near(arc[0].x, -arc[arc.length - 1].x, 1e-6);
  near(arc[0].y, arc[arc.length - 1].y, 1e-6);
});

test("trapezoid outline has near and far widths at the right distances", () => {
  const points = templateOutline({ kind: "trapezoid", nearWidth: 20, farWidth: 80, length: 250 });
  assert.equal(points.length, 4);
  near(points[1].y, -250);
  near(points[2].x - points[1].x, 80);
  near(points[3].x - points[0].x, 20);
});

test("transformPoint rotates clockwise from north and translates", () => {
  // Local forward (0,-10) facing east (90°) lands 10 units east of the placement.
  const p = transformPoint({ x: 0, y: -10 }, { x: 100, y: 50, rotationDeg: 90 });
  near(p.x, 110, 1e-9);
  near(p.y, 50, 1e-9);
  // 180° points it south.
  const s = transformPoint({ x: 0, y: -10 }, { x: 100, y: 50, rotationDeg: 180 });
  near(s.x, 100, 1e-9);
  near(s.y, 60, 1e-9);
});

test("placementOutline keeps the firing point at the placement position", () => {
  const g = { kind: "fan", halfAngleDeg: 25, radius: 180 } as const;
  const outline = placementOutline(g, { x: 320, y: 240, rotationDeg: 137 });
  near(outline[0].x, 320);
  near(outline[0].y, 240);
});

test("outlinePath produces a closed SVG path", () => {
  const path = outlinePath([{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }]);
  assert.ok(path.startsWith("M 0.00 0.00"));
  assert.ok(path.endsWith("Z"));
});

test("normaliseDeg wraps into [0, 360)", () => {
  assert.equal(normaliseDeg(370), 10);
  assert.equal(normaliseDeg(-15), 345);
  assert.equal(normaliseDeg(360), 0);
});

test("clampToMap keeps placements on the sketch", () => {
  assert.deepEqual(clampToMap({ x: -20, y: 900 }, 1000, 640), { x: 0, y: 640 });
  assert.deepEqual(clampToMap({ x: 500, y: 300 }, 1000, 640), { x: 500, y: 300 });
});

test("every trace template is demo with a source-required reference", () => {
  assert.ok(traceTemplates.length > 0);
  for (const t of traceTemplates) {
    assert.equal(t.demo, true, `${t.id} must be marked demo`);
    assert.equal(t.source.status, "source-required", `${t.id} must not claim a verified source`);
    assert.ok(templateReach(t.geometry) > 0);
  }
});
