// Activity Overview — the command screen. Answers within seconds:
// what, where, when, who, what stage, what remains, what needs attention.
// Exceptions and incomplete requirements lead; completed detail recedes.

import { useState } from "react";
import { useActivity, useStore } from "../domain/store";
import { planReadiness } from "../domain/rules";
import { catalogue } from "../domain/catalogue";
import { availableTransitions } from "../domain/workflow";
import ActivityHeader from "../components/ActivityHeader";
import { Alert, EmptyState, Facts, Meter, shortDate, shortWhen } from "../components/ui";

export default function ActivityOverview({ id }: { id: string }) {
  const { dispatch } = useStore();
  const activity = useActivity(id);
  const [rcoName, setRcoName] = useState("");
  const [approver, setApprover] = useState("");
  const [approverRole, setApproverRole] = useState("ECO");

  if (!activity) {
    return <EmptyState title="Activity not found" line="It may have been removed." action={<a className="btn btn--secondary" href="#/activities">Back to activities</a>} />;
  }

  const readiness = planReadiness(activity, catalogue);
  const options = availableTransitions(activity, readiness);
  const rco = activity.appointments.find((a) => a.role === "RCO");
  const eco = activity.appointments.find((a) => a.role === "ECO");
  const planHref = `#/activity/${activity.id}/safety-plan`;
  const recent = [...activity.audit].slice(-6).reverse();
  const dates = activity.startDate === activity.endDate
    ? shortDate(activity.startDate)
    : `${shortDate(activity.startDate)} – ${shortDate(activity.endDate)}`;

  const typeLabels = { live: "Live firing", blank: "Blank firing", dry: "Dry training" } as const;

  return (
    <>
      <ActivityHeader activity={activity} tab="overview" />

      {/* Attention first */}
      <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
        {!rco && activity.status !== "complete" && activity.status !== "archived" && (
          <Alert kind="warn"><b>No RCO assigned.</b> The plan cannot be submitted for review until an RCO is recorded.</Alert>
        )}
        {readiness.blocked.length > 0 && (
          <Alert kind="issue"><b>{readiness.blocked.length} requirement{readiness.blocked.length === 1 ? "" : "s"} blocked.</b> Resolve or record why before review.</Alert>
        )}
        {activity.config.weaponSystemIds.length === 0 && (activity.status === "draft" || activity.status === "planning") && (
          <Alert kind="info"><b>No weapon systems configured.</b> Configuration determines which requirements apply.</Alert>
        )}
        {activity.status === "planning" && readiness.readyForReview && rco && (
          <Alert kind="info"><b>Requirements complete.</b> Ready for RCO review and submission.</Alert>
        )}
      </div>

      <div className="ff-grid ff-grid--2" style={{ alignItems: "start" }}>
        <div style={{ display: "grid", gap: 16 }}>
          <section className="ff-card ff-card--pad" aria-label="Activity details">
            <h2 style={{ marginBottom: 14 }}>Details</h2>
            <Facts
              items={[
                { label: "Range", value: activity.rangeName },
                { label: "Dates", value: dates },
                { label: "Timings", value: activity.timings },
                { label: "Type", value: typeLabels[activity.config.activityType] },
                { label: "RCO", value: rco?.personName },
                { label: "ECO", value: eco?.personName },
              ]}
            />
          </section>

          {!rco ? (
            <section className="ff-card ff-card--pad" aria-label="Assign RCO">
              <h2>Assign RCO</h2>
              <p style={{ color: "var(--te-ink-60)", margin: "6px 0 12px" }}>
                Record the appointed Range Conducting Officer. Qualification checks remain a command responsibility.
              </p>
              <form
                style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
                onSubmit={(e) => {
                  e.preventDefault();
                  if (rcoName.trim() === "") return;
                  dispatch({ type: "set-appointment", id: activity.id, appointment: { role: "RCO", personName: rcoName.trim() } });
                  setRcoName("");
                }}
              >
                <input className="ff-input" style={{ flex: "1 1 220px" }} aria-label="RCO name" placeholder="RCO name" value={rcoName} onChange={(e) => setRcoName(e.target.value)} />
                <button type="submit" className="btn btn--secondary" disabled={rcoName.trim() === ""}>Assign RCO</button>
              </form>
            </section>
          ) : null}

          {activity.status === "ready-for-review" && (
            <section className="ff-card ff-card--pad" aria-label="Record approval">
              <h2>Record approval</h2>
              <p style={{ color: "var(--te-ink-60)", margin: "6px 0 12px" }}>
                Approval is an explicit decision by an appointed person. It is never inferred from completeness.
              </p>
              <form
                style={{ display: "grid", gap: 10 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  if (approver.trim() === "") return;
                  dispatch({ type: "record-approval", id: activity.id, approvedBy: approver.trim(), role: approverRole });
                  setApprover("");
                }}
              >
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <input className="ff-input" style={{ flex: "1 1 200px" }} aria-label="Approver name" placeholder="Approver name" value={approver} onChange={(e) => setApprover(e.target.value)} />
                  <select className="ff-select" style={{ flex: "0 1 160px" }} aria-label="Approver role" value={approverRole} onChange={(e) => setApproverRole(e.target.value)}>
                    <option>ECO</option>
                    <option>Commander</option>
                    <option>Other approver</option>
                  </select>
                </div>
                <div>
                  <button type="submit" className="btn btn--primary" disabled={approver.trim() === ""}>Record approval</button>
                </div>
              </form>
            </section>
          )}

          {activity.approval && (
            <section className="ff-card ff-card--pad" aria-label="Approval record">
              <h2 style={{ marginBottom: 10 }}>Approval</h2>
              <p>
                Approved by <b>{activity.approval.approvedBy}</b> ({activity.approval.role}) · {shortWhen(activity.approval.at)}
                <br />
                <span style={{ color: "var(--te-ink-40)", fontSize: "var(--te-fs-sm)", fontFamily: "var(--te-mono)" }}>
                  Ruleset {activity.rulesetId} v{activity.approval.rulesetVersion}
                </span>
              </p>
            </section>
          )}
        </div>

        <div style={{ display: "grid", gap: 16 }}>
          <section className="ff-card ff-card--pad" aria-label="Planning progress">
            <h2 style={{ marginBottom: 14 }}>Safety plan</h2>
            <Meter label="Requirements resolved" done={readiness.resolved} total={readiness.total} />

            {readiness.criticalOutstanding.length > 0 ? (
              <>
                <p style={{ marginTop: 16, fontWeight: 600 }}>
                  {readiness.criticalOutstanding.length} critical outstanding
                </p>
                <ul style={{ margin: "8px 0 0", padding: 0, listStyle: "none", display: "grid", gap: 6 }}>
                  {readiness.criticalOutstanding.slice(0, 5).map((d) => (
                    <li key={d.id} style={{ color: "var(--te-ink-60)", fontSize: "var(--te-fs-base)", display: "flex", gap: 8 }}>
                      <span aria-hidden="true" style={{ color: "var(--te-ochre)" }}>•</span>
                      <a href={planHref} style={{ color: "inherit" }}>{d.title}</a>
                    </li>
                  ))}
                  {readiness.criticalOutstanding.length > 5 && (
                    <li style={{ color: "var(--te-ink-40)", fontSize: "var(--te-fs-base)" }}>
                      and {readiness.criticalOutstanding.length - 5} more
                    </li>
                  )}
                </ul>
              </>
            ) : (
              <p style={{ marginTop: 14, color: "var(--te-ink-60)" }}>No critical requirements outstanding.</p>
            )}

            <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a className="btn btn--secondary btn--sm" href={planHref}>Open safety plan</a>
              <a className="btn btn--ghost btn--sm" href={`#/activity/${activity.id}/trace`}>
                Trace{(activity.trace?.length ?? 0) > 0 ? ` · ${activity.trace!.length} placed` : ""}
              </a>
              <a className="btn btn--ghost btn--sm" href={`#/activity/${activity.id}/configure`}>Configure</a>
            </div>
          </section>

          <section className="ff-card ff-card--pad" aria-label="Next step">
            <h2 style={{ marginBottom: 12 }}>Next step</h2>
            {options.length === 0 ? (
              <p style={{ color: "var(--te-ink-60)" }}>
                {activity.status === "archived" ? "This activity is archived." : "No actions available in this state."}
              </p>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {options.map(({ transition, refusedBecause }) => (
                  <div key={transition.event} style={{ display: "grid", gap: 6 }}>
                    <button
                      type="button"
                      className={`btn ${transition.event === "pause" || transition.event === "return-to-planning" || transition.event === "withdraw-approval" ? "btn--secondary" : "btn--primary"}`}
                      disabled={refusedBecause !== null || (transition.event === "approve" && !activity.approval)}
                      onClick={() => dispatch({ type: "transition", id: activity.id, event: transition.event })}
                    >
                      {transition.label}
                    </button>
                    {refusedBecause && (
                      <p style={{ color: "var(--te-ink-40)", fontSize: "var(--te-fs-base)" }}>Blocked: {refusedBecause}.</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="ff-card ff-card--pad" aria-label="Recent activity">
            <h2 style={{ marginBottom: 10 }}>Recent activity</h2>
            <ul className="ff-audit">
              {recent.map((ev) => (
                <li key={ev.id}>
                  <time dateTime={ev.at}>{shortWhen(ev.at)}</time>
                  <span className="what">
                    <b>{ev.action}</b>{ev.detail ? <span> — {ev.detail}</span> : null}
                    {ev.previous && ev.next && <span className="delta"> ({ev.previous} → {ev.next})</span>}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
