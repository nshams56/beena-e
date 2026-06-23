"use client";

import { ContactForm } from "@/components/forms/contact-form";
import { TallyEmbed } from "@/components/integrations/tally-embed";
import { Reveal } from "@/components/motion/reveal";
import { ContactWhatToExpect } from "@/components/marketing/contact/contact-what-to-expect";
import { cn } from "@/lib/utils/cn";

export function ContactIntakeExperience({
  useTally,
  tallyFormId,
  isRise,
}: {
  useTally: boolean;
  tallyFormId?: string;
  isRise: boolean;
}) {
  return (
    <Reveal delay={0.1}>
      <div
        className={cn(
          "lux-contact-intake relative overflow-hidden rounded-[1.85rem] border border-neutral-200/50 bg-white/95 shadow-[0_32px_100px_rgba(11,28,22,0.1)]",
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(11,44,36,0.06),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/60 to-transparent"
          aria-hidden
        />

        <header className="relative border-b border-neutral-200/45 px-6 py-8 md:px-10 md:py-9 lg:px-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
            Strategic program intake
          </p>
          <h2 className="mt-3 font-serif text-2xl tracking-[-0.03em] text-neutral-900 md:text-[2rem] lg:text-[2.15rem]">
            Begin your consultation request
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-[1.9] text-muted md:text-[0.95rem]">
            {useTally
              ? "Provide structured program context below. All fields support confidential routing to the appropriate advisory lead."
              : "Share development stage, regulatory context, and commercial objectives. Submissions are handled with institutional discretion."}
          </p>
        </header>

        <ContactWhatToExpect />

        <div className="relative px-4 py-6 md:px-8 md:py-8 lg:px-10 lg:py-10">
          {useTally && tallyFormId ? (
            <TallyEmbed
              formId={tallyFormId}
              title="BEEÑA-E executive consultation intake"
              variant="institutional"
            />
          ) : (
            <div className="lux-contact-intake-native rounded-[1.35rem] border border-neutral-200/40 bg-linear-to-b from-neutral-50/90 to-white p-6 md:p-8">
              <ContactForm
                defaultSubject={isRise ? "RISE Pakistan Health — Inquiry" : ""}
                defaultMessage={
                  isRise
                    ? "I am interested in learning more about RISE Pakistan Health and how to get involved."
                    : ""
                }
              />
            </div>
          )}
        </div>

        <footer className="relative border-t border-neutral-200/45 bg-neutral-50/40 px-6 py-5 text-center md:px-12">
          <p className="text-[11px] leading-[1.7] tracking-wide text-muted/95">
            Submissions are confidential. BEEÑA-E does not distribute personal data.
            By proceeding, you authorize contact regarding this inquiry only.
          </p>
        </footer>
      </div>
    </Reveal>
  );
}
