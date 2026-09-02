// Safety Plan — the core product experience. A guided workflow, not a giant
// form: sections on the left, requirements expand in place, every requirement
// shows status, current answer, outstanding action and its doctrine source.

import { useState } from "react";
import { CURRENT_USER, useActivity, useStore } from "../domain/store";
import { applicableRequirements, planReadiness, responseStatus, sectionProgress } from "../domain/rules";
import { catalogue, sections } from "../domain/catalogue";
import ActivityHeader from "../components/ActivityHeader";
import { Alert, Chevron, EmptyState, RequirementStatusPill, SourceBlock, shortWhen } from "../components/ui";
import type { RequirementDef, RequirementStatus, SectionId } from "../domain/types";

function RequirementItem({
  activityId,
  def,
  editable,
}: {
  activityId: string;
  def: RequirementDef;
  editable: boolean;
}) {
  const { dispatch } = useStore();
  const activity = useActivity(activityId)!;
  const [open, setOpen] = useState(false);
  const response = activity.responses[def.id];
  const status = responseStatus(activity.responses, def.id);
  const [draft, setDraft] = useState(response?.value ?? "");

  function set(next: RequirementStatus, value?: string) {
    dispatch({ type: "respond", id: activityId, requirementId: def.id, status: next, value });
  }

  const needsText = def.input === "text" || def.input === "appointment";
  const bodyId = `req-body-${def.id}`;

  return (
    <div className="ff-req">
      <button type="button" className="ff-req__head" aria-expanded={open} aria-controls={bodyId} onClick={() => setOpen((v) => !v)}>
        <span className="ff-req__title">
          {def.title}
          {def.critical && <span className="ff-req__critical">Critical</span>}
        </span>
        <RequirementStatusPill status={status} />
        <Chevron />
        {response?.value && !open && <span className="ff-req__answer">{response.value}</span>}
      </button>
      {open && (
        <div className="ff-req__body" id={bodyId}>
          <p className="ff-req__requirement">{def.requirement}</p>
          {def.guidance && <p className="ff-req__guidance">{def.guidance}</p>}
          {def.relatedView === "trace" && (
            <p>
              <a className="btn btn--secondary btn--sm" href={`#/activity/${activityId}/trace`}>
                Open trace{(activity.trace?.length ?? 0) > 0 ? ` (${activity.trace!.length} placed)` : ""}
              </a>
            </p>
          )}

          {needsText && (
            <div className="ff-field">
              <label htmlFor={`in-${def.id}`}>{def.input === "appointment" ? "Name" : "Answer"}</label>
              <textarea
                id={`in-${def.id}`}
                className="ff-textarea"
                value={draft}
                disabled={!editable}
                onChange={(e) => setDraft(e.target.value)}
                rows={def.input === "appointment" ? 1 : 3}
              />
            </div>
          )}

          {editable ? (
            <div className="ff-req__actions">
              <button
                type="button"
                className="btn btn--primary btn--sm"
                disabled={needsText && draft.trim() === ""}
                onClick={() => set("complete", needsText ? draft.trim() : undefined)}
              >
                Mark complete
              </button>
              {needsText && (
                <button
                  type="button"
                  className="btn btn--secondary btn--sm"
                  disabled={draft.trim() === ""}
                  onClick={() => set("in-progress", draft.trim())}
                >
                  Save progress
                </button>
              )}
              <button type="button" className="btn btn--secondary btn--sm" onClick={() => set("not-applicable")}>
                Not applicable
              </button>
              <button type="button" className="btn btn--danger btn--sm" onClick={() => set("blocked")}>
                Mark blocked
              </button>
            </div>
          ) : (
            <p style={{ color: "var(--te-ink-40)", fontSize: "var(--te-fs-base)" }}>
              Read-only in this activity state. Return the plan to planning to make changes.
            </p>
          )}

          {response && (
            <p style={{ color: "var(--te-ink-40)", fontSize: "var(--te-fs-sm)", fontFamily: "var(--te-mono)" }}>
              Updated {shortWhen(response.updatedAt)} by {response.updatedBy === CURRENT_USER ? "you" : response.updatedBy}
            </p>
          )}

          <SourceBlock source={def.source} />
        </div>
      )}
    </div>
  );
}

export default function SafetyPlan({ id }: { id: string }) {
  const { dispatch } = useStore();
  const activity = useActivity(id);
  const [sectionId, setSectionId] = useState<SectionId>("command");

  if (!activity) {
    return <EmptyState title="Activity not found" line="It may have been removed." action={<a className="btn btn--secondary" href="#/activities">Back to activities</a>} />;
  }

  const editable = activity.status === "draft" || activity.status === "planning";
  const readiness = planReadiness(activity, catalogue);
  const applicable = applicableRequirements(activity.config, catalogue);
  const visibleSections = sections.filter((s) => applicable.some((d) => d.section === s.id));
  const current = visibleSections.some((s) => s.id === sectionId) ? sectionId : visibleSections[0]?.id;
  const currentDefs = applicable.filter((d) => d.section === current);
  const currentMeta = sections.find((s) => s.id === current);
  const rco = activity.appointments.some((a) => a.role === "RCO");
  const canSubmit = activity.status === "planning" && readiness.readyForReview && rco;

  return (
    <>
      <ActivityHeader activity={activity} tab="safety-plan" />

      {activity.status === "draft" && (
        <div style={{ marginBottom: 18 }}>
          <Alert kind="info"><b>Draft.</b> Start planning from the Overview to track this plan's progress against the activity lifecycle.</Alert>
        </div>
      )}

      {applicable.length === 0 ? (
        <EmptyState
          title="No requirements apply yet"
          line="Configure the activity to determine which requirements apply."
          action={<a className="btn btn--primary" href={`#/activity/${activity.id}/configure`}>Configure activity</a>}
        />
      ) : (
        <div className="ff-plan">
          <nav className="ff-plan__nav" aria-label="Plan sections">
            {visibleSections.map((s) => {
              const p = sectionProgress(activity.config, activity.responses, catalogue, s.id);
              return (
                <a
                  key={s.id}
                  href={`#/activity/${activity.id}/safety-plan`}
                  aria-current={s.id === current ? "true" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    setSectionId(s.id);
                  }}
                >
                  {s.label}
                  <span className={`count${p.resolved === p.total ? " count--done" : ""}`}>
                    {p.resolved}/{p.total}
                  </span>
                </a>
              );
            })}
          </nav>

          <div>
            <section className="ff-card ff-card--pad" aria-label={currentMeta?.label}>
              <h2>{currentMeta?.label}</h2>
              <p style={{ color: "var(--te-ink-60)", margin: "4px 0 10px" }}>{currentMeta?.intro}</p>
              {currentDefs.map((def) => (
                <RequirementItem key={def.id} activityId={activity.id} def={def} editable={editable} />
              ))}
            </section>

            <div className="ff-plansummary">
              <div className="ff-plansummary__counts">
                <span><b>{readiness.resolved}</b> of <b>{readiness.total}</b> resolved</span>
                <span><b>{readiness.criticalOutstanding.length}</b> critical outstanding</span>
                {readiness.blocked.length > 0 && <span style={{ color: "var(--te-brick)" }}><b>{readiness.blocked.length}</b> blocked</span>}
              </div>
              {activity.status === "planning" ? (
                <button
                  type="button"
                  className="btn btn--primary"
                  disabled={!canSubmit}
                  onClick={() => dispatch({ type: "transition", id: activity.id, event: "submit-for-review" })}
                >
                  Submit for review
                </button>
              ) : (
                <a className="btn btn--secondary" href={`#/activity/${activity.id}`}>Back to overview</a>
              )}
            </div>
            {activity.status === "planning" && !canSubmit && (
              <p style={{ color: "var(--te-ink-40)", fontSize: "var(--te-fs-base)", marginTop: 10 }}>
                {!rco
                  ? "Assign an RCO on the Overview before submitting."
                  : readiness.blocked.length > 0
                    ? "Resolve blocked requirements before submitting."
                    : readiness.requiresReview.length > 0
                      ? "Resolve requirements marked requires review before submitting."
                      : `${readiness.criticalOutstanding.length} critical requirement${readiness.criticalOutstanding.length === 1 ? "" : "s"} outstanding.`}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
