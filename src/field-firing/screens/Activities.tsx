// Activities — the home screen. Answers "what activities exist, what state
// is each in, and what needs my attention" at a glance.

import { useStore } from "../domain/store";
import { planReadiness } from "../domain/rules";
import { catalogue } from "../domain/catalogue";
import { ActivityStatusPill, EmptyState, shortDate } from "../components/ui";

export default function Activities() {
  const { state } = useStore();
  const activities = state.activities.filter((a) => a.status !== "archived");

  return (
    <>
      <header className="ff-pagehead">
        <div>
          <span className="ff-eyebrow">All Arms Field Firing Safety</span>
          <h1>Activities</h1>
        </div>
        <a className="btn btn--primary" href="#/activities/new">New activity</a>
      </header>

      {activities.length === 0 ? (
        <EmptyState
          title="No activities yet"
          line="Create an activity to start safety planning."
          action={<a className="btn btn--primary" href="#/activities/new">New activity</a>}
        />
      ) : (
        <div className="ff-actlist">
          {activities.map((a) => {
            const r = planReadiness(a, catalogue);
            const dates = a.startDate === a.endDate ? shortDate(a.startDate) : `${shortDate(a.startDate)} – ${shortDate(a.endDate)}`;
            const rco = a.appointments.find((x) => x.role === "RCO");
            return (
              <a key={a.id} className="ff-card ff-actrow" href={`#/activity/${a.id}`}>
                <span>
                  <span className="ff-actrow__name">{a.name}</span>
                  <span className="ff-actrow__meta">
                    <span>{a.rangeName}</span>
                    <span className="mono">{dates}</span>
                    <span>{rco ? `RCO ${rco.personName}` : "No RCO assigned"}</span>
                  </span>
                </span>
                <span className="ff-actrow__side">
                  <ActivityStatusPill status={a.status} />
                  <span className="ff-actrow__count">
                    {r.criticalOutstanding.length > 0
                      ? `${r.criticalOutstanding.length} critical outstanding`
                      : r.outstanding.length > 0
                        ? `${r.outstanding.length} outstanding`
                        : "Requirements complete"}
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}
