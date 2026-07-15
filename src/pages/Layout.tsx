import { PageHero, Section, TokenTable, RuleList } from "../components/ui";
import spacing from "../../tokens/spacing.json";
import breakpoints from "../../tokens/breakpoints.json";

export default function Layout() {
  return (
    <>
      <PageHero
        eyebrow="07 · Layout"
        title="A calm grid with generous rhythm."
        lead="One content width, one gutter, two section rhythms and a ten-step spacing scale. The discipline is the same on a phone, a monitor and an A4 page."
      />

      <Section title="Containers and grid">
        <TokenTable
          head={["Token", "Value", "Role"]}
          rows={[
            ["content-max", "1200px", "Maximum content width, centred"],
            ["gutter", "clamp(20px, 3.4vw, 32px)", "Horizontal padding: 32px desktop, 20px mobile"],
            ["section", "clamp(64px, 9vw, 120px)", "Standard section rhythm (vertical padding)"],
            ["section-tight", "clamp(56px, 7vw, 96px)", "Compact section rhythm"],
            ["grid", "12-column equivalent", "Compositions use simple fraction grids (e.g. 0.38/0.62 hero, 1.5/1 problem split) inside the container"],
          ]}
        />
        <div className="card" style={{ marginTop: 20, padding: 0, overflow: "hidden" }} aria-hidden="true">
          <div style={{ background: "var(--te-tint)", padding: "18px var(--te-gutter)" }}>
            <div style={{ maxWidth: 640, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 6 }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} style={{ height: 44, background: "var(--te-sage-tint)", border: "1px solid var(--te-olive-line)", borderRadius: 4 }} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Spacing scale" sub="A restrained ten-step scale. One-off pixel values are not brand spacing.">
        <div className="card card--pad" style={{ display: "grid", gap: 10 }}>
          {Object.entries(spacing.scale).map(([name, value]) => (
            <div key={name} style={{ display: "grid", gridTemplateColumns: "56px 56px 1fr", alignItems: "center", gap: 14 }}>
              <code style={{ color: "var(--te-ink-40)", fontSize: "var(--te-fs-sm)" }}>{name}</code>
              <code style={{ fontSize: "var(--te-fs-sm)" }}>{value}</code>
              <span style={{ height: 14, width: value, background: "var(--te-olive)", borderRadius: 3, display: "inline-block" }} aria-hidden="true" />
            </div>
          ))}
        </div>
        <TokenTable
          head={["Component spacing", "Value"]}
          rows={Object.entries(spacing.component).map(([k, v]) => [k, v as string])}
        />
      </Section>

      <Section title="Breakpoints" sub="Max-width breakpoints. Layouts simplify downward and content order never changes.">
        <TokenTable
          head={["Name", "Value", "Typical change"]}
          rows={[
            ["wide", breakpoints.breakpoints.wide, "Two-line hero headlines release; hero grid stacks"],
            ["desktop", breakpoints.breakpoints.desktop, "Three-column workflows stack; 4-up grids become 2-up"],
            ["tablet", breakpoints.breakpoints.tablet, "Split sections stack; side rules become top rules; navigation condenses"],
            ["tablet-narrow", breakpoints.breakpoints["tablet-narrow"], "Two-up cards stack"],
            ["mobile", breakpoints.breakpoints.mobile, "Process strips go vertical; buttons go full-width"],
            ["mobile-narrow", breakpoints.breakpoints["mobile-narrow"], "Compact card grids go single column"],
          ]}
        />
      </Section>

      <Section title="Intentional layout variation" sub="The system allows six composition types. Consistency lives in the tokens; variety lives here.">
        <TokenTable
          head={["Composition", "Shape", "Use"]}
          rows={[
            ["Brand-led hero", "Forest surface, promise left, product imagery right (0.38 / 0.62)", "Homepage, covers, openings"],
            ["Left-aligned editorial", "Heading and prose left, ruled aside right (1.5 / 1)", "Problem statements, arguments"],
            ["Centred workflow", "Centred heading, three phase cards with hand-off arrows", "Configure / Capture / Confirm"],
            ["Split text-and-image", "Copy one side, photograph or device the other (≈ 0.5 / 0.5)", "Origin story, feature detail"],
            ["Compact technical diagram", "Tinted panel, one row of stages with one arrow style", "Record diagrams, process strips"],
            ["One-page leave-behind", "A4, 12 to 13 mm margins, header / hero / proof / next-step / footer", "Meeting collateral"],
          ]}
        />
      </Section>

      <Section title="Print and safe zones">
        <RuleList
          items={[
            <>A4 documents: <strong>12 to 13 mm margins</strong>, content on the same spacing scale.</>,
            <>Business cards: 90 × 55 mm trim, 3 mm bleed, 5 mm interior safe zone.</>,
            <>Nothing but full-bleed colour fields and imagery crosses into bleed. Logos never approach closer than their clear-space rule allows.</>,
          ]}
        />
      </Section>
    </>
  );
}
