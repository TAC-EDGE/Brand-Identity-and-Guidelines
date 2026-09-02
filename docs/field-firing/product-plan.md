# TACEDGE | Field Firing — product assessment and implementation plan

Status: working document for the Field Firing prototype. Branch: `claude/tacedge-field-firing-design-5r0ghg`.
The prototype lives at `field-firing.html` / `src/field-firing/`. Demo data only; not authoritative.

## 1. Assessment of the existing codebase

This repository is the authoritative TACEDGE brand system: a Vite + React 19 + TypeScript
app with multiple HTML entries (guidelines site, print edition, style tile), a closed
design-token system (`tokens/*.json` → `tokens.css` → `tokens.ts`), self-hosted brand
fonts, approved logo assets, and generator-driven templates. Quality gates are
`npm run typecheck` and `npm test` (token consistency and WCAG AA contrast checks).
There is no backend, no router library, no CSS framework. The codebase is small,
strict and disciplined — a good foundation to consume, not to disturb.

## 2. TACEDGE design patterns reused

- **Tokens**: everything is built on `tokens/tokens.css` custom properties. No new colours.
- **Shell**: forest sidebar with cream lockup, sage group labels, mobile drawer — the
  established navigation pattern from the guidelines site.
- **Digital UI rules** (guidelines §12): 44px minimum touch targets, 48px primary
  actions and inputs, 12px button radius, hairline borders, one soft shadow family,
  140ms motion, exception-first presentation, truthful progress (no spinners).
- **Status treatment**: pill with dot + mono uppercase label; the happy path darkens
  green; ochre and brick carry product meaning only (warnings, blockers) — never decoration.
- **Iconography**: 1.6 stroke, round caps, no fills, matching `src/components/icons.tsx`.
- **Type**: Play for display, Be Vietnam Pro for UI, JetBrains Mono for labels/timestamps.

## 3. Information architecture

Primary navigation: **Activities** (home), **Doctrine**, **Templates**, **Administration**
(the last three are honest "planned" placeholders). Within an activity: Overview,
Configure, Safety plan, then People / Review / Brief / Conduct (visible, marked planned).

## 4. V1 workflow

Create Activity → Configure → Build Safety Plan → Complete Requirements → Review →
Brief → Conduct → Close → Record. The implemented lifecycle state machine:
Draft → Planning → Ready for review → Approved → Active ⇄ Paused → Complete → Archived,
with Return-to-planning and Withdraw-approval paths. All transitions are data in
`domain/workflow.ts`; gates (RCO assigned, no critical outstanding, no blocked items,
explicit approval recorded) are enforced there, not in components.

## 5. Component architecture

- `src/field-firing/domain/` — pure TypeScript, no React: `types.ts`, `catalogue.ts`
  (demo requirement definitions with doctrine-reference metadata), `rules.ts`
  (deterministic applicability + readiness), `workflow.ts` (state machine),
  `store.tsx` (React reducer + localStorage persistence + audit trail).
- `src/field-firing/components/` — shared UI (status pills, meter, alerts, source block,
  activity header).
- `src/field-firing/screens/` — one file per screen.
- `src/field-firing/styles/app.css` — app styles on brand tokens only.

The UI consumes rules; no safety logic lives in components. `rules.test.ts` runs via
`npm run test:field-firing` (Node's built-in test runner, no new dependencies) and is
part of `npm test`.

## 6. Data model

Implemented now: Activity, ActivityConfig, Appointment, RequirementDef, Condition,
RequirementResponse, DoctrineRef, AuditEvent, WeaponSystem (names only), Approval.
Deliberately deferred: Organisation, User/Role, Range, AmmunitionType, Brief,
ConductEvent, GeneratedRecord, Template — the boundaries in `types.ts` leave room
for them without rework.

## 7. Major technical decisions

1. **Stay on the existing stack** (Vite + React + TS, hash routing, no new deps).
   Next.js/Tailwind/Supabase are not justified for a front-end prototype in this
   repository; the domain layer is framework-agnostic so persistence can move to
   Supabase/Postgres later without touching the rules.
2. **Fourth Vite entry**, not a separate repo/app — the prototype consumes brand
   tokens and fonts directly, which is exactly how this repo says products should.
3. **Deterministic rules as data** (conditions, transitions, gates) — testable,
   versionable (`rulesetId`/`rulesetVersion` stamped on every activity and approval),
   ready for the future rules engine and doctrine change control.
4. **localStorage store with explicit save state** ("Saved locally", "Storage
   unavailable") — an honest stand-in for the future offline-first sync layer;
   the UI never implies synchronisation exists.
5. **Node test runner with type stripping** for rule tests — zero new dependencies.

## 8. Assumptions and gaps (missing NZDF source material)

- Every requirement in `catalogue.ts` is a placeholder marked SOURCE REQUIRED; the
  section structure, lifecycle names, appointment roles and applicability conditions
  are guesses to be replaced by supplied doctrine. A test asserts no catalogue entry
  claims a verified source.
- No safety-critical figure (distance, arc, template dimension) exists anywhere;
  placeholders say "SOURCE REQUIRED" instead.
- No real ranges, units, people or weapon data — demo names are labelled fictional.
- Authentication, roles and permissions are deliberately absent; "Demo user" stands in.
- Approval authorities are demonstrated generically (name + role), not modelled on NZDF.

## 9. Staged implementation plan

1. **Done — vertical slice**: Activities → Create → Overview → Configure → Safety Plan,
   lifecycle with gated transitions, explicit approval, audit trail, rule tests.
   Plus the **Trace builder**: drag weapon templates onto a fictional range sketch
   to develop the firing trace — deterministic parameterised geometry
   (`domain/trace.ts`, tested), placements recorded on the activity with audit
   events, templates drawn from the configured weapon systems, everything labelled
   demo/SOURCE REQUIRED because no WDA dimensions have been supplied. It records
   positions and directions; it does not calculate danger areas.
2. People & Appointments screen; Review screen (consolidated exception-based readiness).
3. Brief generation from validated plan data; Activity Record + full audit view.
4. Conduct Mode (high-contrast, large targets, pause/resume, activity log) and
   PWA/offline caching with real sync states.
5. Doctrine ingestion: source registry, rule metadata, versioned catalogue, doctrine
   search foundation; rules engine extraction.
6. Backend persistence (Supabase/Postgres), auth, role-based access, sync + conflict
   handling, generated outputs (PDF records via the repo's existing export tooling).

## 10. First screens built

Activities (list), Create Activity, Activity Overview (command screen), Configure
(progressive disclosure driver) and Safety Plan (guided sections, requirement detail
with status, answer, actions and doctrine source) — plus honest placeholders for
Doctrine, Templates and Administration.

## Running it

- `npm run dev` then open `/field-firing.html`
- `npm test` — token checks + field-firing rule tests
- `npm run typecheck`, `npm run build` as usual
