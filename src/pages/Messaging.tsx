import { PageHero, Section, RuleList, TokenTable, DoDont } from "../components/ui";
import {
  tone, goodWriting, headlines, ctas, hierarchy, terminology,
  elevator, boilerplate, founderDescription, productDescription,
} from "../content/messaging";

export default function Messaging() {
  return (
    <>
      <PageHero
        eyebrow="03 · Messaging"
        title="Use the fewest words required."
        lead="The TACEDGE voice is plain, direct and operational. It is credible to crews, project managers, engineers and executives because it says only what is true, in language they already use."
      />

      <Section title="The central rule">
        <div className="panel">
          <p style={{ fontFamily: "var(--te-display)", fontWeight: 700, fontSize: "var(--te-fs-xl)", color: "var(--te-forest)", maxWidth: "24ch", lineHeight: 1.3 }}>
            {tone.centralRule}
          </p>
        </div>
        <div className="grid grid--2" style={{ marginTop: 20 }}>
          <div className="card card--pad">
            <span className="eyebrow">Prefer</span>
            <p style={{ color: "var(--te-ink-60)" }}>{tone.prefer.join(" · ")}</p>
          </div>
          <div className="card card--pad">
            <span className="eyebrow" style={{ color: "var(--te-brick)" }}>Avoid</span>
            <p style={{ color: "var(--te-ink-60)" }}>{tone.avoid.join(" · ")}</p>
          </div>
        </div>
        <p className="flag" style={{ background: "var(--te-sage-tint)", borderColor: "var(--te-olive-line)", color: "var(--te-forest)" }}>
          <b style={{ color: "var(--te-forest)" }}>Claims</b> {tone.claims}
        </p>
      </Section>

      <Section title="Message hierarchy" sub="Six levels. Every brand document opens somewhere on this ladder and descends in order.">
        <TokenTable
          head={["Level", "Approved copy", "Use"]}
          rows={hierarchy.map((h) => [h.level, <strong key={h.level}>{h.copy}</strong>, h.use])}
        />
      </Section>

      <Section title="Approved long-form copy" sub="Use verbatim. Shorten only by cutting whole sentences.">
        <div className="grid" style={{ gap: 16 }}>
          {[
            ["Elevator description", elevator],
            ["Company boilerplate", boilerplate],
            ["Founder description", founderDescription],
            ["Product description", productDescription],
          ].map(([label, copy]) => (
            <div key={label} className="card card--pad">
              <span className="eyebrow">{label}</span>
              <p style={{ color: "var(--te-ink-60)", maxWidth: "70ch" }}>{copy}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Good and poor TACEDGE writing">
        {goodWriting.map((ex) => (
          <DoDont
            key={ex.good}
            items={[
              { kind: "do", stage: <p style={{ fontWeight: 600, color: "var(--te-ink)", textAlign: "center" }}>{ex.good}</p>, caption: ex.why },
              { kind: "dont", stage: <p style={{ color: "var(--te-ink-60)", textAlign: "center" }}>{ex.poor}</p>, caption: "Inflated, vague, or claims nothing verifiable." },
            ]}
          />
        ))}
      </Section>

      <Section title="Headlines">
        <RuleList items={headlines.rules} />
        <div className="card card--pad" style={{ marginTop: 20 }}>
          <span className="eyebrow">Approved examples</span>
          <div style={{ display: "grid", gap: 10 }}>
            {headlines.examples.map((h) => (
              <p key={h} style={{ fontFamily: "var(--te-display)", fontWeight: 700, fontSize: "var(--te-fs-xl)", lineHeight: 1.2 }}>{h}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Calls to action">
        <RuleList items={ctas.rules} />
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
          <span className="btn btn--primary">{ctas.primary}</span>
          <span className="btn btn--secondary">{ctas.secondary}</span>
        </div>
      </Section>

      <Section title="Terminology" sub="Approved terms. Consistent language is part of shared clarity.">
        <TokenTable
          head={["Term", "Rule"]}
          rows={terminology.map((t) => [t.term, t.rule])}
        />
      </Section>
    </>
  );
}
