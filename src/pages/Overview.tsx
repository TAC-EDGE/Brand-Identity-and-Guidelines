import ContourMotif from "../components/ContourMotif";
import { CopyChip } from "../components/ui";
import { brand, productModel, proposition } from "../content/messaging";
import { sections, VERSION, LAST_UPDATED } from "../content/site";

const previewSwatches = [
  ["Primary Dark", "#112411"],
  ["Warm Cream", "#F7F5EC"],
  ["Pale Sage", "#B2B594"],
  ["Sage Tint", "#E6EBD9"],
  ["Utility Sage", "#6E7D5C"],
  ["Primary Text", "#242A1F"],
] as const;

const principles = [
  { title: "Shared clarity is the capability", copy: "Better coordination is the result. Everything the brand says and shows serves one shared, trusted picture of the work." },
  { title: "Calm, operational, credible", copy: "The brand belongs in a site office and a boardroom. Restraint is the register: no noise, no inflation, no decoration for its own sake." },
  { title: "The fewest words required", copy: "Writing preserves full meaning in the fewest words. Headlines are decisive. Claims are evidenced." },
  { title: "Real work, real evidence", copy: "Photography is documentary. Product imagery is real screens. Status colours carry meaning, never decoration." },
];

export default function Overview() {
  return (
    <>
      <div className="panel--dark on-dark" style={{ marginTop: 40, padding: "clamp(40px, 6vw, 72px) clamp(28px, 5vw, 56px)" }}>
        <ContourMotif />
        <img src="assets/logos/horizontal/tacedge-lockup-cream.svg" alt="TACEDGE" width={280} height={55} style={{ height: 44, width: "auto" }} />
        <h1 style={{ fontSize: "clamp(48px, 7vw, 84px)", color: "var(--te-cream)", marginTop: 40, lineHeight: 1.05 }}>
          Shared<br />Clarity.
        </h1>
        <p style={{ color: "var(--te-sage)", fontWeight: 600, fontSize: 17, marginTop: 20 }}>{brand.category}</p>
        <p style={{ color: "var(--te-sage-tint)", fontSize: "var(--te-t-lead)", marginTop: 18, maxWidth: "56ch" }}>
          This is the authoritative source of truth for the TACEDGE brand: foundations, messaging,
          logo, colour, typography, graphic language, imagery, digital design, applications and
          downloadable assets.
        </p>
        <p style={{ marginTop: 26 }}>
          <span className="chip">Version {VERSION}</span>
          <span className="chip" style={{ marginLeft: 8 }}>Updated {LAST_UPDATED}</span>
        </p>
      </div>

      <section className="section" aria-label="Key principles">
        <h2>Four principles</h2>
        <div className="grid grid--2" style={{ marginTop: 20 }}>
          {principles.map((p) => (
            <div key={p.title} className="card card--pad">
              <h3 style={{ fontSize: "var(--te-fs-lg)" }}>{p.title}</h3>
              <p style={{ color: "var(--te-ink-60)", fontSize: "var(--te-fs-md)", marginTop: 8 }}>{p.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-label="The product model">
        <h2>{productModel.short}</h2>
        <p className="sub">{productModel.long.join(" ")} {productModel.releaseRule}</p>
        <p className="sub" style={{ marginBottom: 0 }}>
          {proposition.lines.join(" ")} <strong style={{ color: "var(--te-ink)" }}>{proposition.tagline}</strong>
        </p>
      </section>

      <section className="section" aria-label="Colour and type preview">
        <h2>The system at a glance</h2>
        <div className="grid grid--swatch" style={{ marginTop: 20 }}>
          {previewSwatches.map(([name, hex]) => (
            <div key={hex} className="card swatch">
              <div className="swatch__field" style={{ background: hex, height: 56 }} />
              <div className="swatch__body" style={{ padding: "10px 14px 12px" }}>
                <div className="swatch__name" style={{ fontSize: "var(--te-fs-base)" }}>{name}</div>
                <div className="swatch__values"><CopyChip value={hex} /></div>
              </div>
            </div>
          ))}
        </div>
        <div className="card card--pad" style={{ marginTop: 20 }}>
          <span className="eyebrow">Play 700 · display</span>
          <p style={{ fontFamily: "var(--te-display)", fontWeight: 700, fontSize: "var(--te-fs-2xl)", lineHeight: 1.15 }}>
            Reporting your engineer trusts on sight.
          </p>
          <span className="eyebrow" style={{ marginTop: 20 }}>Be Vietnam Pro 400 · body</span>
          <p style={{ color: "var(--te-ink-60)", maxWidth: "58ch" }}>
            Set the project up once. Capture the work where it happens. Give your engineer a
            confirmed report they can trust.
          </p>
          <span className="eyebrow" style={{ marginTop: 20 }}>JetBrains Mono 500 · utility labels</span>
          <span className="chip">Configure · Capture · Confirm</span>
        </div>
      </section>

      <section className="section" aria-label="Sections">
        <h2>Inside the guidelines</h2>
        <div className="grid grid--3" style={{ marginTop: 20 }}>
          {sections.slice(1).map((s) => (
            <a key={s.slug} href={`#/${s.slug}`} className="card card--pad" style={{ textDecoration: "none", display: "block" }}>
              <span className="eyebrow" style={{ marginBottom: 6 }}>{s.num}</span>
              <span style={{ fontWeight: 700, fontFamily: "var(--te-display)", fontSize: "var(--te-fs-lg)", color: "var(--te-ink)" }}>{s.label}</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
