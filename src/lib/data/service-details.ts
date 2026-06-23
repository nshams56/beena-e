import { STOCK_IMAGES } from "@/lib/data/stock-images";
import type { AccordionItem } from "@/components/ui/accordion";

export type ServiceDetail = {
  slug: string;
  title: string;
  summary: string;
  body: string[];
  outcomes: string[];
  imageUrl: string;
  faqs: AccordionItem[];
};

const strategyFaqs: AccordionItem[] = [
  {
    id: "strategy-1",
    question: "When should sponsors engage strategy advisory?",
    answer:
      "Before major portfolio reallocations, partnership or licensing decisions, financing events, or when the board requires an independent ophthalmic view on indication priority, competitive positioning, or deal structure.",
  },
  {
    id: "strategy-2",
    question: "Do you support investor diligence and board materials?",
    answer:
      "Yes. We prepare science-led development scenarios, competitive context, and risk registers that withstand investor, board, and scientific advisory committee review — with clear assumptions and sensitivity cases.",
  },
  {
    id: "strategy-3",
    question: "How do you work with internal R&D and BD teams?",
    answer:
      "We embed with sponsor leadership as an extension of the team — participating in governance forums, diligence workstreams, and cross-functional planning without creating parallel consulting layers.",
  },
];

export const staticServiceDetails: Record<string, ServiceDetail> = {
  "strategy-advisory": {
    slug: "strategy-advisory",
    title: "Strategy & Advisory",
    summary:
      "Portfolio prioritization, indication sequencing, and partnership strategy for ophthalmic sponsors — grounded in scientific differentiation, regulatory feasibility, and commercial realism.",
    body: [
      "Ophthalmic sponsors routinely face decisions that bind capital for years: which indication to advance first, whether to pursue regional partnerships, and how to position an asset for the next financing or governance milestone. Strategy advisory at BEEÑA-E is built for those decisions — not generic market landscaping.",
      "We assess programs through an integrated lens: mechanism and clinical differentiation, regulatory precedents in retina, cornea, and rare ophthalmic disease, competitive timelines, and the operational requirements of global development. Outputs are designed for executive committees, boards, and transaction counterparties who expect defensible assumptions.",
      "Typical engagements include indication prioritization under capital constraints, asset and portfolio valuations for BD and licensing, alliance structuring support, and preparation of board- and investor-ready narratives. We also advise on scientific advisory committee preparation and external expert alignment where independent ophthalmic judgment is required.",
      "Our advisors have supported multi-asset gene therapy portfolios, first-in-class biologics, and platform technologies across US and EU footprints. We emphasize traceable logic, explicit trade-offs, and alignment with downstream regulatory, clinical, and access planning — so strategy does not live in isolation from execution.",
    ],
    outcomes: [
      "Board-ready indication and portfolio prioritization with documented trade-offs",
      "Partnership, licensing, and regional rights strategy aligned to development risk",
      "Investor and diligence materials with ophthalmic-specific competitive context",
      "Integrated timelines linking scientific, regulatory, and commercial milestones",
      "Governance frameworks for portfolio decisions and stage-gate criteria",
    ],
    imageUrl: STOCK_IMAGES.portfolioStrategy,
    faqs: strategyFaqs,
  },
  "product-development": {
    slug: "product-development",
    title: "Product Development",
    summary:
      "Integrated development planning across CMC, nonclinical, and clinical functions — with ophthalmic endpoint, imaging, and operational specificity from preclinical through late-stage programs.",
    body: [
      "Ophthalmic development programs fail quietly when CMC, clinical, and regulatory workstreams drift apart — particularly for intravitreal biologics, sustained-delivery platforms, and combination products where delivery science shapes trial design and agency expectations.",
      "BEEÑA-E supports sponsors in building integrated development plans (IDPs) that connect manufacturing scale-up, nonclinical packages, and clinical protocols to fundable milestones. We stress-test assumptions with regulatory and clinical operators who have navigated FDA and EMA interactions for novel ophthalmic modalities.",
      "Endpoint and imaging strategy is central to our work. We align structural and functional outcomes to mechanism, precedent trials, and payer-relevant evidence — including OCT, microperimetry, visual acuity hierarchies, and patient-reported measures where appropriate. Early alignment reduces costly protocol amendments and supports consistent narratives for agencies and HTA bodies.",
      "We advise on CRO and specialty vendor selection, ophthalmic core lab governance, and clinical operations planning for multi-country retina trials. Risk registers, critical path analyses, and scenario planning help leadership teams allocate capital with visibility into what drives timeline and probability of success.",
    ],
    outcomes: [
      "Integrated development plans linking CMC, nonclinical, and clinical milestones",
      "Endpoint and imaging strategy aligned to regulatory precedent and payer relevance",
      "Protocol and statistical input for Phase 1–3 ophthalmic trials",
      "CRO and vendor selection criteria with ophthalmic capability weighting",
      "Development risk registers and critical-path scenarios for governance review",
    ],
    imageUrl: STOCK_IMAGES.portfolioLab,
    faqs: [
      {
        id: "dev-1",
        question: "Which development stages do you support?",
        answer:
          "Preclinical through Phase 3 and launch preparation. Early engagement is most valuable when delivery technology, endpoint strategy, or CMC complexity will shape the clinical path.",
      },
      {
        id: "dev-2",
        question: "How do you approach ophthalmic endpoints and imaging?",
        answer:
          "We map endpoints to mechanism and regulatory precedent, define imaging charter requirements, and align analysis plans with agencies and HTA expectations — including composite endpoints and hierarchical testing where justified.",
      },
      {
        id: "dev-3",
        question: "Can you support combination and sustained-delivery products?",
        answer:
          "Yes. We coordinate CMC, device, and clinical narratives for combination products and platforms where pharmacokinetics, depot behavior, and surgical administration affect trial design and labeling strategy.",
      },
    ],
  },
  "regulatory-clinical": {
    slug: "regulatory-clinical",
    title: "Regulatory & Clinical",
    summary:
      "Global regulatory pathway design, agency interaction strategy, and clinical program oversight for ophthalmic sponsors — from pre-IND and Scientific Advice through approval and post-marketing commitments.",
    body: [
      "Regulatory strategy in ophthalmology requires more than checklist submissions. Novel mechanisms, intravitreal administration, gene therapies, and combination products each carry distinct FDA and EMA expectations for nonclinical packages, clinical endpoints, and long-term follow-up.",
      "BEEÑA-E designs pathway strategies that anticipate agency questions before they become delays. We conduct gap analyses against ophthalmic precedents, structure pre-IND, Type B/C, and Scientific Advice interactions, and prepare briefing packages with clear positions, supporting data, and fallback options.",
      "Clinical oversight spans protocol design, statistical considerations, and operational feasibility for retina and anterior segment trials. We support DSMB charter input, enrollment risk mitigation, and cross-region harmonization when US and EU requirements diverge on endpoints or follow-up duration.",
      "For sponsors managing multiple regions, we map parallel pathways across FDA, EMA, PMDA, and selected emerging markets — identifying where a single global protocol is viable and where local adaptations protect approval timelines without fragmenting the evidence base.",
    ],
    outcomes: [
      "Global regulatory pathway assessments with agency-specific risk flags",
      "Briefing packages, Q&A preparation, and response strategies for formal meetings",
      "Protocol and amendment review aligned to ophthalmic regulatory precedent",
      "Combination-product and novel-delivery regulatory coordination (CMC + clinical)",
      "Post-approval commitment planning and lifecycle regulatory governance",
    ],
    imageUrl: STOCK_IMAGES.insightRegulatory,
    faqs: [
      {
        id: "reg-1",
        question: "Which regulatory authorities do you cover?",
        answer:
          "FDA, EMA, PMDA, and priority emerging markets. Our work is informed by ophthalmic precedents, published guidance, and direct interaction experience across retinal and anterior segment programs.",
      },
      {
        id: "reg-2",
        question: "Do you attend agency meetings with sponsors?",
        answer:
          "We routinely prepare briefing documents, anticipated questions, and response strategies. Meeting attendance is arranged based on sponsor preference, meeting format, and internal regulatory resourcing.",
      },
      {
        id: "reg-3",
        question: "Can you support gene therapy and long-term follow-up requirements?",
        answer:
          "Yes. We address durability of effect, long-term safety follow-up, registry commitments, and access implications that often accompany retinal gene therapy approvals.",
      },
    ],
  },
  "market-access": {
    slug: "market-access",
    title: "Market Access",
    summary:
      "Evidence planning and payer engagement for ophthalmic therapies — aligning clinical development choices with HTA, reimbursement, and formulary expectations in the US, EU, and selected global markets.",
    body: [
      "Market access failures in ophthalmology often originate in development: endpoints that regulators accept but payers question, subgroup plans that cannot support pricing, or evidence packages assembled too late to influence trial design.",
      "BEEÑA-E works with medical, clinical, and commercial leadership to define evidence plans that connect mechanism and trial outcomes to budget impact, treatment pathways, and comparator landscapes. We engage early — typically by Phase 2 — so pivotal trials generate data HTA bodies and US payers can evaluate without supplemental study delays.",
      "We advise on value narrative development, indirect comparison strategy, and country sequencing for launch access. Where specialized HEOR execution is required, we define scope and quality standards for partner teams and integrate outputs into global access planning.",
      "For retina and rare ophthalmic indications, we pay particular attention to imaging-based outcomes, treatment frequency, and administration burden — factors that shape medical policy and physician adoption alongside price.",
    ],
    outcomes: [
      "Evidence generation plans aligned to FDA/EMA and major HTA requirements",
      "Payer and HTA narrative development with ophthalmic comparator context",
      "Endpoint and subgroup recommendations to support reimbursement dialogue",
      "Launch access sequencing and market prioritization frameworks",
      "HEOR workstream governance and specialist partner oversight",
    ],
    imageUrl: STOCK_IMAGES.contactHero,
    faqs: [
      {
        id: "access-1",
        question: "When should access planning begin?",
        answer:
          "No later than Phase 2, and earlier for first-in-class mechanisms or therapies with administration burden that will shape payer policy. Early alignment preserves optionality in pivotal trial design.",
      },
      {
        id: "access-2",
        question: "Do you prepare HTA submissions directly?",
        answer:
          "We lead evidence strategy, dossier narrative, and gap analysis; specialist HEOR partners often execute country submissions under our scientific and ophthalmic oversight.",
      },
      {
        id: "access-3",
        question: "How do you address US and EU evidence differences?",
        answer:
          "We map parallel payer and HTA pathways, identify harmonizable endpoints, and flag where supplemental analyses or subgroup plans are required to avoid post-approval access delays.",
      },
    ],
  },
  commercialization: {
    slug: "commercialization",
    title: "Commercialization",
    summary:
      "Launch readiness, medical affairs alignment, and lifecycle planning for ophthalmic therapies — coordinating medical, access, and commercial teams ahead of first approval and indication expansion.",
    body: [
      "Commercialization in ophthalmology depends on disciplined cross-functional preparation: medical narrative consistency, field medical readiness, access milestones, and supply continuity for products administered in specialist settings.",
      "BEEÑA-E supports sponsors with launch readiness assessments that surface interdependencies across medical affairs, marketing, market access, and operations. For first-in-class intravitreal and surgical-administered therapies, we emphasize KOL engagement plans, publication sequencing, and congress strategy tied to regulatory milestones.",
      "We help teams define launch governance — decision rights, cadence, and escalation paths — so regional launches do not diverge on medical claims or patient support models. Post-launch, we advise on lifecycle expansion, indication sequencing, and evidence generation as real-world use and competitive entries evolve.",
      "Our advisors have supported US and EU first-wave launches for novel biologics where medical affairs and access had to move in parallel under tight regulatory timelines and scrutiny from payers and professional societies.",
    ],
    outcomes: [
      "Launch readiness assessments with cross-functional gap remediation plans",
      "Medical affairs strategy: publications, MSL priorities, and KOL engagement",
      "Core medical narrative and objection handling aligned to label and evidence",
      "Regional launch sequencing and governance models",
      "Lifecycle and indication-expansion planning with evidence roadmaps",
    ],
    imageUrl: STOCK_IMAGES.portfolioLaunch,
    faqs: [
      {
        id: "comm-1",
        question: "How far before launch should planning begin?",
        answer:
          "For first-in-class assets, 12–18 months before anticipated approval in the lead market. Earlier engagement is warranted when access negotiations and medical narrative must converge before approval.",
      },
      {
        id: "comm-2",
        question: "Do you support medical affairs and MSL planning?",
        answer:
          "Yes — including publication planning, congress strategy, medical training priorities, and field medical resource models aligned to launch and access milestones.",
      },
      {
        id: "comm-3",
        question: "Can you advise after launch?",
        answer:
          "We support lifecycle management, competitive response, indication expansion, and evidence updates as real-world data and payer feedback accumulate.",
      },
    ],
  },
};
