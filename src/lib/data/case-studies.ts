import { STOCK_IMAGES } from "@/lib/data/stock-images";

export type CaseStudy = {
  slug: string;
  title: string;
  clientLabel: string;
  summary: string;
  challenge: string;
  approach: string;
  results: string[];
  metrics: { label: string; value: string }[];
  serviceSlugs: string[];
  relatedInsightSlug?: string;
  imageGradient: string;
  imageUrl?: string;
};

export const staticCaseStudies: CaseStudy[] = [
  {
    slug: "global-launch-ophthalmic-biologic",
    title: "Global Launch Readiness for a Novel Intravitreal Biologic",
    clientLabel: "Top-20 biopharma sponsor",
    summary:
      "Cross-functional launch governance and medical affairs alignment for a first-in-class intravitreal therapy entering US and EU markets under parallel regulatory review.",
    challenge:
      "The sponsor had strong clinical data but limited internal ophthalmic launch experience. Medical, market access, and commercial teams were planning in parallel without a shared evidence narrative or sequenced access milestones. Payer policy for the mechanism was still forming in major EU markets, and the US medical affairs organization needed a unified core story before approval — with only nine months between expected FDA action and first EU launches.",
    approach:
      "BEEÑA-E led a structured readiness assessment across six workstreams: medical narrative, publications, MSL readiness, access evidence gaps, supply and administration training, and regional launch sequencing. We facilitated governance forums with decision rights and weekly escalation paths, aligned publication and congress plans to label claims under development, and defined US vs EU access scenarios with explicit evidence dependencies. Medical affairs and access leads reviewed a single source-of-truth narrative before field deployment.",
    results: [
      "Established a single launch governance model with documented owners across US and EU regions",
      "Delivered a core medical narrative, objection handling, and publication plan accepted by medical and regulatory leadership",
      "Completed first-wave launches in the US and five major EU markets within the planned window after approval",
      "Reduced post-approval access rework by resolving HTA evidence gaps identified during readiness (Germany, France)",
      "Coordinated MSL and medical training materials with label-aligned claims prior to field deployment",
    ],
    metrics: [
      { label: "Markets in first wave", value: "12" },
      { label: "Readiness window", value: "9 mo" },
      { label: "Workstreams governed", value: "6" },
    ],
    serviceSlugs: ["commercialization", "market-access"],
    relatedInsightSlug: "regulatory-pathways-ophthalmology",
    imageGradient: "from-forest via-emerald-900 to-forest-dark",
    imageUrl: STOCK_IMAGES.portfolioLaunch,
  },
  {
    slug: "regulatory-pathway-sustained-delivery",
    title: "Regulatory Pathway for a Sustained-Delivery Ophthalmic Platform",
    clientLabel: "Emerging biotech sponsor",
    summary:
      "FDA and EMA pathway strategy for a sustained-delivery platform with novel CMC, device interfaces, and clinical endpoints — enabling aligned Phase 2 initiation.",
    challenge:
      "The program combined a depot formulation with a delivery device, creating uncertainty on combination-product jurisdiction, nonclinical bridging, and clinical endpoints acceptable for both agencies. Internal teams had received mixed informal feedback; IND-enabling studies were at risk of rework. The board required a clear pre-IND and Scientific Advice plan before the next financing tranche.",
    approach:
      "We conducted a precedent-based gap analysis across FDA and EMA ophthalmic filings for sustained-release and intravitreal platforms, then built an interaction strategy with prioritized questions on CMC comparability, ocular pharmacokinetics, and durability endpoints. BEEÑA-E drafted briefing packages, facilitated mock agency Q&A, and aligned clinical and CMC leads on a single development narrative. Protocol refinements addressed injection burden, visit schedules, and imaging readouts before formal meetings.",
    results: [
      "Achieved productive pre-IND and EMA Scientific Advice outcomes with agreed Phase 2 endpoint framework",
      "Aligned CMC, device, and clinical teams on a single regulatory storyline and study sequence",
      "Initiated Phase 2 on the sponsor’s target timeline with protocol elements accepted by both agencies",
      "Avoided repeat nonclinical studies by clarifying bridging requirements in formal feedback",
      "Provided board-ready regulatory risk summary tied to capital plan milestones",
    ],
    metrics: [
      { label: "Formal agency interactions", value: "4" },
      { label: "Protocol iterations pre-Phase 2", value: "2" },
    ],
    serviceSlugs: ["regulatory-clinical", "product-development"],
    relatedInsightSlug: "regulatory-pathways-ophthalmology",
    imageGradient: "from-teal-900 via-forest-elevated to-forest",
    imageUrl: STOCK_IMAGES.portfolioRegulatory,
  },
  {
    slug: "portfolio-strategy-gene-therapy",
    title: "Portfolio Strategy for an Ophthalmic Gene Therapy Pipeline",
    clientLabel: "Specialty pharma sponsor",
    summary:
      "Indication prioritization and partnership strategy for a five-asset retinal gene therapy portfolio under capital constraints.",
    challenge:
      "Five retinal indications competed for the same development budget. Scientific leads disagreed on lead indication; BD had three active regional partnership discussions with inconsistent data packages. The board needed a transparent prioritization framework that incorporated regulatory complexity, manufacturing slot constraints, and competitive entry timelines — not only peak sales estimates.",
    approach:
      "BEEÑA-E led a structured assessment across scientific differentiation, regulatory path length, CMC complexity, and commercial attractiveness for each indication. We modeled development scenarios with explicit assumptions, stress-tested manufacturing and long-term follow-up burdens, and prepared partnership teasers with aligned data rooms. A governance workshop presented trade-offs to the board with recommended capital allocation and ex-US rights strategy.",
    results: [
      "Board-approved portfolio prioritization with documented criteria and reallocation to the lead indication",
      "Structured outreach for ex-US rights with consistent diligence materials across three partnership tracks",
      "Deferred lower-priority indications with defined stage-gate criteria for reactivation",
      "Aligned R&D and BD on a single narrative for investor updates in the following quarter",
    ],
    metrics: [
      { label: "Pipeline assets assessed", value: "5" },
      { label: "Active partnership tracks", value: "3" },
    ],
    serviceSlugs: ["strategy-advisory"],
    relatedInsightSlug: "emerging-therapies-ophthalmology",
    imageGradient: "from-emerald-950 via-forest to-forest-dark",
    imageUrl: STOCK_IMAGES.portfolioStrategy,
  },
];
