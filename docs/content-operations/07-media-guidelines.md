# Media Guidelines

## Brand visual standard

Imagery must feel **cinematic, premium, and restrained** — aligned with the fixed site design system. Do not introduce new filters, heavy tints, or stock-photo clichés in CMS uploads.

## Cover images (Insights)

| Spec | Guidance |
|------|----------|
| Dimensions | **1200×630** minimum (OG aspect) |
| Format | WebP preferred; JPEG acceptable |
| Max file size | 5 MB (Supabase `media` bucket limit) |
| Subject | Ophthalmic science, clinical settings, abstract medical — not generic handshakes |
| Treatment | Site applies subtle grade; **do not** pre-crush blacks or heavy emerald overlays |

### Avoid

- Cheesy lab goggles stock photos
- Over-saturated “sci-fi” eyes
- Logos of other companies or agencies
- Text baked into images (title belongs in HTML)

## Article inline media

- Not supported in CMS body today — use cover + prose
- Future: approved figure workflow via media library

## OG / social preview

- Uses cover image when set; else site logo
- Verify preview in LinkedIn Post Inspector / Twitter Card Validator before major launches

## Portfolio / case study heroes

- Same restraint as insights
- Gradient fallbacks exist in code — prefer real photography when available

## RISE Pakistan Health

- Warmer, human, community context permitted
- Still avoid low-quality clip art; maintain dignity and professionalism

## Alt text

- Cover alt defaults to article title — ensure title is descriptive
- Alt must not be keyword-stuffed

## Rights

- Only upload images with **license or client approval**
- Document source in internal asset log (outside CMS)

## Upload path

Admin post editor → **Upload image** → Supabase `media` bucket → public URL stored in `cover_image_url`
