// TACEDGE | Field Firing — prototype data store.
// React context over useReducer with localStorage persistence.
// This stands in for a future offline-first sync layer (Supabase or similar);
// the UI reads an explicit save state and never pretends to be synced.
// Every mutation appends an audit event: user, timestamp, action, prev/next.

import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import type { Activity, ActivityConfig, Appointment, AuditEvent, RequirementResponse, RequirementStatus, TracePlacement } from "./types";
import { templateById } from "./trace";
import { CATALOGUE_ID, CATALOGUE_VERSION } from "./catalogue";
import { planReadiness } from "./rules";
import { applyTransition, statusLabels } from "./workflow";
import { catalogue } from "./catalogue";

const STORAGE_KEY = "tacedge-field-firing-v1";

/** Signed-in user placeholder until authentication is introduced. */
export const CURRENT_USER = "Demo user";

export interface State {
  activities: Activity[];
  /** Honest persistence state shown in the shell. */
  saveState: "saved-locally" | "saving" | "storage-unavailable";
}

export type Action =
  | { type: "create-activity"; activity: Activity }
  | { type: "update-details"; id: string; patch: Partial<Pick<Activity, "name" | "unit" | "rangeName" | "location" | "startDate" | "endDate" | "timings">> }
  | { type: "update-config"; id: string; patch: Partial<ActivityConfig> }
  | { type: "set-appointment"; id: string; appointment: Appointment }
  | { type: "remove-appointment"; id: string; role: Appointment["role"] }
  | { type: "respond"; id: string; requirementId: string; status: RequirementStatus; value?: string; note?: string }
  | { type: "trace-add"; id: string; templateId: string; x: number; y: number; rotationDeg: number }
  | { type: "trace-update"; id: string; placementId: string; x?: number; y?: number; rotationDeg?: number; kind: "moved" | "rotated" }
  | { type: "trace-remove"; id: string; placementId: string }
  | { type: "transition"; id: string; event: string }
  | { type: "record-approval"; id: string; approvedBy: string; role: string }
  | { type: "storage-unavailable" };

function nowIso(): string {
  return new Date().toISOString();
}

function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function audit(action: string, detail?: string, previous?: string, next?: string): AuditEvent {
  return { id: newId("ev"), at: nowIso(), user: CURRENT_USER, action, detail, previous, next };
}

function withActivity(state: State, id: string, fn: (a: Activity) => Activity): State {
  return { ...state, activities: state.activities.map((a) => (a.id === id ? fn(a) : a)), saveState: "saved-locally" };
}

export function defaultConfig(): ActivityConfig {
  return { activityType: "live", night: false, pyrotechnics: false, vehicles: false, supportingWeapons: false, weaponSystemIds: [] };
}

export function newActivity(input: { name: string; unit: string; rangeName: string; location: string; startDate: string; endDate: string; timings: string }): Activity {
  return {
    id: newId("act"),
    ...input,
    status: "draft",
    config: defaultConfig(),
    appointments: [],
    responses: {},
    audit: [audit("Activity created", input.name)],
    createdAt: nowIso(),
    rulesetId: CATALOGUE_ID,
    rulesetVersion: CATALOGUE_VERSION,
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "create-activity":
      return { ...state, activities: [action.activity, ...state.activities], saveState: "saved-locally" };

    case "update-details":
      return withActivity(state, action.id, (a) => ({
        ...a,
        ...action.patch,
        audit: [...a.audit, audit("Details updated", Object.keys(action.patch).join(", "))],
      }));

    case "update-config":
      return withActivity(state, action.id, (a) => {
        const entries = Object.entries(action.patch) as [string, unknown][];
        const detail = entries.map(([k, v]) => `${k} → ${Array.isArray(v) ? v.length + " selected" : String(v)}`).join("; ");
        const changedAfterApproval = a.status === "approved" || a.status === "active" || a.status === "paused";
        return {
          ...a,
          config: { ...a.config, ...action.patch },
          audit: [
            ...a.audit,
            audit(changedAfterApproval ? "Configuration changed after approval" : "Configuration changed", detail),
          ],
        };
      });

    case "set-appointment":
      return withActivity(state, action.id, (a) => {
        const prev = a.appointments.find((x) => x.role === action.appointment.role);
        return {
          ...a,
          appointments: [...a.appointments.filter((x) => x.role !== action.appointment.role), action.appointment],
          audit: [...a.audit, audit(`${action.appointment.role} assigned`, action.appointment.personName, prev?.personName)],
        };
      });

    case "remove-appointment":
      return withActivity(state, action.id, (a) => {
        const prev = a.appointments.find((x) => x.role === action.role);
        if (!prev) return a;
        return {
          ...a,
          appointments: a.appointments.filter((x) => x.role !== action.role),
          audit: [...a.audit, audit(`${action.role} removed`, undefined, prev.personName)],
        };
      });

    case "respond":
      return withActivity(state, action.id, (a) => {
        const prev = a.responses[action.requirementId];
        const def = catalogue.find((d) => d.id === action.requirementId);
        const response: RequirementResponse = {
          requirementId: action.requirementId,
          status: action.status,
          value: action.value ?? prev?.value,
          note: action.note ?? prev?.note,
          updatedAt: nowIso(),
          updatedBy: CURRENT_USER,
        };
        return {
          ...a,
          responses: { ...a.responses, [action.requirementId]: response },
          audit: [
            ...a.audit,
            audit(
              prev ? "Requirement updated" : "Requirement answered",
              def?.title ?? action.requirementId,
              prev?.status,
              action.status,
            ),
          ],
        };
      });

    case "trace-add":
      return withActivity(state, action.id, (a) => {
        const def = templateById(action.templateId);
        if (!def) return a;
        const trace = a.trace ?? [];
        const n = trace.filter((p) => p.templateId === action.templateId).length + 1;
        const placement: TracePlacement = {
          id: newId("tp"),
          templateId: action.templateId,
          x: action.x,
          y: action.y,
          rotationDeg: action.rotationDeg,
          label: `${def.name.replace(" template (demo)", "")} ${n}`,
        };
        const afterApproval = a.status === "approved" || a.status === "active" || a.status === "paused";
        return {
          ...a,
          trace: [...trace, placement],
          audit: [...a.audit, audit(afterApproval ? "Trace changed after approval" : "Template placed on trace", placement.label)],
        };
      });

    case "trace-update":
      return withActivity(state, action.id, (a) => {
        const trace = a.trace ?? [];
        const prev = trace.find((p) => p.id === action.placementId);
        if (!prev) return a;
        const next: TracePlacement = {
          ...prev,
          x: action.x ?? prev.x,
          y: action.y ?? prev.y,
          rotationDeg: action.rotationDeg ?? prev.rotationDeg,
        };
        if (next.x === prev.x && next.y === prev.y && next.rotationDeg === prev.rotationDeg) return a;
        const afterApproval = a.status === "approved" || a.status === "active" || a.status === "paused";
        return {
          ...a,
          trace: trace.map((p) => (p.id === action.placementId ? next : p)),
          audit: [
            ...a.audit,
            audit(
              afterApproval ? "Trace changed after approval" : `Trace template ${action.kind}`,
              prev.label,
              action.kind === "rotated" ? `${Math.round(prev.rotationDeg)}°` : `${Math.round(prev.x)}, ${Math.round(prev.y)}`,
              action.kind === "rotated" ? `${Math.round(next.rotationDeg)}°` : `${Math.round(next.x)}, ${Math.round(next.y)}`,
            ),
          ],
        };
      });

    case "trace-remove":
      return withActivity(state, action.id, (a) => {
        const trace = a.trace ?? [];
        const prev = trace.find((p) => p.id === action.placementId);
        if (!prev) return a;
        const afterApproval = a.status === "approved" || a.status === "active" || a.status === "paused";
        return {
          ...a,
          trace: trace.filter((p) => p.id !== action.placementId),
          audit: [...a.audit, audit(afterApproval ? "Trace changed after approval" : "Template removed from trace", prev.label)],
        };
      });

    case "transition":
      return withActivity(state, action.id, (a) => {
        const result = applyTransition(a, planReadiness(a, catalogue), action.event);
        if ("error" in result) return a; // UI disables gated actions; never transition silently
        return {
          ...a,
          status: result.to,
          audit: [...a.audit, audit("Status changed", undefined, statusLabels[a.status], statusLabels[result.to])],
        };
      });

    case "record-approval":
      return withActivity(state, action.id, (a) => {
        if (a.status !== "ready-for-review") return a;
        const approved: Activity = {
          ...a,
          approval: { approvedBy: action.approvedBy, role: action.role, at: nowIso(), rulesetVersion: a.rulesetVersion },
        };
        const result = applyTransition(approved, planReadiness(approved, catalogue), "approve");
        if ("error" in result) return a;
        return {
          ...approved,
          status: result.to,
          audit: [...a.audit, audit("Plan approved", `${action.approvedBy} (${action.role})`, statusLabels[a.status], statusLabels[result.to])],
        };
      });

    case "storage-unavailable":
      return { ...state, saveState: "storage-unavailable" };
  }
}

// Seed data — clearly fictional, for demonstration only. -------------------

function seed(): Activity[] {
  const a = newActivity({
    name: "Rifle grouping and zeroing (demo)",
    unit: "Demo Company, Demo Regiment",
    rangeName: "Demo Range 1",
    location: "Demo training area",
    startDate: "2026-09-14",
    endDate: "2026-09-14",
    timings: "0800–1600",
  });
  a.status = "planning";
  a.config = { ...a.config, activityType: "live", weaponSystemIds: ["ws-rifle"] };
  a.appointments = [{ role: "RCO", personName: "Demo RCO (fictional)" }];
  a.responses = {
    "req-rco-appointed": { requirementId: "req-rco-appointed", status: "complete", value: "Demo RCO (fictional)", updatedAt: nowIso(), updatedBy: CURRENT_USER },
    "req-range-authorised": { requirementId: "req-range-authorised", status: "complete", updatedAt: nowIso(), updatedBy: CURRENT_USER },
    "req-comms-plan": { requirementId: "req-comms-plan", status: "in-progress", value: "Primary: range control net (demo)", updatedAt: nowIso(), updatedBy: CURRENT_USER },
  };
  a.audit = [...a.audit, audit("RCO assigned", "Demo RCO (fictional)"), audit("Status changed", undefined, "Draft", "Planning")];

  const b = newActivity({
    name: "Section live field firing (demo)",
    unit: "Demo Company, Demo Regiment",
    rangeName: "Demo Range 4",
    location: "Demo training area",
    startDate: "2026-10-02",
    endDate: "2026-10-03",
    timings: "0700–2200",
  });
  b.config = { ...b.config, activityType: "live", night: true, pyrotechnics: true, weaponSystemIds: ["ws-rifle", "ws-lsw"] };

  return [a, b];
}

// Persistence ---------------------------------------------------------------

function load(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { activities: Activity[] };
      if (Array.isArray(parsed.activities)) return { activities: parsed.activities, saveState: "saved-locally" };
    }
  } catch {
    return { activities: seed(), saveState: "storage-unavailable" };
  }
  return { activities: seed(), saveState: "saved-locally" };
}

const StoreContext = createContext<{ state: State; dispatch: (a: Action) => void } | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ activities: state.activities }));
    } catch {
      dispatch({ type: "storage-unavailable" });
    }
  }, [state.activities]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export function useActivity(id: string | undefined): Activity | undefined {
  const { state } = useStore();
  return state.activities.find((a) => a.id === id);
}
