import { BANNED_PHRASES, CAUTION_PHRASES } from "@/lib/content-governance/brand-language";
import { CONTENT_LIMITS } from "@/lib/content-governance/rules";

export type ContentIssue = {
  severity: "error" | "warning" | "info";
  field?: string;
  message: string;
};

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function countSectionHeadings(content: string): number {
  return content.split("\n").filter((line) => line.trim().startsWith("## ")).length;
}

function findPhrases(text: string, phrases: readonly string[]): string[] {
  const lower = text.toLowerCase();
  return phrases.filter((p) => lower.includes(p.toLowerCase()));
}

export type PostDraftFields = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "draft" | "published" | "archived";
  coverImageUrl?: string;
  categoryId?: string;
  metaTitle?: string;
  metaDescription?: string;
  readTimeMin?: number;
  relatedServiceSlug?: string;
};

export function assessPostContent(fields: PostDraftFields): ContentIssue[] {
  const issues: ContentIssue[] = [];
  const isPublishing = fields.status === "published";
  const words = countWords(fields.content);
  const headings = countSectionHeadings(fields.content);
  const excerptLen = fields.excerpt.trim().length;
  const metaDesc = (fields.metaDescription || fields.excerpt).trim();
  const metaTitle = (fields.metaTitle || fields.title).trim();

  if (fields.title.length < CONTENT_LIMITS.title.min) {
    issues.push({ severity: "error", field: "title", message: "Title is too short for executive readability." });
  }
  if (fields.title.length > CONTENT_LIMITS.title.max) {
    issues.push({ severity: "warning", field: "title", message: "Title may truncate in search results." });
  }

  if (excerptLen < CONTENT_LIMITS.excerpt.min) {
    issues.push({
      severity: isPublishing ? "error" : "warning",
      field: "excerpt",
      message: `Excerpt should be at least ${CONTENT_LIMITS.excerpt.min} characters.`,
    });
  }
  if (excerptLen > CONTENT_LIMITS.excerpt.max) {
    issues.push({
      severity: "warning",
      field: "excerpt",
      message: `Excerpt exceeds ${CONTENT_LIMITS.excerpt.max} characters — may truncate in listings.`,
    });
  }

  if (metaDesc.length < CONTENT_LIMITS.metaDescription.min && isPublishing) {
    issues.push({
      severity: "warning",
      field: "metaDescription",
      message: "Meta description is short for SEO (aim for 120–160 characters).",
    });
  }
  if (metaDesc.length > CONTENT_LIMITS.metaDescription.max) {
    issues.push({
      severity: "warning",
      field: "metaDescription",
      message: "Meta description may truncate in search results.",
    });
  }

  if (metaTitle.length > CONTENT_LIMITS.metaTitle.max) {
    issues.push({ severity: "warning", field: "metaTitle", message: "SEO title may truncate in search." });
  }

  const minWords = isPublishing
    ? CONTENT_LIMITS.article.minWordsPublished
    : CONTENT_LIMITS.article.minWordsDraft;

  if (words < minWords) {
    issues.push({
      severity: isPublishing ? "error" : "info",
      field: "content",
      message: `Article is ~${words} words; published insights require at least ${CONTENT_LIMITS.article.minWordsPublished} words.`,
    });
  }

  if (headings < CONTENT_LIMITS.article.minSectionHeadings && isPublishing) {
    issues.push({
      severity: "error",
      field: "content",
      message: `Use at least ${CONTENT_LIMITS.article.minSectionHeadings} section headings (lines starting with ## ).`,
    });
  }

  if (isPublishing && !fields.coverImageUrl?.trim()) {
    issues.push({
      severity: "error",
      field: "coverImageUrl",
      message: "Published articles require a cover image (1200×630 recommended for OG).",
    });
  }

  if (isPublishing && !fields.categoryId) {
    issues.push({
      severity: "warning",
      field: "categoryId",
      message: "Assign a category for filtering and editorial consistency.",
    });
  }

  if (isPublishing && !fields.relatedServiceSlug) {
    issues.push({
      severity: "warning",
      field: "relatedServiceSlug",
      message: "Select a related service for internal linking and authority.",
    });
  }

  const banned = findPhrases(
    `${fields.title} ${fields.excerpt} ${fields.content}`,
    BANNED_PHRASES,
  );
  for (const phrase of banned) {
    issues.push({
      severity: "error",
      field: "content",
      message: `Remove hype language: "${phrase}"`,
    });
  }

  const caution = findPhrases(
    `${fields.title} ${fields.excerpt} ${fields.content}`,
    CAUTION_PHRASES,
  );
  for (const phrase of caution.slice(0, 3)) {
    issues.push({
      severity: "warning",
      field: "content",
      message: `Review tone — "${phrase}" may read as marketing-heavy.`,
    });
  }

  if (fields.readTimeMin && fields.readTimeMin < CONTENT_LIMITS.article.targetReadMinutes.min && isPublishing) {
    issues.push({
      severity: "info",
      field: "readTimeMin",
      message: "Read time suggests a brief piece; confirm depth meets executive standards.",
    });
  }

  return issues;
}

export function hasBlockingIssues(issues: ContentIssue[]): boolean {
  return issues.some((i) => i.severity === "error");
}
