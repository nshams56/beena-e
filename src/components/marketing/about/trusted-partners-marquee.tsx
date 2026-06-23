"use client";

import { Container } from "@/components/layout/container";
import { partners } from "@/lib/data/about-content";
import { cn } from "@/lib/utils/cn";

function Track({ reverse = false }: { reverse?: boolean }) {
  const items = [...partners, ...partners];
  return (
    <div
      className={cn(
        "flex w-max gap-3 py-2",
        reverse ? "animate-[marquee_26s_linear_infinite_reverse]" : "animate-[marquee_26s_linear_infinite]",
      )}
    >
      {items.map((label, i) => (
        <span
          key={`${label}-${i}`}
          className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-gold/40 hover:text-gold"
        >
          {label}
        </span>
      ))}
    </div>
  );
}

export function TrustedPartnersMarquee() {
  return (
    <section className="relative overflow-hidden bg-forest-dark py-14 text-white md:py-18">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold/90">
          Trusted partners
        </p>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl">
          A curated network across the ophthalmic ecosystem
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
          We collaborate with specialist partners across CRO delivery, imaging,
          translational science, regulatory execution, and commercialization.
        </p>
      </Container>

      <div className="mt-10 border-y border-white/10 bg-white/5">
        <div className="overflow-hidden">
          <Track />
        </div>
        <div className="overflow-hidden">
          <Track reverse />
        </div>
      </div>
    </section>
  );
}

