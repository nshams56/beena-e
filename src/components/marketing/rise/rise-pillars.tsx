"use client";

import {
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Microscope,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { riseCoreMessage, risePillars } from "@/lib/data/rise-content";

const iconMap: Record<string, LucideIcon> = {
  microscope: Microscope,
  lightbulb: Lightbulb,
  "heart-handshake": HeartHandshake,
  "graduation-cap": GraduationCap,
};

export function RisePillars() {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl text-neutral-900 md:text-4xl">
            Four Pillars
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            {riseCoreMessage}
          </p>
        </Reveal>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2">
          {risePillars.map((pillar, i) => {
            const Icon = iconMap[pillar.icon] ?? Microscope;
            return (
              <li key={pillar.title}>
                <Reveal delay={i * 0.06} className="h-full">
                  <div className="lux-glass-light card-hover-lift h-full p-8 md:p-10">
                    <Icon
                      className="h-9 w-9 text-rise-green stroke-[1.25]"
                      aria-hidden
                    />
                    <h3 className="mt-4 font-serif text-xl text-rise-green">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {pillar.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
