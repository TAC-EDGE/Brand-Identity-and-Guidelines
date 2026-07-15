import { PageHero, Section, RuleList, TokenTable } from "../components/ui";
import { brand, origin, positioning, personality, productModel } from "../content/messaging";

export default function Foundations() {
  return (
    <>
      <PageHero
        eyebrow="02 · Foundations"
        title="What TACEDGE is, and why it exists."
        lead="The fixed points of the brand. Everything else in this system is built on these."
      />

      <Section title="Name">
        <RuleList
          items={[
            <><strong>TACEDGE</strong> is always written in uppercase in normal written use.</>,
            <>Never write <strong>TacEdge</strong>, <strong>Tacedge</strong>, <strong>TechEdge</strong> or <strong>Tech Edge</strong>.</>,
            <>The legal company name may appear as <strong>TACEDGE Limited</strong> where required.</>,
          ]}
        />
      </Section>

      <Section title="Promise" sub="The brand promise is the hero statement of the brand.">
        <div className="panel--dark on-dark" style={{ padding: "44px 36px" }}>
          <p style={{ fontFamily: "var(--te-display)", fontWeight: 700, fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.05, color: "var(--te-cream)" }}>
            Shared<br />Clarity.
          </p>
          <p style={{ color: "var(--te-sage)", fontWeight: 600, marginTop: 16 }}>{brand.category}</p>
        </div>
        <RuleList
          items={[
            <>The full stop is part of the primary hero treatment. Retain it unless a specific application makes punctuation inappropriate.</>,
            <>The category line <strong>“For ground-engineering delivery.”</strong> anchors the promise to the market. Pair them wherever the promise leads.</>,
          ]}
        />
      </Section>

      <Section title="Mission and vision">
        <TokenTable
          head={["", "Statement"]}
          rows={[
            ["Mission", <strong key="m">{brand.mission}</strong>],
            ["Vision", brand.vision],
            ["Positioning", brand.positioning],
            ["Core principle", brand.principle],
          ]}
        />
      </Section>

      <Section
        title="The product model"
        sub="Four movements, one connected record. The short form is the workflow spine used in headings and diagrams."
      >
        <div className="grid grid--4" style={{ marginTop: 8 }}>
          {productModel.long.map((line, i) => (
            <div key={line} className="card card--pad" style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <span className="marker" aria-hidden="true">{i + 1}</span>
              <span style={{ fontWeight: 600, fontSize: "var(--te-fs-md)" }}>{line}</span>
            </div>
          ))}
        </div>
        <p className="flag" style={{ background: "var(--te-sage-tint)", borderColor: "var(--te-olive-line)", color: "var(--te-forest)" }}>
          <b style={{ color: "var(--te-forest)" }}>Rule</b> {productModel.releaseRule} Diagrams show three stages: Configure, Capture, Confirm.
        </p>
      </Section>

      <Section title="Origin" sub="Where the idea came from, and how to tell it.">
        <div className="grid grid--2" style={{ alignItems: "center" }}>
          <div className="prose">
            <h3 style={{ fontSize: "var(--te-fs-xl)", color: "var(--te-ink)", marginBottom: 12 }}>{origin.heading}</h3>
            {origin.body.map((p) => <p key={p}>{p}</p>)}
            <p style={{ borderLeft: "2px solid var(--te-sage)", paddingLeft: 18, marginTop: 14, color: "var(--te-ink)" }}>{origin.missing}</p>
          </div>
          <figure style={{ margin: 0 }}>
            <img
              src="/assets/photography/photo-whakaari-peaks.webp"
              alt="Whakaari / White Island viewed from the water in 2019, with the TACEDGE brandmark peaks in front"
              style={{ borderRadius: "var(--te-r-img)", border: "1px solid var(--te-line)", display: "block", width: "100%" }}
            />
            <figcaption style={{ fontSize: "var(--te-fs-base)", color: "var(--te-ink-40)", marginTop: 10 }}>
              Whakaari / White Island, 2019
            </figcaption>
          </figure>
        </div>
        <RuleList
          items={[
            <><strong>{origin.rule}</strong></>,
            <>Name the event as “the 2019 Whakaari / White Island recovery operation”. Both names, in that order.</>,
            <>The origin explains the mission. It is never promotional material and never a claim of credit.</>,
          ]}
        />
      </Section>

      <Section title="What TACEDGE is" sub="Position the platform with these frames.">
        <div className="grid grid--2">
          <div className="card card--pad">
            <span className="eyebrow">TACEDGE is</span>
            <ul style={{ margin: 0, paddingLeft: 20, color: "var(--te-ink-60)", display: "grid", gap: 6 }}>
              {positioning.is.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
          <div className="card card--pad">
            <span className="eyebrow" style={{ color: "var(--te-brick)" }}>TACEDGE is not</span>
            <ul style={{ margin: 0, paddingLeft: 20, color: "var(--te-ink-60)", display: "grid", gap: 6 }}>
              {positioning.isNot.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Personality" sub={personality.belongsIn}>
        <div className="grid grid--2">
          <div className="card card--pad">
            <span className="eyebrow">TACEDGE is</span>
            <p style={{ color: "var(--te-ink-60)" }}>{personality.is.join(" · ")}</p>
          </div>
          <div className="card card--pad">
            <span className="eyebrow" style={{ color: "var(--te-brick)" }}>TACEDGE is not</span>
            <p style={{ color: "var(--te-ink-60)" }}>{personality.isNot.join(" · ")}</p>
          </div>
        </div>
      </Section>
    </>
  );
}
