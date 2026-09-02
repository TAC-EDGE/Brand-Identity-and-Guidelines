// Configure Activity — the parameters that determine which safety
// requirements apply (progressive disclosure). Changing configuration
// after approval is recorded in the audit trail.

import { useActivity, useStore } from "../domain/store";
import { applicableRequirements } from "../domain/rules";
import { catalogue, weaponSystems } from "../domain/catalogue";
import ActivityHeader from "../components/ActivityHeader";
import { Alert, EmptyState } from "../components/ui";
import type { ActivityConfig, ActivityType } from "../domain/types";

export default function ConfigureActivity({ id }: { id: string }) {
  const { dispatch } = useStore();
  const activity = useActivity(id);
  if (!activity) {
    return <EmptyState title="Activity not found" line="It may have been removed." action={<a className="btn btn--secondary" href="#/activities">Back to activities</a>} />;
  }

  const cfg = activity.config;
  const applicable = applicableRequirements(cfg, catalogue);
  const postApproval = activity.status === "approved" || activity.status === "active" || activity.status === "paused";

  function update(patch: Partial<ActivityConfig>) {
    dispatch({ type: "update-config", id, patch });
  }

  const toggles: { key: "night" | "pyrotechnics" | "vehicles" | "supportingWeapons"; label: string; hint: string }[] = [
    { key: "night", label: "Night firing", hint: "Adds night conduct controls to the plan." },
    { key: "pyrotechnics", label: "Pyrotechnics", hint: "Adds a pyrotechnics plan requirement." },
    { key: "vehicles", label: "Vehicles in the activity area", hint: "Adds vehicle movement controls." },
    { key: "supportingWeapons", label: "Supporting weapons", hint: "Adds supporting weapons requirements." },
  ];

  return (
    <>
      <ActivityHeader activity={activity} tab="configure" />

      {postApproval && (
        <div style={{ marginBottom: 18 }}>
          <Alert kind="warn">
            <b>This plan is approved.</b> Configuration changes after approval are recorded in the audit trail and should trigger re-review.
          </Alert>
        </div>
      )}

      <div className="ff-grid ff-grid--2" style={{ alignItems: "start" }}>
        <div style={{ display: "grid", gap: 16 }}>
          <section className="ff-card ff-card--pad" aria-label="Activity type">
            <h2 style={{ marginBottom: 6 }}>Activity type</h2>
            <p style={{ color: "var(--te-ink-60)", marginBottom: 12 }}>Determines base requirements for the plan.</p>
            <div className="ff-field">
              <select
                className="ff-select"
                aria-label="Activity type"
                value={cfg.activityType}
                onChange={(e) => update({ activityType: e.target.value as ActivityType })}
              >
                <option value="live">Live firing</option>
                <option value="blank">Blank firing</option>
                <option value="dry">Dry training</option>
              </select>
            </div>
          </section>

          <section className="ff-card ff-card--pad" aria-label="Conditions">
            <h2 style={{ marginBottom: 4 }}>Conditions</h2>
            <p style={{ color: "var(--te-ink-60)", marginBottom: 8 }}>Each condition adds its requirements to the safety plan.</p>
            {toggles.map((t) => (
              <label key={t.key} className="ff-togglerow">
                <span className="ff-togglerow__text">
                  <b>{t.label}</b>
                  <span>{t.hint}</span>
                </span>
                <input
                  type="checkbox"
                  checked={cfg[t.key]}
                  onChange={(e) => update({ [t.key]: e.target.checked } as Partial<ActivityConfig>)}
                />
                <span className="ff-switch" aria-hidden="true" />
              </label>
            ))}
          </section>
        </div>

        <div style={{ display: "grid", gap: 16 }}>
          <section className="ff-card ff-card--pad" aria-label="Weapon systems">
            <h2 style={{ marginBottom: 4 }}>Weapon systems</h2>
            <p style={{ color: "var(--te-ink-60)", marginBottom: 8 }}>
              Demo list — names only. No performance or safety-distance data exists in this prototype.
            </p>
            {weaponSystems.map((w) => (
              <label key={w.id} className="ff-checkrow">
                <input
                  type="checkbox"
                  checked={cfg.weaponSystemIds.includes(w.id)}
                  onChange={(e) =>
                    update({
                      weaponSystemIds: e.target.checked
                        ? [...cfg.weaponSystemIds, w.id]
                        : cfg.weaponSystemIds.filter((x) => x !== w.id),
                    })
                  }
                />
                {w.name}
              </label>
            ))}
          </section>

          <section className="ff-card ff-card--pad" aria-label="Effect on the plan">
            <h2 style={{ marginBottom: 10 }}>Effect on the plan</h2>
            <p style={{ color: "var(--te-ink-60)" }}>
              This configuration applies <b style={{ color: "var(--te-ink)" }}>{applicable.length}</b> of {catalogue.length} demonstration requirements.
            </p>
            <p style={{ color: "var(--te-ink-40)", fontSize: "var(--te-fs-base)", marginTop: 10 }}>
              Applicability is evaluated by deterministic rules. Doctrinal dependencies are placeholders until
              authoritative NZDF material is supplied.
            </p>
            <div style={{ marginTop: 14 }}>
              <a className="btn btn--primary btn--sm" href={`#/activity/${activity.id}/safety-plan`}>Open safety plan</a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
