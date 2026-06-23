"use client";

import { Reveal } from "@/components/motion/reveal";

export function ContactEditorialIntro() {
  return (
    <Reveal delay={0.08} className="py-14 text-center md:py-18 lg:py-20">
      <p className="mx-auto max-w-2xl px-4 font-serif text-2xl leading-[1.42] tracking-[-0.025em] text-forest md:text-[1.75rem] lg:text-[2rem] lg:leading-[1.38]">
        Strategic ophthalmic programs require disciplined coordination across
        clinical, regulatory, and commercial priorities.
      </p>
      <p className="mx-auto mt-6 max-w-lg px-4 text-sm leading-[1.85] text-muted md:text-[0.95rem]">
        Our intake process is designed for sponsor leadership teams seeking
        measured, confidential advisory alignment.
      </p>
    </Reveal>
  );
}
