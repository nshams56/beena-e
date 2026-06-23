/** CMS article skeleton — headings use ## prefix (rendered as H2 on site). */

export const ARTICLE_CONTENT_TEMPLATE = `## Executive summary

[2–3 sentences: what changed in the landscape, why it matters to ophthalmic sponsors now, and the decision this article supports.]

## Strategic context

[Industry or program context: competitive dynamics, modality trends, capital constraints, or governance milestones. Be specific to retina, cornea, gene therapy, or relevant segment.]

## Regulatory and scientific implications

[FDA, EMA, or regional considerations; endpoints, imaging, biomarkers, combination products, or long-term follow-up as applicable. Reference precedents, not vague "evolving standards."]

## Commercial and access considerations

[Payer, HTA, pricing, administration burden, or launch sequencing — only where relevant to the topic.]

## Operational challenges for sponsors

[Cross-functional realities: CMC slots, CRO capacity, medical affairs timing, evidence gaps, or regional harmonization.]

## Practical recommendations

[Numbered or short paragraphs with actionable guidance for development, regulatory, or commercial leaders.]

## Key takeaways

- [Takeaway 1 — specific and defensible]
- [Takeaway 2]
- [Takeaway 3]

## Related advisory support

[Brief line linking to BEEÑA-E service area — e.g. regulatory pathway design, launch readiness. Do not use hype language.]`;

export const ARTICLE_AUTHORING_NOTES = [
  "Separate paragraphs with a blank line.",
  "Use ## for section headings (site renders these as H2). Do not skip heading levels.",
  "Target 900–1,400 words for published articles (8–14 min read).",
  "Select a related service in the CMS for internal linking.",
  "Cover image: ophthalmic-relevant, restrained grading; avoid generic lab clichés.",
] as const;
