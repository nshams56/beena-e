"use client";

import { Container } from "@/components/layout/container";
import { NewsletterBriefingDeliverables } from "@/components/marketing/newsletter/newsletter-briefing-deliverables";
import { NewsletterEditorialIntro } from "@/components/marketing/newsletter/newsletter-editorial-intro";
import { NewsletterSubscriptionPanel } from "@/components/marketing/newsletter/newsletter-subscription-panel";

export function NewsletterCanvas() {
  return (
    <section className="lux-newsletter-canvas relative overflow-hidden bg-ivory pb-16 md:pb-24 lg:pb-28">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-white via-ivory to-neutral-50/40"
        aria-hidden
      />
      <div className="lux-noise pointer-events-none absolute inset-0 opacity-[0.22]" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[min(100%,880px)] -translate-x-1/2 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(247,195,95,0.07),transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(11,44,36,0.04),transparent_70%)]"
        aria-hidden
      />

      <Container className="relative pt-0 md:pt-2">
        <NewsletterEditorialIntro />

        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12 xl:gap-14">
          <div className="lg:col-span-5">
            <NewsletterBriefingDeliverables />
          </div>
          <div className="lg:col-span-7">
            <NewsletterSubscriptionPanel />
          </div>
        </div>
      </Container>
    </section>
  );
}
