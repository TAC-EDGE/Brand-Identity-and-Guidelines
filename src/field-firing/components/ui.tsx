// TACEDGE | Field Firing — shared UI components.
// Status is always colour + label together, never colour alone.

import type { CSSProperties, ReactNode } from "react";
import type { ActivityStatus, DoctrineRef, RequirementStatus } from "../domain/types";
import { statusLabels } from "../domain/workflow";

export const requirementStatusLabels: Record<RequirementStatus, string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  complete: "Complete",
  "requires-review": "Requires review",
  "not-applicable": "Not applicable",
  blocked: "Blocked",
};

export function ActivityStatusPill({ status }: { status: ActivityStatus }) {
  return <span className={`status status--${status}`}>{statusLabels[status]}</span>;
}

export function RequirementStatusPill({ status }: { status: RequirementStatus }) {
  return <span className={`status status--${status}`}>{requirementStatusLabels[status]}</span>;
}

/** Truthful progress meter: labelled counts, no spinners. */
export function Meter({ label, done, total }: { label: string; done: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className="ff-meter">
      <span className="ff-meter__label">
        <span>{label}</span>
        <b>{done} / {total}</b>
      </span>
      <span
        className="ff-meter__track"
        role="progressbar"
        aria-valuenow={done}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={label}
      >
        <span className="ff-meter__fill" style={{ width: `${pct}%` }} />
      </span>
    </div>
  );
}

const warnPath = (
  <>
    <path d="M12 4 21 20H3L12 4z" />
    <path d="M12 10v4.5M12 17.4v.1" />
  </>
);
const infoPath = (
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5M12 7.6v.1" />
  </>
);

export function Alert({ kind, children }: { kind: "warn" | "issue" | "info"; children: ReactNode }) {
  return (
    <p className={`ff-alert ff-alert--${kind}`}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {kind === "info" ? infoPath : warnPath}
      </svg>
      <span>{children}</span>
    </p>
  );
}

export function EmptyState({ title, line, action }: { title: string; line: string; action?: ReactNode }) {
  return (
    <div className="ff-card ff-empty">
      <h2>{title}</h2>
      <p>{line}</p>
      {action}
    </div>
  );
}

export function Facts({ items }: { items: { label: string; value: ReactNode }[] }) {
  return (
    <dl className="ff-facts" style={{ margin: 0 }}>
      {items.map((f) => (
        <div className="ff-fact" key={f.label}>
          <dt>{f.label}</dt>
          <dd>{f.value ?? <span className="muted">Not set</span>}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Doctrine source block. When source material has not been supplied it says
 * so plainly — the application never manufactures a reference.
 */
export function SourceBlock({ source }: { source: DoctrineRef }) {
  if (source.status === "source-required") {
    return (
      <div className="ff-source">
        <span className="ff-source__tag ff-source__tag--required">Source required</span>
        <span>{source.publication}. This requirement is a demonstration placeholder and is not NZDF doctrine.</span>
      </div>
    );
  }
  return (
    <div className="ff-source">
      <span className="ff-source__tag ff-source__tag--verified">Source</span>
      <span>
        {source.publication}
        {source.version ? ` (v${source.version})` : ""}
        {source.section ? ` · ${source.section}` : ""}
        {source.paragraph ? ` · ${source.paragraph}` : ""}
      </span>
      {source.verifiedBy && <span>Verified by {source.verifiedBy}{source.encodedOn ? ` · encoded ${source.encodedOn}` : ""}</span>}
    </div>
  );
}

/** Small line icons for the primary navigation (brand stroke recipe: 1.6, round). */
export function NavIcon({ name, size = 20 }: { name: "activities" | "doctrine" | "templates" | "admin"; size?: number }) {
  const paths: Record<string, ReactNode> = {
    activities: <><rect x="4" y="4" width="16" height="17" rx="2" /><path d="M8 3v3M16 3v3M4 10h16" /><path d="M8 15l2.5 2.5L16 13" /></>,
    doctrine: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21z" /><path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" /><path d="M9 8h7" /></>,
    templates: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 9.5h16M9.5 9.5V20" /></>,
    admin: <><circle cx="12" cy="8.5" r="3.5" /><path d="M5 20c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {paths[name]}
    </svg>
  );
}

export function Chevron({ style }: { style?: CSSProperties }) {
  return (
    <svg className="ff-req__chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

/** Formats an ISO timestamp as a short NZ-style date/time. */
export function shortWhen(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-NZ", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

export function shortDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-NZ", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}
