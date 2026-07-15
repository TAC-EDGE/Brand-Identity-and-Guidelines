import { PageHero, Section, RuleList, TokenTable, DoDont, Flag } from "../components/ui";

export default function ProductImagery() {
  return (
    <>
      <PageHero
        eyebrow="11 · Product Imagery"
        title="Real screens in quiet hardware."
        lead="Product imagery is evidence. Every screen shown is a real capture from the TACEDGE V2 prototype or production product: no interface invention, no distortion, no decoration."
      />

      <Section title="The approved treatment" sub="Graphite device frames on the Stage backdrop. The screenshot stays dominant.">
        <div className="card" style={{ background: "var(--te-stage)", border: 0, padding: "clamp(24px, 4vw, 48px)", display: "grid", gridTemplateColumns: "minmax(0, 2.2fr) minmax(0, 1fr)", gap: 32, alignItems: "end" }}>
          <div className="device-monitor">
            <div className="device-monitor__screen">
              <span className="device-monitor__camera" aria-hidden="true" />
              <img src="assets/product-imagery/tacedge-qa-queue-desktop.webp" alt="TACEDGE QA queue on desktop: submitted records list with a selected record, evidence panel and approval controls" />
            </div>
            <span className="device-monitor__neck" aria-hidden="true" />
            <span className="device-monitor__base" aria-hidden="true" />
          </div>
          <div className="device-phone" style={{ maxWidth: 200 }}>
            <span className="device-phone__speaker" aria-hidden="true" />
            <img src="assets/product-imagery/tacedge-field-capture-b12.webp" alt="TACEDGE field capture on mobile: anchor B12 drill log with large controls" />
          </div>
        </div>
        <TokenTable
          head={["Aspect", "Standard"]}
          rows={[
            ["Desktop", "Graphite monitor frame: #262b25 bezel, 16px radius, camera dot, neck and base; screenshot corners 7px"],
            ["Mobile", "Graphite phone frame: 34px radius, speaker slot, side button; screenshot corners 22px"],
            ["Browser chrome", "None. The product is shown, not the browser"],
            ["Background", "Stage #DDE3D2, a flat brand surface, or the forest hero"],
            ["Shadow", "Device shadow only: 0 18px 40px rgba(0,0,0,.32)"],
            ["Perspective", "Flat and front-on. No 3D tilts, no exaggerated angles"],
            ["Composition", "Desktop and mobile may overlap; the phone never covers the selected record, evidence panel or approval controls"],
            ["Labelling", "Caption real screens factually (screen name, work item). Replace third-party names with generic role labels"],
            ["Accessibility", "Alt text names the screen and what it shows"],
          ]}
        />
      </Section>

      <Section title="Rules">
        <RuleList
          items={[
            <><strong>Real screens only.</strong> High-resolution captures at native proportions. Never generate substitute interfaces when real product screens exist.</>,
            <>Correct device class: desktop screens in the monitor frame, mobile screens in the phone frame. Never a phone screenshot stretched into a monitor.</>,
            <>No material cropping of important UI, no retouching of data, no distortion or scaling tricks.</>,
            <>Sensitive or third-party data is replaced with generic role labels (Principal, Consulting engineer) before capture, not blurred after.</>,
          ]}
        />
        <DoDont
          items={[
            {
              kind: "do",
              stage: <img src="assets/product-imagery/tacedge-field-capture-b12.webp" alt="Field capture screen at native proportions" style={{ maxHeight: 130, borderRadius: 10, border: "1px solid var(--te-line)" }} />,
              caption: "Native proportions, real data structure, correct device class.",
            },
            {
              kind: "dont",
              stage: <img src="assets/product-imagery/tacedge-field-capture-b12.webp" alt="Distorted stretched screenshot" style={{ maxHeight: 130, width: 220, borderRadius: 10, border: "1px solid var(--te-line)", objectFit: "fill" }} />,
              caption: "No stretching, squeezing or perspective distortion.",
            },
          ]}
        />
        <Flag>
          The approved master set currently holds two V2 prototype captures (QA queue desktop, B12
          field capture mobile). A fuller approved screenshot set is listed in decisions-required D6.
        </Flag>
      </Section>
    </>
  );
}
