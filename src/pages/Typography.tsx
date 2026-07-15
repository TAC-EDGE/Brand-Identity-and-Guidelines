import { PageHero, Section, TokenTable, RuleList } from "../components/ui";
import typo from "../../tokens/typography.json";

const specimens: { role: string; sample: string; style: React.CSSProperties }[] = [
  { role: "hero-h1", sample: "Shared Clarity.", style: { fontFamily: "var(--te-display)", fontWeight: 700, fontSize: "clamp(44px, 5.4vw, 76px)", lineHeight: 1.05, letterSpacing: "0.005em" } },
  { role: "section-h2", sample: "Field data becomes project overhead.", style: { fontFamily: "var(--te-display)", fontWeight: 700, fontSize: "var(--te-t-h2)", lineHeight: 1.08 } },
  { role: "callout-h3", sample: "Project managers should assure the work, not assemble the report.", style: { fontFamily: "var(--te-display)", fontWeight: 700, fontSize: "var(--te-t-h3)", lineHeight: 1.22, maxWidth: "22ch" } },
  { role: "card-title", sample: "Configure", style: { fontFamily: "var(--te-display)", fontWeight: 700, fontSize: "var(--te-t-card-title)" } },
  { role: "lead", sample: "One connected workflow from project setup to a confirmed record.", style: { fontSize: "var(--te-t-lead)", color: "var(--te-ink-60)", maxWidth: "48ch" } },
  { role: "body", sample: "Capture field activity in simple workflows with the project context already in place. The operator records once. The PM sees it live.", style: { fontSize: "var(--te-t-body)", color: "var(--te-ink-60)", maxWidth: "56ch" } },
  { role: "card-body", sample: "Define layout, sequence, testing and evidence before work reaches the field.", style: { fontSize: "var(--te-t-card-body)", color: "var(--te-ink-60)", maxWidth: "52ch" } },
  { role: "utility-label", sample: "The workflow", style: { fontFamily: "var(--te-mono)", fontWeight: 500, fontSize: "var(--te-t-label)", letterSpacing: "var(--te-track-label)", textTransform: "uppercase", color: "var(--te-ink-40)" } },
  { role: "caption", sample: "Whakaari / White Island, 2019", style: { fontSize: "var(--te-t-caption)", color: "var(--te-ink-40)" } },
  { role: "interface-label", sample: "Arrange a demonstration", style: { fontWeight: 600, fontSize: "var(--te-fs-md)" } },
  { role: "numerical-data", sample: "B12 · 18.5 m · 210 kN · PASS", style: { fontFamily: "var(--te-mono)", fontWeight: 500, fontSize: "var(--te-fs-md)", letterSpacing: "0.02em" } },
];

export default function Typography() {
  const roles = typo.roles as Record<string, { family: string; weight: number; size: string; lineHeight: number; letterSpacing: string; case: string; use: string; printMin: string }>;
  return (
    <>
      <PageHero
        eyebrow="06 · Typography"
        title="Decisive headlines. Readable body. Restrained monospace."
        lead="Three typefaces, three jobs. Play carries the brand's voice at display sizes. Be Vietnam Pro does the reading. JetBrains Mono marks utility: labels, references and data."
      />

      <Section title="Typefaces">
        <div className="grid grid--3">
          {[
            { name: "Play", role: "Display", weights: "400 · 700", sample: "AaBb 0123", family: "var(--te-display)", weight: 700 },
            { name: "Be Vietnam Pro", role: "UI and body", weights: "400 · 500 · 600 · 700", sample: "AaBb 0123", family: "var(--te-ui)", weight: 400 },
            { name: "JetBrains Mono", role: "Utility", weights: "400 · 500 · 700", sample: "AaBb 0123", family: "var(--te-mono)", weight: 500 },
          ].map((f) => (
            <div key={f.name} className="card card--pad">
              <p style={{ fontFamily: f.family, fontWeight: f.weight, fontSize: 44, lineHeight: 1.1 }}>{f.sample}</p>
              <p style={{ fontWeight: 700, marginTop: 14 }}>{f.name}</p>
              <p style={{ color: "var(--te-ink-60)", fontSize: "var(--te-fs-base)" }}>{f.role} · weights {f.weights}</p>
            </div>
          ))}
        </div>
        <RuleList
          items={[
            <>All three are Google Fonts under the SIL Open Font Licence 1.1. <strong>Self-host woff2 files in every property</strong>; never load from a CDN. Font files are not distributed with the brand assets: obtain them from Google Fonts.</>,
            <>System fallbacks: Play falls back to <code>system-ui, sans-serif</code>; Be Vietnam Pro to <code>system-ui, -apple-system, sans-serif</code>; JetBrains Mono to <code>ui-monospace, SFMono-Regular, monospace</code>.</>,
            <>Print uses the same families. Where a document system cannot embed them, substitute Arial (body) and keep Play for supplied artwork only.</>,
          ]}
        />
      </Section>

      <Section title="Type roles" sub="Every piece of TACEDGE text maps to one of these roles. Sizes are responsive: clamp() values scale between mobile and desktop.">
        {specimens.map((s) => {
          const r = roles[s.role];
          return (
            <div key={s.role} className="specimen">
              <div className="specimen__meta">
                {s.role}
                <br />{r.family} {r.weight} · {r.size}
                <br />lh {r.lineHeight} · ls {r.letterSpacing} · {r.case}
                <br />print min {r.printMin}
              </div>
              <p style={s.style}>{s.sample}</p>
            </div>
          );
        })}
        <TokenTable
          head={["Role", "Family / weight", "Size", "Line height", "Tracking", "Case", "Use"]}
          rows={Object.entries(roles).map(([name, r]) => [
            name, `${r.family} ${r.weight}`, r.size, String(r.lineHeight), r.letterSpacing, r.case, r.use,
          ])}
        />
      </Section>

      <Section title="Rules">
        <RuleList
          items={[
            <><strong>Do not overuse all caps.</strong> Uppercase belongs to the utility-label role and short chips only, always with 0.16em tracking in JetBrains Mono.</>,
            <>Headlines are sentence case with a full stop. Break headlines on meaning.</>,
            <>Body measure: 62ch maximum. Supporting copy 42 to 48ch.</>,
            <>Monospace is a utility voice for labels and data. Never set paragraphs in it.</>,
            <>Numerals in tables and readouts use JetBrains Mono with tabular alignment.</>,
          ]}
        />
      </Section>
    </>
  );
}
