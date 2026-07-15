import type { CSSProperties, ReactNode } from "react";
import { contourPaths } from "../content/contour-paths";
import { colours, contrastPairs, alphaTokens } from "../content/colours";
import {
  brand, productModel, proposition, origin, positioning, personality,
  tone, goodWriting, headlines, ctas, hierarchy, terminology,
  elevator, boilerplate, founderDescription, productDescription, contact,
} from "../content/messaging";
import { VERSION, LAST_UPDATED } from "../content/site";
import typo from "../../tokens/typography.json";
import spacing from "../../tokens/spacing.json";

const L = "assets/logos";

function Contour() {
  return (
    <svg className="contour" viewBox="0 0 1600 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {contourPaths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

function Rules({ items }: { items: ReactNode[] }) {
  return <ul className="p-rules">{items.map((x, i) => <li key={i}>{x}</li>)}</ul>;
}

function T({ head, rows, mono }: { head: string[]; rows: ReactNode[][]; mono?: boolean }) {
  return (
    <table className={`p-table${mono ? " p-table--mono" : ""}`}>
      <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
    </table>
  );
}

function Sw({ k }: { k: string }) {
  const c = colours.find((x) => x.key === k)!;
  return (
    <div className="p-swatch">
      <div className="p-swatch__field" style={{ background: c.value }} />
      <div className="p-swatch__body">
        <div className="p-swatch__name">{c.name}{c.status === "provisional" ? " *" : ""}</div>
        <div className="p-swatch__vals">
          {c.value} · rgb({c.rgb.join(" ")})<br />
          hsl({c.hsl.join(" ")}) · cmyk({c.cmyk.join(" ")})
        </div>
      </div>
    </div>
  );
}

type SheetDef = { chapter: string; title?: string; dark?: boolean; body: ReactNode };

const mark = (n: number, extra?: CSSProperties) => (
  <span style={{
    fontFamily: "var(--te-display)", fontWeight: 700, fontSize: "10pt",
    width: "8mm", height: "8mm", borderRadius: 999, flexShrink: 0,
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    background: "var(--te-sage-tint)", color: "var(--te-forest)",
    border: "0.4mm solid var(--te-forest-hover)", ...extra,
  }}>{n}</span>
);

/* ---------------------------------------------------------------- sheets */

export const sheets: SheetDef[] = [
  // 02 Foundations
  {
    chapter: "02 · Foundations", title: "Name and promise",
    body: (
      <>
        <div style={{ background: "var(--te-forest)", borderRadius: "5mm", padding: "12mm 10mm", position: "relative", overflow: "hidden" }}>
          <Contour />
          <p style={{ position: "relative", fontFamily: "var(--te-display)", fontWeight: 700, fontSize: "34pt", lineHeight: 1.05, color: "var(--te-cream)" }}>Shared<br />Clarity.</p>
          <p style={{ position: "relative", color: "var(--te-sage)", fontWeight: 600, fontSize: "10pt", marginTop: "5mm" }}>{brand.category}</p>
        </div>
        <h3>The name</h3>
        <Rules items={[
          <><strong>TACEDGE</strong> is always written in uppercase in normal written use.</>,
          <>Never TacEdge, Tacedge, TechEdge or Tech Edge.</>,
          <>The legal company name may appear as <strong>TACEDGE Limited</strong> where required.</>,
        ]} />
        <h3>The promise</h3>
        <Rules items={[
          <>The full stop is part of the primary hero treatment. Retain it unless a specific application makes punctuation inappropriate.</>,
          <>Pair the promise with the category line wherever it leads: <strong>“For ground-engineering delivery.”</strong></>,
        ]} />
      </>
    ),
  },
  {
    chapter: "02 · Foundations", title: "Mission, vision and the product model",
    body: (
      <>
        <T head={["", "Statement"]} rows={[
          ["Mission", <strong key="m">{brand.mission}</strong>],
          ["Vision", brand.vision],
          ["Positioning", brand.positioning],
          ["Core principle", brand.principle],
        ]} />
        <h3>The product model</h3>
        <div className="p-grid p-grid--4" style={{ marginTop: "2mm" }}>
          {productModel.long.map((line, i) => (
            <div key={line} className="p-card" style={{ display: "flex", gap: "3mm", alignItems: "center", padding: "3.5mm" }}>
              {mark(i + 1)}
              <span style={{ fontWeight: 600, fontSize: "8.5pt" }}>{line}</span>
            </div>
          ))}
        </div>
        <p className="small" style={{ marginTop: "3mm", color: "var(--te-ink-60)" }}>
          Short form: <strong style={{ color: "var(--te-ink)" }}>{productModel.short}</strong> — {productModel.releaseRule}
        </p>
        <h3>The proposition</h3>
        <div className="p-panel">
          <p style={{ fontWeight: 600, color: "var(--te-forest)" }}>{proposition.lines.join(" ")}</p>
          <p style={{ marginTop: "2mm", color: "var(--te-ink-60)" }}>{proposition.tagline}</p>
        </div>
      </>
    ),
  },
  {
    chapter: "02 · Foundations", title: "Origin",
    body: (
      <>
        <div className="p-grid p-grid--2" style={{ alignItems: "center" }}>
          <div>
            <h3 style={{ margin: "0 0 3mm" }}>{origin.heading}</h3>
            {origin.body.map((p) => <p key={p} style={{ color: "var(--te-ink-60)", marginBottom: "2.5mm" }}>{p}</p>)}
            <p style={{ borderLeft: "0.6mm solid var(--te-sage)", paddingLeft: "4mm", marginTop: "2mm" }}>{origin.missing}</p>
          </div>
          <figure style={{ margin: 0 }}>
            <img src="assets/photography/photo-whakaari-peaks.webp" alt="Whakaari / White Island, 2019, with the TACEDGE brandmark peaks in front" style={{ width: "100%", borderRadius: "3.5mm", border: "0.3mm solid var(--te-line)", display: "block" }} />
            <figcaption className="small" style={{ color: "var(--te-ink-40)", marginTop: "2mm" }}>Whakaari / White Island, 2019</figcaption>
          </figure>
        </div>
        <h3>Telling the story</h3>
        <Rules items={[
          <><strong>{origin.rule}</strong></>,
          <>Name the event as “the 2019 Whakaari / White Island recovery operation”. Both names, in that order.</>,
          <>The origin explains the mission. It is never promotional material and never a claim of credit.</>,
        ]} />
      </>
    ),
  },
  {
    chapter: "02 · Foundations", title: "Positioning and personality",
    body: (
      <>
        <div className="p-grid p-grid--2">
          <div className="p-card">
            <span className="k-eyebrow">TACEDGE is</span>
            <p style={{ color: "var(--te-ink-60)" }}>{positioning.is.join(" · ")}</p>
          </div>
          <div className="p-card">
            <span className="k-eyebrow" style={{ color: "var(--te-brick)" }}>TACEDGE is not</span>
            <p style={{ color: "var(--te-ink-60)" }}>{positioning.isNot.join(" · ")}</p>
          </div>
          <div className="p-card">
            <span className="k-eyebrow">Personality</span>
            <p style={{ color: "var(--te-ink-60)" }}>{personality.is.join(" · ")}</p>
          </div>
          <div className="p-card">
            <span className="k-eyebrow" style={{ color: "var(--te-brick)" }}>Never</span>
            <p style={{ color: "var(--te-ink-60)" }}>{personality.isNot.join(" · ")}</p>
          </div>
        </div>
        <div className="p-panel" style={{ marginTop: "4mm" }}>
          <span className="k-eyebrow" style={{ color: "var(--te-forest)" }}>The brand belongs in</span>
          <p style={{ color: "var(--te-forest)", fontWeight: 600 }}>{personality.belongsIn}</p>
        </div>
      </>
    ),
  },
  // 03 Messaging
  {
    chapter: "03 · Messaging", title: "Tone of voice",
    body: (
      <>
        <div className="p-panel">
          <p style={{ fontFamily: "var(--te-display)", fontWeight: 700, fontSize: "15pt", color: "var(--te-forest)", maxWidth: "120mm", lineHeight: 1.3 }}>{tone.centralRule}</p>
        </div>
        <div className="p-grid p-grid--2" style={{ marginTop: "4mm" }}>
          <div className="p-card">
            <span className="k-eyebrow">Prefer</span>
            <p style={{ color: "var(--te-ink-60)" }}>{tone.prefer.join(" · ")}</p>
          </div>
          <div className="p-card">
            <span className="k-eyebrow" style={{ color: "var(--te-brick)" }}>Avoid</span>
            <p style={{ color: "var(--te-ink-60)" }}>{tone.avoid.join(" · ")}</p>
          </div>
        </div>
        <p className="p-flag" style={{ background: "var(--te-sage-tint)", borderColor: "var(--te-olive-line)", color: "var(--te-forest)" }}>
          <b style={{ color: "var(--te-forest)" }}>Claims</b> {tone.claims}
        </p>
        <h3>Message hierarchy</h3>
        <T head={["Level", "Approved copy", "Use"]} rows={hierarchy.map((h) => [h.level, <strong key={h.level}>{h.copy}</strong>, h.use])} />
      </>
    ),
  },
  {
    chapter: "03 · Messaging", title: "Approved long-form copy",
    body: (
      <div className="p-grid" style={{ gap: "3.5mm" }}>
        {[["Elevator description", elevator], ["Company boilerplate", boilerplate], ["Founder description", founderDescription], ["Product description", productDescription]].map(([label, copy]) => (
          <div key={label} className="p-card">
            <span className="k-eyebrow">{label}</span>
            <p style={{ color: "var(--te-ink-60)" }}>{copy}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    chapter: "03 · Messaging", title: "Writing in practice",
    body: (
      <>
        <div className="p-grid p-grid--2">
          {goodWriting.slice(0, 2).map((ex) => (
            <div key={ex.good} style={{ display: "grid", gap: "3mm" }}>
              <div className="p-do">
                <div className="p-do__stage"><p style={{ fontWeight: 600, textAlign: "center" }}>{ex.good}</p></div>
                <p className="p-do__cap"><b>Do</b> — {ex.why}</p>
              </div>
              <div className="p-dont">
                <div className="p-do__stage"><p style={{ color: "var(--te-ink-60)", textAlign: "center" }}>{ex.poor}</p></div>
                <p className="p-do__cap"><b>Don't</b> — inflated, vague, claims nothing verifiable.</p>
              </div>
            </div>
          ))}
        </div>
        <h3>Headline rules</h3>
        <Rules items={headlines.rules} />
        <h3>CTA rules</h3>
        <Rules items={ctas.rules} />
      </>
    ),
  },
  {
    chapter: "03 · Messaging", title: "Terminology",
    body: (
      <>
        <T head={["Term", "Rule"]} rows={terminology.map((t) => [t.term, t.rule])} />
        <p className="small" style={{ marginTop: "4mm", color: "var(--te-ink-40)" }}>
          NZ spelling throughout. No em dashes. Approved headline examples: {headlines.examples.join(" · ")}
        </p>
      </>
    ),
  },
  // 04 Logo
  {
    chapter: "04 · Logo", title: "The lockup and its variants",
    body: (
      <>
        <div className="p-grid p-grid--2">
          {[
            { bg: "var(--te-forest)", img: `${L}/horizontal/tacedge-lockup-cream.svg`, cap: "On dark · cream lockup", dark: true },
            { bg: "var(--te-cream)", img: `${L}/horizontal/tacedge-lockup-forest.svg`, cap: "On light · forest lockup" },
            { bg: "var(--te-card)", img: `${L}/monochrome/tacedge-lockup-ink.svg`, cap: "Monochrome · ink" },
            { bg: "var(--te-stage)", img: `${L}/brandmark/tacedge-brandmark-sage.svg`, cap: "Brandmark · sage", brandmark: true },
          ].map((v) => (
            <div key={v.cap} style={{ background: v.bg, border: "0.3mm solid var(--te-line)", borderRadius: "4mm", padding: "9mm 7mm", display: "grid", gap: "4mm", justifyItems: "start" }}>
              <img src={v.img} alt={v.cap} style={{ height: v.brandmark ? "16mm" : "9mm", width: "auto" }} />
              <span className="k-eyebrow" style={{ margin: 0, color: v.dark ? "var(--te-sage)" : undefined }}>{v.cap}</span>
            </div>
          ))}
        </div>
        <T head={["Variant", "Background", "Use"]} rows={[
          ["Cream lockup", "Primary Dark, dark photography", "Headers, footers, dark covers"],
          ["Forest lockup", "Warm Cream, white, Sage Tint", "Light documents, cards"],
          ["Ink lockup", "Light", "Single-colour print, embossing"],
          ["Sage brandmark", "Primary Dark or Warm Cream", "Small spaces, watermarks, app icon"],
          ["Wordmark alone", "As per lockup colours", "Only where the brandmark appears nearby"],
        ]} />
        <p className="p-flag"><b>Provisional</b> The forest lockup's wordmark green is Logo Forest #2B4721, an artwork-only colour pending final approval (D1).</p>
      </>
    ),
  },
  {
    chapter: "04 · Logo", title: "Clear space and minimum size",
    body: (
      <>
        <div className="p-grid p-grid--2" style={{ alignItems: "start" }}>
          <div className="p-card" style={{ display: "grid", justifyItems: "center", padding: "8mm" }}>
            <div style={{ border: "0.35mm dashed var(--te-olive-edge)", padding: "9mm" }}>
              <img src={`${L}/horizontal/tacedge-lockup-forest.svg`} alt="Lockup with one peak unit of clear space" style={{ height: "9mm", width: "auto" }} />
            </div>
            <p className="small" style={{ color: "var(--te-ink-60)", marginTop: "3mm", textAlign: "center" }}>
              Clear space: <strong>one peak unit</strong> (the brandmark height) on all sides. Nothing enters this zone.
            </p>
          </div>
          <T head={["Asset", "Min digital", "Min print"]} rows={[
            ["Horizontal lockup", "120 px wide", "30 mm wide"],
            ["Wordmark", "96 px wide", "24 mm wide"],
            ["Brandmark", "24 px wide", "8 mm wide"],
            ["App icon", "16 px (favicon)", "n/a"],
          ]} />
        </div>
        <h3>Never redraw</h3>
        <Rules items={[
          <>The master SVGs in this repository are the only approved artwork. The brandmark's <strong>softened geometric edges</strong> are part of the mark.</>,
          <>Never redraw, trace from a screenshot, approximate, regenerate, substitute an earlier sharp-edged version, alter proportions, or recreate the logo with text or CSS.</>,
          <>Align the lockup to the grid by the brandmark's left edge. Below minimum lockup size, use the brandmark alone.</>,
        ]} />
      </>
    ),
  },
  {
    chapter: "04 · Logo", title: "Incorrect use",
    body: (
      <>
        <div className="p-grid p-grid--3">
          {[
            { style: { transform: "scaleX(1.45)" } as CSSProperties, cap: "Never stretch or alter proportions" },
            { style: { filter: "hue-rotate(160deg) saturate(3)" } as CSSProperties, cap: "Never recolour" },
            { style: { transform: "rotate(-14deg)" } as CSSProperties, cap: "Never rotate" },
            { style: { filter: "drop-shadow(1.5mm 2mm 1mm rgba(0,0,0,.55))" } as CSSProperties, cap: "No shadows or effects" },
            { bg: "url(assets/photography/photo-capture-abseil.webp)", cream: true, cap: "Not over visually noisy imagery" },
            { text: true, cap: "Never rebuild with type or a redrawn mark" },
          ].map((d, i) => (
            <div key={i} className="p-dont">
              <div className="p-do__stage" style={d.bg ? { backgroundImage: d.bg, backgroundSize: "cover", backgroundPosition: "center" } : undefined}>
                {d.text
                  ? <span style={{ fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: "13pt", letterSpacing: "0.5mm", color: "var(--te-forest)" }}>▲ TACEDGE</span>
                  : <img src={`${L}/horizontal/tacedge-lockup-${d.cream ? "cream" : "forest"}.svg`} alt="" style={{ height: "8mm", ...d.style }} />}
              </div>
              <p className="p-do__cap"><b>Don't</b> — {d.cap}</p>
            </div>
          ))}
        </div>
        <h3>Placement, co-branding and physical reproduction</h3>
        <Rules items={[
          <><strong>Placement:</strong> top left of documents and interfaces; centred on covers and cards; bottom of leave-behinds beside contact details.</>,
          <><strong>Co-branding:</strong> hairline rule between marks, two peak units apart, optically matched heights. TACEDGE leads on TACEDGE-issued material.</>,
          <><strong>Embossing:</strong> ink artwork, single level, minimum 40 mm, proof the softened geometry. <strong>Foil:</strong> one colour, no metallic gradients.</>,
          <><strong>Vehicles and signage:</strong> flat brand surfaces, one lockup, doubled clear space at viewing distance. Conceptual until supplier-ready artwork exists (D8).</>,
        ]} />
      </>
    ),
  },
  // 05 Colour
  {
    chapter: "05 · Colour", title: "Brand palette",
    body: (
      <>
        <p className="lead" style={{ marginBottom: "5mm" }}>Forest green on warm cream is the brand. Do not add colours. CMYK values are indicative conversions: verify with the selected printer and stock.</p>
        <div className="p-grid p-grid--3">
          {["primary-dark", "primary-dark-hover", "utility-sage", "sage-edge", "pale-sage", "sage-tint"].map((k) => <Sw key={k} k={k} />)}
        </div>
        <h3>Neutrals and ink</h3>
        <div className="p-grid p-grid--4">
          {["warm-cream", "card-surface", "quiet-tint", "stage", "primary-text", "secondary-text", "muted-text", "divider"].map((k) => <Sw key={k} k={k} />)}
        </div>
      </>
    ),
  },
  {
    chapter: "05 · Colour", title: "Status and special-purpose colour",
    body: (
      <>
        <div className="p-grid p-grid--4">
          {["warning", "warning-tint", "error", "error-tint", "border", "border-strong", "contour-on-dark", "logo-forest"].map((k) => <Sw key={k} k={k} />)}
        </div>
        <p className="p-flag"><b>Status rule</b> Ochre and brick carry meaning in the product: caution and alert. They appear in marketing only inside authentic product imagery. Never decorative, never a marketing accent. Forest fill is the terminal-positive (success) state; TACEDGE has no separate bright green and no blue.</p>
        <p className="small" style={{ marginTop: "2mm", color: "var(--te-ink-40)" }}>* Logo Forest #2B4721 exists only inside logo artwork and the app-icon tile — provisional, see decisions-required D1.</p>
        <h3>Alpha hairlines</h3>
        <T mono head={["Token", "Value", "Role"]} rows={alphaTokens.map((t) => [t.key, t.value, t.role])} />
      </>
    ),
  },
  {
    chapter: "05 · Colour", title: "Approved combinations and contrast",
    body: (
      <>
        <T head={["Foreground", "Background", "Ratio", "Level", "Use"]} rows={contrastPairs.map((p) => [p.fg.split(" #")[0], p.bg.split(" #")[0], p.ratio, p.level, p.use])} />
        <Rules items={[
          <><strong>Cream is the paper;</strong> white belongs to cards sitting on it. Forest is for decisive brand moments and primary actions.</>,
          <>Green deepens with progress: sage-tint (planned), olive-edged (active), forest-filled (confirmed).</>,
          <>Utility Sage and warning ochre are large-text and icon colours only.</>,
        ]} />
      </>
    ),
  },
  // 06 Typography
  {
    chapter: "06 · Typography", title: "Typefaces",
    body: (
      <>
        <div className="p-grid p-grid--3">
          {[
            { name: "Play", role: "Display · 400, 700", family: "var(--te-display)", weight: 700 },
            { name: "Be Vietnam Pro", role: "UI and body · 400 to 700", family: "var(--te-ui)", weight: 400 },
            { name: "JetBrains Mono", role: "Utility · 400, 500, 700", family: "var(--te-mono)", weight: 500 },
          ].map((f) => (
            <div key={f.name} className="p-card">
              <p style={{ fontFamily: f.family, fontWeight: f.weight, fontSize: "22pt", lineHeight: 1.1 }}>AaBb 0123</p>
              <p style={{ fontWeight: 700, marginTop: "3mm" }}>{f.name}</p>
              <p className="small" style={{ color: "var(--te-ink-60)" }}>{f.role}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "6mm", borderTop: "0.3mm solid var(--te-line)", paddingTop: "5mm" }}>
          <span className="k-eyebrow">Play 700 · display</span>
          <p style={{ fontFamily: "var(--te-display)", fontWeight: 700, fontSize: "24pt", lineHeight: 1.1 }}>Reporting your engineer trusts on sight.</p>
          <span className="k-eyebrow" style={{ marginTop: "5mm" }}>Be Vietnam Pro 400 · body</span>
          <p style={{ color: "var(--te-ink-60)", maxWidth: "140mm" }}>Set the project up once. Capture the work where it happens. Give your engineer a confirmed report they can trust.</p>
          <span className="k-eyebrow" style={{ marginTop: "5mm" }}>JetBrains Mono 500 · utility</span>
          <p style={{ fontFamily: "var(--te-mono)", fontSize: "8.5pt", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--te-ink-40)" }}>Configure · Capture · Confirm</p>
        </div>
        <Rules items={[
          <>All three families are Google Fonts under the SIL Open Font Licence 1.1. <strong>Self-host woff2 in every property</strong>; never load from a CDN. Fonts are not distributed with the brand assets.</>,
          <>Fallbacks: system-ui stacks (display and UI), ui-monospace (utility). Print substitution where embedding is impossible: Arial for body; Play only via supplied artwork.</>,
        ]} />
      </>
    ),
  },
  {
    chapter: "06 · Typography", title: "Type roles",
    body: (
      <>
        <T mono head={["Role", "Family / weight", "Size", "LH", "Case", "Print min"]} rows={Object.entries(typo.roles).map(([name, r]) => [name, `${r.family} ${r.weight}`, r.size, String(r.lineHeight), r.case, r.printMin])} />
        <Rules items={[
          <><strong>Do not overuse all caps</strong>: uppercase belongs to utility labels and short chips, always tracked 0.16em in JetBrains Mono.</>,
          <>Headlines are sentence case with a full stop, broken on meaning. Body measure 62ch maximum.</>,
          <>Monospace is a utility voice, never a body voice. Numerals in tables use JetBrains Mono, tabular.</>,
        ]} />
      </>
    ),
  },
  // 07 Layout
  {
    chapter: "07 · Layout", title: "Grid, spacing and rhythm",
    body: (
      <>
        <T mono head={["Token", "Value", "Role"]} rows={[
          ["content-max", "1200px", "Maximum content width, centred"],
          ["gutter", "clamp(20px, 3.4vw, 32px)", "Horizontal padding"],
          ["section", "clamp(64px, 9vw, 120px)", "Standard section rhythm"],
          ["section-tight", "clamp(56px, 7vw, 96px)", "Compact section rhythm"],
        ]} />
        <h3>Spacing scale</h3>
        <div className="p-card" style={{ display: "grid", gap: "1.8mm" }}>
          {Object.entries(spacing.scale).map(([name, value]) => (
            <div key={name} style={{ display: "grid", gridTemplateColumns: "14mm 14mm 1fr", alignItems: "center", gap: "3mm", fontFamily: "var(--te-mono)", fontSize: "7.5pt" }}>
              <span style={{ color: "var(--te-ink-40)" }}>{name}</span>
              <span>{value}</span>
              <span style={{ height: "3mm", width: value, background: "var(--te-olive)", borderRadius: "0.8mm" }} />
            </div>
          ))}
        </div>
        <h3>Print</h3>
        <Rules items={[
          <>A4 documents: 12 to 13 mm margins. Business cards: 90 × 55 mm trim, 3 mm bleed, 5 mm safe zone.</>,
          <>Use the scale; one-off values are not brand spacing. Body measure 62ch; supporting copy 42 to 48ch.</>,
        ]} />
      </>
    ),
  },
  {
    chapter: "07 · Layout", title: "Breakpoints, shape and elevation",
    body: (
      <>
        <T mono head={["Breakpoint", "Value", "Typical change"]} rows={[
          ["wide", "1080px", "Hero grid stacks; two-line headlines release"],
          ["desktop", "980px", "Workflow columns stack; 4-up grids become 2-up"],
          ["tablet", "880px", "Split sections stack; navigation condenses"],
          ["tablet-narrow", "720px", "Two-up cards stack"],
          ["mobile", "640px", "Process strips go vertical; buttons full-width"],
          ["mobile-narrow", "420px", "Compact grids single column"],
        ]} />
        <h3>Shape and elevation</h3>
        <T mono head={["Token", "Value", "Use"]} rows={[
          ["r-card / r-img", "16px / 14px", "Standard cards and content images"],
          ["r-panel / r-panel-lg", "20px / 24px", "Tinted callout panels"],
          ["r-button / r-pill", "12px / 999px", "Buttons; chips and status pills"],
          ["border", "1px hairline", "All card and component borders"],
          ["shadow sm / md / lg", "ink-tinted, soft", "Cards; hover lift; overlays"],
          ["shadow device", "0 18px 40px rgba(0,0,0,.32)", "Device frames only"],
        ]} />
        <Rules items={[
          <>Soft and disciplined, not bubbly: one soft shadow family, no glows, no glassmorphism.</>,
          <>Six approved composition types: brand-led hero, left-aligned editorial, centred workflow, split text-and-image, compact technical diagram, one-page leave-behind.</>,
        ]} />
      </>
    ),
  },
  // 08 Iconography
  {
    chapter: "08 · Iconography", title: "Icons and arrows",
    body: (
      <>
        <div className="p-grid p-grid--3">
          {["anchoring", "drilling", "shotcrete", "rockfall-protection", "drainage", "piling-retaining"].map((n) => (
            <div key={n} className="p-card" style={{ display: "flex", alignItems: "center", gap: "4mm", padding: "3.5mm" }}>
              <img src={`/assets/icons/worktype-${n}.svg`} alt="" style={{ width: "9mm", height: "9mm" }} />
              <span style={{ fontWeight: 700, fontSize: "8.5pt", textTransform: "capitalize" }}>{n.replace(/-/g, " ").replace("piling retaining", "piling & retaining")}</span>
            </div>
          ))}
        </div>
        <h3>Rules</h3>
        <Rules items={[
          <><strong>Stroke 1.6, round caps and joins, no fills.</strong> 24px grid for general icons, 32px for work types. Scale proportionally, never restroke.</>,
          <>Four treatments only: informational (48px sage-tint circle, forest line icon), work-type (standalone), workflow/status (small, inside a state component), numbered marker (Play 700 in a sage-tint pill, reserved for Configure, Capture, Confirm).</>,
          <>One arrow: straight shaft, open head, 1.6 stroke, in Utility Sage or forest. Process, button, downward-navigation and status-progression arrows are the same arrow doing four jobs. Never mix arrowhead styles.</>,
          <>Minimal detail, technical not decorative. Do not invent custom icons where a suitable existing icon exists (the product uses the Lucide family).</>,
        ]} />
      </>
    ),
  },
  // 09 Graphic language
  {
    chapter: "09 · Graphic Language", title: "Topographic linework and brandmark crops",
    body: (
      <>
        <div style={{ background: "var(--te-forest)", borderRadius: "5mm", padding: "11mm 9mm", position: "relative", overflow: "hidden" }}>
          <Contour />
          <p style={{ position: "relative", fontFamily: "var(--te-display)", fontWeight: 700, fontSize: "15pt", color: "var(--te-cream)", maxWidth: "110mm" }}>Thin strokes, low opacity, never over body text.</p>
        </div>
        <Rules items={[
          <><strong>One source pattern</strong>, two variants. Dark: stroke #1B331A at 1.1px, opacity 0.45, on Primary Dark only. Light: stroke forest at 5.5 to 7 percent on tinted panels.</>,
          <>Behind dark bars, hero panels and callout panels only. Never behind body text, never on white cards, never a full-page texture. Keep native scale; regenerate, never hand-edit.</>,
          <><strong>Brandmark crops:</strong> softened peaks from the master artwork may frame imagery or sign a composition. Flat brand colours or low opacity over photographs; one crop per composition; never overpowering.</>,
          <><strong>Process diagrams:</strong> direct and linear, one icon style, one arrow style, single-word labels, forest fill only on the terminal-positive stage.</>,
          <><strong>Data graphics:</strong> operational and legible; real product imagery wherever possible; fake technical diagrams are prohibited.</>,
        ]} />
      </>
    ),
  },
  // 10 Photography
  {
    chapter: "10 · Photography", title: "Direction",
    body: (
      <>
        <div className="p-grid p-grid--3">
          {[
            { src: "photo-configure-pm.webp", cap: "Configure · office" },
            { src: "photo-capture-abseil.webp", cap: "Capture · workface" },
            { src: "photo-confirm-engineer.webp", cap: "Confirm · review" },
          ].map((p) => (
            <figure key={p.src} style={{ margin: 0 }}>
              <img src={`/assets/photography/${p.src}`} alt={p.cap} style={{ width: "100%", aspectRatio: "8/5", objectFit: "cover", borderRadius: "3mm", border: "0.3mm solid var(--te-line)", display: "block" }} />
              <figcaption className="k-eyebrow" style={{ marginTop: "2mm" }}>{p.cap}</figcaption>
            </figure>
          ))}
        </div>
        <Rules items={[
          <><strong>Real, field-based, documentary.</strong> Real crews, genuine environments, field equipment, evidence capture, complex terrain, the field-to-office connection.</>,
          <><strong>Never:</strong> corporate handshakes, stock office teams, blue technology overlays, staged smiles, exaggerated danger, military styling, disaster imagery as promotion.</>,
          <>Natural light, muted grade, moderate contrast, restrained saturation. Subjects off-centre and working; correct PPE; consent always.</>,
          <>Captions factual and small. Alt text always: describe the work, the role and the setting.</>,
          <><strong>The Whakaari image</strong> is used respectfully and factually, in the origin context only, always captioned “Whakaari / White Island, 2019”.</>,
        ]} />
      </>
    ),
  },
  // 11 Product imagery
  {
    chapter: "11 · Product Imagery", title: "Real screens in quiet hardware",
    body: (
      <>
        <div style={{ background: "var(--te-stage)", borderRadius: "5mm", padding: "8mm", display: "grid", gridTemplateColumns: "2.1fr 1fr", gap: "7mm", alignItems: "end" }}>
          <div>
            <div style={{ background: "#262b25", borderRadius: "3.5mm", padding: "3.5mm 2.5mm 2.5mm", boxShadow: "0 4mm 9mm rgba(0,0,0,.32)" }}>
              <img src="assets/product-imagery/tacedge-qa-queue-desktop.webp" alt="TACEDGE QA queue on desktop" style={{ width: "100%", borderRadius: "1.5mm", display: "block" }} />
            </div>
          </div>
          <div style={{ maxWidth: "34mm" }}>
            <div style={{ background: "#262b25", borderRadius: "6mm", padding: "3mm 1.8mm 2.2mm", boxShadow: "0 4mm 9mm rgba(0,0,0,.32)" }}>
              <img src="assets/product-imagery/tacedge-field-capture-b12.webp" alt="TACEDGE field capture on mobile" style={{ width: "100%", borderRadius: "4mm", display: "block" }} />
            </div>
          </div>
        </div>
        <Rules items={[
          <><strong>Real screens only</strong>, high resolution, native proportions. Never invent interfaces, never distort, never materially crop important UI, no excessive perspective.</>,
          <>Graphite frames: monitor (16px radius bezel, camera dot, neck, base) and phone (34px radius, speaker, side button). No browser chrome. Device shadow only.</>,
          <>Backgrounds: Stage #DDE3D2, a flat brand surface, or the forest hero. Desktop and mobile may overlap, but never cover the selected record, evidence panel or approval controls.</>,
          <>Third-party names replaced with generic role labels before capture. Caption real screens factually.</>,
        ]} />
      </>
    ),
  },
  // 12 Digital UI
  {
    chapter: "12 · Digital UI", title: "Principles and components",
    body: (
      <>
        <Rules items={[
          <><strong>Field usability first:</strong> 44px minimum touch targets (48px primary), minimal operator decisions, role-specific views.</>,
          <><strong>Clear status:</strong> every work item wears its state. Forest fill = confirmed; ochre = caution; brick = alert.</>,
          <><strong>Evidence hierarchy:</strong> photos, measurements and results lead; chrome recedes. Offline confidence: capture never blocks; sync state is visible and truthful.</>,
        ]} />
        <h3>Component language</h3>
        <T head={["Component", "Standard"]} rows={[
          ["Buttons", "48px min height, 12px radius, 600 weight, 140ms transitions; forest primary, hairline secondary, ghost tertiary"],
          ["Cards", "White, 1px hairline border, 16px radius, one soft shadow; hover lifts 1px"],
          ["Pills / chips", "Sage-tint, mono uppercase, pill radius"],
          ["Status states", "Planned (sage-tint) · Active (olive-edged) · Submitted (ochre-tint) · Confirmed (forest) · Issue (brick-tint)"],
          ["Forms", "48px fields, hairline borders, forest focus ring, labels above"],
          ["Navigation", "Forest bar, cream lockup, sage underline on the active item"],
          ["Tables", "Hairline rules, quiet-tint alternating rows, mono numerals"],
          ["Alerts", "Tint field + status-colour icon + one factual sentence"],
          ["Maps", "Muted basemap; forest and olive overlays; status colours only for status"],
          ["Empty states", "One line of what belongs here and one action"],
          ["Mobile controls", "Bottom-anchored primary actions, thumb-reachable, one decision per screen"],
        ]} />
      </>
    ),
  },
  // 13 Applications
  {
    chapter: "13 · Applications", title: "Reference applications",
    body: (
      <>
        <div className="p-grid p-grid--2" style={{ alignItems: "start" }}>
          <div style={{ display: "grid", gap: "4mm" }}>
            <img src="assets/application-examples/business-card/TACEDGE_Business_Card_Mike_Coom_front.png" alt="TACEDGE business card front" style={{ width: "100%", borderRadius: "3mm", border: "0.3mm solid var(--te-line)" }} />
            <img src="assets/application-examples/business-card/TACEDGE_Business_Card_Mike_Coom_back.png" alt="TACEDGE business card back" style={{ width: "100%", borderRadius: "3mm", border: "0.3mm solid var(--te-line)" }} />
            <p className="small" style={{ color: "var(--te-ink-60)" }}>Business card: 90 × 55 mm trim, 3 mm bleed. Forest front, cream lockup at 49 mm; cream back, contact block left, tonal brandmark bleed.</p>
          </div>
          <div>
            <img src="assets/application-examples/leave-behind/TACEDGE_Hunter_Civil_Leave_Behind_15_July_2026.png" alt="Hunter Civil A4 leave-behind" style={{ width: "100%", borderRadius: "3mm", border: "0.3mm solid var(--te-line)" }} />
            <p className="small" style={{ color: "var(--te-ink-60)", marginTop: "2mm" }}>The Hunter Civil leave-behind: the message hierarchy on one A4 page.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    chapter: "13 · Applications", title: "Application standards",
    body: (
      <>
        <T head={["Application", "Standard", "Maturity"]} rows={[
          ["Website", "Reference implementation of this system", "Production"],
          ["V2 product interface", "Digital UI principles; legacy theme migration scheduled (D5)", "Production"],
          ["Business cards", "90 × 55 mm + 3 mm bleed; titles Co-Founder (D2)", "Print-ready spec"],
          ["Leave-behinds", "A4, 12 to 13 mm margins, hierarchy top to bottom", "Print-ready spec"],
          ["Reports", "Cream body; forest cover with lockup and contour; confirmed-record footer", "Print-ready spec"],
          ["Decks", "Forest title slides, cream content slides, one idea per slide", "Conceptual"],
          ["Email signature", "Name, role, TACEDGE, phone, tacedge.co.nz; no images", "Print-ready spec"],
          ["Letterhead", "A4 cream, forest lockup top left at 42 mm", "Conceptual"],
          ["Social graphics", "Flat brand surfaces, one statement, lockup at minimum size", "Conceptual"],
          ["Vehicle (Land Rover concept)", "Primary Dark wrap, cream lockup 60 to 80 percent of panel", "Conceptual (D8)"],
          ["Apparel", "Forest or ink garments, left-chest brandmark 70 to 90 mm", "Conceptual (D8)"],
          ["App icon / favicon", "Supplied rounded-square tile, 16 to 512 px", "Production"],
        ]} />
        <h3>Contact</h3>
        <div className="p-grid p-grid--3">
          <div className="p-card">
            <span className="k-eyebrow">General</span>
            <p style={{ fontWeight: 600 }}>{contact.email}</p>
            <p style={{ color: "var(--te-ink-60)" }}>{contact.website} · {contact.location}</p>
          </div>
          {contact.founders.map((f) => (
            <div key={f.name} className="p-card">
              <span className="k-eyebrow">Card example</span>
              <p style={{ fontWeight: 600 }}>{f.name}</p>
              <p className="small" style={{ color: "var(--te-ink-60)" }}>{f.role} · {f.phone}{f.email ? ` · ${f.email}` : ""}</p>
            </div>
          ))}
        </div>
        <p className="p-flag"><b>Provisional</b> Generated mockups are conceptual examples, not master production artwork. Confirm approved email addresses and titles before final card artwork (D2); physical applications need print-tested colour (D3).</p>
      </>
    ),
  },
  // 16–24 Templates
  {
    chapter: "16–24 · Templates", title: "The template system",
    body: (
      <>
        <p className="lead" style={{ marginBottom: "5mm" }}>
          Approved starting points for consistent TACEDGE communication. Use these templates rather
          than creating documents from a blank file; each applies the approved typography, spacing,
          colour, logo and information hierarchy. The interactive edition carries full usage
          guidance, previews and downloads for every template.
        </p>
        <T head={["Template", "Format", "Use", "Status"]} rows={[
          ["Presentation deck", "PPTX 16:9, 22 layouts", "Pitches, briefings, reviews, conferences", "Provisional (D10)"],
          ["Meeting minutes", "DOCX", "Decisions and actions, never transcripts", "Provisional (D10)"],
          ["Pilot proposal (+ summary)", "DOCX", "A narrow, jointly defined validation", "Provisional (D10)"],
          ["Technical / pilot report", "DOCX", "Findings labelled fact, feedback, inference, recommendation", "Provisional (D10)"],
          ["Letterhead", "DOCX", "Formal correspondence, printer-safe", "Provisional (D10)"],
          ["Legal document", "DOCX", "Formatting only; never replaces legal review", "Provisional (D10)"],
          ["One-page collateral", "HTML + PDF", "Leave-behinds with word-count limits and QR rules", "Provisional (D10)"],
          ["Email signature", "HTML + TXT", "Five lines of contact information", "Provisional (D10)"],
        ]} />
        <Rules items={[
          <><strong>The exported files are the product.</strong> Previews are rendered from the actual editable files. Sources are masters; PDFs and previews are regenerated, never edited.</>,
          <>Filename convention: <strong>TACEDGE_[Template_Name]_v[1.0].[ext]</strong>. Customer copies add [Customer]_[YYYY-MM-DD] and live outside the brand repository.</>,
          <>Versions, status and owners live in templates/manifest.json. Only Approved templates are primary downloads.</>,
          <>Fonts are referenced by name, never distributed: install Play, Be Vietnam Pro and JetBrains Mono from Google Fonts; office files fall back to Arial and Consolas.</>,
        ]} />
      </>
    ),
  },
  // 14 Downloads
  {
    chapter: "14 · Downloads", title: "Assets and design tokens",
    body: (
      <>
        <T head={["Package", "Contents", "Location"]} rows={[
          ["Logo package", "SVG masters (lockups, wordmarks, brandmark, app icon) + PNG exports at 1200/2400w and 512/1024w", "assets/logos/"],
          ["Icons", "Six work-type icons, SVG, 32px, stroke 1.6", "assets/icons/"],
          ["Patterns", "Contour motif: dark, light and currentColor variants", "assets/patterns/"],
          ["Photography", "Approved workflow set + Whakaari origin image", "assets/photography/"],
          ["Product imagery", "Approved V2 prototype captures", "assets/product-imagery/"],
          ["Application examples", "Business card + Hunter Civil leave-behind (HTML, PDF, PNG)", "assets/application-examples/"],
          ["Design tokens", "colors, typography, spacing, radii, shadows, breakpoints (JSON) + tokens.css + tokens.ts", "tokens/"],
          ["Documents", "This PDF and the one-page style tile", "exports/"],
        ]} />
        <Rules items={[
          <><strong>Consuming tokens:</strong> import tokens.css (or copy verbatim) and build on the custom properties, or import tokens.ts in TypeScript. Collateral consumes tokens; it never re-declares them.</>,
          <><strong>Fonts are not distributed.</strong> Play, Be Vietnam Pro, JetBrains Mono: Google Fonts, SIL OFL 1.1. Self-host in each property.</>,
          <>Every asset's status and provenance: assets/asset-manifest.md. Provisional items reference an open decision (D1 to D8).</>,
        ]} />
      </>
    ),
  },
  // 15 Governance
  {
    chapter: "15 · Governance", title: "Authority, change control and accessibility",
    body: (
      <>
        <div className="p-panel" style={{ fontFamily: "var(--te-mono)", fontSize: "8.5pt", lineHeight: 2 }}>
          TACEDGE Brand System → Website → Product interfaces → Documents and physical applications
        </div>
        <T head={["Aspect", "Rule"]} rows={[
          ["Approval", "Brand changes approved by the TACEDGE founders. No exceptions for colour, logo, promise or terminology."],
          ["Asset status", "Every asset is approved or provisional in the manifest; provisional items carry a decision reference."],
          ["Versioning", "Semantic: major for identity changes, minor for new sections or assets, patch for corrections. PDF and site always state the same version."],
          ["Deprecation", "Superseded assets leave the library and are recorded in the changelog. Generation 1 (old greens, glass theme, mixed-case TacEdge) is deprecated."],
          ["Contractors", "Start with the style tile; this PDF is the contract; assets from Downloads only; anything uncovered is a question: info@tacedge.co.nz."],
        ]} />
        <h3>Accessibility standard</h3>
        <Rules items={[
          <>WCAG 2.1 AA minimum: 4.5:1 text, 3:1 large text and non-text UI, using the approved combinations table.</>,
          <>Semantic headings, keyboard support, visible focus (forest on light, cream on dark), meaningful alt text, decorative graphics hidden.</>,
          <>Respect reduced-motion. Touch targets 44px minimum. Text never lives only inside images. Layouts survive 200 percent zoom.</>,
        ]} />
      </>
    ),
  },
];

/* ------------------------------------------------------------- assembly */

const chapterList = [...new Set(sheets.map((s) => s.chapter))];

export default function PrintDoc() {
  // Page numbers: cover = 1, contents = 2, first content sheet = 3.
  const startPage = 3;
  const chapterStart = (ch: string) => startPage + sheets.findIndex((s) => s.chapter === ch);
  const total = sheets.length + 3;

  return (
    <>
      {/* Cover */}
      <section className="sheet sheet--dark" style={{ justifyContent: "space-between" }}>
        <Contour />
        <img src={`${L}/horizontal/tacedge-lockup-cream.svg`} alt="TACEDGE" style={{ height: "11mm", width: "auto", alignSelf: "flex-start", position: "relative" }} />
        <div style={{ position: "relative" }}>
          <p style={{ fontFamily: "var(--te-display)", fontWeight: 700, fontSize: "52pt", lineHeight: 1.04, color: "var(--te-cream)" }}>Shared<br />Clarity.</p>
          <p style={{ color: "var(--te-sage)", fontWeight: 600, fontSize: "11pt", marginTop: "6mm" }}>{brand.category}</p>
        </div>
        <div style={{ position: "relative", borderTop: "0.3mm solid var(--te-cream-line)", paddingTop: "5mm", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <p style={{ fontFamily: "var(--te-mono)", fontSize: "8pt", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--te-sage)" }}>
            Brand Identity &amp; Guidelines — Version {VERSION}
          </p>
          <p style={{ fontFamily: "var(--te-mono)", fontSize: "8pt", color: "var(--te-sage)" }}>{LAST_UPDATED}</p>
        </div>
      </section>

      {/* Contents */}
      <section className="sheet">
        <div className="sheet__head"><span>TACEDGE Brand Identity &amp; Guidelines</span><span>v{VERSION}</span></div>
        <h2 className="chapter">Contents</h2>
        <p className="lead">The authoritative source of truth for the TACEDGE brand. The interactive edition lives in the brand repository; this document is its printable twin.</p>
        <table className="p-table" style={{ maxWidth: "150mm" }}>
          <tbody>
            {chapterList.map((ch) => (
              <tr key={ch}>
                <td style={{ fontFamily: "var(--te-mono)", fontWeight: 500, whiteSpace: "nowrap" }}>{ch.split(" · ")[0]}</td>
                <td style={{ fontWeight: 600, color: "var(--te-ink)" }}>{ch.split(" · ")[1]}</td>
                <td style={{ textAlign: "right", fontFamily: "var(--te-mono)" }}>{chapterStart(ch)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="small" style={{ marginTop: "6mm", color: "var(--te-ink-40)" }}>
          Section 01 (Overview) of the interactive edition corresponds to this contents page. Open
          decisions are marked <strong>PROVISIONAL</strong> and catalogued in docs/decisions-required.md (D1 to D10).
        </p>
        <div className="sheet__foot"><span>TACEDGE · Brand Guidelines v{VERSION}</span><span>2 / {total}</span></div>
      </section>

      {/* Content sheets */}
      {sheets.map((s, i) => (
        <section key={i} className={`sheet${s.dark ? " sheet--dark" : ""}`}>
          <div className="sheet__head"><span>{s.chapter}</span><span>v{VERSION}</span></div>
          {s.title && <h2 className="chapter">{s.title}</h2>}
          <div style={{ flex: 1, minHeight: 0, marginTop: s.title ? "4mm" : 0 }}>{s.body}</div>
          <div className="sheet__foot"><span>TACEDGE · Brand Guidelines v{VERSION}</span><span>{startPage + i} / {total}</span></div>
        </section>
      ))}

      {/* Back cover */}
      <section className="sheet sheet--dark" style={{ justifyContent: "space-between" }}>
        <Contour />
        <div />
        <div style={{ position: "relative", display: "grid", justifyItems: "center", gap: "8mm" }}>
          <img src={`${L}/brandmark/tacedge-brandmark-sage.svg`} alt="TACEDGE brandmark" style={{ width: "26mm" }} />
          <p style={{ color: "var(--te-sage-tint)", fontSize: "10pt", textAlign: "center", maxWidth: "100mm" }}>
            Shared clarity for ground-engineering delivery.
          </p>
        </div>
        <div style={{ position: "relative", textAlign: "center", fontFamily: "var(--te-mono)", fontSize: "7.5pt", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--te-sage)" }}>
          TACEDGE Limited · info@tacedge.co.nz · tacedge.co.nz · New Zealand
        </div>
      </section>
    </>
  );
}
