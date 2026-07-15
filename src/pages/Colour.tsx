import { PageHero, Section, CopyChip, TokenTable, RuleList, Flag } from "../components/ui";
import { colours, groups, alphaTokens, contrastPairs } from "../content/colours";

function Swatch({ k }: { k: string }) {
  const c = colours.find((x) => x.key === k)!;
  const border = ["card-surface", "warm-cream", "quiet-tint", "warning-tint", "error-tint"].includes(k);
  return (
    <div className={`card swatch${c.status === "provisional" ? " swatch--provisional" : ""}`}>
      <div className="swatch__field" style={{ background: c.value, borderBottom: border ? "1px solid var(--te-line)" : "none" }} />
      <div className="swatch__body">
        <div className="swatch__name">{c.name}</div>
        <p className="swatch__role">{c.role.split(".")[0]}.</p>
        <div className="swatch__values">
          <CopyChip value={c.value} />
          <CopyChip value={`rgb(${c.rgb.join(", ")})`} label="RGB" />
          <CopyChip value={`hsl(${c.hsl[0]}, ${c.hsl[1]}%, ${c.hsl[2]}%)`} label="HSL" />
          <CopyChip value={`cmyk(${c.cmyk.join(", ")})`} label="CMYK" />
        </div>
      </div>
    </div>
  );
}

export default function Colour() {
  return (
    <>
      <PageHero
        eyebrow="05 · Colour"
        title="A limited, disciplined palette."
        lead="Forest green on warm cream is the brand. Everything else supports it: quiet green surfaces, warm hairlines, and two status colours that carry meaning in the product and are never decorative. Do not add colours."
      />

      {groups.map((g) => (
        <Section key={g.title} title={g.title} sub={g.note}>
          <div className="grid grid--swatch">
            {g.keys.map((k) => <Swatch key={k} k={k} />)}
          </div>
          {g.title === "Special-purpose" && (
            <Flag>
              Logo Forest #2B4721 exists only inside logo artwork on light grounds and the app-icon
              tile. Requires final approval: see decisions-required D1.
            </Flag>
          )}
        </Section>
      ))}

      <Section title="Alpha hairlines" sub="Translucent rules for lines that sit on coloured surfaces.">
        <TokenTable
          head={["Token", "Value", "Role"]}
          rows={alphaTokens.map((t) => [t.key, <CopyChip key={t.key} value={t.value} />, t.role])}
        />
      </Section>

      <Section
        title="Approved combinations and contrast"
        sub="Measured against WCAG 2.1. These are the approved text and surface pairings; combinations outside this table need a contrast check before use."
      >
        <TokenTable
          head={["Foreground", "Background", "Ratio", "Level", "Use"]}
          rows={contrastPairs.map((p) => [p.fg.split(" #")[0], p.bg.split(" #")[0], p.ratio, p.level, p.use])}
        />
        <RuleList
          items={[
            <><strong>Utility Sage</strong> (4.05:1 on cream) is for icons and large text only, never body copy.</>,
            <><strong>Warning ochre</strong> (3.61:1 on white) is for badges, icons and large labels; pair body copy with Primary Text on Warning Tint.</>,
            <>On dark surfaces, text is Warm Cream or Sage Tint; utility labels are Pale Sage. Focus outlines switch to cream.</>,
          ]}
        />
      </Section>

      <Section title="Using the palette">
        <RuleList
          items={[
            <><strong>Cream is the paper.</strong> Pages and documents start on Warm Cream; white belongs to cards and surfaces sitting on it.</>,
            <><strong>Forest is decisive.</strong> Use Primary Dark for full-bleed brand moments (headers, heroes, covers) and primary actions, not for tinting or borders.</>,
            <><strong>Green deepens with progress.</strong> The work-phase happy path darkens: sage-tint (planned) to olive-edged (active) to forest-filled (confirmed). Forest fill is reserved for terminal-positive states.</>,
            <><strong>Status is sacred.</strong> Ochre and brick only ever mean caution and alert. If a layout needs an accent, it needs a better layout, not a status colour.</>,
            <><strong>Print:</strong> all CMYK values are indicative conversions. Verify with the selected printer and stock before production (D3). No Pantone values are published until validated.</>,
          ]}
        />
      </Section>
    </>
  );
}
