// Run via: npm run test:field-firing
// Uses node:test with type stripping — no test dependencies.
import { test } from "node:test";
import assert from "node:assert/strict";

import { applicableRequirements, conditionHolds, planReadiness, sectionProgress } from "./rules.ts";
import { applyTransition, availableTransitions } from "./workflow.ts";
import { catalogue, CATALOGUE_ID, CATALOGUE_VERSION } from "./catalogue.ts";
import type { Activity, ActivityConfig, RequirementResponse } from "./types";

const baseConfig: ActivityConfig = {
  activityType: "live",
  night: false,
  pyrotechnics: false,
  vehicles: false,
  supportingWeapons: false,
  weaponSystemIds: ["ws-rifle"],
};

function makeActivity(overrides: Partial<Activity> = {}): Activity {
  return {
    id: "a1",
    name: "Test activity",
    unit: "Demo unit",
    rangeName: "Demo range",
    location: "Demo location",
    startDate: "2026-09-10",
    endDate: "2026-09-10",
    timings: "0800-1600",
    status: "planning",
    config: { ...baseConfig },
    appointments: [{ role: "RCO", personName: "Demo RCO" }],
    responses: {},
    audit: [],
    createdAt: "2026-09-01T00:00:00.000Z",
    rulesetId: CATALOGUE_ID,
    rulesetVersion: CATALOGUE_VERSION,
    ...overrides,
  };
}

function complete(ids: string[]): Record<string, RequirementResponse> {
  return Object.fromEntries(
    ids.map((id) => [id, { requirementId: id, status: "complete" as const, updatedAt: "", updatedBy: "test" }]),
  );
}

test("conditionHolds evaluates equals and nonEmpty deterministically", () => {
  assert.equal(conditionHolds(baseConfig, { field: "night", equals: true }), false);
  assert.equal(conditionHolds({ ...baseConfig, night: true }, { field: "night", equals: true }), true);
  assert.equal(conditionHolds(baseConfig, { field: "weaponSystemIds", nonEmpty: true }), true);
  assert.equal(conditionHolds({ ...baseConfig, weaponSystemIds: [] }, { field: "weaponSystemIds", nonEmpty: true }), false);
});

test("night controls apply only to night activities", () => {
  const day = applicableRequirements(baseConfig, catalogue).map((d) => d.id);
  const night = applicableRequirements({ ...baseConfig, night: true }, catalogue).map((d) => d.id);
  assert.ok(!day.includes("req-night-controls"));
  assert.ok(night.includes("req-night-controls"));
});

test("weapon-dependent requirements drop when no weapons are configured", () => {
  const ids = applicableRequirements({ ...baseConfig, weaponSystemIds: [] }, catalogue).map((d) => d.id);
  assert.ok(!ids.includes("req-weapons-declared"));
  assert.ok(!ids.includes("req-ammunition-natures"));
  assert.ok(!ids.includes("req-misfire"));
});

test("pyrotechnics and supporting weapons requirements are configuration-driven", () => {
  const withBoth = applicableRequirements(
    { ...baseConfig, pyrotechnics: true, supportingWeapons: true },
    catalogue,
  ).map((d) => d.id);
  assert.ok(withBoth.includes("req-pyrotechnics"));
  assert.ok(withBoth.includes("req-supporting-weapons"));
});

test("sectionProgress counts resolved, blocked and requires-review", () => {
  const responses: Record<string, RequirementResponse> = {
    "req-rco-appointed": { requirementId: "req-rco-appointed", status: "complete", updatedAt: "", updatedBy: "t" },
    "req-eco-appointed": { requirementId: "req-eco-appointed", status: "not-applicable", updatedAt: "", updatedBy: "t" },
    "req-safety-staff": { requirementId: "req-safety-staff", status: "blocked", updatedAt: "", updatedBy: "t" },
  };
  const p = sectionProgress(baseConfig, responses, catalogue, "command");
  assert.equal(p.total, 3);
  assert.equal(p.resolved, 2);
  assert.equal(p.blocked, 1);
});

test("planReadiness refuses while critical requirements are outstanding", () => {
  const activity = makeActivity();
  const r = planReadiness(activity, catalogue);
  assert.equal(r.readyForReview, false);
  assert.ok(r.criticalOutstanding.length > 0);
});

test("planReadiness is ready once critical items are resolved and none are blocked", () => {
  const activity = makeActivity();
  const criticalIds = applicableRequirements(activity.config, catalogue)
    .filter((d) => d.critical)
    .map((d) => d.id);
  activity.responses = complete(criticalIds);
  const r = planReadiness(activity, catalogue);
  assert.equal(r.criticalOutstanding.length, 0);
  assert.equal(r.readyForReview, true);
});

test("submit-for-review is gated on RCO and critical completeness", () => {
  const activity = makeActivity({ appointments: [] });
  const r = planReadiness(activity, catalogue);
  const result = applyTransition(activity, r, "submit-for-review");
  assert.ok("error" in result && result.error === "No RCO assigned");

  const withRco = makeActivity();
  const r2 = planReadiness(withRco, catalogue);
  const result2 = applyTransition(withRco, r2, "submit-for-review");
  assert.ok("error" in result2 && result2.error.includes("critical"));

  const criticalIds = applicableRequirements(withRco.config, catalogue)
    .filter((d) => d.critical)
    .map((d) => d.id);
  const ready = makeActivity({ responses: complete(criticalIds) });
  const r3 = planReadiness(ready, catalogue);
  const result3 = applyTransition(ready, r3, "submit-for-review");
  assert.deepEqual(result3, { to: "ready-for-review" });
});

test("approval is explicit: never granted by completeness alone", () => {
  const activity = makeActivity({ status: "ready-for-review" });
  const r = planReadiness(activity, catalogue);
  const refused = applyTransition(activity, r, "approve");
  assert.ok("error" in refused && refused.error === "Approval details required");

  activity.approval = { approvedBy: "Demo approver", role: "ECO", at: "2026-09-02T00:00:00Z", rulesetVersion: CATALOGUE_VERSION };
  const granted = applyTransition(activity, r, "approve");
  assert.deepEqual(granted, { to: "approved" });
});

test("lifecycle transitions only exist from their declared state", () => {
  const activity = makeActivity({ status: "draft" });
  const r = planReadiness(activity, catalogue);
  assert.ok("error" in applyTransition(activity, r, "pause"));
  assert.deepEqual(applyTransition(activity, r, "start-planning"), { to: "planning" });
  const options = availableTransitions(activity, r);
  assert.equal(options.length, 1);
  assert.equal(options[0].transition.event, "start-planning");
});

test("catalogue carries no verified sources yet — everything is SOURCE REQUIRED", () => {
  for (const def of catalogue) {
    assert.equal(def.source.status, "source-required", `${def.id} must not claim a verified source`);
  }
});
