# BEEÑA-E Consulting — Implementation Blueprint

**Document type:** Senior engineering implementation plan  
**Status:** Approved planning document — use before any application code  
**Primary stack (required):** [Next.js](https://nextjs.org/) (App Router) · [Supabase](https://supabase.com/) (Auth, Database, Storage)  
**Supporting stack:** Tailwind CSS · Framer Motion · Netlify deployment  
**Visual reference:** Homepage mockup (`assets/` — dark forest green + gold, ophthalmic biotech aesthetic)  
**Requirements source:** Client project document + feature list  

> **Stack mandate:** All application architecture, data, authentication, CMS-like content, forms, newsletter, and booking storage **must** be implemented with **Next.js** on the frontend/API layer and **Supabase** as the backend. Do not substitute alternative backends (Firebase, custom Node API, etc.) without an explicit architecture decision record.

---

## Executive Summary

Rebuild BEEÑA-E Consulting from Duda into a **conversion-focused, SEO-first, Supabase-backed** platform on **Next.js App Router**. The homepage mockup defines the visual north star; the project document defines features (blog, newsletter, booking, admin, portfolio, future forum).

**Approved add-on (full implementation):** **RISE Pakistan Health** — a dedicated sub-brand section on the same site (nav tab + landing page, green/yellow identity, four pillars), clearly attributed as *A Project of Beena-E Consulting, USA*.

Architecture priorities:

- **Next.js:** App Router, React Server Components, Metadata API, Server Actions, `next/image`, ISR/sitemap/robots
- **Supabase:** PostgreSQL, Row Level Security, Auth for admin, Storage for media, RPC for public form inserts
- **Netlify:** Hosting and CI/CD only — not a replacement for Supabase

**Non-negotiables:** Brand spelling (BEEÑA-E / Beeña-e / Beena-e), Squarespace DNS preservation, Google Workspace email continuity, premium UX, accessibility, Core Web Vitals.

---

## 1. Project Architecture

### 1.1 Recommended folder structure

```
beena-e-consulting/
├── .github/workflows/          # CI (lint, typecheck, next build)
├── public/
│   ├── fonts/
│   ├── images/
│   └── icons/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (marketing)/
│   │   ├── (admin)/            # Supabase Auth protected
│   │   ├── api/                # Route handlers (webhooks, revalidation)
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── marketing/
│   │   ├── forms/
│   │   ├── cms/
│   │   └── motion/
│   ├── lib/
│   │   ├── supabase/           # @supabase/ssr clients (required)
│   │   ├── seo/
│   │   ├── validations/
│   │   └── utils/
│   ├── hooks/
│   ├── types/                  # Supabase generated types
│   └── styles/
│       └── globals.css
├── supabase/
│   ├── migrations/
│   └── seed.sql
├── netlify.toml
├── next.config.ts
├── tailwind.config.ts
└── docs/
    └── IMPLEMENTATION_BLUEPRINT.md  # This file
```

### 1.2 Component architecture

| Layer | Responsibility | Examples |
|--------|----------------|----------|
| **Primitives (`ui/`)** | Atoms, no business copy | `Button`, `Input`, `Badge` |
| **Layout (`layout/`)** | Grid, spacing, shells | `Container`, `Section`, `PageHeader` |
| **Marketing (`marketing/`)** | Homepage & landing blocks | `Hero`, `StatsBar`, `ServicesGrid` |
| **Composed pages** | Thin orchestration in `app/**/page.tsx` | — |
| **Server components (default)** | Next.js RSC + Supabase server fetch | Blog list, services |
| **Client components** | Forms, motion, mobile nav | `MobileNav`, `NewsletterForm` |

**Rules:**

- Pages compose sections; sections compose primitives.
- **Supabase queries only** in Server Components, Server Actions, or Route Handlers — never in leaf UI atoms.
- Use `@supabase/ssr` for cookie-based admin sessions in Next.js middleware.

### 1.3 Next.js App Router structure

```
app/
├── layout.tsx                          # Root: fonts, metadataBase, providers
├── (marketing)/
│   ├── layout.tsx                      # SiteHeader + SiteFooter
│   ├── page.tsx                        # Home
│   ├── about/page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── insights/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── portfolio/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── contact/page.tsx
│   ├── book/page.tsx
│   └── newsletter/page.tsx
├── (legal)/
│   ├── privacy/page.tsx
│   └── terms/page.tsx
├── (admin)/                            # Supabase Auth guard via middleware
│   ├── layout.tsx
│   ├── login/page.tsx
│   ├── dashboard/page.tsx
│   ├── posts/...
│   ├── subscribers/...
│   └── bookings/...
└── api/
    ├── revalidate/route.ts
    └── webhooks/tally/route.ts
```

### 1.4 Layout strategy

| Layout | Scope |
|--------|--------|
| **Root** | `next/font`, CSS variables, analytics (deferred), Supabase session for admin routes only |
| **Marketing** | Sticky header, footer, breadcrumbs on inner pages |
| **Admin** | Sidebar; no marketing chrome |
| **Blog article** | Reading-width constraint, optional TOC |

**Header:** Transparent over hero on home; solid forest + blur on scroll and inner pages.

### 1.5 Reusable UI system

- Design tokens in `globals.css` (`--color-forest`, `--color-gold`, etc.).
- Tailwind theme maps tokens to utilities.
- CVA for `Button`, `Badge`, `Card` variants.
- `cn()` via clsx + tailwind-merge.

### 1.6 Tailwind organization

```
@layer base       → reset, typography, focus rings
@layer components → .section-padding, .prose-blog, .card-service
@layer utilities  → minimal; prefer theme tokens
```

Plugins: `@tailwindcss/typography` for blog prose.

### 1.7 State management approach

| Concern | Approach |
|---------|----------|
| **Server data** | Next.js RSC + Supabase server client; `revalidatePath` / `revalidateTag` |
| **Forms** | React Hook Form + Zod; **Next.js Server Actions** → Supabase |
| **UI ephemeral** | Local `useState` (mobile menu) |
| **Admin auth** | **Supabase Auth** + `@supabase/ssr` + Next.js `middleware.ts` |
| **URL state** | Optional `nuqs` for blog filters |

No Redux. No separate Express API — Next.js Route Handlers + Server Actions talk to Supabase directly.

### 1.8 CMS / data approach (Supabase-first)

**MVP:** Supabase PostgreSQL tables as lightweight CMS (posts, services, portfolio, events).

**Optional later:** External headless CMS only if editorial needs exceed Supabase — sync into Supabase or Next.js ISR either way.

- Slug-based routing for all editorial content.
- `status`: draft | published | archived.
- `published_at` for ordering and sitemap.

### 1.9 SEO architecture (Next.js)

- Per-route `generateMetadata` via shared helper.
- JSON-LD: `Organization`, `WebSite`, `Article`, `BreadcrumbList`, `ProfessionalService`.
- `metadataBase` from `NEXT_PUBLIC_SITE_URL`.
- ISR for blog/portfolio with on-demand revalidation webhook to Next.js `api/revalidate`.
- Semantic landmarks on every page.

### 1.10 Performance architecture

| Pattern | Use |
|---------|-----|
| **Static** | Legal pages, marketing shells |
| **ISR** | Insights, portfolio (revalidate on Supabase publish) |
| **Dynamic** | Admin routes (Supabase session) |
| **Images** | `next/image` AVIF/WebP, explicit `sizes`, hero `priority` |
| **Fonts** | `next/font` (Inter + Playfair or equivalent) |

---

## 2. Full Sitemap

### 2.1 Marketing pages

| Route | Purpose | Target user | Conversion goal | Main sections | Interactions | SEO |
|-------|---------|-------------|-----------------|---------------|--------------|-----|
| `/` | Brand + services overview | Executives, BD | Book / contact | Hero, stats, services, about, insights, newsletter | Scroll reveals, CTA hover | Ophthalmic biotech consulting keywords |
| `/about` | Trust & authority | Partners, media | Contact | Story, founder, mission, expertise | Optional timeline | Organization schema |
| `/services` | Service discovery | Sponsors, startups | Service detail / book | Grid, lifecycle, differentiators | Card hover | Service cluster + internal links |
| `/services/[slug]` | Deep service info | Technical buyers | Form / book | Hero, outcomes, process, FAQs | Accordion, sticky CTA | `ProfessionalService` schema |
| `/insights` | Thought leadership | Industry peers | Subscribe | Featured, categories, search | Filter, search | Blog index canonical |
| `/insights/[slug]` | Article | Researchers | Newsletter / contact | Prose, author, related | Reading progress (subtle) | `BlogPosting` schema |
| `/portfolio` | Proof of work | Prospects | Contact | Case grid, filters | Card hover | Case study schema |
| `/portfolio/[slug]` | Case depth | Due diligence | Meeting request | Challenge, results | Lightbox | Link to services |
| `/contact` | Lead capture | All visitors | Form submit | Form, map, CTAs | Tally or Server Action → Supabase | Contact signals |
| `/book` | Schedule consult | High-intent | Booking complete | Calendly or form → Supabase | Date picker | Clear CTA meta |
| `/newsletter` | Dedicated signup | Subscribers | Email in Supabase | Value prop, form | Inline validation | Optional noindex |
| `/events` | Calendar (Phase 2) | Attendees | RSVP | List, filters | iCal | `Event` JSON-LD |
| `/rise-pakistan-health` | RISE sub-brand landing (Phase 10) | Diaspora physicians, partners | Contact / express interest | Hero lockup, core message, four pillars, parent attribution | Scroll reveals, pillar cards | RISE + diaspora health keywords |
| `/privacy`, `/terms` | Compliance | Legal | — | Static prose | — | Footer links |

### 2.2 Admin (Supabase Auth required)

| Route | Purpose |
|-------|---------|
| `/admin/login` | Supabase email/magic link or password |
| `/admin/dashboard` | Overview of submissions |
| `/admin/posts` | CRUD blog (Supabase `posts`) |
| `/admin/subscribers` | `newsletter_subscribers` |
| `/admin/bookings` | `booking_requests` |
| `/admin/forms` | `form_submissions` |

### 2.3 Future community (placeholder)

| Route | Purpose |
|-------|---------|
| `/community` | Coming soon + Supabase interest table |
| `/community/topics`, `/community/t/[id]` | Phase 3 — full forum with Supabase Auth roles |

### 2.4 RISE Pakistan Health (sub-brand — Phase 10, full scope)

**Status:** Approved for complete implementation on the main BEEÑA-E site (not a separate domain required for v1).

**Positioning:** RISE Pakistan Health is a project of Beena-E Consulting, USA, built around **Research, Innovation, Service, and Education** — mobilizing diaspora excellence for Pakistan's health. Visual identity: **Pakistan green + yellow** (roots, optimism, renewal) while the parent lockup maintains the BEEÑA-E relationship.

**Recommended lockup (hero):**

```
RISE Pakistan Health
A Project of Beena-E Consulting, USA
Research. Innovation. Service. Education.
Mobilizing diaspora excellence for Pakistan's health.
```

**Core message (body copy):** RISE turns scattered diaspora goodwill into structured health impact through research collaboration, innovation pilots, service programs, and education initiatives.

| Pillar | On-page content focus |
|--------|------------------------|
| **Research** | Joint research, data registries, publications, grant support, mentorship for early-career investigators |
| **Innovation** | Digital health, AI-enabled tools, quality improvement, workflow redesign, scalable care models |
| **Service** | Visiting faculty, virtual case conferences, specialty consultations, disaster response, outcome-linked philanthropy |
| **Education** | Mentorship, lectures, residency guidance, research bootcamps, curriculum support, leadership development |

**UX / IA**

| Item | Plan |
|------|------|
| Navigation | New header item (e.g. **RISE Pakistan Health** or shorter **RISE Pakistan**); included in mobile drawer |
| Route | `/rise-pakistan-health` (canonical); optional 301 from `/rise` if client prefers short URL |
| Layout | Dedicated page template or `(marketing)/rise-pakistan-health/` route with **sub-brand theme** (CSS variables: RISE green/yellow, not main forest/gold) |
| Sections | Hero (lockup + tagline), core message, four pillar cards/grid, optional “Get involved” CTA, parent link back to BEEÑA-E About/Contact |
| Footer | Same site footer with clear line: initiative of Beena-E Consulting, USA |
| Forms | Primary CTA → existing `/contact` with subject prefill, **or** dedicated interest capture → `form_submissions` (type: `rise_interest`) |
| Assets | Client to supply RISE logo/lockup files when available; placeholder typography lockup acceptable for v1 |
| SEO | Dedicated `generateMetadata`, Organization/Project JSON-LD optional, sitemap entry |
| Admin (optional v1.1) | Reuse posts table with `category = rise` for RISE news, or static content only for launch |

**Out of scope for Phase 10 v1 (future):** Separate subdomain, summit registration system, full multi-page RISE microsite, Urdu localization, dedicated RISE admin CMS (unless scoped later).

**Client deliverables before build:**

- [ ] Final nav label (full name vs. “RISE Pakistan”)
- [ ] RISE logo / lockup artwork (vector or high-res PNG)
- [ ] Approved green/yellow hex values (or approve design defaults)
- [ ] Primary CTA (contact form, email, founding circle, external link)
- [ ] Any photography or diaspora/partnership imagery with usage rights

---

## 3. Homepage Breakdown

### 3.1 Navbar

| Aspect | Plan |
|--------|------|
| Layout | Container → logo | nav (center, hidden &lt; lg) | CTA |
| Grid | 12-col: logo 2–3, nav 6, CTA 3 |
| Typography | Logo sans semibold white; links `text-sm` |
| Position | `fixed`; `backdrop-blur` when scrolled |
| Animation | 200ms padding; gold underline active link |
| Responsive | &lt; lg: drawer; CTA in drawer or visible |
| Components | `SiteHeader`, `NavLink`, `MobileNav`, `CallCtaButton` |
| A11y | `aria-expanded`, focus trap, skip link |

### 3.2 Hero

| Aspect | Plan |
|--------|------|
| Layout | ~55% copy, ~45% eye visual; dark green gradient |
| Typography | H1 serif `text-4xl→6xl`; gold span on "Ophthalmic" |
| Animation | Framer stagger; HUD parallax (respect reduced motion) |
| Responsive | Stack copy then image |
| Components | `Hero`, `HeroVisual`, `ValuePropStrip`, `Button` |
| A11y | Single H1; decorative HUD `aria-hidden` |

### 3.3 Stats section

| Aspect | Plan |
|--------|------|
| Layout | White band overlapping hero (`-mt`) |
| Grid | 4 col → 2×2 → 1 col |
| Data source | Static MVP; optional Supabase `site_settings` later |
| Components | `StatsBar`, `StatItem` |
| A11y | Full stat text, not animation-only |

### 3.4 Services grid

| Aspect | Plan |
|--------|------|
| Layout | Centered header + 5 cards |
| Grid | `grid-cols-1 sm:2 lg:5` |
| Data | Supabase `services` table (seed for MVP) |
| Animation | Fade-up stagger; hover lift + gold border |
| Components | `SectionHeader`, `ServiceCard`, `ServicesGrid` |

### 3.5 About section

| Aspect | Plan |
|--------|------|
| Layout | 2-col text + image; circular badge overlap |
| Responsive | Stack; badge below image on mobile |
| Components | `AboutTeaser`, `ImageBadge`, `SectionCta` |

### 3.6 Insights / blog cards

| Aspect | Plan |
|--------|------|
| Layout | Title left, "View all" right; 3-card grid |
| Data | Supabase `posts` where `status = published`, limit 3 |
| Components | `PostCard`, `InsightsSection`, `CategoryBadge` |
| A11y | `<time datetime>` for dates |

### 3.7 Newsletter CTA

| Aspect | Plan |
|--------|------|
| Layout | Icon + copy | input + gold button |
| Backend | **Next.js Server Action** → Supabase `newsletter_subscribers` |
| Components | `NewsletterCta`, `NewsletterForm` |
| A11y | Labels, `role="alert"` on errors |

### 3.8 Footer

| Aspect | Plan |
|--------|------|
| Layout | 4 columns + bottom bar |
| Components | `SiteFooter`, `FooterColumn`, `SocialLinks` |
| A11y | `nav` per column; `rel="noopener"` external |

---

## 4. Design System Plan

### 4.1 Color palette

| Token | Hex (approx) | Usage |
|-------|----------------|-------|
| `forest` | `#0B1C16` | Hero, services, footer |
| `forest-dark` | `#071410` | Footer depth |
| `forest-elevated` | `#122A22` | Cards on dark |
| `gold` | `#F7C35F` | CTAs, icons, highlights |
| `gold-hover` | `#E5B24E` | Button hover |
| `neutral-50` | `#F9F9F9` | About section |
| `neutral-900` | `#1A1A1A` | Body on light |
| `muted` | `#6B7280` | Meta text |

Gold on white: large text/CTAs only — not small body copy.

### 4.2 Typography

| Role | Font | Sizes |
|------|------|-------|
| Display/H1 | Serif (Playfair via `next/font`) | 36 → 60px |
| H2 | Serif | 28 → 40px |
| H3 | Sans semibold | 20 → 24px |
| Body | Sans (Inter via `next/font`) | 16 → 18px |
| Eyebrow | Sans uppercase | 12px |

### 4.3 Spacing, radius, shadows

- Section: `py-16 md:py-24 lg:py-28`
- Radius: 8px inputs, 12px cards, 16px images, full pills for buttons
- Shadows: minimal; elevation via background on dark sections

### 4.4 Containers

| Name | Max width |
|------|-----------|
| `content` | 720px |
| `default` | 1280px |
| `wide` | 1440px |

### 4.5 Breakpoints

Tailwind: `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`, optional `3xl 1920`.

### 4.6 Buttons & cards

- Variants: `primary` (gold), `secondary` (outline white), `dark`, `ghost`, `icon`
- Dark service cards on forest; light insight cards with 16:9 images
- Hover: 200–300ms, `transform`/`opacity` only

### 4.7 Motion principles

- Duration 0.2–0.5s; premium ease-out
- `prefers-reduced-motion`: disable parallax, stagger, count-up
- Calm, scientific — no bouncy springs

---

## 5. Component Inventory

### Layout

`Container`, `Section`, `PageHeader`, `Grid`, `SplitLayout` — high reuse; responsive padding scales.

### Navigation

`SiteHeader`, `NavLink`, `MobileNav`, `Breadcrumbs`, `CallCtaButton` — focus trap, `aria-current="page"`.

### Marketing

`Hero`, `ValuePropStrip`, `StatsBar`, `SectionHeader`, `ServicesGrid`, `ServiceCard`, `AboutTeaser`, `ImageBadge`, `InsightsSection`, `PostCard`, `NewsletterCta`, `SiteFooter`, `CTABanner`.

### Forms (Next.js Server Actions → Supabase)

`Input`, `Textarea`, `Select`, `ContactForm`, `NewsletterForm`, `BookingForm`, `TallyEmbed` (webhook → Supabase `form_submissions`).

### CMS (Supabase-backed)

`RichContent`, `CategoryBadge`, `AuthorBio`, `RelatedPosts`, `Pagination`, `SearchInput`, `DraftBadge`.

### Animation

`Reveal`, `StaggerChildren`, `PageTransition`, `CountUp`, `ParallaxLayer` — all respect reduced motion.

### Utility

`Button`, `Icon`, `ImageOptimized`, `SEOJsonLd`, `Spinner`, `Toast`.

---

## 6. Supabase Architecture

> **This project uses Supabase as the sole application database and admin authentication provider.** Next.js does not store business data in the filesystem or Netlify Forms as the system of record (Netlify/Tally may mirror or webhook into Supabase).

### 6.1 Authentication

- **Supabase Auth** for `/admin/*` only.
- Email + magic link or email/password; no public self-signup initially.
- **`@supabase/ssr`** cookie sessions in Next.js `middleware.ts`.
- Roles on `profiles.role`: `admin`, `editor`, `viewer`.

### 6.2 Database tables

```sql
-- profiles (extends auth.users)
profiles: id uuid PK, role text, full_name, avatar_url, created_at

site_settings: key text PK, value jsonb, updated_at, updated_by

services: id, slug unique, title, summary, body, icon, sort_order,
          meta_title, meta_description, published boolean, updated_at

posts: id, slug unique, title, excerpt, content, cover_image_url,
       category_id, author_id, status, published_at, read_time_min,
       meta_title, meta_description, created_at, updated_at

categories: id, slug, name, description

case_studies: id, slug, title, client_name, summary, body, hero_image_url,
              metrics jsonb, service_slugs text[], status, published_at

newsletter_subscribers: id, email unique, status, source, consent_at,
                        metadata jsonb, created_at

booking_requests: id, full_name, email, company, phone, meeting_type,
                  preferred_dates, timezone, message, status, created_at

form_submissions: id, form_type, payload jsonb, ip_hash, spam_score,
                  status, created_at

events: id, slug, title, description, starts_at, ends_at, location,
        external_url, published boolean

community_interest: id, email, created_at  -- forum placeholder
```

Generate TypeScript types: `supabase gen types typescript --project-id <id> > src/types/database.ts`.

### 6.3 Storage buckets

| Bucket | Access | Contents |
|--------|--------|----------|
| `public-assets` | Public read | Brand assets |
| `media` | Public read | Blog/portfolio images |
| `admin-uploads` | Authenticated write | Draft uploads |

Upload from admin via Supabase client; serve URLs in Next.js `next/image` `remotePatterns`.

### 6.4 Row Level Security (required day one)

| Table | Public | Editor | Admin |
|-------|--------|--------|-------|
| `posts` | SELECT if published | INSERT/UPDATE drafts | ALL |
| `newsletter_subscribers` | INSERT via RPC only | — | SELECT/UPDATE |
| `form_submissions` | INSERT via RPC | — | SELECT |
| `booking_requests` | INSERT via RPC | SELECT | ALL |
| `profiles` | — | SELECT own | ALL |

Use **Security Definer RPCs** for public inserts (honeypot + rate limit).

### 6.5 Integrations

- Tally webhook → Next.js `api/webhooks/tally` → Supabase insert
- Publish post → Server Action → `revalidateTag('posts')` in Next.js
- Future ESP: Edge Function cron reading `newsletter_subscribers`

### 6.6 Environment variables

```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=     # Server only — Route Handlers / admin tasks
REVALIDATE_SECRET=
```

---

## 7. Development Phases

| Phase | Focus | Hours | Deliverables |
|-------|--------|-------|--------------|
| **1 — Setup** | Next.js + Supabase + Netlify CI | 8–12h | Deployed scaffold, env wired |
| **2 — Design system** | Tokens, primitives | 12–16h | Button, Section, typography |
| **3 — Homepage** | Full mockup | 16–24h | Responsive home, Lighthouse ≥85 mobile |
| **4 — Core pages** | About, Services, Contact, Insights templates | 20–28h | Navigable site + seed content |
| **5 — CMS/Backend** | Supabase migrations, RLS, admin | 20–30h | Publish post from admin |
| **6 — Integrations** | Newsletter, Tally, booking, email | 12–18h | Form → Supabase → notification |
| **7 — SEO** | Metadata, sitemap, redirects, JSON-LD | 8–12h | GSC-ready |
| **8 — Testing** | a11y, browsers, RLS audit | 12–16h | Signed test report |
| **9 — Deployment** | DNS cutover, email verification | 8–12h | Production live |
| **10 — RISE Pakistan Health** | Sub-brand landing + nav + theme | 12–20h | `/rise-pakistan-health` live, four pillars, lockup, parent attribution, SEO |

**Total (core site):** ~116–168 hours.  
**Total (including RISE Phase 10):** ~128–188 hours.  
Client 7-day target = **MVP subset** (Home, Contact, Newsletter, static services, blog shell, Supabase dashboard admin). **RISE is post-MVP / full v1** unless client reprioritizes timeline.

### Phase 10 tasks — RISE Pakistan Health (complete implementation)

1. Add RISE design tokens to `globals.css` (green/yellow palette) and `rise-*` utility classes without breaking main brand.
2. Create `src/lib/data/rise-content.ts` with lockup, core message, and four pillar copy from client brief.
3. Build `src/components/marketing/rise/` — `RiseHero`, `RisePillars`, `RiseCta`, optional `RiseParentBanner`.
4. Add `src/app/(marketing)/rise-pakistan-health/page.tsx` with sub-brand layout (header/footer remain shared; page body uses RISE theme).
5. Add nav link in `SiteHeader` and `MobileNav`; footer quick link optional.
6. Wire primary CTA (contact with query param or Server Action → `form_submissions`).
7. `generateMetadata` + sitemap entry; internal link from About page optional.
8. QA: contrast on green/yellow, mobile layout, spelling (RISE / Pakistan / Beena-E Consulting, USA).
9. Lighthouse pass on new route; document in deployment checklist.

### Phase 1 tasks (Next.js + Supabase)

1. `npx create-next-app@latest` with App Router, TypeScript, Tailwind, ESLint.
2. Create Supabase project (staging + production).
3. Install `@supabase/supabase-js`, `@supabase/ssr`.
4. Add `src/lib/supabase/server.ts`, `client.ts`, `middleware.ts` per Supabase Next.js guide.
5. Configure `netlify.toml` for Next.js runtime.
6. Add `.env.local.example` with all Supabase + Next.js vars.

---

## 8. SEO Strategy (Next.js)

- `generateMetadata` per route; shared `buildPageMetadata()` helper.
- `app/sitemap.ts` — query Supabase published posts.
- `app/robots.ts` — disallow `/admin`.
- JSON-LD components for Organization, Article, Service.
- Dynamic `opengraph-image.tsx` for insights.
- 301 redirects in `next.config.ts` from old Duda URLs.
- One H1 per page; internal linking via services and related posts.

---

## 9. Performance Optimization Plan

| Area | Strategy |
|------|----------|
| Images | `next/image`, AVIF, `sizes`, hero `priority` |
| Code | Dynamic import admin, Calendly, analytics |
| Caching | ISR + Supabase publish triggers revalidation |
| Fonts | `next/font` subset weights |
| Animation | Transform/opacity only; lazy Framer in client boundaries |

### Lighthouse targets (mobile production)

| Metric | Target |
|--------|--------|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | 100 |

---

## 10. Mobile Responsiveness Strategy

| Breakpoint | Navigation | Grid |
|------------|------------|------|
| Mobile &lt;768 | Hamburger drawer | 1 col |
| Tablet 768–1023 | Compact or full nav | 2 col stats/services |
| Desktop 1024+ | Center nav + CTA | 5 services, 3 insights |
| Ultra-wide 1536+ | Centered container | Max line-length 65ch |

- Min tap target 44×44px.
- `clamp()` for H1/H2.
- No hover-only interactions.

---

## 11. Animation & Interaction Plan (Framer Motion)

| Pattern | Notes |
|---------|-------|
| Scroll reveals | `whileInView` once, 20px y |
| Hero stagger | Max 0.6s total |
| Card hover | `y: -4`, subtle shadow |
| Page transitions | Optional 150ms fade |
| Reduced motion | Disable parallax/stagger via `useReducedMotion` |

Avoid scroll-jacking and infinite loops.

---

## 12. Deployment & Infrastructure

### Netlify (hosting only)

- Next.js build via Netlify Next adapter.
- Preview deploys per PR; production on `main`.
- **Data lives in Supabase**, not Netlify DB.

### DNS (Squarespace + Google Workspace)

1. Export all DNS records before cutover.
2. **Do not change MX** unless migrating email.
3. Point `www` CNAME to Netlify; apex per Netlify docs.
4. Lower TTL 24–48h before cutover.
5. Verify SPF/DKIM/DMARC after launch.

### CI/CD

`push → lint → tsc → next build → Netlify deploy → optional Lighthouse CI`.

### Security

- HTTPS, HSTS, CSP (allow Tally/Calendly).
- Rate limit Next.js API routes.
- Honeypot + Turnstile if spam on Supabase RPCs.

---

## 13. Recommended Tech Stack

| Package | Role |
|---------|------|
| **next** (15+) | App Router, RSC, Metadata API, Server Actions, images |
| **react** (19) | UI |
| **@supabase/supabase-js** | Database client |
| **@supabase/ssr** | Auth cookies in Next.js middleware |
| **tailwindcss** | Styling |
| **framer-motion** | Premium motion |
| **zod** | Validation (shared with Server Actions) |
| **react-hook-form** + **@hookform/resolvers** | Forms |
| **class-variance-authority** | Variants |
| **lucide-react** | Icons |
| **resend** or SendGrid | Email notifications |
| **@next/third-parties** | GA4 |
| **@tailwindcss/typography** | Blog prose |

**Integrations:** Tally (webhook → Supabase), Calendly embed on `/book`.

**Do not use for MVP:** Firebase, separate Express API, Redux, full forum auth.

---

## 14. Suggested Development Order

1. Next.js repo + Supabase project + Netlify + env  
2. Supabase clients + middleware auth stub  
3. Design tokens + `Button`, `Container`, `Section`  
4. `SiteHeader` + `SiteFooter`  
5. Homepage sections (top → bottom)  
6. Inner page templates  
7. Static pages (About, Contact, Services seed)  
8. Supabase migrations + RLS + seed data  
9. Insights wired to Supabase + ISR  
10. Admin CRUD for posts  
11. Newsletter + webhooks (Server Actions)  
12. Booking + Portfolio  
13. SEO (sitemap, metadata, redirects)  
14. Performance + QA + DNS cutover  
15. **RISE Pakistan Health** — Phase 10 (sub-brand page, nav, tokens, CTAs, SEO)  

---

## 15. Common Mistakes to Avoid

### Technical

- Replacing Supabase with another backend without ADR approval.
- Exposing `SUPABASE_SERVICE_ROLE_KEY` to the client bundle.
- Fetching Supabase in root `layout.tsx` (slows every page).
- Skipping RLS on Supabase tables.
- Raw `<img>` for hero LCP instead of `next/image`.
- Importing `framer-motion` in Server Components.
- No 301 redirects from old Duda URLs.
- Changing MX records during Netlify DNS cutover.

### UI/UX

- Gold small text on white.
- Over-animating (undermines trust).
- Inconsistent BEEÑA-E spelling.
- Multiple competing CTAs without hierarchy.

### Process

- Building CMS before design system is locked.
- Content migration last-minute.
- 7-day timeline without MVP scope sign-off.

---

## Appendix A — MVP vs Full Scope

| Feature | MVP (7-day) | Full v1 |
|---------|-------------|---------|
| Next.js homepage | ✅ Full | ✅ |
| Supabase newsletter | ✅ | + ESP sync |
| Supabase blog | 3 seed posts | Admin CRUD |
| Supabase admin | Dashboard OK | Custom `/admin` |
| Booking | Calendly/Tally → Supabase | Full workflow |
| Forum | `/community` stub table | Phase 3 |
| RISE Pakistan Health | — | ✅ Full landing + nav + sub-brand theme (Phase 10) |

---

## Appendix B — Pre-development checklist

- [ ] Next.js 15+ and Node version documented for Netlify  
- [ ] Supabase staging + production projects created  
- [ ] `NEXT_PUBLIC_SUPABASE_*` and service role in Netlify env  
- [ ] Logo SVG, hero WebP, photography rights  
- [ ] Verified stats copy (30+ years, 14 products, etc.)  
- [ ] Five service slugs + descriptions  
- [ ] Duda URL → Next.js redirect map  
- [ ] DNS export (MX, SPF, DKIM preserved)  
- [ ] Tally form IDs for webhook → Supabase  
- [ ] RISE Pakistan Health: nav label, logo/lockup, green/yellow colors, primary CTA  

---

## Document history

| Date | Change |
|------|--------|
| 2026-05-31 | Initial blueprint — stack locked to Next.js + Supabase |
| 2026-05-31 | Phase 10 added — RISE Pakistan Health sub-brand (full implementation approved) |
| 2026-05-31 | Phase 10 implemented; Pexels stock images in `public/images/stock/` |

---

*Next step when implementation begins: Phase 1 — scaffold Next.js App Router project and Supabase project per Section 7.*
