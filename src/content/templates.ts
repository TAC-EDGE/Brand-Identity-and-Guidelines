// Template guidance content. Manifest (templates/manifest.json) carries
// version/status/paths; this file carries the usage guidance shown in the app.
import manifestJson from "../../templates/manifest.json";

export type TemplateStatus = "approved" | "provisional" | "in-development" | "deprecated";

export type ManifestEntry = {
  id: string;
  name: string;
  version: string;
  status: TemplateStatus;
  owner: string;
  approvedDate: string | null;
  lastUpdated: string;
  format: string;
  sourcePath: string;
  downloadPath: string;
  previewPdf: string | null;
  previewDir: string | null;
  previewPages: number;
  intendedUse: string;
  notes: string;
};

export const manifest = manifestJson.templates as ManifestEntry[];
export const manifestMeta = manifestJson.meta;

export const byId = (id: string): ManifestEntry => {
  const entry = manifest.find((t) => t.id === id);
  if (!entry) throw new Error(`Unknown template: ${id}`);
  return entry;
};

/** Preview image paths for an entry (page-01 … page-NN). */
export const previews = (t: ManifestEntry): string[] => {
  if (!t.previewDir || !t.previewPages) return [];
  const prefixById: Record<string, string> = {
    presentation: "slide",
    "meeting-minutes": "meeting_minutes",
    "pilot-proposal": "pilot_proposal",
    "technical-report": "technical_report",
    letterhead: "letterhead",
    legal: "legal_document",
    "one-page": "one_page_example",
  };
  const prefix = prefixById[t.id] ?? "page";
  return Array.from({ length: t.previewPages }, (_, i) =>
    `${t.previewDir}/${prefix}-${String(i + 1).padStart(2, "0")}.png`
  );
};

export type TemplateGuide = {
  id: string;
  slug: string;
  purpose: string;
  useWhen: string[];
  notWhen: string[];
  required: string[];
  optional: string[];
  principles: string[];
  visualRules: string[];
  mistakes: string[];
  dos: { kind: "do" | "dont"; text: string }[];
  extraDownloads?: { href: string; name: string; meta: string }[];
};

export const guides: TemplateGuide[] = [
  {
    id: "presentation",
    slug: "template-presentation",
    purpose: "The approved starting point for every TACEDGE deck: customer pitches, investor updates, product demonstrations, technical briefings, internal reviews and conference talks.",
    useWhen: [
      "Presenting to a room or a call, where slides support a spoken narrative",
      "A short leave-behind deck after a meeting (export to PDF)",
    ],
    notWhen: [
      "The content is a document. Reports, proposals and minutes have their own templates",
      "A one-page handout would do the job better",
    ],
    required: ["Cover (1 or 2)", "Agenda", "Closing / contact"],
    optional: ["Section dividers", "Any content layout (5–19)", "Appendix (21–22)"],
    principles: [
      "One message per slide. The headline is the message, not a label.",
      "Short headlines, minimal body copy, evidence before claims.",
      "Maximum five bullets per slide; two lines per bullet.",
      "No dense paragraphs. If it needs a paragraph, it needs a document.",
      "Charts and tables: hairline borders, mono numerals, status colours only for status; every number carries a source note.",
    ],
    visualRules: [
      "Duplicate an approved layout and replace its content. Never draw new layouts or move footers.",
      "Titles in Play 700; body in Be Vietnam Pro; labels and source notes in JetBrains Mono.",
      "Covers and dividers are forest with the contour band; content slides are cream.",
      "Real product screens only, in the graphite frame treatment.",
    ],
    mistakes: [
      "Pasting report paragraphs onto slides",
      "Adding a new accent colour for one chart",
      "Shrinking type to fit more content instead of cutting content",
      "Using the ochre/brick status colours as highlights",
    ],
    dos: [
      { kind: "do", text: "Use one clear message per slide." },
      { kind: "dont", text: "Paste report-length paragraphs into presentations." },
    ],
    extraDownloads: [
      { href: "templates/presentation/TACEDGE_Presentation_Template_v1.0_preview.pdf", name: "All 22 layouts (PDF preview)", meta: "PDF · rendered from the PPTX" },
    ],
  },
  {
    id: "meeting-minutes",
    slug: "template-meeting-minutes",
    purpose: "The record of decisions and actions for any TACEDGE meeting: customer discovery, pilot setup, weekly reviews, workshops, investor and governance meetings.",
    useWhen: [
      "Any meeting where a decision was made or an action assigned",
      "Recurring project reviews that need a running action register",
    ],
    notWhen: [
      "Informal chats with no decisions or actions (a short email will do)",
      "Workshops whose output is a document; write the document instead",
    ],
    required: ["Header block (title, date, purpose, chair, recorder, attendees)", "Key outcomes", "Decisions", "Actions table"],
    optional: ["Discussion", "Risks / issues", "Open questions", "Next meeting"],
    principles: [
      "Capture what was decided, why it matters and who acts next.",
      "Key outcomes first: the two or three things a non-attendee must know.",
      "Discussion is a summary, three sentences per topic at most.",
    ],
    visualRules: [
      "Action statuses use the four approved values: Open, In progress, Complete, Blocked.",
      "Blocked actions name the blocker inside the action text.",
      "Keep the metadata table intact; it is the document's identity.",
    ],
    mistakes: [
      "Writing a verbatim transcript",
      "Actions without an owner or a due date",
      "Deleting the decisions table because 'nothing formal was decided'",
    ],
    dos: [
      { kind: "do", text: "Record decisions and actions in meeting minutes." },
      { kind: "dont", text: "Use minutes as a verbatim transcript." },
    ],
  },
  {
    id: "pilot-proposal",
    slug: "template-pilot-proposal",
    purpose: "Scopes a pilot with a customer: one workflow, one crew, one project, a review date and a decision point.",
    useWhen: [
      "An initial customer pilot or design partnership",
      "A one-project validation or workflow trial",
    ],
    notWhen: [
      "A broad rollout or multi-project engagement (that is a services agreement)",
      "A quick meeting brief (use the one-page pilot summary variant)",
    ],
    required: ["Cover", "Opportunity", "Pilot objective", "Scope (in / out)", "Success measures", "Timeline", "Review and decision point", "Approval"],
    optional: ["Current workflow", "Users and roles", "Project configuration", "Support approach", "Data and confidentiality", "Fallback process", "Commercial terms"],
    principles: [
      "A narrow, jointly defined validation, not a broad rollout.",
      "The objective is one sentence: what will be true at the review date.",
      "Out-of-scope is written down explicitly; it protects both parties.",
      "Success measures have a baseline and a target, agreed before work starts.",
    ],
    visualRules: [
      "Forest cover block with the cream lockup; cream interior pages.",
      "Fill the optional fields table (customer, project, work type, dates, people) before sending.",
      "Never hard-code a customer into the repository master; save customer copies outside this repo as TACEDGE_Pilot_Proposal_[Customer]_v1.0_[YYYY-MM-DD].docx.",
    ],
    mistakes: [
      "Scoping more than one workflow into a pilot",
      "No decision point, so the pilot drifts",
      "Success measures invented after the pilot ends",
    ],
    dos: [
      { kind: "do", text: "Define one workflow, one crew, one project and a decision date." },
      { kind: "dont", text: "Let a pilot become an unscoped rollout." },
    ],
    extraDownloads: [
      { href: "templates/pilot-proposal/TACEDGE_Pilot_Summary_Template_v1.0.docx", name: "One-page pilot summary (DOCX)", meta: "DOCX · compact variant" },
      { href: "templates/pilot-proposal/TACEDGE_Pilot_Summary_Template_v1.0.pdf", name: "Pilot summary example (PDF)", meta: "PDF · rendered example" },
    ],
  },
  {
    id: "technical-report",
    slug: "template-technical-report",
    purpose: "The released record of technical work: pilot outcomes, implementation reviews, lessons learned, weekly summaries, workflow validation and recommendations.",
    useWhen: [
      "Reporting pilot results at a decision point",
      "Any finding or recommendation a customer or engineer will act on",
    ],
    notWhen: [
      "A live status update (the product's released report does that)",
      "Meeting outcomes (use meeting minutes)",
    ],
    required: ["Cover", "Document control", "Executive summary", "Purpose", "Scope", "Method", "Findings", "Recommendations"],
    optional: ["Project context", "Workflow tested", "Evidence", "Success measures", "User feedback", "Issues and exceptions", "Lessons learned", "Next steps", "Appendices"],
    principles: [
      "Every statement is labelled by kind: observed fact, user feedback, TACEDGE inference, recommendation.",
      "The executive summary is five sentences at most, written last.",
      "Recommendations trace to findings; findings trace to evidence.",
    ],
    visualRules: [
      "Keep document control and version tables current; the report is a controlled artefact.",
      "Quotes use the sage-rule quote style, attributed to a role.",
      "Warnings and notes use the approved tinted styles, never ad-hoc highlighting.",
    ],
    mistakes: [
      "Mixing inference into the findings without labelling it",
      "An executive summary that is a table of contents in prose",
      "Screenshots of tables instead of real tables",
    ],
    dos: [
      { kind: "do", text: "Label every finding: fact, feedback, inference or recommendation." },
      { kind: "dont", text: "Publish a report without document control filled in." },
    ],
  },
  {
    id: "letterhead",
    slug: "template-letterhead",
    purpose: "Formal TACEDGE correspondence that prints cleanly on ordinary office printers.",
    useWhen: ["Formal letters, cover letters, confirmations and notices"],
    notWhen: ["Proposals, reports or agreements, which have their own templates"],
    required: ["Header lockup", "Date", "Recipient block", "Salutation", "Body", "Sign-off", "Contact footer"],
    optional: ["Reference line", "Enclosures note"],
    principles: [
      "Plain, direct, operational. State the purpose in the first sentence.",
      "Short paragraphs; one topic per letter.",
    ],
    visualRules: [
      "The header and footer are fixed; write in the body only.",
      "No full-bleed colour; the letterhead is deliberately printer-safe.",
      "Multi-page letters keep the footer page numbers.",
    ],
    mistakes: [
      "Adding graphics or colour panels to a letter",
      "Burying the request in the final paragraph",
    ],
    dos: [
      { kind: "do", text: "State the purpose of the letter in the first sentence." },
      { kind: "dont", text: "Decorate correspondence. The lockup is enough." },
    ],
  },
  {
    id: "legal",
    slug: "template-legal",
    purpose: "Consistent, restrained formatting for TACEDGE legal documents: NDAs, pilot agreements, statements of work, services agreements, commercial terms and MoUs.",
    useWhen: ["Formatting a legal document drafted or reviewed by a legal adviser"],
    notWhen: ["Drafting legal content. This is a visual template only; it contains no clauses"],
    required: ["Title", "Parties table", "Agreed terms (numbered clauses)", "Execution blocks"],
    optional: ["Background / recitals", "Definitions", "Schedules", "Confidentiality footer"],
    principles: [
      "Brand formatting does not replace legal review.",
      "Branding stays restrained so the document reads as a legal instrument, not marketing.",
    ],
    visualRules: [
      "Numbered clause hierarchy: 1 / 1.1 / 1.1.1 with hanging indents.",
      "Parties, schedules and execution use the approved hairline tables.",
      "The ink lockup header only; no covers, no contour graphics.",
    ],
    mistakes: [
      "Treating the template's placeholder clauses as legal wording",
      "Restyling clause numbering by hand",
    ],
    dos: [
      { kind: "do", text: "Have every agreement reviewed by a legal adviser." },
      { kind: "dont", text: "Treat brand formatting as legal approval." },
    ],
  },
  {
    id: "one-page",
    slug: "template-one-page",
    purpose: "The one-page leave-behind: a meeting, pilot or product summary that survives being left on a desk.",
    useWhen: [
      "Customer meetings and event handouts",
      "Pilot briefs, workflow summaries, product introductions, case studies",
    ],
    notWhen: [
      "The content needs more than one page (use a report or deck)",
      "A contractual or technical record is required",
    ],
    required: ["Header (context, audience, logo)", "Headline", "Next step", "Contact footer"],
    optional: ["Problem block", "Callout panel", "Workflow strip", "Questions", "QR panel"],
    principles: [
      "Word counts are printed in every placeholder. Respect them: the format works because it is sparse.",
      "One headline idea. The reader should be able to repeat it a week later.",
      "The next step is an action, not a sentiment.",
    ],
    visualRules: [
      "A4 portrait, 12–13 mm margins, cream ground, forest lockup header.",
      "QR codes: minimum 22 × 22 mm with a 3 mm quiet zone, linked destination named in the copy.",
      "No customer details in the repository master; the Hunter Civil edition is archived prior artwork.",
    ],
    mistakes: [
      "Filling every placeholder to its maximum",
      "Two competing headlines",
      "A QR code below 22 mm that fails to scan on paper",
    ],
    dos: [
      { kind: "do", text: "Cut copy until the page breathes." },
      { kind: "dont", text: "Reuse a customer-specific edition as a master." },
    ],
    extraDownloads: [
      { href: "templates/one-page/TACEDGE_One_Page_Example_v1.0.html", name: "Generic example (HTML)", meta: "HTML · worked example" },
      { href: "templates/one-page/TACEDGE_One_Page_Example_v1.0.pdf", name: "Generic example (PDF)", meta: "PDF · A4" },
      { href: "templates/one-page/TACEDGE_One_Page_Template_v1.0.pdf", name: "Blank master (PDF)", meta: "PDF · A4" },
    ],
  },
  {
    id: "email-signature",
    slug: "template-email-signature",
    purpose: "The standard TACEDGE email signature: name, role, contact, and nothing else.",
    useWhen: ["Every staff mailbox, on light backgrounds"],
    notWhen: ["Marketing campaigns or newsletters, which are not signatures"],
    required: ["Name", "Role", "Phone", "Email", "Website"],
    optional: ["Compact hosted brandmark tile (delete the cell for text-only)"],
    principles: [
      "A signature is contact information, not collateral.",
      "No banners, quotes or taglines beyond the approved one-liner.",
      "No social icons: TACEDGE has no approved social accounts.",
    ],
    visualRules: [
      "Inline-styled table, Arial stack by design (recipients rarely have brand fonts).",
      "The optional brandmark tile loads from the hosted brand site, never as an attachment.",
      "Light-background version only; test on a phone before saving.",
    ],
    mistakes: [
      "Pasting the logo as a large attached image",
      "Stacking legal disclaimers into the signature",
    ],
    dos: [
      { kind: "do", text: "Keep the signature to five lines of contact information." },
      { kind: "dont", text: "Attach images or add banners to every email you send." },
    ],
    extraDownloads: [
      { href: "templates/email-signature/TACEDGE_Email_Signature_v1.0.txt", name: "Plain-text version", meta: "TXT" },
    ],
  },
];

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);
