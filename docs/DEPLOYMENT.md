# Deployment checklist (Vercel + Squarespace DNS)

## Content operations

Before editors publish in production, apply `supabase/migrations/20260531000006_content_governance.sql` and share [`docs/content-operations/README.md`](./content-operations/README.md) with the team.

## Pre-launch

- [ ] All Supabase migrations applied on **production** project
- [ ] Production env vars set in Vercel (mirror `.env.example`)
- [ ] `NEXT_PUBLIC_SITE_URL=https://www.beena-e.com`
- [ ] Export current Squarespace DNS records (screenshot + copy)
- [ ] Confirm MX records for Google Workspace — **do not change**
- [ ] Add 301 redirects in `src/lib/seo/redirects.ts` from old Duda URLs
- [ ] GA4, Resend, Calendly env vars configured
- [ ] Smoke test: forms, admin login, insights pages

## Vercel

1. Client creates a [Vercel](https://vercel.com) account
2. **Add New Project** → Import GitHub repository
3. Framework preset: **Next.js** (auto-detected)
4. Build command: `npm run build` (default)
5. Install command: `npm install` (default)
6. Root directory: `.` (repo root)
7. Add all environment variables (Production + Preview as needed)
8. Deploy → verify preview URL
9. **Settings → Domains** → add `www.beena-e.com` and apex `beena-e.com`
10. Follow Vercel DNS instructions in the domain panel

### Environment variables (Production)

Set in **Project → Settings → Environment Variables**:

| Variable | Secret? | Notes |
|----------|---------|--------|
| `NEXT_PUBLIC_SITE_URL` | No | `https://www.beena-e.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | No | Public |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Public (RLS protects data) |
| `SUPABASE_SERVICE_ROLE_KEY` | **Yes** | Server only |
| `RESEND_API_KEY` | **Yes** | Server only |
| `NOTIFICATION_EMAIL_TO` | No | Alert inbox |
| `NOTIFICATION_EMAIL_FROM` | No | Verified sender |
| `REVALIDATE_SECRET` | **Yes** | `/api/revalidate` |
| `TALLY_WEBHOOK_SECRET` | **Yes** | Tally webhook |
| `NEXT_PUBLIC_CALENDLY_URL` | No | Booking embed |
| `NEXT_PUBLIC_TALLY_CONTACT_FORM_ID` | No | Contact embed |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Optional |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` | No | Optional |

Mark only true secrets as **Sensitive** in Vercel. `NEXT_PUBLIC_*` values are embedded in the build by design.

### Node.js version

Use **Node.js 20.x or 22.x** in Vercel **Settings → General → Node.js Version**, or set in `package.json`:

```json
"engines": { "node": ">=20" }
```

## Squarespace DNS (typical)

After adding the domain in Vercel, use the records Vercel shows. Common setup:

| Type | Host | Value |
|------|------|--------|
| CNAME | www | `cname.vercel-dns.com` (or project-specific CNAME from Vercel) |
| A | @ | `76.76.21.21` (Vercel apex — confirm in Vercel domain UI) |

**Keep existing MX, SPF, DKIM, DMARC records unchanged** (Google Workspace email).

Add Resend DNS records separately when verifying the sending domain.

## Tally webhook (production)

In Tally → Integrations → Webhooks:

- URL: `https://www.beena-e.com/api/webhooks/tally`
- Secret: same value as `TALLY_WEBHOOK_SECRET` in Vercel

## Post-launch

- [ ] Submit sitemap: `https://www.beena-e.com/sitemap.xml`
- [ ] Google Search Console: change of address / monitor 404s
- [ ] Test email delivery (contact form → Resend → inbox)
- [ ] Verify Google Workspace mail still works

## Rollback

Point DNS back to previous hosting if needed; MX records should never have been touched.
