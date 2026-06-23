"use client";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils/cn";

export function EditorialPause({
  className,
}: {
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-y border-neutral-200/80 bg-ivory py-20 md:py-28 lg:py-32",
        className,
      )}
    >
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl px-4 text-center">
          <p className="font-serif text-2xl leading-[1.45] tracking-[-0.02em] text-forest md:text-3xl md:leading-[1.4]">
            Evidence-led advisory for ophthalmic development, regulatory
            strategy, and commercialization.
          </p>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-muted md:text-base">
            Senior consultants aligned to sponsor governance, agency dialogue,
            and patient-relevant endpoints.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
