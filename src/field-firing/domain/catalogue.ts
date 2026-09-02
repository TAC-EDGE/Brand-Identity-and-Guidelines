// TACEDGE | Field Firing — demonstration requirement catalogue.
//
// DEMO DATA — NOT AUTHORITATIVE.
// Every entry below is a placeholder demonstrating the product structure.
// No entry is NZDF doctrine. Authoritative NZDF / NZ Army field firing
// publications have not yet been supplied to this repository, so every
// source reference is marked "source-required" and no safety-critical
// figure (distance, arc, template dimension) appears anywhere.
//
// When source material arrives, each requirement gains a real DoctrineRef
// (publication, version, section, paragraph, verifier) and this file is
// superseded by a versioned, verified catalogue.

import type { RequirementDef, SectionId, WeaponSystem } from "./types";

export const CATALOGUE_ID = "demo-catalogue";
export const CATALOGUE_VERSION = "0.1.0-demo";

const SOURCE_REQUIRED = {
  publication: "SOURCE REQUIRED — NZDF field firing publication not yet supplied",
  status: "source-required" as const,
};

export const sections: { id: SectionId; label: string; intro: string }[] = [
  { id: "command", label: "Command & appointments", intro: "Who holds authority and responsibility for this activity." },
  { id: "range", label: "Range & danger area", intro: "Range authorisation, boundaries and danger area for the activity." },
  { id: "weapons", label: "Weapons & ammunition", intro: "Weapon systems, natures and restrictions for the activity." },
  { id: "medical", label: "Medical & emergency", intro: "Medical cover, casualty evacuation and emergency response." },
  { id: "communications", label: "Communications", intro: "Communications plan for control and emergencies." },
  { id: "conduct", label: "Conduct controls", intro: "Controls applied during the conduct of the activity." },
];

/** Demonstration weapon systems. Names only; no performance data. */
export const weaponSystems: WeaponSystem[] = [
  { id: "ws-rifle", name: "Individual weapon (demo)", demo: true },
  { id: "ws-lsw", name: "Light support weapon (demo)", demo: true },
  { id: "ws-pistol", name: "Pistol (demo)", demo: true },
  { id: "ws-gpmg", name: "Machine gun, sustained fire (demo)", demo: true },
];

export const catalogue: RequirementDef[] = [
  // Command & appointments -------------------------------------------------
  {
    id: "req-rco-appointed",
    section: "command",
    title: "RCO appointed",
    requirement: "A qualified Range Conducting Officer is appointed for the activity.",
    guidance: "Record the appointed RCO. Qualification and currency checks remain a command responsibility.",
    input: "appointment",
    appliesWhen: [],
    critical: true,
    source: SOURCE_REQUIRED,
  },
  {
    id: "req-eco-appointed",
    section: "command",
    title: "ECO appointment confirmed",
    requirement: "Confirm whether an Exercise Conducting Officer is required, and record the appointment if so.",
    input: "appointment",
    appliesWhen: [],
    critical: false,
    source: SOURCE_REQUIRED,
  },
  {
    id: "req-safety-staff",
    section: "command",
    title: "Range safety staff detailed",
    requirement: "Range safety staff for the activity are identified and detailed.",
    input: "text",
    appliesWhen: [],
    critical: true,
    source: SOURCE_REQUIRED,
  },

  // Range & danger area ----------------------------------------------------
  {
    id: "req-range-authorised",
    section: "range",
    title: "Range authorised for the activity",
    requirement: "Confirm the range or training area is authorised for this activity type and the weapons planned.",
    guidance: "Authorisation is established from range standing orders and booking confirmation. RULE NOT YET CONFIGURED: the application cannot check this automatically until authoritative range data is supplied.",
    input: "confirm",
    appliesWhen: [],
    critical: true,
    source: SOURCE_REQUIRED,
  },
  {
    id: "req-danger-area",
    section: "range",
    title: "Danger area established",
    requirement: "The applicable danger area / template for the activity is established and recorded. Dimensions: SOURCE REQUIRED.",
    guidance: "The application does not calculate danger areas. Values come from authoritative templates once supplied, and remain subject to RCO verification.",
    input: "confirm",
    appliesWhen: [],
    critical: true,
    source: SOURCE_REQUIRED,
  },
  {
    id: "req-sentries",
    section: "range",
    title: "Sentries and access control planned",
    requirement: "Access control measures for the danger area are planned and personnel detailed.",
    input: "text",
    appliesWhen: [{ field: "activityType", equals: "live" }],
    critical: false,
    source: SOURCE_REQUIRED,
  },

  // Weapons & ammunition ---------------------------------------------------
  {
    id: "req-weapons-declared",
    section: "weapons",
    title: "Weapon systems declared",
    requirement: "All weapon systems to be fired are declared in the activity configuration.",
    input: "confirm",
    appliesWhen: [{ field: "weaponSystemIds", nonEmpty: true }],
    critical: true,
    source: SOURCE_REQUIRED,
  },
  {
    id: "req-ammunition-natures",
    section: "weapons",
    title: "Ammunition natures recorded",
    requirement: "Ammunition natures and quantities for the activity are recorded. Restrictions: SOURCE REQUIRED.",
    input: "text",
    appliesWhen: [{ field: "weaponSystemIds", nonEmpty: true }],
    critical: true,
    source: SOURCE_REQUIRED,
  },
  {
    id: "req-pyrotechnics",
    section: "weapons",
    title: "Pyrotechnics plan recorded",
    requirement: "Pyrotechnics to be used, and their handling controls, are recorded.",
    input: "text",
    appliesWhen: [{ field: "pyrotechnics", equals: true }],
    critical: false,
    source: SOURCE_REQUIRED,
  },
  {
    id: "req-supporting-weapons",
    section: "weapons",
    title: "Supporting weapons requirements confirmed",
    requirement: "Additional requirements for supporting weapons are identified. RULE NOT YET CONFIGURED.",
    input: "confirm",
    appliesWhen: [{ field: "supportingWeapons", equals: true }],
    critical: true,
    source: SOURCE_REQUIRED,
  },

  // Medical & emergency ----------------------------------------------------
  {
    id: "req-medical-cover",
    section: "medical",
    title: "Medical cover confirmed",
    requirement: "Medical cover appropriate to the activity is confirmed and recorded.",
    input: "appointment",
    appliesWhen: [],
    critical: true,
    source: SOURCE_REQUIRED,
  },
  {
    id: "req-casevac",
    section: "medical",
    title: "Casualty evacuation plan recorded",
    requirement: "A casualty evacuation plan exists for the activity, including routes and destination.",
    input: "text",
    appliesWhen: [],
    critical: true,
    source: SOURCE_REQUIRED,
  },

  // Communications ---------------------------------------------------------
  {
    id: "req-comms-plan",
    section: "communications",
    title: "Communications plan recorded",
    requirement: "Primary and alternate communications for range control and emergencies are recorded.",
    input: "text",
    appliesWhen: [],
    critical: true,
    source: SOURCE_REQUIRED,
  },

  // Conduct controls -------------------------------------------------------
  {
    id: "req-night-controls",
    section: "conduct",
    title: "Night firing controls recorded",
    requirement: "Additional controls for firing in darkness are recorded. Requirements: SOURCE REQUIRED.",
    input: "text",
    appliesWhen: [{ field: "night", equals: true }],
    critical: true,
    source: SOURCE_REQUIRED,
  },
  {
    id: "req-vehicle-controls",
    section: "conduct",
    title: "Vehicle movement controls recorded",
    requirement: "Controls for vehicle movement within the activity area are recorded.",
    input: "text",
    appliesWhen: [{ field: "vehicles", equals: true }],
    critical: false,
    source: SOURCE_REQUIRED,
  },
  {
    id: "req-misfire",
    section: "conduct",
    title: "Misfire and stoppage actions confirmed",
    requirement: "Actions on misfire and stoppage for each weapon system are confirmed as briefed.",
    input: "confirm",
    appliesWhen: [{ field: "weaponSystemIds", nonEmpty: true }],
    critical: true,
    source: SOURCE_REQUIRED,
  },
];
