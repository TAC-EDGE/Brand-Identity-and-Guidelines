import { PageHero, Section, RuleList, DoDont, DownloadCard, TokenTable, Flag } from "../components/ui";
import { StatusBadge, PreviewStrip } from "../components/templates-ui";
import { byId, guideBySlug } from "../content/templates";
import { sections } from "../content/site";

export default function TemplateDetail({ slug }: { slug: string }) {
  const guide = guideBySlug(slug)!;
  const t = byId(guide.id);
  const num = sections.find((s) => s.slug === slug)?.num ?? "";

  return (
    <>
      <PageHero eyebrow={`${num} · Templates`} title={t.name} lead={guide.purpose} />
      <p style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <StatusBadge status={t.status} />
        <span style={{ fontFamily: "var(--te-mono)", fontSize: "var(--te-fs-sm)", color: "var(--te-ink-40)" }}>
          {t.format} · v{t.version} · owner {t.owner} · updated {t.lastUpdated}
        </span>
      </p>
      {t.status === "provisional" && (
        <Flag>Usable now; awaiting founder sign-off before it is marked Approved (D10).</Flag>
      )}
      {guide.id === "legal" && (
        <p className="flag" style={{ background: "var(--te-brick-tint)", borderColor: "rgba(158,59,46,.3)", color: "var(--te-brick)" }}>
          <b style={{ color: "var(--te-brick)" }}>Note</b> Visual template only. Brand formatting does not replace legal review.
        </p>
      )}

      {t.previewPages > 0 && (
        <Section title="Preview" sub="Rendered from the actual editable file. Select a page to enlarge.">
          <PreviewStrip t={t} />
        </Section>
      )}

      <Section title="When to use it">
        <div className="grid grid--2">
          <div className="card card--pad">
            <span className="eyebrow">Use it for</span>
            <ul style={{ margin: 0, paddingLeft: 20, color: "var(--te-ink-60)", display: "grid", gap: 6 }}>
              {guide.useWhen.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
          <div className="card card--pad">
            <span className="eyebrow" style={{ color: "var(--te-brick)" }}>Not for</span>
            <ul style={{ margin: 0, paddingLeft: 20, color: "var(--te-ink-60)", display: "grid", gap: 6 }}>
              {guide.notWhen.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Structure">
        <TokenTable
          head={["Required sections", "Optional sections"]}
          rows={[[guide.required.join(" · "), guide.optional.join(" · ")]]}
        />
      </Section>

      <Section title="Content principles">
        <RuleList items={guide.principles} />
      </Section>

      <Section title="Visual rules">
        <RuleList items={guide.visualRules} />
      </Section>

      <Section title="Do and don't">
        <DoDont
          items={guide.dos.map((d) => ({
            kind: d.kind,
            stage: <p style={{ fontWeight: 600, textAlign: "center", color: d.kind === "do" ? "var(--te-ink)" : "var(--te-ink-60)", maxWidth: "30ch" }}>{d.text}</p>,
            caption: d.kind === "do" ? "The pattern to follow." : "The common failure this template exists to prevent.",
          }))}
        />
        <div className="card card--pad" style={{ marginTop: 20 }}>
          <span className="eyebrow" style={{ color: "var(--te-brick)" }}>Common mistakes</span>
          <ul style={{ margin: 0, paddingLeft: 20, color: "var(--te-ink-60)", display: "grid", gap: 6 }}>
            {guide.mistakes.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </div>
      </Section>

      <Section title="Downloads" sub="The editable source is the master. Exports and previews are regenerated, never edited.">
        <div className="grid grid--2">
          <DownloadCard href={t.downloadPath} name={`${t.name} — editable source`} meta={`${t.format} · v${t.version}`} />
          {t.previewPdf && <DownloadCard href={t.previewPdf} name={`${t.name} — PDF example`} meta="PDF · rendered from the source" />}
          {(guide.extraDownloads ?? []).map((d) => <DownloadCard key={d.href} href={d.href} name={d.name} meta={d.meta} />)}
        </div>
        <p style={{ marginTop: 16, fontSize: "var(--te-fs-base)", color: "var(--te-ink-40)" }}>
          Folder README with export guidance: <a href={`${t.sourcePath.split("/").slice(0, 2).join("/")}/README.md`} download style={{ color: "var(--te-ink-60)" }}>README.md</a> · {t.notes}
        </p>
      </Section>
    </>
  );
}
