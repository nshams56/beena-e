# BEEÑA-E Content Operations & Editorial Governance

This folder is the **institutional publishing system** for the BEEÑA-E Consulting website. It defines how content is written, reviewed, published, and maintained at enterprise quality.

**Audience:** Editors, contributors, scientific reviewers, marketing leads, and developers.

**CMS enforcement:** Rules marked *enforced* are validated in the admin post editor (`/admin/posts`) via `src/lib/content-governance/`. See also **Admin → Editorial** for a live summary.

---

## Document index

| # | Document | Purpose |
|---|----------|---------|
| 01 | [Editorial governance](./01-editorial-governance.md) | Tone, voice, and standards by content type |
| 02 | [Article framework](./02-article-framework.md) | Insights / thought leadership structure |
| 03 | [Case study standards](./03-case-study-standards.md) | Portfolio / engagement entries |
| 04 | [SEO content system](./04-seo-content-system.md) | Metadata, slugs, schema, OG |
| 05 | [Brand language](./05-brand-language.md) | Preferred terms and banned phrases |
| 06 | [Internal linking](./06-internal-linking.md) | Cross-link strategy |
| 07 | [Media guidelines](./07-media-guidelines.md) | Imagery and OG assets |
| 08 | [RISE Pakistan Health](./08-rise-pakistan-health.md) | Sub-brand editorial rules |
| 09 | [Pre-publish checklist](./09-pre-publish-checklist.md) | Final QA before go-live |
| 10 | [Scalability & roles](./10-scalability-roles.md) | Teams, workflows, growth |

---

## Quick principles

1. **Consultative, not promotional** — Write for biotech executives and program owners.
2. **Specific over generic** — Name modalities, agencies, endpoints, and operational constraints.
3. **Operational realism** — Timelines, governance, and trade-offs must be believable.
4. **Luxury restraint** — Premium brand; no hype, clutter, or startup jargon.
5. **SEO by structure** — Headings, metadata, and internal links are planned, not retrofitted.

---

## Technical references

- Governance code: `src/lib/content-governance/`
- Post validation: `src/lib/validations/post.ts`
- Article template (CMS): insert via **Insert article template** on new/edit post
- DB field: `posts.related_service_slug` (migration `20260531000006_content_governance.sql`)

---

## Homepage & layout

**Do not** add homepage sections or change public page layouts via CMS without a formal product change. Homepage structure is fixed; CMS focuses on Insights, and (future) Services / Portfolio tables.
