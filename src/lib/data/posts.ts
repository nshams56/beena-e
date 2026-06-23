import { HOME_IMAGES } from "@/lib/data/home-content";

export type InsightPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  publishedAt: string;
  readTimeMin: number;
  imageGradient: string;
  imageUrl?: string;
  relatedServiceSlug?: string;
  content?: string[];
};

export type InsightPostFull = InsightPost & {
  content: string[];
};

export const staticInsightPosts: InsightPost[] = [
  {
    slug: "emerging-therapies-ophthalmology",
    title: "Ophthalmic Gene Therapy and Next-Generation Modalities: Development Priorities for Sponsors",
    category: "Clinical & Scientific",
    excerpt:
      "How sponsors should sequence indication choice, long-term follow-up, and access planning for retinal gene therapies and advanced biologics.",
    publishedAt: "2026-04-02",
    readTimeMin: 12,
    imageGradient: "from-forest via-forest-elevated to-forest-dark",
    imageUrl: HOME_IMAGES.insight1,
    relatedServiceSlug: "product-development",
  },
  {
    slug: "regulatory-pathways-ophthalmology",
    title: "Global Regulatory Pathways for Novel Ophthalmic Therapies: FDA, EMA, and Regional Considerations",
    category: "Regulatory",
    excerpt:
      "Practical guidance on agency interactions, endpoint acceptability, and harmonization for intravitreal biologics, sustained delivery, and combination products.",
    publishedAt: "2026-03-18",
    readTimeMin: 14,
    imageGradient: "from-emerald-900 via-forest to-forest-dark",
    imageUrl: HOME_IMAGES.insight2,
    relatedServiceSlug: "regulatory-clinical",
  },
  {
    slug: "biomarkers-ophthalmic-drug-development",
    title: "Biomarkers and Imaging in Ophthalmic Trials: Strengthening Regulatory and Payer Evidence",
    category: "Clinical & Scientific",
    excerpt:
      "Translational biomarkers, OCT-based endpoints, and subgroup strategy — linking mechanism to outcomes agencies and payers will scrutinize.",
    publishedAt: "2026-02-10",
    readTimeMin: 11,
    imageGradient: "from-teal-900 via-forest-elevated to-forest",
    imageUrl: HOME_IMAGES.insight3,
    relatedServiceSlug: "product-development",
  },
];

const postBodies: Record<string, string[]> = {
  "emerging-therapies-ophthalmology": [
    "## Where ophthalmic innovation is concentrating",
    "Retinal gene therapy, sustained-release intravitreal platforms, and targeted biologics continue to reshape development portfolios — but the operational burden differs materially by modality. Sponsors that treat these programs like standard small-molecule timelines routinely underestimate CMC slot constraints, surgical administration requirements, and the duration of safety follow-up regulators expect.",
    "## Indication selection under capital and manufacturing constraints",
    "For multi-indication gene therapy pipelines, indication priority should reflect more than prevalence models. Manufacturing batch size, vector platform fit, competitive entry, regulatory path length, and long-term registry commitments can outweigh short-term revenue forecasts. We recommend explicit stage-gate criteria tied to formal agency feedback, not only preclinical efficacy signals.",
    "## Long-term follow-up and post-approval obligations",
    "FDA and EMA expectations for durability of effect and delayed adverse events have lengthened development and post-marketing plans for retinal gene therapies. Sponsors should budget registry design, patient retention, and data capture infrastructure before Phase 2 — not after pivotal readout. Access bodies increasingly ask how long-term safety will be monitored when evaluating budget impact.",
    "## Access and administration burden",
    "Even with strong efficacy, therapies requiring surgical administration or frequent monitoring face payer scrutiny on treatment pathways and site-of-care costs. Early cross-functional alignment between clinical, medical affairs, and access teams prevents trials from generating data that is approvable but difficult to reimburse.",
    "## Implications for portfolio governance",
    "Boards should expect ophthalmic gene therapy portfolios to require disciplined capital allocation, partnership options for ex-US rights, and transparent scenario planning. BEEÑA-E advises sponsors on indication sequencing, agency interaction strategy, and the integration of access evidence into development plans from Phase 2 onward.",
  ],
  "regulatory-pathways-ophthalmology": [
    "## Why ophthalmic regulation is not one global pathway",
    "Novel ophthalmic therapies — particularly intravitreal biologics, depot formulations, and drug-device combinations — often receive different questions from FDA and EMA reviewers even when sponsors pursue harmonized protocols. Endpoint acceptability, durability of effect, and injection-related safety can be interpreted differently across regions.",
    "## Pre-IND and Scientific Advice as leverage points",
    "Formal agency meetings remain among the highest-return activities for ophthalmic programs. Structured briefing packages that present a primary position, supporting precedents, and fallback options reduce ambiguity after interactions. Mock Q&A with clinical, CMC, and regulatory leads present prevents inconsistent responses that delay written feedback.",
    "## Endpoints: structural, functional, and patient-reported measures",
    "Regulators expect clear hierarchies linking mechanism to OCT or angiography findings and to functional vision outcomes. Sponsors should document why chosen endpoints are sensitive to treatment effect in the target population and how missing data and inter-eye correlation are handled statistically — especially in bilateral disease.",
    "## Combination products and sustained delivery",
    "When delivery technology affects pharmacokinetics or administration setting, agencies evaluate CMC, device, and clinical narratives together. Gap analyses should reference ophthalmic combination-product precedents and clarify which studies bridge formulation or device changes without repeating full efficacy trials.",
    "## Regional sequencing after core approvals",
    "US approval does not automatically translate to rapid EU or Asia-Pacific access. HTA evidence requirements, pricing negotiations, and local comparator landscapes should inform country sequencing. Sponsors benefit from a single global evidence plan with defined regional adaptations rather than reactive submissions.",
    "## Practical next steps for development leaders",
    "Regulatory strategy should be revisited at each stage gate with an explicit register of agency questions, precedent changes, and protocol implications. BEEÑA-E supports pathway design, briefing preparation, and cross-functional alignment so regulatory plans remain executable — not theoretical.",
  ],
  "biomarkers-ophthalmic-drug-development": [
    "## Biomarkers as a bridge — not a substitute — for clinical benefit",
    "In ophthalmic development, imaging biomarkers and fluid analytes can enrich trials and support mechanism-of-action claims, but agencies and payers ultimately weigh functional vision outcomes and patient relevance. Sponsors should define which biomarkers are decision-enabling for internal governance versus which are exploratory.",
    "## Imaging charter discipline in retina trials",
    "OCT and angiography readouts are only as credible as acquisition standards and reading center governance. Early investment in imaging charters, training, and quality control reduces attrition in pivotal trials and supports subgroup analyses HTA bodies may request. Inconsistent imaging has delayed more ophthalmic programs than marginal efficacy differences.",
    "## Translational plans from early clinical to Phase 3",
    "Phase 1/2 should explicitly test which biomarkers correlate with functional endpoints in the target population. Without that linkage, sponsors risk advancing compounds with beautiful structural signals and ambiguous clinical benefit — a common payer objection at launch.",
    "## Subgroup and enrichment strategy",
    "Genetic stratification and disease-severity enrichment can improve power but complicate label and access narratives. Statistical plans should pre-specify how subgroups will be presented to regulators and payers, including multiplicity control and interpretability for medical affairs.",
    "## Payer-facing evidence",
    "US and EU payers increasingly request clarity on how imaging changes translate to functional benefit and treatment burden. Integrating biomarker strategy with health economics framing in Phase 2 prevents costly post-hoc analyses after pivotal readout.",
    "## Operational recommendation",
    "Treat biomarker and imaging strategy as a cross-functional workstream — clinical, biostatistics, regulatory, and access — with deliverables at protocol finalization, not as a late-stage consulting add-on. BEEÑA-E supports sponsors in designing evidence that satisfies scientific, regulatory, and reimbursement reviewers.",
  ],
};

export function getStaticPostContent(slug: string): string[] {
  return (
    postBodies[slug] ?? [
      "This perspective is being prepared. Contact BEEÑA-E Consulting to discuss ophthalmic development, regulatory, or commercialization priorities with our senior advisors.",
    ]
  );
}

export function toFullPost(post: InsightPost): InsightPostFull {
  return {
    ...post,
    content: post.content ?? getStaticPostContent(post.slug),
  };
}
