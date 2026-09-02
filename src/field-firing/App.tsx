// TACEDGE | Field Firing — application shell and routing.
// Hash routing, matching the repository's existing site pattern.

import { useEffect, useState } from "react";
import { StoreProvider, useStore } from "./domain/store";
import { NavIcon } from "./components/ui";
import Activities from "./screens/Activities";
import CreateActivity from "./screens/CreateActivity";
import ActivityOverview from "./screens/ActivityOverview";
import ConfigureActivity from "./screens/ConfigureActivity";
import SafetyPlan from "./screens/SafetyPlan";
import Planned from "./screens/Planned";

export type Route =
  | { name: "activities" }
  | { name: "create" }
  | { name: "activity"; id: string; tab: "overview" | "configure" | "safety-plan" }
  | { name: "planned"; area: "doctrine" | "templates" | "admin" };

export function parseRoute(hash: string): Route {
  const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  if (parts[0] === "activities" && parts[1] === "new") return { name: "create" };
  if (parts[0] === "activity" && parts[1]) {
    const tab = parts[2] === "configure" || parts[2] === "safety-plan" ? parts[2] : "overview";
    return { name: "activity", id: parts[1], tab };
  }
  if (parts[0] === "doctrine" || parts[0] === "templates" || parts[0] === "admin") {
    return { name: "planned", area: parts[0] };
  }
  return { name: "activities" };
}

const primaryNav = [
  { href: "#/activities", label: "Activities", icon: "activities" as const, active: (r: Route) => r.name !== "planned" },
  { href: "#/doctrine", label: "Doctrine", icon: "doctrine" as const, active: (r: Route) => r.name === "planned" && r.area === "doctrine" },
  { href: "#/templates", label: "Templates", icon: "templates" as const, active: (r: Route) => r.name === "planned" && r.area === "templates" },
  { href: "#/admin", label: "Administration", icon: "admin" as const, active: (r: Route) => r.name === "planned" && r.area === "admin" },
];

const saveStateLabels = {
  "saved-locally": "Saved locally",
  saving: "Saving locally",
  "storage-unavailable": "Storage unavailable",
} as const;

function Shell({ route }: { route: Route }) {
  const { state } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [route]);

  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <button
        type="button"
        className="ff-menu-btn"
        aria-expanded={menuOpen}
        aria-controls="ff-nav"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M2 4h12M2 8h12M2 12h12" />
        </svg>
        Menu
      </button>
      {menuOpen && <button type="button" className="ff-scrim" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
      <div className="ff-shell">
        <aside className={`ff-sidebar on-dark${menuOpen ? " open" : ""}`}>
          <div className="ff-sidebar__head">
            <a href="#/activities" aria-label="TACEDGE Field Firing home">
              <img src="assets/logos/horizontal/tacedge-lockup-cream.svg" alt="TACEDGE" width={158} height={31} />
            </a>
            <p className="ff-sidebar__product">Field Firing · prototype</p>
          </div>
          <nav id="ff-nav" aria-label="Primary">
            {primaryNav.map((item) => (
              <a key={item.href} href={item.href} aria-current={item.active(route) ? "page" : undefined}>
                <NavIcon name={item.icon} />
                {item.label}
              </a>
            ))}
          </nav>
          <div className="ff-sidebar__foot">
            <span className="ff-savestate">{saveStateLabels[state.saveState]}</span>
            <br />
            Prototype — no sync, no server.
          </div>
        </aside>
        <main id="content" className="ff-main">
          <p className="ff-demo-banner">
            <b>Demo data</b> Not authoritative. No NZDF doctrine has been supplied; all requirements are placeholders.
          </p>
          <div className="ff-page">
            {route.name === "activities" && <Activities />}
            {route.name === "create" && <CreateActivity />}
            {route.name === "activity" && route.tab === "overview" && <ActivityOverview id={route.id} />}
            {route.name === "activity" && route.tab === "configure" && <ConfigureActivity id={route.id} />}
            {route.name === "activity" && route.tab === "safety-plan" && <SafetyPlan id={route.id} />}
            {route.name === "planned" && <Planned area={route.area} />}
          </div>
        </main>
      </div>
    </>
  );
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.hash));

  useEffect(() => {
    const onHash = () => {
      setRoute(parseRoute(window.location.hash));
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    document.title = "TACEDGE | Field Firing — prototype";
  }, []);

  return (
    <StoreProvider>
      <Shell route={route} />
    </StoreProvider>
  );
}
