import { useEffect, useState, type ComponentType } from "react";
import { sections, VERSION, LAST_UPDATED, type Slug } from "./content/site";
import Overview from "./pages/Overview";
import Foundations from "./pages/Foundations";
import Messaging from "./pages/Messaging";
import Logo from "./pages/Logo";
import Colour from "./pages/Colour";
import Typography from "./pages/Typography";
import Layout from "./pages/Layout";
import Iconography from "./pages/Iconography";
import GraphicLanguage from "./pages/GraphicLanguage";
import Photography from "./pages/Photography";
import ProductImagery from "./pages/ProductImagery";
import DigitalUI from "./pages/DigitalUI";
import Applications from "./pages/Applications";
import Downloads from "./pages/Downloads";
import Governance from "./pages/Governance";

const pages: Record<Slug, ComponentType> = {
  overview: Overview,
  foundations: Foundations,
  messaging: Messaging,
  logo: Logo,
  colour: Colour,
  typography: Typography,
  layout: Layout,
  iconography: Iconography,
  "graphic-language": GraphicLanguage,
  photography: Photography,
  "product-imagery": ProductImagery,
  "digital-ui": DigitalUI,
  applications: Applications,
  downloads: Downloads,
  governance: Governance,
};

function currentSlug(): Slug {
  const hash = window.location.hash.replace(/^#\/?/, "");
  return (sections.some((s) => s.slug === hash) ? hash : "overview") as Slug;
}

export default function App() {
  const [slug, setSlug] = useState<Slug>(currentSlug);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onHash = () => {
      setSlug(currentSlug());
      setMenuOpen(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const section = sections.find((s) => s.slug === slug);
    document.title = `${section?.label ?? "Overview"} · TACEDGE Brand Guidelines v${VERSION}`;
  }, [slug]);

  const Page = pages[slug];
  const index = sections.findIndex((s) => s.slug === slug);
  const prev = sections[index - 1];
  const next = sections[index + 1];

  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <button
        type="button"
        className="menu-btn"
        aria-expanded={menuOpen}
        aria-controls="site-nav"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M2 4h12M2 8h12M2 12h12" />
        </svg>
        Contents
      </button>
      {menuOpen && <button type="button" className="scrim" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
      <div className="shell">
        <aside className={`sidebar on-dark${menuOpen ? " open" : ""}`}>
          <div className="sidebar__head">
            <a href="#/overview" aria-label="TACEDGE Brand Guidelines home">
              <img src="/assets/logos/horizontal/tacedge-lockup-cream.svg" alt="TACEDGE" width={182} height={36} />
            </a>
            <p className="sidebar__version">Brand Guidelines · v{VERSION}</p>
          </div>
          <nav id="site-nav" aria-label="Guideline sections">
            {sections.map((s) => (
              <a key={s.slug} href={`#/${s.slug}`} aria-current={s.slug === slug ? "page" : undefined}>
                <span className="num" aria-hidden="true">{s.num}</span>
                {s.label}
              </a>
            ))}
          </nav>
          <div className="sidebar__foot">
            Version {VERSION} · {LAST_UPDATED}
            <br />
            <a href="/exports/TACEDGE_Brand_Identity_and_Guidelines_v1.0.pdf" download>
              Download the PDF edition
            </a>
          </div>
        </aside>
        <main id="content">
          <div className="page">
            <Page />
            <footer className="page-footer">
              <nav aria-label="Section pager">
                {prev && <a href={`#/${prev.slug}`}>← {prev.label}</a>}
                {next && <a href={`#/${next.slug}`}>{next.label} →</a>}
              </nav>
              <span>TACEDGE Brand Identity &amp; Guidelines · v{VERSION} · {LAST_UPDATED}</span>
            </footer>
          </div>
        </main>
      </div>
    </>
  );
}
