"use client";

import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Reveal } from "@/components/motion/reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { engagementSteps } from "@/lib/data/about-content";

export function EngagementProcess() {
  return (
    <Section variant="light" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-ivory via-neutral-50 to-white"
        aria-hidden
      />
      <div className="lux-gradient-radial pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <Container className="relative">
        <SectionHeader
          eyebrow="Engagement process"
          title="Structured engagement from assessment through launch"
          description="A defined sequence aligning science, regulation, access, and commercialization — scaled to program stage, modality, and governance requirements."
          align="left"
        />

        <div className="relative mt-14 hidden lg:block" aria-hidden>
          <div className="absolute left-0 right-0 top-8 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent" />
        </div>

        <StaggerChildren className="relative mt-14 grid gap-6 lg:grid-cols-5">
          {engagementSteps.map((step, i) => (
            <StaggerItem key={step.title} className="h-full">
              <article className="lux-glass-light card-hover-lift group relative h-full rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-9 items-center justify-center rounded-full border border-gold/30 bg-forest text-sm font-semibold text-gold">
                    {i + 1}
                  </span>
                  <CheckCircle2
                    className="h-5 w-5 text-forest/40 transition-colors [@media(hover:hover)]:group-hover:text-gold"
                    aria-hidden
                  />
                </div>
                <h3 className="mt-5 font-serif text-lg text-neutral-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
                <div
                  className="mt-6 h-px w-full bg-linear-to-r from-gold/30 via-cyan-glow/20 to-transparent"
                  aria-hidden
                />
                <p className="mt-5 text-xs text-muted">Governance-ready deliverables</p>
                {i < engagementSteps.length - 1 && (
                  <span
                    className="absolute -right-3 top-8 hidden h-2 w-2 rounded-full bg-gold/60 lg:block"
                    aria-hidden
                  />
                )}
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <Reveal delay={0.08} className="mt-14">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-forest px-8 py-10 text-white shadow-[0_24px_80px_rgba(4,17,13,0.35)]">
            <div className="lux-noise pointer-events-none absolute inset-0 opacity-50" aria-hidden />
            <div className="relative">
              <h3 className="font-serif text-2xl">
                Built to integrate with your team
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/75 md:text-base">
                We embed alongside R&amp;D, regulatory, medical, and commercial
                leadership — providing senior direction, crisp governance, and
                deliverables that keep your program moving.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
