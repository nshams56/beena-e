# Scalability, Roles & Workflows

## Objective

Grow the content library without quality degradation as contributors, editors, and regions increase.

## Roles (recommended)

| Role | Permissions | Responsibilities |
|------|-------------|------------------|
| **Admin** | Supabase `admin` | Users, settings, publish override policy |
| **Editor** | Supabase `editor` | Draft/create posts, media upload |
| **Scientific reviewer** | External / optional login | Accuracy review for clinical/regulatory pieces |
| **Brand owner** | Editorial approval | Tone, positioning, homepage exceptions |

## Workflow states

| Status | Meaning |
|--------|---------|
| `draft` | Work in progress; governance warnings only |
| `published` | Live; **governance errors block save** |
| `archived` | Retained, not promoted |

## Adding contributors

1. Invite via Supabase Auth
2. Profile auto-created as `editor` (see migration trigger)
3. Share `docs/content-operations/README.md` and require checklist training
4. First 2 articles co-reviewed by senior editor

## Growing the insights library

- Target **1–2 quality articles/month** over volume spikes
- Tag categories consistently (Regulatory, Clinical & Scientific, Commercial)
- Map each article to a **related service**
- Refresh top articles annually (date in CMS if `updated_at` exposed later)

## Case studies & services

- **Case studies:** Update `src/lib/data/case-studies.ts` or Supabase `case_studies` following [Case study standards](./03-case-study-standards.md)
- **Services:** Coordinate code + CMS `services` table; detail copy in `service-details.ts` until full service CMS

## SEO expansion

- Monitor Search Console quarterly
- Add articles for high-intent topics (regulatory pathway, gene therapy development, HTA ophthalmology)
- Avoid duplicate topics within 6 months

## Governance maintenance

- Review banned phrase list quarterly (`brand-language.ts`)
- Adjust word-count floors if modality-specific long-form required
- Version major doc changes in git with PR review

## Incident response

- **Factual error live:** unpublish → correct → republish → note in internal log
- **Off-brand tone:** edit draft standards, retrain author, no public comment required

## Tools

| Tool | Use |
|------|-----|
| Admin → Editorial | Live standards summary |
| Admin → Posts | Authoring + publish readiness |
| `docs/content-operations/` | Full policy |
| `src/lib/content-governance/` | Automated rules |
