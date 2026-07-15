// Generates the TACEDGE DOCX template suite:
//   meeting minutes, pilot proposal (+ one-page summary), technical report,
//   letterhead, legal document.
// Usage: node scripts/generate-docx.mjs
import { Packer, Paragraph, TextRun, PageBreak } from "docx";
import { writeFileSync } from "node:fs";
import {
  baseDoc, A4_PAGE, brandHeader, brandFooter, brandTable, metaTable,
  coverBlock, h1, h2, h3, p, ph, eyebrow, bullet, spacer,
} from "./template-src/docx-helpers.mjs";
import { COMPANY, TODAY, CONFIDENTIAL_FOOTER } from "./template-src/brand.mjs";

const write = async (doc, path) => {
  writeFileSync(path, await Packer.toBuffer(doc));
  console.log("wrote", path);
};
const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

/* ================================================================
   1 · MEETING MINUTES
   ================================================================ */
{
  const doc = baseDoc({
    description: "TACEDGE meeting minutes template v1.0",
    sections: [{
      properties: A4_PAGE,
      headers: { default: brandHeader("Meeting minutes") },
      footers: { default: brandFooter() },
      children: [
        eyebrow("TACEDGE · Meeting minutes"),
        new Paragraph({ style: "Title", text: "[Meeting title]" }),
        metaTable([
          ["Date and time", "[Date] · [Start–finish]"],
          ["Location / link", "[Location or meeting link]"],
          ["Purpose", "[One sentence: why this meeting exists]"],
          ["Chair", "[Name]"],
          ["Recorder", "[Name]"],
          ["Attendees", "[Names and roles]"],
          ["Apologies", "[Names]"],
        ]),
        p("Capture what was decided, why it matters and who acts next.", "Note"),
        h1("Key outcomes"),
        bullet("[The two or three things a non-attendee must know]"),
        h1("Decisions"),
        brandTable([
          ["#", "Decision", "Rationale", "Decided by"],
          ["D1", "[What was decided]", "[Why]", "[Name]"],
          ["D2", "[What was decided]", "[Why]", "[Name]"],
        ], { widths: [900, 3800, 3200, 1736] }),
        h1("Discussion"),
        p("[Short summary of each topic actually discussed. Not a transcript: three sentences per topic at most.]", "Placeholder"),
        h1("Actions"),
        brandTable([
          ["ID", "Action", "Owner", "Due", "Status"],
          ["A1", "[Action]", "[Name]", "[Date]", "Open"],
          ["A2", "[Action]", "[Name]", "[Date]", "In progress"],
          ["A3", "[Action]", "[Name]", "[Date]", "Complete"],
          ["A4", "[Action]", "[Name]", "[Date]", "Blocked"],
        ], { widths: [800, 4200, 1600, 1500, 1536] }),
        p("Status values: Open · In progress · Complete · Blocked. Blocked actions name the blocker in the action text.", "Caption"),
        h1("Risks / issues"),
        bullet("[New or changed risk, with owner]"),
        h1("Open questions"),
        bullet("[Question, and who will answer it]"),
        h1("Next meeting"),
        p("[Date, time, location, purpose]", "Placeholder"),
      ],
    }],
  });
  await write(doc, "templates/meeting-minutes/TACEDGE_Meeting_Minutes_Template_v1.0.docx");
}

/* ================================================================
   2 · PILOT PROPOSAL
   ================================================================ */
{
  const doc = baseDoc({
    description: "TACEDGE pilot proposal template v1.0",
    sections: [{
      properties: A4_PAGE,
      headers: { default: brandHeader("Pilot proposal") },
      footers: { default: brandFooter(CONFIDENTIAL_FOOTER) },
      children: [
        coverBlock({
          eyebrowText: "Pilot proposal",
          title: "[Pilot name]",
          subtitle: "A narrow, jointly defined validation. Not a broad rollout.",
          footerLine: `[Customer] · [Project] · [Date] · Version [1.0]`,
        }),
        pageBreak(),
        metaTable([
          ["Customer", "[Customer name]"],
          ["Project", "[Project name]"],
          ["Work type", "[e.g. Anchoring / Drilling]"],
          ["Location", "[Site / region]"],
          ["Start date", "[Date]"],
          ["Review date", "[Date]"],
          ["Operator group", "[Crew / team]"],
          ["Project manager", "[Name]"],
          ["Engineer", "[Name, organisation]"],
          ["TACEDGE lead", "[Name]"],
          ["Pilot support", "[Name]"],
        ]),
        h1("Opportunity"),
        p("[Two or three sentences: the workflow pain this pilot addresses and why now.]", "Placeholder"),
        h1("Current workflow"),
        p("[How the work is captured and reported today. Name the systems, forms and hand-offs.]", "Placeholder"),
        h1("Pilot objective"),
        p("[One sentence. What will be true at the review date if the pilot succeeds.]", "Placeholder"),
        h1("Scope"),
        h2("In scope"),
        bullet("[One work type, one crew, one project]"),
        bullet("[The specific records and evidence captured]"),
        h2("Out of scope"),
        bullet("[Everything else, named explicitly]"),
        h1("Users and roles"),
        brandTable([
          ["Role", "Who", "What they do in the pilot"],
          ["Operator", "[Names]", "Capture work at the workface"],
          ["Project manager", "[Name]", "Configure, review and confirm records"],
          ["Engineer", "[Name]", "Receive the released report"],
        ]),
        h1("Project configuration"),
        p("[What TACEDGE will configure before work starts: layout, sequence, testing rules, evidence requirements.]", "Placeholder"),
        h1("Pilot workflow"),
        p("Configure. Capture. Confirm. [Describe the specific flow for this pilot in those three movements.]", "Placeholder"),
        h1("Success measures"),
        brandTable([
          ["Measure", "Baseline today", "Target at review"],
          ["[e.g. time from capture to PM visibility]", "[Current]", "[Target]"],
          ["[e.g. records confirmed without chasing]", "[Current]", "[Target]"],
        ]),
        h1("Support approach"),
        p("[Who supports the crew, how, and response expectations during the pilot.]", "Placeholder"),
        h1("Data and confidentiality"),
        p("[Where pilot data lives, who can see it, what happens to it after the pilot.]", "Placeholder"),
        h1("Fallback process"),
        p("[If TACEDGE is unavailable, the crew reverts to the current method. Describe the fallback and how records reconcile.]", "Placeholder"),
        h1("Timeline"),
        brandTable([
          ["Stage", "When", "Output"],
          ["Configure", "[Week 0]", "Project configured, crew briefed"],
          ["Capture", "[Weeks 1–4]", "Live work captured"],
          ["Review", "[Week 5]", "Evidence reviewed against success measures"],
          ["Decision", "[Week 6]", "Continue, adjust or stop"],
        ]),
        h1("Responsibilities"),
        brandTable([
          ["Party", "Responsibility"],
          ["[Customer]", "[Access, crew time, review participation]"],
          ["TACEDGE", "[Configuration, support, reporting]"],
        ]),
        h1("Commercial terms"),
        p("[Pilot pricing, what it includes, and what happens commercially at the decision point.]", "Placeholder"),
        h1("Review and decision point"),
        p("[The review meeting: who attends, what evidence is on the table, and the decision to be made.]", "Placeholder"),
        h1("Approval / acceptance"),
        brandTable([
          ["", "Name", "Role", "Signature", "Date"],
          ["[Customer]", "[Name]", "[Role]", "", ""],
          ["TACEDGE", "[Name]", "[Role]", "", ""],
        ], { widths: [1800, 2400, 2200, 1800, 1436] }),
      ],
    }],
  });
  await write(doc, "templates/pilot-proposal/TACEDGE_Pilot_Proposal_Template_v1.0.docx");
}

/* ================================================================
   2b · PILOT SUMMARY (one page)
   ================================================================ */
{
  const doc = baseDoc({
    description: "TACEDGE one-page pilot summary template v1.0",
    sections: [{
      properties: A4_PAGE,
      headers: { default: brandHeader("Pilot summary") },
      footers: { default: brandFooter(CONFIDENTIAL_FOOTER) },
      children: [
        eyebrow("TACEDGE · Pilot summary"),
        new Paragraph({ style: "Title", text: "[Pilot name]" }),
        p("A narrow, jointly defined validation. Not a broad rollout.", "Note"),
        metaTable([
          ["Customer / project", "[Customer] · [Project]"],
          ["Work type / location", "[Work type] · [Location]"],
          ["Dates", "[Start] to [Review]"],
          ["People", "PM [Name] · Engineer [Name] · TACEDGE [Name]"],
        ]),
        h2("Objective"),
        p("[One sentence.]", "Placeholder"),
        h2("Scope"),
        p("[In: one work type, one crew, one project. Out: everything else.]", "Placeholder"),
        h2("Success measures"),
        bullet("[Measure → target]"),
        bullet("[Measure → target]"),
        h2("Decision point"),
        p("[Date, attendees, and the continue / adjust / stop decision.]", "Placeholder"),
      ],
    }],
  });
  await write(doc, "templates/pilot-proposal/TACEDGE_Pilot_Summary_Template_v1.0.docx");
}

/* ================================================================
   3 · TECHNICAL REPORT
   ================================================================ */
{
  const doc = baseDoc({
    description: "TACEDGE technical report template v1.0",
    sections: [{
      properties: A4_PAGE,
      headers: { default: brandHeader("Technical report") },
      footers: { default: brandFooter(CONFIDENTIAL_FOOTER) },
      children: [
        coverBlock({
          eyebrowText: "Technical report",
          title: "[Report title]",
          subtitle: "[One-line description of what this report covers.]",
          footerLine: `[Customer] · [Project] · [Date] · Version [1.0]`,
        }),
        pageBreak(),
        h1("Document control"),
        metaTable([
          ["Document title", "[Title]"],
          ["Customer", "[Customer]"],
          ["Project", "[Project]"],
          ["Version", "[1.0]"],
          ["Date", "[Date]"],
          ["Author", "[Name]"],
          ["Reviewer", "[Name]"],
          ["Approval status", "[Draft / Reviewed / Approved]"],
        ]),
        brandTable([
          ["Version", "Date", "Author", "Change"],
          ["[0.1]", "[Date]", "[Name]", "[First draft]"],
        ]),
        h1("Executive summary"),
        p("[Five sentences at most: what was tested, what the evidence showed, what TACEDGE recommends. Write this last.]", "Placeholder"),
        h1("Purpose"),
        p("[Why this report exists and who it is for.]", "Placeholder"),
        h1("Project context"),
        p("[The project, site, work type and period covered.]", "Placeholder"),
        h1("Scope"),
        p("[What this report covers and, explicitly, what it does not.]", "Placeholder"),
        h1("Method"),
        p("[How the work was configured, captured and confirmed. Name the record types.]", "Placeholder"),
        h1("Workflow tested"),
        p("[The specific Configure–Capture–Confirm flow under test.]", "Placeholder"),
        h1("Evidence"),
        p("[The records behind this report: counts, types, period. Reference appendices for detail.]", "Placeholder"),
        p("Label every statement in the findings by kind: Observed fact · User feedback · TACEDGE inference · Recommendation.", "Note"),
        h1("Findings"),
        brandTable([
          ["#", "Finding", "Kind", "Evidence"],
          ["F1", "[What the data showed]", "Observed fact", "[Records, dates]"],
          ["F2", "[What users said]", "User feedback", "[Who, when]"],
          ["F3", "[What TACEDGE concludes]", "TACEDGE inference", "[From F1, F2]"],
        ], { widths: [800, 4200, 2000, 2636] }),
        h1("Success measures"),
        brandTable([
          ["Measure", "Baseline", "Target", "Result"],
          ["[Measure]", "[Baseline]", "[Target]", "[Result]"],
        ]),
        h1("User feedback"),
        p("“[Representative quote, attributed to a role.]”", "Quote"),
        h1("Issues and exceptions"),
        brandTable([
          ["#", "Issue", "Impact", "Resolution"],
          ["I1", "[Issue]", "[Impact]", "[Resolution or open]"],
        ], { widths: [800, 3600, 2400, 2836] }),
        h1("Lessons learned"),
        bullet("[What TACEDGE or the customer would do differently]"),
        h1("Recommendations"),
        bullet("[Recommendation, each traceable to a finding]"),
        h1("Next steps"),
        brandTable([
          ["Step", "Owner", "By when"],
          ["[Step]", "[Name]", "[Date]"],
        ]),
        h1("Appendices"),
        p("[Appendix A: record register. Appendix B: full test results. Appendix C: methodology detail.]", "Placeholder"),
      ],
    }],
  });
  await write(doc, "templates/technical-report/TACEDGE_Technical_Report_Template_v1.0.docx");
}

/* ================================================================
   4 · LETTERHEAD
   ================================================================ */
{
  const doc = baseDoc({
    description: "TACEDGE letterhead v1.0",
    sections: [{
      properties: A4_PAGE,
      headers: { default: brandHeader("", { logo: "forest" }) },
      footers: { default: brandFooter(`${COMPANY.legal} · ${COMPANY.email} · ${COMPANY.web} · ${COMPANY.location}`) },
      children: [
        p("[Date]", "Mono"),
        spacer(),
        p("[Recipient name]"),
        p("[Organisation]"),
        p("[Address line]"),
        spacer(),
        p("Dear [Name],"),
        spacer(),
        p("[Letter body. Plain, direct, operational. Short paragraphs. State the purpose in the first sentence.]", "Placeholder"),
        spacer(),
        p("Ngā mihi,"),
        spacer(),
        spacer(),
        p("[Name]"),
        p("[Role], TACEDGE", "Caption"),
        p(`[Phone] · [Email] · ${COMPANY.web}`, "Caption"),
      ],
    }],
  });
  await write(doc, "templates/letterhead/TACEDGE_Letterhead_v1.0.docx");
}

/* ================================================================
   5 · LEGAL DOCUMENT
   ================================================================ */
{
  const clause = (num, text) =>
    new Paragraph({
      style: "Normal",
      spacing: { after: 140 },
      indent: { left: 567, hanging: 567 },
      children: [
        new TextRun({ text: `${num}\t`, bold: true }),
        new TextRun({ text, color: text.startsWith("[") ? "6E7D5C" : "242A1F" }),
      ],
    });

  const doc = baseDoc({
    description: "TACEDGE legal document visual template v1.0 — formatting only, not legal advice",
    sections: [{
      properties: A4_PAGE,
      headers: { default: brandHeader("Legal document", { logo: "ink" }) },
      footers: { default: brandFooter(`${COMPANY.legal} · Confidential`) },
      children: [
        eyebrow("TACEDGE · [Agreement type]"),
        new Paragraph({ style: "Title", text: "[Agreement title]" }),
        p("Visual template only. Brand formatting does not replace legal review. Insert clauses drafted or reviewed by your legal adviser.", "Warning"),
        h1("Parties"),
        brandTable([
          ["", "Name", "Details"],
          ["Party A", `${COMPANY.legal}`, "[Company number, registered office]"],
          ["Party B", "[Counterparty legal name]", "[Company number, registered office]"],
        ]),
        h1("Background"),
        clause("A.", "[Recital: the context in one sentence.]"),
        clause("B.", "[Recital: what the parties intend.]"),
        h1("Agreed terms"),
        h2("1. Definitions"),
        clause("1.1", "[Defined term] means [definition]."),
        clause("1.2", "[Defined term] means [definition]."),
        h2("2. [Clause heading]"),
        clause("2.1", "[Clause text.]"),
        clause("2.2", "[Clause text.]"),
        clause("2.2.1", "[Subclause text.]"),
        h2("3. [Clause heading]"),
        clause("3.1", "[Clause text.]"),
        h1("Schedules"),
        h2("Schedule 1 — [Title]"),
        brandTable([
          ["Item", "Description"],
          ["[Item]", "[Description]"],
        ]),
        h1("Execution"),
        p("Signed for and on behalf of each party:"),
        brandTable([
          ["", "Party A", "Party B"],
          ["Signature", "", ""],
          ["Name", "[Name]", "[Name]"],
          ["Position", "[Position]", "[Position]"],
          ["Date", "[Date]", "[Date]"],
        ], { headerRow: true }),
      ],
    }],
  });
  await write(doc, "templates/legal/TACEDGE_Legal_Document_Template_v1.0.docx");
}

console.log("docx suite complete");
