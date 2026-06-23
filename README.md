# BEEÑA-E Consulting

Premium ophthalmic biotech consulting website — **Next.js App Router** + **Supabase** + Vercel.

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS v4 |
| Backend | Supabase (Auth, PostgreSQL, Storage) |
| Motion | Framer Motion (Phase 3+) |
| Hosting | Vercel |

## Documentation

Full implementation plan: [`docs/IMPLEMENTATION_BLUEPRINT.md`](docs/IMPLEMENTATION_BLUEPRINT.md)

## Roadmap (planned)

| Phase | Status | Notes |
|-------|--------|--------|
| 1–6 | Done | Scaffold, homepage, core pages, admin CMS, integrations |
| **10 — RISE Pakistan Health** | **Done** | `/rise-pakistan-health`, green/yellow theme, four pillars, nav + footer links |
| 7–9 | Next | SEO redirects, QA, production deploy |
| Stock images | Done | Pexels assets in `public/images/stock/` — see `docs/IMAGE_CREDITS.md` |
| UI polish pass | Done | Trust strip, testimonials, service FAQs/heroes, accordions, skeletons |

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy the example file and add your Supabase project keys:

```bash
cp .env.local.example .env.local
```

| Variable | Required |
|----------|----------|
| `NEXT_PUBLIC_SITE_URL` | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Server/admin only |

Create a project at [supabase.com/dashboard](https://supabase.com/dashboard), then run the initial migration from `supabase/migrations/`.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Health check: [http://localhost:3000/api/health](http://localhost:3000/api/health)

### 4. Supabase schema

Run all files in `supabase/migrations/` in order (`000000` through `000004`) in the Supabase SQL editor, then `supabase/seed.sql`.

Or via CLI:

```bash
npx supabase link --project-ref <your-project-ref>
npx supabase db push
```

### 5. Admin CMS (Phase 5)

1. Create a user in Supabase → **Authentication** → **Users**
2. Sign in at [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
3. Manage posts at `/admin/posts` — create, edit, publish, upload cover images
4. Optional: promote to `admin` role via `supabase/migrations/20260531000005_promote_admin.sql`

| Admin route | Purpose |
|-------------|---------|
| `/admin/dashboard` | Overview counts |
| `/admin/posts` | Blog CRUD |
| `/admin/subscribers` | Newsletter list |
| `/admin/bookings` | Booking requests |
| `/admin/submissions` | Contact form leads |

## Project structure

```
src/
├── app/
│   ├── (marketing)/     # Public site
│   ├── (admin)/         # Supabase Auth (middleware)
│   ├── (legal)/
│   └── api/
├── components/
├── lib/
│   ├── supabase/        # Browser + server clients
│   └── seo/
└── types/
supabase/migrations/
docs/
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | ESLint |

## Integrations (Phase 6)

See [`docs/INTEGRATIONS.md`](docs/INTEGRATIONS.md) for GA4, Resend, Tally, Calendly, and Maps setup.

## Deployment (Vercel)

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for the full launch checklist.

1. Connect the repository to [Vercel](https://vercel.com) (Import Git project).
2. Set environment variables from `.env.example`.
3. Build command: `npm run build` (Next.js auto-detected; see `vercel.json`).
4. **Do not change MX records** when updating DNS — preserve Google Workspace email.

## License

Private — BEEÑA-E Consulting.
