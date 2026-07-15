import { PageHero, Section, RuleList, TokenTable, Flag } from "../components/ui";
import { contact } from "../content/messaging";

export default function Applications() {
  return (
    <>
      <PageHero
        eyebrow="13 · Applications"
        title="The brand at work."
        lead="How the system lands on paper, screens, vehicles and garments. Every application is one of three maturities: conceptual example, print-ready specification, or supplier-ready artwork."
      />

      <Section title="Reference applications" sub="Approved current work. Use these as the pattern for new material.">
        <div className="grid grid--2">
          <figure className="card" style={{ margin: 0, overflow: "hidden" }}>
            <img src="/assets/application-examples/business-card/TACEDGE_Business_Card_Mike_Coom_front.png" alt="TACEDGE business card front: cream lockup centred on forest" style={{ width: "100%", display: "block" }} loading="lazy" />
            <figcaption style={{ padding: "12px 16px", fontSize: "var(--te-fs-base)", color: "var(--te-ink-60)", borderTop: "1px solid var(--te-line)" }}>
              Business card front. 90 × 55 mm trim, 3 mm bleed. Forest field, cream lockup at 49 mm.
            </figcaption>
          </figure>
          <figure className="card" style={{ margin: 0, overflow: "hidden" }}>
            <img src="/assets/application-examples/business-card/TACEDGE_Business_Card_Mike_Coom_back.png" alt="TACEDGE business card back: contact details on cream with tonal brandmark bleeding off the right edge" style={{ width: "100%", display: "block" }} loading="lazy" />
            <figcaption style={{ padding: "12px 16px", fontSize: "var(--te-fs-base)", color: "var(--te-ink-60)", borderTop: "1px solid var(--te-line)" }}>
              Business card back. Cream field, contact block left, tonal brandmark bleeding off the edge.
            </figcaption>
          </figure>
        </div>
        <figure className="card" style={{ margin: "20px 0 0", overflow: "hidden" }}>
          <img src="/assets/application-examples/leave-behind/TACEDGE_Hunter_Civil_Leave_Behind_15_July_2026.png" alt="TACEDGE one-page A4 leave-behind for Hunter Civil: promise, problem, workflow spine, next step and QR panel" style={{ width: "100%", display: "block", maxHeight: 720, objectFit: "contain", background: "var(--te-tint)" }} loading="lazy" />
          <figcaption style={{ padding: "12px 16px", fontSize: "var(--te-fs-base)", color: "var(--te-ink-60)", borderTop: "1px solid var(--te-line)" }}>
            The Hunter Civil one-page leave-behind: the message hierarchy on one A4 page. Header, promise, problem, workflow spine, questions, next step, footer.
          </figcaption>
        </figure>
      </Section>

      <Section title="Application standards">
        <TokenTable
          head={["Application", "Standard", "Maturity"]}
          rows={[
            ["Website", "The marketing site is the reference implementation of this system (tacedge.co.nz)", "Production"],
            ["V2 product interface", "Product follows the Digital UI principles; migration of legacy tenant theming is scheduled (D5)", "Production / in migration"],
            ["Business cards", "90 × 55 mm, 3 mm bleed, forest front with cream lockup, cream back with contact block and brandmark bleed. Titles: Co-Founder (D2)", "Print-ready specification"],
            ["Leave-behinds", "A4, 12 to 13 mm margins, message hierarchy top to bottom, one QR panel, footer boilerplate", "Print-ready specification"],
            ["Reports and covers", "Cream body on the document grid; forest cover with cream lockup and contour motif; confirmed-record footer strip", "Print-ready specification"],
            ["Proposals", "Report styling with the leave-behind's next-step panel as the closing page", "Conceptual example"],
            ["Presentation decks", "Forest title and section slides with contour motif; cream content slides; one idea per slide; Play headings, Be Vietnam Pro body", "Conceptual example"],
            ["Email signature", "Name (600), role, TACEDGE in caps, phone, tacedge.co.nz; no logo images, no quotes, no banners", "Print-ready specification"],
            ["Letterhead", "A4 cream, forest lockup top left at 42 mm, address line in Muted Text footer", "Conceptual example"],
            ["Social graphics", "Flat brand surfaces, promise or one operational statement, lockup at minimum size; no gradients or stock imagery", "Conceptual example"],
            ["Vehicle branding", "Land Rover concept: Primary Dark wrap or panels, cream lockup on sides at 60 to 80 percent panel width, contour band optional on lower body", "Conceptual example (D8)"],
            ["Apparel", "Forest or ink garments; left-chest brandmark 70 to 90 mm or small lockup; no all-over prints", "Conceptual example (D8)"],
            ["Signage", "Flat brand surface, one lockup, doubled clear space at viewing distance", "Conceptual example (D8)"],
            ["App icon / favicon", "Supplied rounded-square tile only, exported at 16 to 512 px", "Production"],
          ]}
        />
        <Flag>
          Generated mockups are conceptual examples, not master production artwork, unless exact logo
          and design specifications are reproduced from the approved source assets. Physical
          applications proceed to supplier-ready artwork only with print-tested colour (D3).
        </Flag>
      </Section>

      <Section title="Contact block" sub="Approved general contact details for collateral.">
        <div className="grid grid--3">
          <div className="card card--pad">
            <span className="eyebrow">General</span>
            <p style={{ fontWeight: 600 }}>{contact.email}</p>
            <p style={{ color: "var(--te-ink-60)" }}>{contact.website}</p>
            <p style={{ color: "var(--te-ink-60)" }}>{contact.location}</p>
          </div>
          {contact.founders.map((f) => (
            <div key={f.name} className="card card--pad">
              <span className="eyebrow">Founder card example</span>
              <p style={{ fontWeight: 600 }}>{f.name}</p>
              <p style={{ color: "var(--te-ink-60)" }}>{f.role}</p>
              <p style={{ color: "var(--te-ink-60)" }}>{f.phone}</p>
              {f.email && <p style={{ color: "var(--te-ink-60)" }}>{f.email}</p>}
            </div>
          ))}
        </div>
        <RuleList
          items={[
            <>Founder details appear on business cards and direct collateral only. Do not expose personal details elsewhere.</>,
            <>Confirm exact approved email addresses before producing final business-card artwork (D2).</>,
            <>Web addresses are written without “www.”: <strong>tacedge.co.nz</strong>.</>,
          ]}
        />
      </Section>
    </>
  );
}
