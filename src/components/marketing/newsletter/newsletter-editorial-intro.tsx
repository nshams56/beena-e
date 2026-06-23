"use client";

import { Reveal } from "@/components/motion/reveal";

export function NewsletterEditorialIntro() {
  return (
    <Reveal className="py-12 text-center md:py-16 lg:py-20">
      <p className="mx-auto max-w-2xl px-4 font-serif text-2xl leading-[1.42] tracking-[-0.025em] text-forest md:text-[1.75rem] lg:text-[2rem] lg:leading-[1.38]">
        Perspectives for leaders navigating ophthalmic development, regulation,
        and commercialization.
      </p>
      <p className="mx-auto mt-6 max-w-lg px-4 text-sm leading-[1.85] text-muted md:text-[0.95rem]">
        Subscribe to receive senior-authored commentary — not promotional
        marketing — aligned to the rigor of regulated ophthalmic programs.
      </p>
    </Reveal>
  );
}
