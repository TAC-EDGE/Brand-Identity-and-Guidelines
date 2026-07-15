import { PageHero, Section, RuleList, TokenTable } from "../components/ui";
import { VERSION, LAST_UPDATED } from "../content/site";

export default function Governance() {
  return (
    <>
      <PageHero
        eyebrow="15 · Governance"
        title="How the brand stays coherent."
        lead="This repository is the authoritative source of truth. The website, product interfaces, documents and physical applications follow it, in that order."
      />

      <Section title="Authority">
        <div className="panel" style={{ fontFamily: "var(--te-mono)", fontSize: "var(--te-fs-md)", lineHeight: 2 }}>
          TACEDGE Brand System<br />
          <span aria-hidden="true">&nbsp;&nbsp;↓&nbsp;</span> Website<br />
          <span aria-hidden="true">&nbsp;&nbsp;↓&nbsp;</span> Product interfaces<br />
          <span aria-hidden="true">&nbsp;&nbsp;↓&nbsp;</span> Documents and physical applications
        </div>
        <RuleList
          items={[
            <>The connected website and V2 prototype repositories are <strong>read-only references</strong> for this system. They consume it; they do not define it.</>,
            <>Where an implementation disagrees with this system, the implementation is wrong or the system needs a governed change. Never both silently.</>,
          ]}
        />
      </Section>

      <Section title="Change control">
        <TokenTable
          head={["Aspect", "Rule"]}
          rows={[
            ["Approval", "Brand changes are approved by the TACEDGE founders (Mike Coom, Dan McPherson). No exceptions for colour, logo, promise or terminology."],
            ["Asset status", "Every asset is approved or provisional in the asset manifest. Provisional assets carry a decision reference (D1 to D8)."],
            ["Becoming approved", "An asset becomes approved when a founder signs it off and the manifest, changelog and (where relevant) the guidelines are updated in one change."],
            ["Versioning", "Semantic: major for visual identity changes, minor for new sections or assets, patch for corrections. The PDF and site always state the same version."],
            ["Deprecation", "Superseded assets leave the library and are recorded in the changelog. Generation 1 assets (old greens, glass theme, mixed-case TacEdge) are already deprecated."],
            ["Alignment", "The interactive site and the PDF edition are exported from the same source and must never disagree. Re-export the PDF with every content change."],
          ]}
        />
      </Section>

      <Section title="For external contractors">
        <RuleList
          items={[
            <>Start with the <a href="/exports/TACEDGE_Style_Tile_v1.0.pdf" download>style tile</a>; the PDF edition is the full contract.</>,
            <>Use only assets from the Downloads section, at the sizes and clear space specified.</>,
            <>CMYK values are indicative: verify on stock with the selected printer before production.</>,
            <>Anything not covered here is a question, not a licence: <strong>info@tacedge.co.nz</strong>.</>,
          ]}
        />
      </Section>

      <Section title="Accessibility standards" sub="TACEDGE's own standard for anything carrying the brand.">
        <RuleList
          items={[
            <>WCAG 2.1 AA minimum: 4.5:1 for text, 3:1 for large text and non-text UI. Use the approved combinations table in the Colour section.</>,
            <>Semantic headings in order; one H1 per page or document.</>,
            <>Full keyboard support with visible focus (2px forest outline on light, cream on dark).</>,
            <>Meaningful alt text on all informative imagery; decorative graphics hidden from assistive technology.</>,
            <>Respect prefers-reduced-motion; nothing meaningful conveyed by motion alone.</>,
            <>Touch targets 44px minimum; text never embedded only inside images; layouts survive 200 percent zoom.</>,
            <>Downloads clearly labelled with format and purpose.</>,
          ]}
        />
      </Section>

      <Section title="Version">
        <TokenTable
          head={["", ""]}
          rows={[
            ["Version", `${VERSION} — first authoritative release`],
            ["Last updated", LAST_UPDATED],
            ["Open decisions", "Eight, catalogued in docs/decisions-required.md (D1 to D8)"],
            ["Changelog", "CHANGELOG.md at the repository root"],
          ]}
        />
      </Section>
    </>
  );
}
