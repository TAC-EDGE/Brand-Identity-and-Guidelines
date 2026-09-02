// TACEDGE | Field Firing — activity lifecycle state machine.
// Pure and deterministic. Transitions are data; the UI consumes them.
// Approval is always an explicit human action recorded with name and role —
// it is never inferred from completeness (master principle: human authority).

import type { Activity, ActivityStatus } from "./types";
import type { PlanReadiness } from "./rules";

export interface Transition {
  event: string;
  from: ActivityStatus;
  to: ActivityStatus;
  label: string;
  /** Extra gate beyond the state match. Returns a reason to refuse, or null. */
  gate?: (activity: Activity, readiness: PlanReadiness) => string | null;
}

export const transitions: Transition[] = [
  { event: "start-planning", from: "draft", to: "planning", label: "Start planning" },
  {
    event: "submit-for-review",
    from: "planning",
    to: "ready-for-review",
    label: "Submit for review",
    gate: (activity, readiness) => {
      if (!activity.appointments.some((a) => a.role === "RCO")) return "No RCO assigned";
      if (readiness.blocked.length > 0) return `${readiness.blocked.length} blocked requirement${readiness.blocked.length === 1 ? "" : "s"}`;
      if (readiness.requiresReview.length > 0) return `${readiness.requiresReview.length} requirement${readiness.requiresReview.length === 1 ? "" : "s"} require review`;
      if (readiness.criticalOutstanding.length > 0)
        return `${readiness.criticalOutstanding.length} critical requirement${readiness.criticalOutstanding.length === 1 ? "" : "s"} outstanding`;
      return null;
    },
  },
  { event: "return-to-planning", from: "ready-for-review", to: "planning", label: "Return to planning" },
  {
    event: "approve",
    from: "ready-for-review",
    to: "approved",
    label: "Record approval",
    gate: (activity) => (activity.approval ? null : "Approval details required"),
  },
  { event: "withdraw-approval", from: "approved", to: "planning", label: "Withdraw approval" },
  { event: "start-activity", from: "approved", to: "active", label: "Start activity" },
  { event: "pause", from: "active", to: "paused", label: "Pause" },
  { event: "resume", from: "paused", to: "active", label: "Resume" },
  { event: "complete", from: "active", to: "complete", label: "Complete activity" },
  { event: "archive", from: "complete", to: "archived", label: "Archive" },
];

export function availableTransitions(activity: Activity, readiness: PlanReadiness): { transition: Transition; refusedBecause: string | null }[] {
  return transitions
    .filter((t) => t.from === activity.status)
    .map((t) => ({ transition: t, refusedBecause: t.gate ? t.gate(activity, readiness) : null }));
}

/** Returns the target status, or an error string explaining refusal. */
export function applyTransition(activity: Activity, readiness: PlanReadiness, event: string): { to: ActivityStatus } | { error: string } {
  const t = transitions.find((x) => x.event === event && x.from === activity.status);
  if (!t) return { error: `No transition "${event}" from status "${activity.status}"` };
  const refused = t.gate ? t.gate(activity, readiness) : null;
  if (refused) return { error: refused };
  return { to: t.to };
}

export const statusLabels: Record<ActivityStatus, string> = {
  draft: "Draft",
  planning: "Planning",
  "ready-for-review": "Ready for review",
  approved: "Approved",
  active: "Active",
  paused: "Paused",
  complete: "Complete",
  archived: "Archived",
};
