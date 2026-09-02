// TACEDGE | Field Firing — deterministic rules evaluation.
// Pure functions only. No LLM output, no randomness, no I/O.
// Everything here is testable independently of the UI (see rules.test.ts).

import type {
  Activity,
  ActivityConfig,
  Condition,
  RequirementDef,
  RequirementResponse,
  RequirementStatus,
  SectionId,
} from "./types";

/** Evaluates one applicability condition against activity configuration. */
export function conditionHolds(config: ActivityConfig, c: Condition): boolean {
  const value = config[c.field];
  if (c.nonEmpty !== undefined) {
    const empty = !Array.isArray(value) || value.length === 0;
    return c.nonEmpty ? !empty : empty;
  }
  if (c.equals !== undefined) return value === c.equals;
  return false;
}

/** A requirement applies when every condition holds (empty list = always). */
export function requirementApplies(config: ActivityConfig, def: RequirementDef): boolean {
  return def.appliesWhen.every((c) => conditionHolds(config, c));
}

/** The requirements applicable to this activity's configuration, in catalogue order. */
export function applicableRequirements(config: ActivityConfig, catalogue: RequirementDef[]): RequirementDef[] {
  return catalogue.filter((def) => requirementApplies(config, def));
}

export function responseStatus(responses: Record<string, RequirementResponse>, id: string): RequirementStatus {
  return responses[id]?.status ?? "not-started";
}

/** Statuses that count as resolved for planning progress. */
export function isResolved(status: RequirementStatus): boolean {
  return status === "complete" || status === "not-applicable";
}

export interface SectionProgress {
  section: SectionId;
  total: number;
  resolved: number;
  blocked: number;
  requiresReview: number;
}

export function sectionProgress(
  config: ActivityConfig,
  responses: Record<string, RequirementResponse>,
  catalogue: RequirementDef[],
  section: SectionId,
): SectionProgress {
  const defs = applicableRequirements(config, catalogue).filter((d) => d.section === section);
  const statuses = defs.map((d) => responseStatus(responses, d.id));
  return {
    section,
    total: defs.length,
    resolved: statuses.filter(isResolved).length,
    blocked: statuses.filter((s) => s === "blocked").length,
    requiresReview: statuses.filter((s) => s === "requires-review").length,
  };
}

export interface PlanReadiness {
  total: number;
  resolved: number;
  outstanding: RequirementDef[];
  criticalOutstanding: RequirementDef[];
  blocked: RequirementDef[];
  requiresReview: RequirementDef[];
  /** True when every critical requirement is resolved and nothing is blocked.
   * This gates submission for review only. It is never a safety declaration. */
  readyForReview: boolean;
}

export function planReadiness(activity: Activity, catalogue: RequirementDef[]): PlanReadiness {
  const defs = applicableRequirements(activity.config, catalogue);
  const outstanding = defs.filter((d) => !isResolved(responseStatus(activity.responses, d.id)));
  const blocked = defs.filter((d) => responseStatus(activity.responses, d.id) === "blocked");
  const requiresReview = defs.filter((d) => responseStatus(activity.responses, d.id) === "requires-review");
  const criticalOutstanding = outstanding.filter((d) => d.critical);
  return {
    total: defs.length,
    resolved: defs.length - outstanding.length,
    outstanding,
    criticalOutstanding,
    blocked,
    requiresReview,
    readyForReview: criticalOutstanding.length === 0 && blocked.length === 0 && requiresReview.length === 0,
  };
}
