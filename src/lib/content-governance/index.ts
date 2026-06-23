export {
  CONTENT_LIMITS,
  SERVICE_SLUGS,
  CATEGORY_SERVICE_HINTS,
  type ServiceSlug,
} from "@/lib/content-governance/rules";
export {
  PREFERRED_TERMS,
  BANNED_PHRASES,
  CAUTION_PHRASES,
} from "@/lib/content-governance/brand-language";
export {
  ARTICLE_CONTENT_TEMPLATE,
  ARTICLE_AUTHORING_NOTES,
} from "@/lib/content-governance/article-template";
export {
  assessPostContent,
  countWords,
  countSectionHeadings,
  hasBlockingIssues,
  type ContentIssue,
  type PostDraftFields,
} from "@/lib/content-governance/validate-post";
