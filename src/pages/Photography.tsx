import { PageHero, Section, RuleList, TokenTable, DoDont } from "../components/ui";

const photos = [
  { src: "photo-configure-pm.webp", alt: "Project manager at a desktop in a site office, setting up a work plan of anchors and zones in TACEDGE", label: "Configure · office" },
  { src: "photo-capture-abseil.webp", alt: "Operator on ropes at a coastal rock face recording a drill log on a phone, drill rig behind", label: "Capture · workface" },
  { src: "photo-confirm-engineer.webp", alt: "Engineer at a desk reviewing a passed TACEDGE anchor test report on a monitor", label: "Confirm · review" },
];

export default function Photography() {
  return (
    <>
      <PageHero
        eyebrow="10 · Photography"
        title="Real crews. Real ground. Documentary, not staged."
        lead="TACEDGE photography records work as it happens: field-based, naturally lit, technically credible and calm. If a picture would not survive being shown to the crew in it, it is not a TACEDGE picture."
      />

      <Section title="The approved library" sub="The current photographic set maps to the workflow itself.">
        <div className="grid grid--3">
          {photos.map((p) => (
            <figure key={p.src} style={{ margin: 0 }}>
              <img src={`/assets/photography/${p.src}`} alt={p.alt} style={{ borderRadius: "var(--te-r-img)", border: "1px solid var(--te-line)", width: "100%", display: "block", aspectRatio: "8 / 5", objectFit: "cover" }} loading="lazy" />
              <figcaption className="eyebrow" style={{ marginTop: 10, marginBottom: 0 }}>{p.label}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section title="Subject matter">
        <div className="grid grid--2">
          <div className="card card--pad">
            <span className="eyebrow">Prioritise</span>
            <p style={{ color: "var(--te-ink-60)" }}>
              Real crews · genuine environments · field equipment · ground-engineering activity ·
              operational planning · the field-to-office connection · devices used in context ·
              evidence capture · complex terrain
            </p>
          </div>
          <div className="card card--pad">
            <span className="eyebrow" style={{ color: "var(--te-brick)" }}>Avoid</span>
            <p style={{ color: "var(--te-ink-60)" }}>
              Corporate handshakes · stock office teams · artificial blue technology overlays ·
              staged smiling workers · exaggerated danger · dramatic military styling ·
              disaster imagery used as promotion · generic laptop-on-desk photography
            </p>
          </div>
        </div>
      </Section>

      <Section title="Treatment">
        <TokenTable
          head={["Aspect", "Standard"]}
          rows={[
            ["Crop", "8:5 in cards and phase imagery; generous context around the subject; horizon level"],
            ["Colour grade", "Natural and muted; greens and earth tones sit with the palette; no filters, no HDR"],
            ["Contrast", "Moderate. Shadow detail retained; nothing crushed for drama"],
            ["Saturation", "Restrained. Hi-vis gear reads as it does on site, not amplified"],
            ["Subject position", "Off-centre, engaged in the work; faces incidental rather than performing"],
            ["People", "Real crews doing real tasks, correct PPE, with consent; never staged smiles"],
            ["Overlays", "Flat brand colour fields or the brandmark crop only; low opacity; never blue-tech effects"],
            ["Captions", "Factual, small, Muted Text (place, activity, year where relevant)"],
            ["Alt text", "Always. Describe the work, the role and the setting; name TACEDGE screens when visible"],
          ]}
        />
      </Section>

      <Section title="The Whakaari image" sub="The origin image is part of the brand's story and is handled with care.">
        <RuleList
          items={[
            <>Use the Whakaari / White Island image <strong>respectfully and factually</strong>, only in the origin-story context.</>,
            <>Always captioned: “Whakaari / White Island, 2019”.</>,
            <>Never as decoration, never in promotion disconnected from the origin story, never with dramatising treatment.</>,
          ]}
        />
        <DoDont
          items={[
            {
              kind: "do",
              stage: <img src="assets/photography/photo-whakaari-peaks.webp" alt="Whakaari / White Island, 2019, with brandmark peaks" style={{ maxHeight: 110, borderRadius: 7 }} />,
              caption: "Origin context, factual caption, calm composition.",
            },
            {
              kind: "dont",
              stage: <img src="assets/photography/photo-whakaari-peaks.webp" alt="Whakaari image with dramatic red grading" style={{ maxHeight: 110, borderRadius: 7, filter: "contrast(1.6) saturate(2.2) hue-rotate(-25deg)" }} />,
              caption: "No dramatising grades, crops or promotional use of the event.",
            },
          ]}
        />
      </Section>
    </>
  );
}
