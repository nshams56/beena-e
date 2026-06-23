/** Single source of truth for content limits — used by CMS validation and docs. */

export const CONTENT_LIMITS = {
  title: { min: 12, max: 90, ideal: 70 },
  slug: { max: 80 },
  excerpt: { min: 40, max: 160, ideal: 155 },
  metaTitle: { min: 30, max: 60, ideal: 55 },
  metaDescription: { min: 120, max: 160, ideal: 155 },
  article: {
    minWordsDraft: 150,
    minWordsPublished: 900,
    minSectionHeadings: 4,
    minParagraphs: 8,
    targetReadMinutes: { min: 8, max: 18 },
  },
  caseStudy: {
    minWordsChallenge: 80,
    minWordsApproach: 80,
    minResults: 4,
  },
} as const;

export const SERVICE_SLUGS = [
  "strategy-advisory",
  "product-development",
  "regulatory-clinical",
  "market-access",
  "commercialization",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const CATEGORY_SERVICE_HINTS: Record<string, ServiceSlug> = {
  Regulatory: "regulatory-clinical",
  "Clinical & Scientific": "product-development",
  Clinical: "product-development",
  Commercial: "commercialization",
  Strategy: "strategy-advisory",
  Access: "market-access",
};
