"use client";

import { NewsletterForm } from "@/components/forms/newsletter-form";
import { NewsletterTrustNotes } from "@/components/marketing/newsletter/newsletter-trust-notes";
import { Reveal } from "@/components/motion/reveal";

export function NewsletterSubscriptionPanel() {
  return (
    <Reveal delay={0.1}>
      <div className="lux-newsletter-panel relative overflow-hidden rounded-[1.85rem] border border-neutral-200/50 bg-white/95 shadow-[0_32px_100px_rgba(11,28,22,0.1)]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-5%,rgba(11,44,36,0.06),transparent_60%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/60 to-transparent"
          aria-hidden
        />

        <header className="relative border-b border-neutral-200/45 px-6 py-8 md:px-10 md:py-10 lg:px-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
            Subscription
          </p>
          <h2 className="mt-3 font-serif text-2xl tracking-[-0.03em] text-neutral-900 md:text-[2rem] lg:text-[2.15rem]">
            Join the intelligence briefing
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-[1.9] text-muted md:text-[0.95rem]">
            Enter your professional email to receive curated ophthalmic advisory
            perspectives. Intended for sponsors, clinical leaders, and regulatory
            strategists.
          </p>
        </header>

        <div className="relative px-6 py-8 md:px-10 md:py-10 lg:px-12">
          <NewsletterForm variant="institutional" />
          <NewsletterTrustNotes />
        </div>

        <footer className="relative border-t border-neutral-200/45 bg-neutral-50/50 px-6 py-5 md:px-12">
          <p className="text-center text-[11px] leading-[1.7] tracking-wide text-muted/95">
            BEEÑA-E respects your inbox. Briefings are distributed periodically
            and handled with the same confidentiality standards as client advisory
            work.
          </p>
        </footer>
      </div>
    </Reveal>
  );
}
