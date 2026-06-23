# Internal Linking Strategy

## Goals

- Strengthen topical authority for ophthalmic advisory services
- Guide executives from education → capability → consultation
- Support crawl paths without keyword stuffing

## Link map

```
Homepage sections (fixed)
    ↓
Services hub → Service detail
    ↑↓
Insights article ←→ Related service (CMS field)
    ↑↓
Portfolio case study → Service slug(s) + optional insight
    ↓
/book · /contact (primary conversion)
```

## Rules by content type

### Insights

| Link type | Rule |
|-----------|------|
| Related service | Set `related_service_slug` in CMS (*warning if missing*) |
| Consultation | Via page CTA banner + “Continue exploring” nav |
| Other articles | Related posts component (same site) |
| Portfolio | Mention in prose only when a public case exists |

### Portfolio

- Link each case to 1–3 `service_slugs`
- Optional `relatedInsightSlug` for thematic articles
- CTA: default site banner → `/book`

### Services

- Detail pages link to 3 related services
- CTA: “Discuss [service] priorities” → `/book`

### About

- Links to services, insights, consultation (existing components)

## Anchor text

- Descriptive: “Regulatory & Clinical advisory” not “click here”
- No exact-match repetition across every page

## Footer

- Persistent links to core services and legal pages
- Contact and consultation paths always available

## Future CMS fields (optional)

- `posts.related_portfolio_slug`
- `case_studies.related_insight_slug` (implemented in static data)

## SEO note

Internal links should use **root-relative** paths (`/services/regulatory-clinical`).
