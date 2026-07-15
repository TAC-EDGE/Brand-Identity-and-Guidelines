import { useState } from "react";
import type { ManifestEntry } from "../content/templates";
import { previews } from "../content/templates";

export function StatusBadge({ status }: { status: ManifestEntry["status"] }) {
  const label = { approved: "Approved", provisional: "Provisional", "in-development": "In development", deprecated: "Deprecated" }[status];
  return <span className={`tstatus tstatus--${status}`}>{label}</span>;
}

/** Card on the Templates overview. */
export function TemplateCard({ t, slug }: { t: ManifestEntry; slug: string }) {
  const imgs = previews(t);
  return (
    <article className="card tcard">
      <a href={`#/${slug}`} className="tcard__preview" aria-label={`${t.name} guidance`}>
        {imgs[0] ? (
          <img src={imgs[0]} alt={`${t.name} preview`} loading="lazy" />
        ) : (
          <span className="tcard__noimg" aria-hidden="true">TACEDGE</span>
        )}
      </a>
      <div className="tcard__body">
        <div className="tcard__head">
          <h3>{t.name}</h3>
          <StatusBadge status={t.status} />
        </div>
        <p className="tcard__purpose">{t.intendedUse}</p>
        <p className="tcard__meta">{t.format} · v{t.version} · updated {t.lastUpdated}</p>
        <div className="tcard__actions">
          <a className="btn btn--primary" style={{ minHeight: 40, padding: "8px 18px", fontSize: "var(--te-fs-base)" }} href={t.downloadPath} download>
            Download {t.format.split(" ")[0]}
          </a>
          <a className="btn btn--ghost" style={{ minHeight: 40, padding: "8px 10px", fontSize: "var(--te-fs-base)" }} href={`#/${slug}`}>
            Usage guidance →
          </a>
        </div>
      </div>
    </article>
  );
}

/** Page/slide preview strip with an enlarging viewer. */
export function PreviewStrip({ t }: { t: ManifestEntry }) {
  const imgs = previews(t);
  const [open, setOpen] = useState<number | null>(null);
  if (!imgs.length) return null;
  return (
    <>
      <div className="pstrip" role="list" aria-label={`${t.name} page previews`}>
        {imgs.map((src, i) => (
          <button key={src} type="button" role="listitem" className="pstrip__item" onClick={() => setOpen(i)} aria-label={`Open preview page ${i + 1} of ${imgs.length}`}>
            <img src={src} alt={`${t.name} page ${i + 1}`} loading="lazy" />
            <span className="pstrip__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>
      {open !== null && (
        <div className="pviewer" role="dialog" aria-modal="true" aria-label={`${t.name} preview, page ${open + 1}`}>
          <button type="button" className="pviewer__scrim" aria-label="Close preview" onClick={() => setOpen(null)} />
          <figure className="pviewer__body">
            <img src={imgs[open]} alt={`${t.name} page ${open + 1} enlarged`} />
            <figcaption>
              <button type="button" className="btn btn--secondary" disabled={open === 0} onClick={() => setOpen(open - 1)}>← Prev</button>
              <span>{open + 1} / {imgs.length}</span>
              <button type="button" className="btn btn--secondary" disabled={open === imgs.length - 1} onClick={() => setOpen(open + 1)}>Next →</button>
              <button type="button" className="btn btn--primary" onClick={() => setOpen(null)}>Close</button>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
