// Shared header for activity screens: breadcrumb, name, status, secondary nav.
// Tabs beyond the current vertical slice are shown but marked "planned" —
// honest scaffolding, not disconnected mockups.

import type { Activity } from "../domain/types";
import { ActivityStatusPill } from "./ui";

export default function ActivityHeader({ activity, tab }: { activity: Activity; tab: "overview" | "configure" | "safety-plan" }) {
  const base = `#/activity/${activity.id}`;
  return (
    <>
      <nav className="ff-breadcrumb" aria-label="Breadcrumb">
        <a href="#/activities">Activities</a>
        <span aria-hidden="true">/</span>
        <span>{activity.name}</span>
      </nav>
      <header className="ff-pagehead" style={{ paddingBottom: 14 }}>
        <div>
          <h1>{activity.name}</h1>
          <p className="lead">{activity.unit}</p>
        </div>
        <ActivityStatusPill status={activity.status} />
      </header>
      <nav className="ff-tabs" aria-label="Activity sections">
        <a href={base} aria-current={tab === "overview" ? "page" : undefined}>Overview</a>
        <a href={`${base}/configure`} aria-current={tab === "configure" ? "page" : undefined}>Configure</a>
        <a href={`${base}/safety-plan`} aria-current={tab === "safety-plan" ? "page" : undefined}>Safety plan</a>
        <a href={base} aria-disabled="true" style={{ opacity: 0.45, pointerEvents: "none" }}>People<span className="todo">planned</span></a>
        <a href={base} aria-disabled="true" style={{ opacity: 0.45, pointerEvents: "none" }}>Review<span className="todo">planned</span></a>
        <a href={base} aria-disabled="true" style={{ opacity: 0.45, pointerEvents: "none" }}>Brief<span className="todo">planned</span></a>
        <a href={base} aria-disabled="true" style={{ opacity: 0.45, pointerEvents: "none" }}>Conduct<span className="todo">planned</span></a>
      </nav>
    </>
  );
}
