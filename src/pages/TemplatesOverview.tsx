import { PageHero, Section, RuleList } from "../components/ui";
import { TemplateCard } from "../components/templates-ui";
import { manifest, guides } from "../content/templates";

export default function TemplatesOverview() {
  const slugFor = (id: string) => guides.find((g) => g.id === id)?.slug ?? "templates";
  const primary = manifest.filter((t) => t.status === "approved");
  const rest = manifest.filter((t) => t.status !== "approved" && t.status !== "deprecated");
  const deprecated = manifest.filter((t) => t.status === "deprecated");

  return (
    <>
      <PageHero
        eyebrow="16 · Templates"
        title="Approved starting points for consistent TACEDGE communication."
        lead="Use these templates rather than creating documents from a blank file. Each template applies the approved TACEDGE typography, spacing, colour, logo and information hierarchy."
      />

      {primary.length > 0 && (
        <Section title="Approved templates" sub="Signed off by a founder. Use freely within each template's rules.">
          <div className="grid grid--2">
            {primary.map((t) => <TemplateCard key={t.id} t={t} slug={slugFor(t.id)} />)}
          </div>
        </Section>
      )}

      <Section
        title={primary.length ? "Provisional templates" : "Template library"}
        sub="Version 1.0 of every template awaits founder sign-off (decisions-required D10). Provisional templates are usable; expect refinements before they are marked Approved."
      >
        <div className="grid grid--2">
          {rest.map((t) => <TemplateCard key={t.id} t={t} slug={slugFor(t.id)} />)}
        </div>
      </Section>

      {deprecated.length > 0 && (
        <Section title="Deprecated" sub="Do not use. Retained for the record only.">
          <div className="grid grid--2">
            {deprecated.map((t) => <TemplateCard key={t.id} t={t} slug={slugFor(t.id)} />)}
          </div>
        </Section>
      )}

      <Section title="How the template system works">
        <RuleList
          items={[
            <><strong>The exported files are the product.</strong> Every preview in this app is rendered from the actual editable file, never a mock-up.</>,
            <><strong>Filename convention:</strong> <code>TACEDGE_[Template_Name]_v[1.0].[ext]</code>; customer copies add <code>[Customer]_[YYYY-MM-DD]</code> and live outside this repository.</>,
            <><strong>Versions and status</strong> live in <code>templates/manifest.json</code>. Only approved templates appear as primary downloads; provisional templates carry the amber badge.</>,
            <><strong>Fonts are not distributed.</strong> Install Play, Be Vietnam Pro and JetBrains Mono from Google Fonts; office files fall back to Arial and Consolas.</>,
            <><strong>Placeholders</strong> appear in [brackets] and, in documents, in olive. Replace every one before releasing an artefact. No lorem ipsum, ever.</>,
          ]}
        />
      </Section>
    </>
  );
}
