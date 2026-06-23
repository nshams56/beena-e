/** Preferred terminology and phrases to avoid — enforce softly in CMS, strictly in review. */

export const PREFERRED_TERMS = {
  consultation: [
    "Schedule a consultation",
    "Discuss strategic priorities",
    "Confidential consultation",
  ],
  regulatory: [
    "regulatory pathway",
    "agency interaction",
    "Scientific Advice",
    "pre-IND",
    "endpoint acceptability",
  ],
  development: [
    "integrated development plan",
    "clinical program",
    "ophthalmic precedent",
    "evidence generation",
  ],
  access: [
    "market access",
    "HTA",
    "payer engagement",
    "evidence plan",
  ],
  commercial: [
    "launch readiness",
    "medical affairs alignment",
    "lifecycle planning",
  ],
} as const;

export const BANNED_PHRASES = [
  "game-changing",
  "disruptive",
  "revolutionary",
  "world-class",
  "best-in-class",
  "cutting-edge",
  "synergy",
  "leverage synergies",
  "move the needle",
  "low-hanging fruit",
  "think outside the box",
  "paradigm shift",
  "unlock growth",
  "rocket ship",
  "unicorn",
  "crush it",
  "dominate the market",
  "guaranteed results",
  "industry-leading innovation",
  "next-generation breakthrough",
  "elite biotech",
  "thought leader",
] as const;

export const CAUTION_PHRASES = [
  "accelerate",
  "transformative",
  "innovation pipeline",
  "future of ophthalmology",
  "unlock",
  "unprecedented",
  "seamless",
  "holistic",
  "best practices",
  "turnkey",
] as const;
