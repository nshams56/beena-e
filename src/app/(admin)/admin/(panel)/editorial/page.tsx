import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import {
  ARTICLE_AUTHORING_NOTES,
  BANNED_PHRASES,
  CAUTION_PHRASES,
  CONTENT_LIMITS,
  PREFERRED_TERMS,
} from "@/lib/content-governance";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Editorial Standards",
  description: "Content operations and editorial governance for BEEÑA-E Consulting.",
  path: "/admin/editorial",
  noIndex: true,
});

const DOC_SECTIONS = [
  {
    title: "Editorial governance",
    file: "01-editorial-governance.md",
    summary: "Tone, structure, and credibility standards for all content types.",
  },
  {
    title: "Article framework",
    file: "02-article-framework.md",
    summary: "Executive article template and depth requirements for Insights.",
  },
  {
    title: "Case study standards",
    file: "03-case-study-standards.md",
    summary: "Portfolio entries that read as real consulting engagements.",
  },
  {
    title: "SEO content system",
    file: "04-seo-content-system.md",
    summary: "Titles, metadata, schema, slugs, and OG image rules.",
  },
  {
    title: "Brand language",
    file: "05-brand-language.md",
    summary: "Preferred terminology and phrases to avoid.",
  },
  {
    title: "Internal linking",
    file: "06-internal-linking.md",
    summary: "Service, article, and portfolio cross-link strategy.",
  },
  {
    title: "Media guidelines",
    file: "07-media-guidelines.md",
    summary: "Covers, OG graphics, and cinematic restraint.",
  },
  {
    title: "RISE Pakistan Health",
    file: "08-rise-pakistan-health.md",
    summary: "Sub-brand tone: warm, accessible, enterprise-consistent.",
  },
  {
    title: "Pre-publish checklist",
    file: "09-pre-publish-checklist.md",
    summary: "Final review before any public content goes live.",
  },
  {
    title: "Scalability & roles",
    file: "10-scalability-roles.md",
    summary: "Multi-editor workflows and quality ownership.",
  },
] as const;

export default function EditorialStandardsPage() {
  return (
    <>
      <AdminPageHeader
        title="Editorial standards"
        description="Governance for institutional-quality publishing across the site and CMS."
      />

      <div className="space-y-8">
        <section className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="font-semibold text-neutral-900">Publishing limits (enforced in CMS)</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              Published articles: minimum {CONTENT_LIMITS.article.minWordsPublished} words,{" "}
              {CONTENT_LIMITS.article.minSectionHeadings}+ section headings (
              <code className="text-xs">## </code>), cover image required
            </li>
            <li>
              Excerpt: {CONTENT_LIMITS.excerpt.min}–{CONTENT_LIMITS.excerpt.max} characters
            </li>
            <li>
              Meta description: {CONTENT_LIMITS.metaDescription.min}–
              {CONTENT_LIMITS.metaDescription.max} characters recommended
            </li>
          </ul>
          <p className="mt-4 text-sm">
            <Link href="/admin/posts/new" className="font-medium text-forest hover:text-gold">
              Create post
            </Link>
            {" — use Publish readiness panel when editing."}
          </p>
        </section>

        <section className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="font-semibold text-neutral-900">Article authoring notes</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
            {ARTICLE_AUTHORING_NOTES.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-red-200/80 bg-red-50/50 p-6">
            <h2 className="font-semibold text-red-900">Do not use</h2>
            <ul className="mt-3 max-h-48 space-y-1 overflow-y-auto text-xs text-red-900">
              {BANNED_PHRASES.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-amber-200/80 bg-amber-50/50 p-6">
            <h2 className="font-semibold text-amber-950">Use with caution</h2>
            <ul className="mt-3 space-y-1 text-xs text-amber-950">
              {CAUTION_PHRASES.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="font-semibold text-neutral-900">Preferred language</h2>
          <dl className="mt-4 space-y-4 text-sm">
            {Object.entries(PREFERRED_TERMS).map(([key, phrases]) => (
              <div key={key}>
                <dt className="font-medium capitalize text-forest">{key}</dt>
                <dd className="mt-1 text-muted">{phrases.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="font-semibold text-neutral-900">Full documentation (repository)</h2>
          <p className="mt-2 text-sm text-muted">
            Complete governance lives in{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs">
              docs/content-operations/
            </code>
            . Share with contributors, legal review, and new editors.
          </p>
          <ul className="mt-4 space-y-3">
            {DOC_SECTIONS.map((doc) => (
              <li key={doc.file} className="text-sm">
                <span className="font-medium text-neutral-900">{doc.title}</span>
                <span className="text-muted"> — {doc.summary}</span>
                <br />
                <code className="text-xs text-muted">docs/content-operations/{doc.file}</code>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
