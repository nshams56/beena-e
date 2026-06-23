import {
  Activity,
  BadgeCheck,
  Clock,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Microscope,
  Sparkles,
  Target,
} from "lucide-react";

export const whyChoose = [
  {
    title: "Ophthalmic specialization",
    description:
      "Category depth across retina, cornea, glaucoma, and rare ophthalmic disease — informed by precedent trials, imaging standards, and specialty care pathways, not generalist life-sciences consulting.",
    icon: Microscope,
  },
  {
    title: "Global regulatory expertise",
    description:
      "FDA, EMA, and selected regional pathways mapped with ophthalmic-specific precedents — briefing strategy, endpoint acceptability, and combination-product considerations included from the outset.",
    icon: BadgeCheck,
  },
  {
    title: "Science and commercial alignment",
    description:
      "Mechanism, clinical evidence, and development constraints translated into positioning, payer-relevant narratives, and partner-ready materials that internal teams can execute.",
    icon: Sparkles,
  },
  {
    title: "Disciplined execution",
    description:
      "Senior advisors deliver governance-ready outputs on defined timelines — integrated with your R&D, regulatory, and commercial leads rather than parallel workstreams.",
    icon: Clock,
  },
  {
    title: "Senior advisory model",
    description:
      "Direct access to experienced operators; clear accountability, concise governance, and materials suitable for boards, investors, and agency interactions.",
    icon: HeartHandshake,
  },
  {
    title: "Patient-centered outcomes",
    description:
      "Recommendations anchored to functional vision endpoints, treatment burden, and real-world implications for patients and treating specialists.",
    icon: Target,
  },
] as const;

/** Homepage: fewer, larger trust pillars */
export const whyChooseHome = [
  whyChoose[0],
  whyChoose[1],
  whyChoose[2],
  whyChoose[5],
] as const;

export const expertiseAreas = [
  { title: "Retina therapeutics", icon: Activity },
  { title: "Gene therapy", icon: Sparkles },
  { title: "Ocular surface disease", icon: Microscope },
  { title: "Rare ophthalmic disorders", icon: BadgeCheck },
  { title: "Clinical development", icon: GraduationCap },
  { title: "Commercialization readiness", icon: HeartHandshake },
] as const;

/** Homepage: editorial expertise (no duplicate grid) */
export const expertiseHome = [
  {
    title: "Retina therapeutics",
    icon: Activity,
    description:
      "Endpoint hierarchies, imaging governance, and trial operations for diabetic retinopathy, AMD, and retinal vein occlusion programs.",
  },
  {
    title: "Gene therapy",
    icon: Sparkles,
    description:
      "Indication sequencing, long-term follow-up planning, and access implications for subretinal and intravitreal gene-based therapies.",
  },
  {
    title: "Clinical development",
    icon: GraduationCap,
    description:
      "Protocol design, enrollment risk mitigation, and CRO oversight for multi-regional ophthalmic trials.",
  },
  {
    title: "Commercialization readiness",
    icon: HeartHandshake,
    description:
      "Launch governance, medical affairs alignment, and lifecycle planning for specialty-administered ophthalmic therapies.",
  },
] as const;

export const globalRegions = [
  { label: "United States", x: 26, y: 42 },
  { label: "Europe", x: 53, y: 32 },
  { label: "MENA", x: 63, y: 44 },
  { label: "APAC", x: 76, y: 46 },
  { label: "Emerging Markets", x: 58, y: 58 },
] as const;

export const engagementSteps = [
  {
    title: "Strategic assessment",
    description:
      "Structured review of program stage, competitive context, and highest-leverage decisions across development, evidence, and positioning.",
  },
  {
    title: "Regulatory alignment",
    description:
      "Pathway mapping, agency interaction planning, and endpoint strategy grounded in ophthalmic regulatory precedent.",
  },
  {
    title: "Clinical planning",
    description:
      "Trial architecture, imaging and biomarker strategy, and operational planning to keep studies executable and defensible.",
  },
  {
    title: "Market access strategy",
    description:
      "Evidence plans and value narratives aligned to US payer policy and major HTA requirements.",
  },
  {
    title: "Commercialization support",
    description:
      "Launch readiness, medical affairs coordination, and lifecycle planning for first and follow-on indications.",
  },
] as const;

export const leadership = [
  {
    name: "Senior Ophthalmic Advisor",
    role: "Clinical & Translational Strategy",
    years: "25+ years",
    focus:
      "Retina development, imaging endpoints, and evidence generation for pivotal trials and label strategy",
  },
  {
    name: "Regulatory Lead",
    role: "Global Pathway & Agency Strategy",
    years: "20+ years",
    focus:
      "FDA and EMA interactions, briefing packages, and combination-product pathways in ophthalmology",
  },
  {
    name: "Commercial & Access Partner",
    role: "Value, Access, and Launch Readiness",
    years: "18+ years",
    focus:
      "HEOR framing, payer engagement, launch governance, and post-approval lifecycle planning",
  },
] as const;

export const impactMetrics = [
  {
    value: 14,
    suffix: "",
    label: "Ophthalmic products supported through global launch",
    icon: "package" as const,
  },
  {
    value: 30,
    suffix: "+",
    label: "Years of combined leadership experience",
    icon: "users" as const,
  },
  {
    value: 40,
    suffix: "+",
    label: "Regulatory pathways supported",
    icon: "badge" as const,
  },
  {
    value: 25,
    suffix: "+",
    label: "Markets addressed across major regions",
    icon: "globe" as const,
  },
  {
    value: 100,
    suffix: "+",
    label: "Clinical programs advised",
    icon: "activity" as const,
  },
] as const;

/** Homepage: investor-grade metrics row */
export const impactMetricsHome = [
  impactMetrics[0],
  impactMetrics[1],
  impactMetrics[2],
  impactMetrics[3],
] as const;

export const publicationTypes = [
  {
    title: "Whitepapers",
    description:
      "Structured analyses of ophthalmic development strategy, evidence design, and portfolio trade-offs.",
    category: "Research",
  },
  {
    title: "Regulatory insights",
    description:
      "Agency interaction strategy and pathway intelligence for novel ophthalmic mechanisms and delivery platforms.",
    category: "Regulation",
  },
  {
    title: "Market outlooks",
    description:
      "Competitive, access, and pricing dynamics across retina, rare disease, and specialty ophthalmic segments.",
    category: "Commercial",
  },
  {
    title: "Clinical perspectives",
    description:
      "Endpoint strategy, imaging governance, and operational discipline in global ophthalmic trials.",
    category: "Clinical",
  },
  {
    title: "Innovation reports",
    description:
      "Gene therapy, sustained delivery, and modality-specific development and access considerations.",
    category: "Innovation",
  },
] as const;

export const futureTopics = [
  {
    title: "AI in ophthalmology",
    description:
      "Imaging analytics and trial enrichment — with emphasis on regulatory acceptability and operational validation.",
  },
  {
    title: "Precision medicine",
    description:
      "Biomarker-led segmentation and pre-specified subgroup strategy for differentiated assets.",
  },
  {
    title: "Gene therapies",
    description:
      "Vector selection, durability endpoints, and long-term follow-up obligations in retinal programs.",
  },
  {
    title: "Drug delivery innovation",
    description:
      "Sustained-release and intravitreal platforms — CMC, device, and clinical interface planning.",
  },
  {
    title: "Real-world evidence",
    description:
      "RWE frameworks that complement pivotal trials for payers and lifecycle decisions.",
  },
  {
    title: "Vision science innovation",
    description:
      "Translational links between mechanism, imaging findings, and functional vision outcomes.",
  },
] as const;

export const trustPillars = [
  {
    title: "Confidentiality",
    description:
      "NDA-first engagement with information governance appropriate for sensitive clinical and commercial programs.",
  },
  {
    title: "Scientific rigor",
    description:
      "Recommendations grounded in ophthalmic precedent, clinical operability, and explicit assumptions.",
  },
  {
    title: "Ethical standards",
    description:
      "Patient-centered advisory aligned to integrity, transparency, and responsible development practices.",
  },
  {
    title: "Regulatory alignment",
    description:
      "Pathway and evidence strategy designed for productive agency dialogue and defensible decisions.",
  },
  {
    title: "Patient-centered approach",
    description:
      "Focus on functional outcomes, treatment burden, and continuity of care in specialist settings.",
  },
] as const;

export const partners = [
  "Ophthalmic CRO partners",
  "Global biopharma",
  "Emerging biotech",
  "Specialty pharma",
  "Academic research centers",
  "Diagnostics & imaging",
] as const;
