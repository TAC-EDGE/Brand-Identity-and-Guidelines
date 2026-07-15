import { contourPaths } from "../content/contour-paths";
import { brand, proposition, productModel, tone } from "../content/messaging";
import { VERSION, LAST_UPDATED } from "../content/site";

const swatches = [
  ["Primary Dark", "#112411", "dark"],
  ["Warm Cream", "#F7F5EC", "light"],
  ["Pale Sage", "#B2B594", "light"],
  ["Sage Tint", "#E6EBD9", "light"],
  ["Utility Sage", "#6E7D5C", "dark"],
  ["Primary Text", "#242A1F", "dark"],
] as const;

/** One-page A4 landscape style tile for rapidly briefing a contractor or supplier. */
export default function StyleTile() {
  return (
    <section className="tile">
      {/* Header band */}
      <header className="tile__head">
        <svg className="contour" viewBox="0 0 1600 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {contourPaths.map((d, i) => <path key={i} d={d} />)}
        </svg>
        <img src="assets/logos/horizontal/tacedge-lockup-cream.svg" alt="TACEDGE" style={{ height: "9mm", width: "auto", position: "relative" }} />
        <div style={{ position: "relative" }}>
          <p style={{ fontFamily: "var(--te-display)", fontWeight: 700, fontSize: "24pt", lineHeight: 1.02, color: "var(--te-cream)" }}>Shared Clarity.</p>
          <p style={{ color: "var(--te-sage)", fontWeight: 600, fontSize: "8pt", marginTop: "1.5mm" }}>{brand.category}</p>
        </div>
        <p style={{ position: "relative", fontFamily: "var(--te-mono)", fontSize: "6.5pt", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--te-sage)", textAlign: "right" }}>
          Style Tile v{VERSION}<br />{LAST_UPDATED}
        </p>
      </header>

      <div className="tile__grid">
        {/* Colour */}
        <div className="tile__cell" style={{ gridColumn: "span 4" }}>
          <span className="tile__label">Colour</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "1.5mm" }}>
            {swatches.map(([name, hex]) => (
              <div key={hex}>
                <div style={{ height: "10mm", background: hex, borderRadius: "1.5mm", border: "0.2mm solid var(--te-line)" }} />
                <p style={{ fontSize: "5.8pt", fontWeight: 600, marginTop: "1mm" }}>{name}</p>
                <p style={{ fontFamily: "var(--te-mono)", fontSize: "5.5pt", color: "var(--te-ink-60)" }}>{hex}</p>
              </div>
            ))}
          </div>
          <p className="tile__note">Status ochre #B07D2B and brick #9E3B2E are product-UI only. Never decorative. Do not add colours.</p>
        </div>

        {/* Typography */}
        <div className="tile__cell" style={{ gridColumn: "span 4" }}>
          <span className="tile__label">Typography</span>
          <p style={{ fontFamily: "var(--te-display)", fontWeight: 700, fontSize: "13pt", lineHeight: 1.1 }}>Play 700 for headlines.</p>
          <p style={{ fontSize: "7.5pt", color: "var(--te-ink-60)", marginTop: "1.5mm" }}>Be Vietnam Pro for body copy: plain, direct, operational. The fewest words required.</p>
          <p style={{ fontFamily: "var(--te-mono)", fontSize: "6pt", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--te-ink-40)", marginTop: "2mm" }}>JetBrains Mono · Utility labels</p>
        </div>

        {/* Logo */}
        <div className="tile__cell" style={{ gridColumn: "span 4" }}>
          <span className="tile__label">Logo</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5mm", alignItems: "stretch" }}>
            <div style={{ background: "var(--te-forest)", borderRadius: "2mm", display: "flex", alignItems: "center", justifyContent: "center", padding: "4mm" }}>
              <img src="assets/logos/horizontal/tacedge-lockup-cream.svg" alt="Cream lockup on forest" style={{ height: "6mm" }} />
            </div>
            <div style={{ background: "var(--te-card)", border: "0.2mm solid var(--te-line)", borderRadius: "2mm", display: "flex", alignItems: "center", justifyContent: "center", padding: "4mm" }}>
              <img src="assets/logos/horizontal/tacedge-lockup-forest.svg" alt="Forest lockup on white" style={{ height: "6mm" }} />
            </div>
          </div>
          <p className="tile__note">Master SVGs only. Never redraw. Clear space: one brandmark height. Minimum width 30 mm print / 120 px digital.</p>
        </div>

        {/* Workflow + UI */}
        <div className="tile__cell" style={{ gridColumn: "span 4" }}>
          <span className="tile__label">Workflow · {productModel.short}</span>
          <div style={{ display: "flex", gap: "1.5mm", alignItems: "center" }}>
            {["Configured", "Captured", "Confirmed"].map((s, i) => (
              <span key={s} style={{
                flex: 1, textAlign: "center", padding: "2.2mm 1mm", borderRadius: "2mm",
                border: "0.25mm solid var(--te-olive-edge)", fontWeight: 700, fontSize: "6.5pt",
                background: i === 2 ? "var(--te-forest)" : "var(--te-card)",
                color: i === 2 ? "var(--te-cream)" : "var(--te-forest)",
              }}>{s}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: "1.5mm", marginTop: "2mm" }}>
            <span style={{ background: "var(--te-forest)", color: "var(--te-cream)", borderRadius: "2mm", padding: "2mm 3.5mm", fontWeight: 600, fontSize: "6.5pt" }}>Arrange a demonstration</span>
            <span style={{ background: "var(--te-card)", border: "0.25mm solid var(--te-line-2)", borderRadius: "2mm", padding: "2mm 3.5mm", fontWeight: 600, fontSize: "6.5pt" }}>See the workflow</span>
            <span style={{ background: "var(--te-sage-tint)", color: "var(--te-forest)", borderRadius: "99mm", padding: "2mm 3mm", fontFamily: "var(--te-mono)", fontSize: "5.5pt", letterSpacing: ".08em", textTransform: "uppercase" }}>Drilling</span>
          </div>
          <p className="tile__note">Buttons: 48px, 12px radius. Cards: white, hairline border, one soft shadow. Forest fill = confirmed.</p>
        </div>

        {/* Photography */}
        <div className="tile__cell" style={{ gridColumn: "span 4" }}>
          <span className="tile__label">Photography</span>
          <img src="assets/photography/photo-capture-abseil.webp" alt="Documentary field photography: operator on ropes recording a drill log" style={{ width: "100%", aspectRatio: "8/5", objectFit: "cover", borderRadius: "2mm" }} />
          <p className="tile__note">Real crews, real ground, natural light. Documentary, never staged.</p>
        </div>

        {/* Product */}
        <div className="tile__cell" style={{ gridColumn: "span 4" }}>
          <span className="tile__label">Product imagery</span>
          <div style={{ background: "var(--te-stage)", borderRadius: "2mm", padding: "3mm" }}>
            <div style={{ background: "#262b25", borderRadius: "1.8mm", padding: "1.5mm 1.2mm 1.2mm" }}>
              <img src="assets/product-imagery/tacedge-qa-queue-desktop.webp" alt="Real TACEDGE QA queue screen in a graphite frame" style={{ width: "100%", borderRadius: "0.8mm", display: "block" }} />
            </div>
          </div>
          <p className="tile__note">Real screens in graphite frames on Stage. No invention, no distortion.</p>
        </div>

        {/* Pattern */}
        <div className="tile__cell" style={{ gridColumn: "span 4" }}>
          <span className="tile__label">Graphic language</span>
          <div style={{ background: "var(--te-forest)", borderRadius: "2mm", height: "17mm", position: "relative", overflow: "hidden" }}>
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 1600 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              {contourPaths.map((d, i) => <path key={i} d={d} fill="none" stroke="#1B331A" strokeWidth="1.1" opacity="0.45" />)}
            </svg>
          </div>
          <p className="tile__note">Topographic contours: dark panels only, low opacity, never over body text.</p>
        </div>

        {/* Voice */}
        <div className="tile__cell" style={{ gridColumn: "span 8" }}>
          <span className="tile__label">Tone of voice</span>
          <p style={{ fontSize: "7pt", fontWeight: 600 }}>{proposition.lines.join(" ")}</p>
          <p style={{ fontSize: "6.5pt", color: "var(--te-ink-60)", marginTop: "1.5mm" }}>{proposition.tagline}</p>
          <p className="tile__note">{tone.centralRule} No “revolutionary”, no “cutting-edge”, no unsupported claims. TACEDGE always uppercase.</p>
        </div>
      </div>

      <footer className="tile__foot">
        <span>TACEDGE · Brand Style Tile v{VERSION} · Full guidelines: exports/TACEDGE_Brand_Identity_and_Guidelines_v1.0.pdf</span>
        <span>info@tacedge.co.nz · tacedge.co.nz · New Zealand</span>
      </footer>
    </section>
  );
}
