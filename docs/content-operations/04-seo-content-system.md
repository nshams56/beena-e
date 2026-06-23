# SEO Content System

## Title structures

| Page type | Pattern | Example |
|-----------|---------|---------|
| Insights | Specific topic \| BEEÑA-E Consulting | Auto via title template |
| Services | Service name \| BEEÑA-E Consulting | Regulatory & Clinical |
| Portfolio | Engagement title \| BEEÑA-E Consulting | |
| Static pages | Descriptive \| BEEÑA-E Consulting | About, Contact |

- Keep CMS post titles **under 90 characters**
- SEO title override: **30–60 characters** when customizing

## Meta descriptions

- **120–160 characters** (enforced as warning in CMS)
- Include topic + sponsor relevance + neutral value statement
- Defaults to excerpt if blank at publish

## Slugs

- Lowercase, hyphenated: `regulatory-pathways-ophthalmology`
- No dates in slugs unless editorial archive strategy requires it
- Do not change slugs after publish without 301 plan

## Heading hierarchy (on-page)

- One H1 per page (PageHero)
- Article body: H2 via `##` only
- No H3 in CMS body until renderer supports `###` (future)

## Internal linking

See [Internal linking](./06-internal-linking.md).

Minimum per published article:

- Related service (CMS `related_service_slug`)
- Site-wide footer and consultation CTAs

## Schema

| Type | Where |
|------|--------|
| ProfessionalService | Homepage (`OrganizationJsonLd`) |
| BlogPosting | `/insights/[slug]` |
| Canonical | All pages via `buildPageMetadata` |

When publishing CMS posts, ensure `published_at` is set (automatic on publish).

## Open Graph

- Default OG image: site logo
- **Recommended:** 1200×630 cover per article (stored in `cover_image_url`)
- Article OG type: `article` with `publishedTime`

## Canonical URLs

- Set `NEXT_PUBLIC_SITE_URL` in production
- All metadata uses `alternates.canonical`

## Sitemap & robots

- `/sitemap.xml` includes static routes + services + insights + portfolio
- `/admin` disallowed in `robots.txt`
- Revalidation on post publish via Next.js `revalidatePath`

## Technical QA

- [ ] Unique title and description per URL
- [ ] Cover image loads over HTTPS
- [ ] No duplicate H1
- [ ] Live URL returns 200 after publish
