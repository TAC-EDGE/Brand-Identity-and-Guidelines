import { PageHero, Section, RuleList, DoDont } from "../components/ui";
import ContourMotif from "../components/ContourMotif";
import { Arrow } from "../components/icons";

export default function GraphicLanguage() {
  return (
    <>
      <PageHero
        eyebrow="09 · Graphic Language"
        title="Contours, peaks and straight lines."
        lead="The graphic language is drawn from the ground the platform serves: topographic linework, the brandmark's softened peaks, and diagrams that read like a plan, not a pitch."
      />

      <Section title="Topographic linework" sub="Six calm ridgelines from one source pattern. Subtle, technical, geological. Never visually dominant.">
        <div className="panel--dark on-dark" style={{ padding: "56px 36px", marginBottom: 20 }}>
          <ContourMotif />
          <span className="eyebrow eyebrow--on-dark">Dark variant</span>
          <p style={{ color: "var(--te-cream)", fontFamily: "var(--te-display)", fontWeight: 700, fontSize: "var(--te-fs-2xl)", maxWidth: "26ch" }}>
            Thin strokes, low opacity, never over body text.
          </p>
        </div>
        <div className="panel" style={{ position: "relative", overflow: "hidden", padding: "56px 36px" }}>
          <ContourMotif variant="light" />
          <span className="eyebrow" style={{ position: "relative" }}>Light variant</span>
          <p style={{ position: "relative", color: "var(--te-forest)", fontFamily: "var(--te-display)", fontWeight: 700, fontSize: "var(--te-fs-2xl)", maxWidth: "26ch" }}>
            On tinted panels, forest strokes at 7 percent.
          </p>
        </div>
        <RuleList
          items={[
            <><strong>One source pattern.</strong> Dark variant: stroke Contour on Dark #1B331A at 1.1px, opacity 0.45, on Primary Dark only. Light variant: stroke Primary Dark at opacity 0.055 to 0.07 on tinted panels.</>,
            <>Behind dark bars, hero panels and callout panels only. Never behind body text, never on white cards, never as a full-page texture.</>,
            <>Keep the pattern's native scale (1600 × 500 viewBox, slice-fitted). Do not stretch, recolour or thicken it.</>,
            <>The pattern is generated artwork: regenerate from source, never hand-edit paths.</>,
          ]}
        />
      </Section>

      <Section title="Geometric brandmark crops" sub="The brandmark's softened peaks may frame imagery or sign a composition.">
        <div className="grid grid--2">
          <figure style={{ margin: 0 }}>
            <img
              src="/assets/photography/photo-whakaari-peaks.webp"
              alt="Whakaari / White Island with the flat forest and cream brandmark peaks composited in front"
              style={{ borderRadius: "var(--te-r-img)", border: "1px solid var(--te-line)", width: "100%", display: "block" }}
            />
            <figcaption style={{ fontSize: "var(--te-fs-base)", color: "var(--te-ink-40)", marginTop: 10 }}>
              The origin image: brandmark peaks as flat colour fields in front of Whakaari / White Island.
            </figcaption>
          </figure>
          <div className="prose">
            <p><strong>Preserve the approved softened geometry.</strong> Crops come from the master brandmark artwork, never redrawn shapes.</p>
            <p>Use as restrained framing or a visual signature: a peak silhouette bleeding off a cover edge, a low-opacity watermark on a report, flat colour fields in a photographic composition.</p>
            <p>Crops must not overpower photographs. Overlaid on imagery, use flat brand colours or low opacity. One crop per composition.</p>
          </div>
        </div>
      </Section>

      <Section title="Process diagrams" sub="Direct, linear, low word count. One icon style, one arrow style, restrained labels.">
        <div className="panel" style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {["Configured", "Captured", "Confirmed"].map((stage, i) => (
            <span key={stage} style={{ display: "flex", alignItems: "center", gap: 10, flex: "1 1 140px" }}>
              <span style={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                borderRadius: "var(--te-r-md)", padding: "12px 16px",
                border: "1px solid var(--te-olive-edge)",
                background: i === 2 ? "var(--te-forest)" : "var(--te-card)",
                color: i === 2 ? "var(--te-cream)" : "var(--te-forest)",
                fontWeight: 700, fontSize: "var(--te-fs-md)",
              }}>
                {stage}
              </span>
              {i < 2 && <span style={{ color: "var(--te-forest-hover)" }}><Arrow /></span>}
            </span>
          ))}
        </div>
        <RuleList
          items={[
            <>Stages read left to right (or top to bottom on mobile). Forest fill marks the terminal-positive stage only.</>,
            <>Labels are single words or short verb phrases. If a stage needs a sentence, the diagram is doing too much.</>,
            <>Numbered markers (Play 700 in a sage-tint pill) are reserved for Configure, Capture and Confirm.</>,
          ]}
        />
      </Section>

      <Section title="Data and interface graphics">
        <RuleList
          items={[
            <><strong>Operational, legible, evidence-led.</strong> Charts and readouts exist to be read on site, not admired.</>,
            <>Use real product imagery wherever possible. Fake technical diagrams and invented dashboards are prohibited.</>,
            <>Numbers set in JetBrains Mono. Status colours only where they carry their product meaning.</>,
          ]}
        />
        <DoDont
          items={[
            {
              kind: "do",
              stage: <img src="/assets/product-imagery/tacedge-qa-queue-desktop.webp" alt="Real TACEDGE QA queue screen" style={{ maxHeight: 120, borderRadius: 7, border: "1px solid var(--te-line)" }} />,
              caption: "Real product screens carry the evidence story.",
            },
            {
              kind: "dont",
              stage: (
                <div aria-label="Invented glossy dashboard" style={{ width: 180, height: 100, borderRadius: 10, background: "linear-gradient(135deg, #0af, #80f)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>
                  98% ▲
                </div>
              ),
              caption: "No invented dashboards, blue-tech gradients or decorative statistics.",
            },
          ]}
        />
      </Section>
    </>
  );
}
