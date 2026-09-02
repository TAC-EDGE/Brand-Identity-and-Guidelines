// Trace — drag weapon templates onto the range sketch to develop the
// live field firing trace quickly.
//
// The map is a fictional demo range sketch (offline, no real location).
// Template shapes are deterministic placeholder geometry: weapon danger
// area dimensions are SOURCE REQUIRED and never invented, so shapes are
// unitless and labelled DEMO. The trace is a planning sketch that records
// firing points, directions and template footprints — it does not
// calculate danger areas and it is never a safety declaration.

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { useActivity, useStore } from "../domain/store";
import {
  clampToMap,
  normaliseDeg,
  outlinePath,
  placementOutline,
  templateById,
  templateOutline,
  templateReach,
  traceTemplates,
  transformPoint,
} from "../domain/trace";
import ActivityHeader from "../components/ActivityHeader";
import { Alert, EmptyState } from "../components/ui";
import type { TracePlacement } from "../domain/types";

const MAP_W = 1000;
const MAP_H = 640;
const DEG = 180 / Math.PI;

/** Small local-space preview of a template for the palette. */
function TemplatePreview({ templateId }: { templateId: string }) {
  const def = templateById(templateId);
  if (!def) return null;
  const points = templateOutline(def.geometry);
  const reach = templateReach(def.geometry);
  const scale = 26 / reach;
  const path = outlinePath(points.map((p) => ({ x: p.x * scale, y: p.y * scale })));
  return (
    <svg width="36" height="36" viewBox="-18 -32 36 36" aria-hidden="true">
      <path d={path} fill="rgba(110,125,92,.25)" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="0" cy="0" r="2" fill="currentColor" />
    </svg>
  );
}

export default function Trace({ id }: { id: string }) {
  const { dispatch } = useStore();
  const activity = useActivity(id);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const suppressClick = useRef(false);

  const [selected, setSelected] = useState<string | null>(null);
  const [paletteDrag, setPaletteDrag] = useState<{ templateId: string; cx: number; cy: number; moved: boolean } | null>(null);
  const [shapeDrag, setShapeDrag] = useState<{ placementId: string; offsetX: number; offsetY: number; x: number; y: number } | null>(null);
  const [rotateDrag, setRotateDrag] = useState<{ placementId: string; deg: number } | null>(null);

  if (!activity) {
    return <EmptyState title="Activity not found" line="It may have been removed." action={<a className="btn btn--secondary" href="#/activities">Back to activities</a>} />;
  }

  const editable = activity.status === "draft" || activity.status === "planning";
  const placements = activity.trace ?? [];
  const configuredTemplates = traceTemplates.filter((t) => activity.config.weaponSystemIds.includes(t.weaponSystemId));
  const selectedPlacement = placements.find((p) => p.id === selected) ?? null;

  function clientToMap(clientX: number, clientY: number): { x: number; y: number } | null {
    const svg = svgRef.current;
    const ctm = svg?.getScreenCTM();
    if (!svg || !ctm) return null;
    const pt = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse());
    return { x: pt.x, y: pt.y };
  }

  function overMap(clientX: number, clientY: number): boolean {
    const rect = svgRef.current?.getBoundingClientRect();
    return !!rect && clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
  }

  function addTemplate(templateId: string, at: { x: number; y: number }) {
    const clamped = clampToMap(at, MAP_W, MAP_H);
    dispatch({ type: "trace-add", id, templateId, x: Math.round(clamped.x), y: Math.round(clamped.y), rotationDeg: 0 });
  }

  // Palette drag: pointer capture keeps move/up events on the button.
  function onPaletteDown(e: ReactPointerEvent<HTMLButtonElement>, templateId: string) {
    if (!editable) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setPaletteDrag({ templateId, cx: e.clientX, cy: e.clientY, moved: false });
  }
  function onPaletteMove(e: ReactPointerEvent<HTMLButtonElement>) {
    setPaletteDrag((d) => {
      if (!d) return d;
      const moved = d.moved || Math.hypot(e.clientX - d.cx, e.clientY - d.cy) > 6;
      return { ...d, cx: e.clientX, cy: e.clientY, moved };
    });
  }
  function onPaletteUp(e: ReactPointerEvent<HTMLButtonElement>) {
    const d = paletteDrag;
    setPaletteDrag(null);
    if (!d) return;
    suppressClick.current = true;
    setTimeout(() => { suppressClick.current = false; }, 0);
    if (d.moved && overMap(e.clientX, e.clientY)) {
      const at = clientToMap(e.clientX, e.clientY);
      if (at) addTemplate(d.templateId, at);
    } else if (!d.moved) {
      addTemplate(d.templateId, { x: MAP_W / 2, y: MAP_H / 2 });
    }
  }
  function onPaletteClick(templateId: string) {
    if (suppressClick.current || !editable) return; // keyboard activation only
    addTemplate(templateId, { x: MAP_W / 2, y: MAP_H / 2 });
  }

  // Move a placed template.
  function onShapeDown(e: ReactPointerEvent<SVGGElement>, p: TracePlacement) {
    setSelected(p.id);
    if (!editable) return;
    e.stopPropagation();
    const at = clientToMap(e.clientX, e.clientY);
    if (!at) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setShapeDrag({ placementId: p.id, offsetX: at.x - p.x, offsetY: at.y - p.y, x: p.x, y: p.y });
  }
  function onShapeMove(e: ReactPointerEvent<SVGGElement>) {
    if (!shapeDrag) return;
    const at = clientToMap(e.clientX, e.clientY);
    if (!at) return;
    const next = clampToMap({ x: at.x - shapeDrag.offsetX, y: at.y - shapeDrag.offsetY }, MAP_W, MAP_H);
    setShapeDrag({ ...shapeDrag, x: next.x, y: next.y });
  }
  function onShapeUp() {
    if (!shapeDrag) return;
    dispatch({ type: "trace-update", id, placementId: shapeDrag.placementId, x: Math.round(shapeDrag.x), y: Math.round(shapeDrag.y), kind: "moved" });
    setShapeDrag(null);
  }

  // Rotate via the handle.
  function onRotateDown(e: ReactPointerEvent<SVGGElement>, p: TracePlacement) {
    if (!editable) return;
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    setRotateDrag({ placementId: p.id, deg: p.rotationDeg });
  }
  function onRotateMove(e: ReactPointerEvent<SVGGElement>, p: TracePlacement) {
    if (!rotateDrag) return;
    const at = clientToMap(e.clientX, e.clientY);
    if (!at) return;
    const deg = normaliseDeg(Math.atan2(at.x - p.x, -(at.y - p.y)) * DEG);
    setRotateDrag({ placementId: p.id, deg });
  }
  function onRotateUp() {
    if (!rotateDrag) return;
    dispatch({ type: "trace-update", id, placementId: rotateDrag.placementId, rotationDeg: Math.round(rotateDrag.deg), kind: "rotated" });
    setRotateDrag(null);
  }

  function rotateBy(p: TracePlacement, delta: number) {
    dispatch({ type: "trace-update", id, placementId: p.id, rotationDeg: normaliseDeg(p.rotationDeg + delta), kind: "rotated" });
  }

  /** Placement with any in-flight drag applied. */
  function livePlacement(p: TracePlacement): TracePlacement {
    if (shapeDrag?.placementId === p.id) return { ...p, x: shapeDrag.x, y: shapeDrag.y };
    if (rotateDrag?.placementId === p.id) return { ...p, rotationDeg: rotateDrag.deg };
    return p;
  }

  const gridLines: number[] = [];
  for (let g = 100; g < MAP_W; g += 100) gridLines.push(g);

  return (
    <>
      <ActivityHeader activity={activity} tab="trace" />

      <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
        <Alert kind="warn">
          <b>Demo sketch.</b> Template shapes are placeholders — weapon danger area dimensions are SOURCE REQUIRED.
          The trace records positions and directions; it does not calculate danger areas.
        </Alert>
        {!editable && (
          <Alert kind="info"><b>Read-only.</b> The trace can only be edited while the activity is in Draft or Planning.</Alert>
        )}
      </div>

      {configuredTemplates.length === 0 ? (
        <EmptyState
          title="No weapon systems configured"
          line="Templates come from the activity's weapon systems. Configure them first."
          action={<a className="btn btn--primary" href={`#/activity/${activity.id}/configure`}>Configure activity</a>}
        />
      ) : (
        <div className="ff-trace">
          <div className="ff-trace__palette">
            <div className="ff-card ff-card--pad" style={{ padding: 16 }}>
              <h2 style={{ marginBottom: 4 }}>Templates</h2>
              <p style={{ color: "var(--te-ink-60)", fontSize: "var(--te-fs-base)", marginBottom: 12 }}>
                Drag onto the map, or select to place at the centre.
              </p>
              <div className="ff-palette">
                {configuredTemplates.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className="ff-palette__item"
                    disabled={!editable}
                    onPointerDown={(e) => onPaletteDown(e, t.id)}
                    onPointerMove={onPaletteMove}
                    onPointerUp={onPaletteUp}
                    onClick={() => onPaletteClick(t.id)}
                  >
                    <TemplatePreview templateId={t.id} />
                    <span>
                      {t.name.replace(" (demo)", "")}
                      <small>Demo shape · dimensions SOURCE REQUIRED</small>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="ff-card ff-tracemap">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${MAP_W} ${MAP_H}`}
              role="img"
              aria-label="Demo range sketch with placed weapon templates"
              onPointerDown={() => setSelected(null)}
            >
              <g className="grid" aria-hidden="true">
                {gridLines.map((g) => <line key={`v${g}`} x1={g} y1={0} x2={g} y2={MAP_H} />)}
                {[100, 200, 300, 400, 500, 600].map((g) => <line key={`h${g}`} x1={0} y1={g} x2={MAP_W} y2={g} />)}
              </g>
              <g className="contour" aria-hidden="true">
                <path d="M -40 470 C 140 430 210 500 330 480 C 470 455 520 530 690 505 C 830 485 900 520 1040 500" />
                <path d="M -40 530 C 150 495 240 560 380 540 C 520 520 600 585 760 560 C 880 542 950 570 1040 555" />
                <path d="M 640 90 C 700 60 790 65 850 100 C 910 135 900 195 830 210 C 750 226 660 180 640 90 Z" />
              </g>
              <text className="maplabel" x={16} y={28}>Demo range sketch — fictional · not to scale</text>
              <text className="maplabel" x={16} y={MAP_H - 14}>Grid: demo units · no datum</text>
              {/* North arrow */}
              <g aria-hidden="true" transform={`translate(${MAP_W - 40}, 44)`} stroke="var(--te-ink-40)" fill="none" strokeWidth="1.4" strokeLinecap="round">
                <path d="M0 12 V-12 M-5 -5 L0 -12 L5 -5" />
                <text className="maplabel" x={-4} y={30} stroke="none" fill="var(--te-ink-40)">N</text>
              </g>

              {placements.map((raw) => {
                const def = templateById(raw.templateId);
                if (!def) return null;
                const p = livePlacement(raw);
                const isSelected = selected === p.id;
                const path = outlinePath(placementOutline(def.geometry, p));
                const reach = templateReach(def.geometry);
                const handle = transformPoint({ x: 0, y: -(reach + 28) }, p);
                const tip = transformPoint({ x: 0, y: -reach }, p);
                return (
                  <g key={p.id}>
                    <g
                      className={`ff-shape${isSelected ? " ff-shape--selected" : ""}`}
                      onPointerDown={(e) => onShapeDown(e, raw)}
                      onPointerMove={onShapeMove}
                      onPointerUp={onShapeUp}
                    >
                      <path d={path} />
                      <circle className="fp" cx={p.x} cy={p.y} r={5} />
                      <text x={p.x + 10} y={p.y + 4}>{p.label}</text>
                      <text className="demo-tag" x={p.x + 10} y={p.y + 18}>DEMO</text>
                    </g>
                    {isSelected && editable && (
                      <g
                        className="ff-rotate-handle"
                        onPointerDown={(e) => onRotateDown(e, raw)}
                        onPointerMove={(e) => onRotateMove(e, raw)}
                        onPointerUp={onRotateUp}
                      >
                        <line x1={tip.x} y1={tip.y} x2={handle.x} y2={handle.y} />
                        <circle cx={handle.x} cy={handle.y} r={11} />
                        <circle cx={handle.x} cy={handle.y} r={3.5} fill="var(--te-forest)" stroke="none" />
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
            {paletteDrag?.moved && (
              <span className="ff-dragghost" style={{ left: paletteDrag.cx, top: paletteDrag.cy }}>
                {templateById(paletteDrag.templateId)?.name.replace(" (demo)", "")}
              </span>
            )}
          </div>

          <div className="ff-trace__inspector">
            <div className="ff-card ff-card--pad" style={{ padding: 16 }}>
              <h2 style={{ marginBottom: 8 }}>Selected</h2>
              {selectedPlacement ? (
                <div style={{ display: "grid", gap: 10 }}>
                  <p style={{ fontWeight: 600 }}>{selectedPlacement.label}</p>
                  <p style={{ color: "var(--te-ink-60)", fontSize: "var(--te-fs-base)" }}>
                    Direction of fire <b style={{ fontFamily: "var(--te-mono)" }}>{Math.round(livePlacement(selectedPlacement).rotationDeg)}°</b> (demo grid, from map north)
                  </p>
                  {editable && (
                    <>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button type="button" className="btn btn--secondary btn--sm" onClick={() => rotateBy(selectedPlacement, -15)}>⟲ 15°</button>
                        <button type="button" className="btn btn--secondary btn--sm" onClick={() => rotateBy(selectedPlacement, 15)}>⟳ 15°</button>
                      </div>
                      <button
                        type="button"
                        className="btn btn--danger btn--sm"
                        onClick={() => {
                          dispatch({ type: "trace-remove", id, placementId: selectedPlacement.id });
                          setSelected(null);
                        }}
                      >
                        Remove from trace
                      </button>
                    </>
                  )}
                  <p style={{ color: "var(--te-ink-40)", fontSize: "var(--te-fs-sm)" }}>
                    Dimensions: SOURCE REQUIRED. This shape is a demonstration placeholder, not a weapon danger area.
                  </p>
                </div>
              ) : (
                <p style={{ color: "var(--te-ink-60)", fontSize: "var(--te-fs-base)" }}>Select a placed template to move, rotate or remove it.</p>
              )}
            </div>

            <div className="ff-card ff-card--pad" style={{ padding: 16 }}>
              <h2 style={{ marginBottom: 8 }}>On the trace</h2>
              {placements.length === 0 ? (
                <p style={{ color: "var(--te-ink-60)", fontSize: "var(--te-fs-base)" }}>Nothing placed yet.</p>
              ) : (
                <ul className="ff-placements">
                  {placements.map((p) => (
                    <li key={p.id}>
                      <button type="button" aria-current={selected === p.id ? "true" : undefined} onClick={() => setSelected(p.id)}>
                        {p.label}
                        <span className="deg">{Math.round(p.rotationDeg)}°</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
