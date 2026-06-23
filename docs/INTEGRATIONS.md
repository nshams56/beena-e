# BEEÑA-E — Integrations setup (Phase 6)

## Google Analytics 4

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Copy the Measurement ID (`G-XXXXXXXX`)
3. Add to `.env.local` and Vercel:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX
```

## Resend (form email notifications)

1. Sign up at [resend.com](https://resend.com)
2. Create an API key
3. Verify your sending domain (production) or use `onboarding@resend.dev` for testing

```env
RESEND_API_KEY=re_xxxx
NOTIFICATION_EMAIL_TO=info@beena-e.com
NOTIFICATION_EMAIL_FROM=BEEÑA-E Consulting <notifications@yourdomain.com>
```

Triggers email on: contact form, booking form, newsletter signup, Tally webhook.

## Tally

### Embed on contact page (optional)

1. Create a form at [tally.so](https://tally.so)
2. Copy the form ID from the embed URL

```env
NEXT_PUBLIC_TALLY_CONTACT_FORM_ID=yourFormId
```

When set, `/contact` shows Tally instead of the native form. Submissions still need the webhook for Supabase storage.

### Webhook → Supabase

1. In Tally: form **Integrations** → **Webhooks**
2. URL: `https://your-domain.com/api/webhooks/tally`
3. Optional header secret (match env):

```env
TALLY_WEBHOOK_SECRET=your-secret
SUPABASE_SERVICE_ROLE_KEY=...  # required for server-side insert
```

## Calendly

1. Copy your Calendly scheduling link
2. Add to env:

```env
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-org/30min
```

Shows inline widget on `/book` above the native form.

## Google Maps (contact page)

1. Google Maps → Share → Embed map → copy iframe `src`
2. Add full embed URL:

```env
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL=https://www.google.com/maps/embed?pb=...
```

## Legacy URL redirects (Duda → Next.js)

Edit `src/lib/seo/redirects.ts` and uncomment/add entries after auditing old URLs in Google Search Console.

Example:

```ts
{ source: "/blog/:slug", destination: "/insights/:slug", permanent: true },
```

Redeploy after changes.
