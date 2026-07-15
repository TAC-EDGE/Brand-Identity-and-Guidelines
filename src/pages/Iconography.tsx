import { PageHero, Section, TokenTable, RuleList, DoDont } from "../components/ui";
import { WorkTypeIcon, Arrow, LineIcon, workTypeIcons } from "../components/icons";

export default function Iconography() {
  return (
    <>
      <PageHero
        eyebrow="08 · Iconography"
        title="One line weight. Functional geometry. No decoration."
        lead="TACEDGE icons are single-stroke line drawings: 1.6 stroke on a 24 or 32 pixel grid, round caps and joins, no fills. They look technical because they describe real work."
      />

      <Section title="Work-type icons" sub="The six approved ground-engineering work types. Standalone line icons, 32px grid, no container.">
        <div className="grid grid--3">
          {(Object.keys(workTypeIcons) as (keyof typeof workTypeIcons)[]).map((name) => (
            <div key={name} className="card card--pad" style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <span style={{ color: "var(--te-forest-hover)" }}><WorkTypeIcon type={name} /></span>
              <span style={{ fontWeight: 700, fontSize: "var(--te-fs-md)" }}>{name}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="The four treatments" sub="Every icon appears in one of these. Do not invent new treatments.">
        <div className="grid grid--2">
          <div className="card card--pad" style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ width: 48, height: 48, borderRadius: 999, background: "var(--te-sage-tint)", color: "var(--te-forest-hover)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <LineIcon name="clipboard" />
            </span>
            <div>
              <p style={{ fontWeight: 700, fontSize: "var(--te-fs-md)" }}>1 · Informational icon</p>
              <p style={{ color: "var(--te-ink-60)", fontSize: "var(--te-fs-base)" }}>48px sage-tint circular container, forest-green line icon. Problem points, feature lists.</p>
            </div>
          </div>
          <div className="card card--pad" style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ color: "var(--te-forest-hover)", flexShrink: 0 }}><WorkTypeIcon type="Drilling" /></span>
            <div>
              <p style={{ fontWeight: 700, fontSize: "var(--te-fs-md)" }}>2 · Work-type icon</p>
              <p style={{ color: "var(--te-ink-60)", fontSize: "var(--te-fs-base)" }}>Standalone 32px line icon, no container. Work-type cards and chips.</p>
            </div>
          </div>
          <div className="card card--pad" style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span className="status status--confirmed" style={{ flexShrink: 0 }}>Confirmed</span>
            <div>
              <p style={{ fontWeight: 700, fontSize: "var(--te-fs-md)" }}>3 · Workflow / status icon</p>
              <p style={{ color: "var(--te-ink-60)", fontSize: "var(--te-fs-base)" }}>Small icon inside a state or status component. Follows the component's colour.</p>
            </div>
          </div>
          <div className="card card--pad" style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span className="marker" style={{ flexShrink: 0 }}>2</span>
            <div>
              <p style={{ fontWeight: 700, fontSize: "var(--te-fs-md)" }}>4 · Numbered workflow marker</p>
              <p style={{ color: "var(--te-ink-60)", fontSize: "var(--te-fs-base)" }}>Play 700 numeral in a sage-tint pill. Reserved for Configure, Capture and Confirm.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Arrows" sub="One arrow. Four jobs. Same head, same 1.6 stroke, always Utility Sage or forest.">
        <TokenTable
          head={["Use", "Treatment", "Example"]}
          rows={[
            ["Process arrow", "Between stages in diagrams and strips, Utility Sage", <span key="p" style={{ color: "var(--te-olive)" }}><Arrow /></span>],
            ["Button arrow", "Trailing a primary CTA label, inherits button text colour", <span key="b" className="btn btn--primary" style={{ minHeight: 40, padding: "8px 18px" }}>Arrange a demonstration <Arrow size={16} /></span>],
            ["Downward navigation", "Scroll cues and vertical flows, rotated 90 degrees", <span key="d" style={{ color: "var(--te-olive)" }}><Arrow direction="down" /></span>],
            ["Status progression", "Between record stages (Configured to Confirmed), forest-2", <span key="s" style={{ color: "var(--te-forest-hover)" }}><Arrow /></span>],
          ]}
        />
      </Section>

      <Section title="Rules">
        <RuleList
          items={[
            <><strong>Stroke 1.6, round caps and joins, no fills.</strong> One weight across a composition, never mixed.</>,
            <>Grid: 24px for general icons, 32px for work-type icons. Scale proportionally; never restroke.</>,
            <>Minimal detail: an icon that needs a label is fine; an icon that needs shading is wrong.</>,
            <>Do not invent detailed custom icons where a suitable existing icon exists. The product uses the Lucide family, which shares this language at product scale.</>,
            <>Icons are never decorative spot illustrations. If it does not clarify, remove it.</>,
          ]}
        />
        <DoDont
          items={[
            { kind: "do", stage: <span style={{ color: "var(--te-forest-hover)" }}><WorkTypeIcon type="Anchoring" size={40} /></span>, caption: "Single stroke weight, round caps, functional geometry." },
            { kind: "dont", stage: <span style={{ color: "var(--te-forest-hover)" }}><svg width="40" height="40" viewBox="0 0 32 32" fill="var(--te-olive)" stroke="var(--te-forest)" strokeWidth="3" aria-hidden="true"><path d="M4 7h24M16 7v16M12 15h8M12 19h8" /><circle cx="16" cy="23" r="5" /></svg></span>, caption: "No fills, no heavy strokes, no mixed weights." },
            { kind: "dont", stage: <span style={{ display: "inline-flex", gap: 10, color: "var(--te-olive)" }}><Arrow /><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 10h10V5l8 7-8 7v-5H4z" /></svg></span>, caption: "Never mix arrowhead styles or stroke weights in one composition." },
          ]}
        />
      </Section>
    </>
  );
}
