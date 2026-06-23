import {
  BadgeCheck,
  Heart,
  Lock,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { trustPillars } from "@/lib/data/about-content";

const trustIcons: LucideIcon[] = [
  Lock,
  ShieldCheck,
  Scale,
  BadgeCheck,
  Heart,
];

export function TrustCompliance() {
  return (
    <Section variant="white" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-white via-neutral-50/80 to-white"
        aria-hidden
      />
      <Container className="relative">
        <SectionHeader
          eyebrow="Trust & compliance"
          title="Governance built for institutional healthcare partners"
          description="Enterprise-grade standards across confidentiality, scientific integrity, and regulatory alignment."
          align="center"
        />

        <StaggerChildren className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {trustPillars.map((pillar, i) => {
            const Icon = trustIcons[i] ?? ShieldCheck;
            return (
              <StaggerItem key={pillar.title}>
                <article className="lux-glass-light card-hover-lift h-full rounded-2xl p-6 text-center">
                  <span className="mx-auto inline-flex size-12 items-center justify-center rounded-xl border border-forest/10 bg-forest/5 p-3 text-forest">
                    <Icon className="size-5 shrink-0" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-serif text-lg text-neutral-900">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {pillar.description}
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </Container>
    </Section>
  );
}
