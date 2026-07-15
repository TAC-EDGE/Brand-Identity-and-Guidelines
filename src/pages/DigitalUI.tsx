import { useState } from "react";
import { PageHero, Section, RuleList, TokenTable } from "../components/ui";
import { Arrow, LineIcon } from "../components/icons";

export default function DigitalUI() {
  const [tab, setTab] = useState(0);
  const [field, setField] = useState("");
  return (
    <>
      <PageHero
        eyebrow="12 · Digital UI"
        title="Field usability first."
        lead="One digital language across the website and the product: hairline borders, one soft shadow, large touch targets and status that can be read in sunlight with gloves on. These are principles with live components, not a full product component library."
      />

      <Section title="Principles">
        <RuleList
          items={[
            <><strong>Field usability:</strong> minimum 44px touch targets, 48px for primary actions; minimal operator decisions per screen.</>,
            <><strong>Clarity over density:</strong> role-specific views show what that role needs and nothing else.</>,
            <><strong>Clear status:</strong> every work item wears its state; forest fill means confirmed, ochre means caution, brick means alert.</>,
            <><strong>Evidence hierarchy:</strong> photos, measurements and test results lead; chrome recedes.</>,
            <><strong>Offline confidence:</strong> capture never blocks on connectivity; sync state is visible, calm and truthful.</>,
            <><strong>QA visibility:</strong> what is awaiting review, what failed and why is always one glance away.</>,
          ]}
        />
      </Section>

      <Section title="Buttons and links" sub="48px minimum height, 12px radius, 600 weight, 140ms transitions.">
        <div className="card card--pad" style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
          <button type="button" className="btn btn--primary">Arrange a demonstration <Arrow size={16} /></button>
          <button type="button" className="btn btn--secondary">Secondary action</button>
          <button type="button" className="btn btn--ghost">Ghost action</button>
          <button type="button" className="btn btn--primary" disabled>Disabled</button>
          <a href="#/digital-ui" style={{ color: "var(--te-forest-hover)", fontWeight: 600 }}>Inline link</a>
        </div>
        <div className="panel--dark on-dark" style={{ marginTop: 14, padding: 24, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <button type="button" className="btn btn--inverse">Primary on forest</button>
          <button type="button" className="btn btn--outline-inverse">Secondary on forest</button>
        </div>
      </Section>

      <Section title="Status states" sub="The work-phase happy path darkens green: planned, active, confirmed. Ochre and brick carry exceptions.">
        <div className="card card--pad" style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <span className="status status--planned">Planned</span>
          <span className="status status--active">Active</span>
          <span className="status status--submitted">Submitted</span>
          <span className="status status--confirmed">Confirmed</span>
          <span className="status status--issue">Issue</span>
        </div>
      </Section>

      <Section title="Cards, pills and evidence" sub="White cards with hairline borders on cream; evidence leads the card.">
        <div className="grid grid--3">
          <div className="card card--pad">
            <span className="eyebrow" style={{ marginBottom: 8 }}>Standard card</span>
            <h3 style={{ fontSize: "var(--te-fs-lg)" }}>Hairline border, one soft shadow</h3>
            <p style={{ color: "var(--te-ink-60)", fontSize: "var(--te-fs-md)", marginTop: 8 }}>Hover lifts one pixel and deepens the shadow one step.</p>
          </div>
          <div className="card" style={{ overflow: "hidden" }}>
            <img src="/assets/photography/photo-capture-abseil.webp" alt="Evidence photo: operator recording a drill log at the workface" style={{ width: "100%", aspectRatio: "8/5", objectFit: "cover", display: "block" }} loading="lazy" />
            <div style={{ padding: "12px 16px 16px" }}>
              <p style={{ fontFamily: "var(--te-mono)", fontSize: "var(--te-fs-sm)" }}>B12 · drill log · 14:32</p>
              <p style={{ marginTop: 6 }}><span className="status status--submitted">Submitted</span></p>
            </div>
          </div>
          <div className="card card--pad">
            <span className="eyebrow" style={{ marginBottom: 8 }}>QA state</span>
            <p style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--te-ink)", fontWeight: 600, fontSize: "var(--te-fs-md)" }}>
              <span style={{ width: 36, height: 36, borderRadius: 999, border: "1.5px solid var(--te-olive-edge)", color: "var(--te-forest-hover)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><LineIcon name="shield" size={18} /></span>
              2 records awaiting review
            </p>
            <p style={{ color: "var(--te-ink-60)", fontSize: "var(--te-fs-base)", marginTop: 10 }}>Exception-first: QA queues show what needs judgement, not everything that happened.</p>
          </div>
        </div>
      </Section>

      <Section title="Forms, tabs and alerts">
        <div className="grid grid--2">
          <div className="card card--pad">
            <label htmlFor="demo-field" style={{ display: "block", fontWeight: 600, fontSize: "var(--te-fs-md)", marginBottom: 8 }}>Anchor ID</label>
            <input
              id="demo-field"
              value={field}
              onChange={(e) => setField(e.target.value)}
              placeholder="e.g. B12"
              style={{
                width: "100%", minHeight: 48, padding: "10px 14px",
                borderRadius: "var(--te-r-md)", border: "1px solid var(--te-line-2)",
                background: "var(--te-card)", font: "inherit", fontSize: "var(--te-fs-md)", color: "var(--te-ink)",
              }}
            />
            <p style={{ color: "var(--te-ink-40)", fontSize: "var(--te-fs-base)", marginTop: 8 }}>48px fields, hairline borders, forest focus ring.</p>
          </div>
          <div className="card card--pad">
            <div role="tablist" aria-label="Example tabs" style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--te-line)" }}>
              {["Records", "Evidence", "Report"].map((t, i) => (
                <button
                  key={t} role="tab" aria-selected={tab === i} onClick={() => setTab(i)} type="button"
                  style={{
                    border: 0, background: "none", cursor: "pointer", padding: "10px 14px",
                    fontWeight: 600, fontSize: "var(--te-fs-md)",
                    color: tab === i ? "var(--te-forest)" : "var(--te-ink-40)",
                    borderBottom: tab === i ? "2px solid var(--te-forest)" : "2px solid transparent",
                    marginBottom: -1,
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            <p style={{ color: "var(--te-ink-60)", fontSize: "var(--te-fs-md)", paddingTop: 14 }}>
              {["12 records on this work item.", "34 photos, 12 test results.", "Report awaiting confirmation."][tab]}
            </p>
          </div>
        </div>
        <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
          <p style={{ background: "var(--te-ochre-tint)", border: "1px solid rgba(176,125,43,.35)", borderRadius: "var(--te-r-md)", padding: "12px 16px", fontSize: "var(--te-fs-md)", display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ color: "var(--te-ochre)" }}><LineIcon name="warn" size={18} /></span>
            <span><strong>3 records ageing.</strong> Submitted more than 48 hours without review.</span>
          </p>
          <p style={{ background: "var(--te-brick-tint)", border: "1px solid rgba(158,59,46,.3)", borderRadius: "var(--te-r-md)", padding: "12px 16px", fontSize: "var(--te-fs-md)", display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ color: "var(--te-brick)" }}><LineIcon name="warn" size={18} /></span>
            <span><strong>Test failed on B07.</strong> Exception raised for engineer review.</span>
          </p>
        </div>
      </Section>

      <Section title="Tables, maps, empty states and mobile">
        <TokenTable
          head={["Pattern", "Principle"]}
          rows={[
            ["Tables", "Hairline row rules, quiet-tint alternating rows where needed, mono numerals, status pills in-line"],
            ["Navigation", "Forest bar, cream lockup, sage underline for the active item; mobile drawer from the same bar"],
            ["Maps", "Muted basemap, forest and olive work overlays, status colours only for status"],
            ["Progress", "Linear, labelled steps in the marker language; no spinners where a truthful count exists"],
            ["Empty states", "One line of what belongs here and one action; never illustration theatre"],
            ["Mobile controls", "Bottom-anchored primary actions, thumb-reachable, 48px, one decision per screen"],
          ]}
        />
      </Section>
    </>
  );
}
