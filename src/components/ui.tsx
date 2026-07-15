import { useState, type ReactNode } from "react";

/** Section with anchor, heading and optional intro. */
export function Section({ id, title, sub, children }: { id?: string; title: string; sub?: string; children?: ReactNode }) {
  return (
    <section className="section" id={id} aria-label={title}>
      <h2>{title}</h2>
      {sub && <p className="sub">{sub}</p>}
      {children}
    </section>
  );
}

export function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <header className="page-hero">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p className="lead">{lead}</p>
    </header>
  );
}

/** Click-to-copy chip. Announces the copied value to screen readers. */
export function CopyChip({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="copychip"
      data-copied={copied || undefined}
      onClick={() => {
        navigator.clipboard?.writeText(value).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        });
      }}
      aria-label={`Copy ${label ?? value}`}
    >
      {copied ? "Copied" : (label ?? value)}
    </button>
  );
}

export function RuleList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="rule-list">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

const TickIcon = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2.5 8.5l3.5 3.5 7.5-8" />
  </svg>
);
const CrossIcon = (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M3 3l10 10M13 3L3 13" />
  </svg>
);

export function DoDont({ items }: { items: { kind: "do" | "dont"; stage: ReactNode; caption: string; stageStyle?: React.CSSProperties }[] }) {
  return (
    <div className="dodont">
      {items.map((item, i) => (
        <figure key={i} className={`dodont__item dodont__item--${item.kind}`} style={{ margin: 0 }}>
          <div className="dodont__stage" style={item.stageStyle}>{item.stage}</div>
          <figcaption className="dodont__body">
            <span className="dodont__tag">
              {item.kind === "do" ? TickIcon : CrossIcon}
              {item.kind === "do" ? "Do" : "Don't"}
            </span>
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function Flag({ children }: { children: ReactNode }) {
  return (
    <p className="flag">
      <b>Provisional</b> {children}
    </p>
  );
}

export function TokenTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="ttable-wrap">
      <table className="ttable">
        <thead>
          <tr>{head.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DownloadCard({ href, name, meta, preview, previewBg }: { href: string; name: string; meta: string; preview?: string; previewBg?: string }) {
  return (
    <a className="card dl" href={href} download>
      <span className="dl__preview" style={{ background: previewBg ?? "var(--te-cream)" }} aria-hidden="true">
        {preview && <img src={preview} alt="" loading="lazy" />}
      </span>
      <span>
        <span className="dl__name">{name}</span>
        <span className="dl__meta" style={{ display: "block" }}>{meta}</span>
      </span>
    </a>
  );
}
