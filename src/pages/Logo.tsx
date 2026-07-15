import { PageHero, Section, RuleList, TokenTable, DoDont, Flag } from "../components/ui";

const L = "assets/logos";

export default function Logo() {
  return (
    <>
      <PageHero
        eyebrow="04 · Logo"
        title="One mark. Softened geometry. Never redrawn."
        lead="The TACEDGE lockup pairs the sage brandmark peaks with the uppercase wordmark. The master assets in this repository are the only approved artwork: never redraw, trace, approximate, regenerate or recreate them with text or CSS."
      />

      <Section title="Primary horizontal lockup" sub="The default. Use it wherever space allows.">
        <div className="grid grid--2">
          <div className="logostage logostage--dark on-dark">
            <img src={`${L}/horizontal/tacedge-lockup-cream.svg`} alt="TACEDGE lockup, cream on forest" />
            <span className="eyebrow eyebrow--on-dark">On dark · cream lockup</span>
          </div>
          <div className="logostage logostage--cream">
            <img src={`${L}/horizontal/tacedge-lockup-forest.svg`} alt="TACEDGE lockup, forest on cream" />
            <span className="eyebrow">On light · forest lockup</span>
          </div>
          <div className="logostage logostage--white">
            <img src={`${L}/monochrome/tacedge-lockup-ink.svg`} alt="TACEDGE lockup, monochrome ink" />
            <span className="eyebrow">Monochrome · ink</span>
          </div>
          <div className="logostage logostage--stage">
            <img src={`${L}/brandmark/tacedge-brandmark-sage.svg`} alt="TACEDGE brandmark" style={{ maxHeight: 72 }} />
            <span className="eyebrow">Brandmark · sage</span>
          </div>
        </div>
        <TokenTable
          head={["Variant", "Background", "Use"]}
          rows={[
            ["Cream lockup", "Primary Dark, dark photography", "Headers, footers, dark covers, dark panels"],
            ["Forest lockup", "Warm Cream, white, Sage Tint", "Light documents, cards, light applications"],
            ["Ink lockup", "Light", "Single-colour print, engraving, embossing, fax-grade reproduction"],
            ["Sage brandmark", "Primary Dark or Warm Cream", "Small spaces, watermarks, app icon, geometric crops"],
            ["Wordmark alone", "As per lockup colours", "Only where the brandmark already appears nearby"],
          ]}
        />
        <Flag>
          The forest lockup's wordmark green is Logo Forest #2B4721, not Primary Dark #112411. This is
          formalised as an artwork-only colour, pending final approval (decisions-required D1).
        </Flag>
      </Section>

      <Section
        title="Clear space and minimum size"
        sub="Clear space is measured with the peak unit: the height of the brandmark within the lockup."
      >
        <div className="grid grid--2" style={{ alignItems: "start" }}>
          <div className="card card--pad" style={{ display: "grid", justifyItems: "center" }}>
            <div style={{ border: "1px dashed var(--te-olive-edge)", padding: 34, borderRadius: 4 }}>
              <img src={`${L}/horizontal/tacedge-lockup-forest.svg`} alt="TACEDGE lockup with clear space equal to the brandmark height on all sides" style={{ height: 34, width: "auto" }} />
            </div>
            <p style={{ fontSize: "var(--te-fs-base)", color: "var(--te-ink-60)", marginTop: 14, textAlign: "center", maxWidth: "38ch" }}>
              Keep clear space of <strong>one peak unit</strong> (the brandmark height) on all sides.
              Nothing enters this zone: no text, no rules, no other marks, no page edge.
            </p>
          </div>
          <TokenTable
            head={["Asset", "Minimum digital", "Minimum print"]}
            rows={[
              ["Horizontal lockup", "120 px wide", "30 mm wide"],
              ["Wordmark", "96 px wide", "24 mm wide"],
              ["Brandmark", "24 px wide", "8 mm wide"],
              ["App icon", "16 px (favicon)", "n/a"],
            ]}
          />
        </div>
        <RuleList
          items={[
            <>Align the lockup to the layout grid by the left edge of the brandmark, optically centred vertically.</>,
            <>Below minimum lockup size, switch to the brandmark alone.</>,
          ]}
        />
      </Section>

      <Section title="Incorrect use" sub="If it is not one of the supplied files at approved size and clear space, it is wrong.">
        <DoDont
          items={[
            { kind: "dont", stage: <img src={`${L}/horizontal/tacedge-lockup-forest.svg`} alt="Stretched TACEDGE lockup" style={{ transform: "scaleX(1.45)", height: 30 }} />, caption: "Never stretch, condense or alter proportions." },
            { kind: "dont", stage: <img src={`${L}/horizontal/tacedge-lockup-forest.svg`} alt="Recoloured TACEDGE lockup" style={{ height: 30, filter: "hue-rotate(160deg) saturate(3)" }} />, caption: "Never recolour. Only the supplied cream, forest, ink and sage variants exist." },
            { kind: "dont", stage: <img src={`${L}/horizontal/tacedge-lockup-forest.svg`} alt="Rotated TACEDGE lockup" style={{ height: 30, transform: "rotate(-14deg)" }} />, caption: "Never rotate or set on an angle." },
            { kind: "dont", stage: <img src={`${L}/horizontal/tacedge-lockup-forest.svg`} alt="TACEDGE lockup with drop shadow and effects" style={{ height: 30, filter: "drop-shadow(4px 6px 4px rgba(0,0,0,.55))" }} />, caption: "No shadows, glows, outlines, gradients or effects." },
            {
              kind: "dont",
              stage: <img src={`${L}/horizontal/tacedge-lockup-cream.svg`} alt="TACEDGE lockup over visually noisy photograph" style={{ height: 30, position: "relative", zIndex: 1 }} />,
              stageStyle: { backgroundImage: "url(assets/photography/photo-capture-abseil.webp)", backgroundSize: "cover", backgroundPosition: "center" },
              caption: "Not over visually noisy imagery. Place the logo on a flat brand surface or a calm image area.",
            },
            {
              kind: "dont",
              stage: (
                <span aria-label="TACEDGE recreated in a system font" style={{ fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: 26, letterSpacing: 2, color: "var(--te-forest)" }}>
                  ▲ TACEDGE
                </span>
              ),
              caption: "Never rebuild the logo with type, CSS or a redrawn mark, and never substitute an earlier sharp-edged version of the brandmark.",
            },
            {
              kind: "dont",
              stage: (
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontFamily: "var(--te-mono)", fontSize: 12, color: "var(--te-ink-40)" }}>0.2×</span>
                  <div style={{ border: "1px dashed var(--te-brick)", padding: 4 }}>
                    <img src={`${L}/horizontal/tacedge-lockup-forest.svg`} alt="TACEDGE lockup with insufficient clear space" style={{ height: 28 }} />
                  </div>
                </div>
              ),
              caption: "Insufficient clear space. Keep one peak unit on all sides.",
            },
            { kind: "do", stage: <img src={`${L}/horizontal/tacedge-lockup-forest.svg`} alt="Correct TACEDGE lockup" style={{ height: 32 }} />, caption: "Supplied artwork, approved colourway, clear space respected." },
          ]}
        />
      </Section>

      <Section title="Placement and co-branding">
        <RuleList
          items={[
            <><strong>Placement:</strong> top left of documents and interfaces; centred on covers, cards and title screens; bottom of leave-behinds beside contact details.</>,
            <><strong>Co-branding:</strong> separate marks with a 1px hairline rule and at least two peak units between them. Match cap-height or mark-height optically, never area. TACEDGE leads on TACEDGE-issued material (“TACEDGE × Hunter Civil”).</>,
            <><strong>App icon and favicon:</strong> use the supplied rounded-square tile only. Never place the full lockup in an icon slot.</>,
          ]}
        />
      </Section>

      <Section title="Physical reproduction" sub="Guidance for embossing, foil and vehicles. Production artwork must come from the master SVG or print-vector exports.">
        <TokenTable
          head={["Application", "Specification"]}
          rows={[
            ["Embossing / debossing", "Ink lockup artwork, single level, minimum 40 mm wide. The softened geometry must survive the die: request a proof."],
            ["Foil / spot colour", "One colour only. Foil on forest or ink stock; match Pale Sage or use blind emboss. No metallic gradients."],
            ["Vehicle", "Cream lockup on Primary Dark wrap or panel, or forest lockup on light vehicles. Side panels: lockup at 60 to 80 percent of panel width, clear space doubled at viewing distance. Conceptual until supplier-ready artwork exists (D8)."],
            ["Signage", "Follow vehicle logic: flat brand surface, one lockup, generous clear space, no effects."],
          ]}
        />
      </Section>
    </>
  );
}
