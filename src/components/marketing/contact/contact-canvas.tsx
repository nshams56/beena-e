"use client";

import { Container } from "@/components/layout/container";
import { ContactConciergePanel } from "@/components/marketing/contact/contact-concierge-panel";
import { ContactEditorialIntro } from "@/components/marketing/contact/contact-editorial-intro";
import { ContactExecutiveAssurance } from "@/components/marketing/contact/contact-executive-assurance";
import { ContactIntakeExperience } from "@/components/marketing/contact/contact-intake-experience";

export function ContactCanvas({
  isRise,
  mapsEmbedUrl,
  useTally,
  tallyFormId,
}: {
  isRise: boolean;
  mapsEmbedUrl?: string;
  useTally: boolean;
  tallyFormId?: string;
}) {
  return (
    <section className="lux-contact-canvas relative overflow-hidden bg-ivory pb-16 md:pb-24 lg:pb-28">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-white via-ivory to-neutral-50/40"
        aria-hidden
      />
      <div className="lux-noise pointer-events-none absolute inset-0 opacity-[0.22]" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[min(100%,900px)] -translate-x-1/2 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(247,195,95,0.07),transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(11,44,36,0.04),transparent_70%)]"
        aria-hidden
      />

      <Container className="relative pt-2 md:pt-4">
        <ContactExecutiveAssurance />
        <ContactEditorialIntro />

        <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
          <div className="lg:col-span-5 xl:col-span-4">
            <ContactConciergePanel isRise={isRise} mapsEmbedUrl={mapsEmbedUrl} />
          </div>
          <div className="lg:col-span-7 xl:col-span-8">
            <ContactIntakeExperience
              useTally={useTally}
              tallyFormId={tallyFormId}
              isRise={isRise}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
