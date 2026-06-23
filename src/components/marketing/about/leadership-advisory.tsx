"use client";

import { UserRound } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Reveal } from "@/components/motion/reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { leadership } from "@/lib/data/about-content";

export function LeadershipAdvisory() {
  return (
    <Section variant="white" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-white via-neutral-50 to-white"
        aria-hidden
      />
      <Container className="relative">
        <SectionHeader
          eyebrow="Leadership & advisory"
          title="Senior advisors with ophthalmic operating experience"
          description="Direct access to leaders across clinical development, global regulation, and commercialization — accountable for decisions, not slide volume."
          align="left"
        />

        <StaggerChildren className="mt-14 grid gap-6 md:grid-cols-3">
          {leadership.map((person) => (
            <StaggerItem key={person.name}>
              <article className="lux-glass-light card-hover-lift h-full rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="lux-ring inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-forest p-3 text-gold shadow-[0_18px_60px_rgba(4,17,13,0.35)]">
                    <UserRound className="size-7 shrink-0" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-xl text-neutral-900">
                      {person.name}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                      {person.role}
                    </p>
                    <p className="mt-2 text-xs font-medium text-forest">
                      {person.years}
                    </p>
                  </div>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-muted">
                  {person.focus}
                </p>
                <div className="mt-6 h-px w-full bg-neutral-100" aria-hidden />
                <p className="mt-5 text-xs text-muted">
                  Headshots available upon request. Advisor identities can be shared
                  under NDA.
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <Reveal delay={0.08} className="mt-14">
          <div className="lux-glass-light rounded-3xl p-8 md:p-10">
            <p className="text-sm leading-relaxed text-muted md:text-base">
              Need specialist support beyond the core team? We activate a curated
              network of ophthalmology KOLs, imaging and biomarker partners, HEOR
              experts, and regional regulatory specialists — aligned to your
              program&apos;s stage and risk profile.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
