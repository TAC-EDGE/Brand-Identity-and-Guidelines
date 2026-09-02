// TACEDGE | Field Firing — domain types.
// Pure types only. No React, no browser APIs, no side effects.
// Safety-critical logic that consumes these types lives in rules.ts and
// workflow.ts and is tested independently of the UI.

/** Activity lifecycle. Provisional until validated against NZDF process. */
export type ActivityStatus =
  | "draft"
  | "planning"
  | "ready-for-review"
  | "approved"
  | "active"
  | "paused"
  | "complete"
  | "archived";

export type RequirementStatus =
  | "not-started"
  | "in-progress"
  | "complete"
  | "requires-review"
  | "not-applicable"
  | "blocked";

/** Safety plan sections. Terminology adapts once source doctrine is supplied. */
export type SectionId =
  | "command"
  | "range"
  | "weapons"
  | "medical"
  | "communications"
  | "conduct";

export type ActivityType = "live" | "blank" | "dry";

/**
 * Configuration that drives which requirements apply.
 * Kept flat and boolean-heavy so applicability conditions stay
 * deterministic and testable as data.
 */
export interface ActivityConfig {
  activityType: ActivityType;
  night: boolean;
  pyrotechnics: boolean;
  vehicles: boolean;
  supportingWeapons: boolean;
  weaponSystemIds: string[];
}

/**
 * Reference to authoritative doctrine.
 * status "source-required" means the NZDF publication has not yet been
 * supplied to this repository; the UI must surface that, never hide it.
 */
export interface DoctrineRef {
  publication: string;
  section?: string;
  paragraph?: string;
  version?: string;
  effectiveFrom?: string;
  status: "verified" | "source-required";
  verifiedBy?: string;
  encodedOn?: string;
}

/** How a requirement is answered. */
export type RequirementInput = "confirm" | "text" | "appointment";

export interface RequirementDef {
  id: string;
  section: SectionId;
  title: string;
  /** What must be done, in operational language. */
  requirement: string;
  /** Optional help shown in the detail view. */
  guidance?: string;
  input: RequirementInput;
  /** All conditions must hold for the requirement to apply. Empty = always. */
  appliesWhen: Condition[];
  /** Critical requirements block submission for review while outstanding. */
  critical: boolean;
  source: DoctrineRef;
  /** Optional in-app view that supports answering this requirement. */
  relatedView?: "trace";
}

/**
 * Deterministic applicability condition, expressed as data so the rules
 * engine can evaluate, version and test it. No free-form logic.
 */
export interface Condition {
  field: keyof ActivityConfig;
  /** Matches when the config value equals this (booleans, strings). */
  equals?: boolean | string;
  /** Matches when the (array) config value is non-empty. */
  nonEmpty?: boolean;
}

export interface RequirementResponse {
  requirementId: string;
  status: RequirementStatus;
  /** Text answer or appointment name, depending on input type. */
  value?: string;
  note?: string;
  updatedAt: string;
  updatedBy: string;
}

export interface AuditEvent {
  id: string;
  at: string;
  user: string;
  action: string;
  detail?: string;
  previous?: string;
  next?: string;
}

export interface Appointment {
  role: "RCO" | "ECO" | "RSO" | "Medic" | "Planner";
  personName: string;
}

export interface Activity {
  id: string;
  name: string;
  unit: string;
  rangeName: string;
  location: string;
  startDate: string;
  endDate: string;
  timings: string;
  status: ActivityStatus;
  config: ActivityConfig;
  appointments: Appointment[];
  responses: Record<string, RequirementResponse>;
  /** Weapon templates placed on the range trace. Absent on older stored data. */
  trace?: TracePlacement[];
  audit: AuditEvent[];
  createdAt: string;
  /** Catalogue version the plan was built against (change control, §23). */
  rulesetId: string;
  rulesetVersion: string;
  approval?: {
    approvedBy: string;
    role: string;
    at: string;
    rulesetVersion: string;
  };
}

export interface WeaponSystem {
  id: string;
  name: string;
  /** Demo data only. Safety distances are never invented. */
  demo: boolean;
}

/**
 * One weapon template placed on the activity trace.
 * Coordinates and rotation are in map units on the demo range sketch;
 * the template's shape comes from its TraceTemplateDef (see trace.ts).
 */
export interface TracePlacement {
  id: string;
  templateId: string;
  /** Firing point position, map units. */
  x: number;
  y: number;
  /** Direction of fire, degrees clockwise from map north (up). */
  rotationDeg: number;
  label: string;
}
