"use client";

import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { AmbientParticles } from "@/components/marketing/lux/ambient-particles";
import { futureTopics } from "@/lib/data/about-content";
import { STOCK_IMAGES } from "@/lib/data/stock-images";

export function FutureOphthalmology() {
  return (
    <section className="relative overflow-hidden bg-forest py-20 text-white md:py-28">
      <Image
        src={STOCK_IMAGES.heroEye}
        alt=""
        fill
        className="object-cover opacity-20"
        sizes="100vw"
        aria-hidden
      />
      <div className="lux-noise pointer-events-none absolute inset-0" aria-hidden />
      <AmbientParticles />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-forest-dark/60 via-forest/50 to-forest-dark/90"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-cyan-glow/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />

      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold/90">
            Future of ophthalmology
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight md:text-5xl">
            Where science, technology, and patient impact converge
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/75 md:text-lg">
            A cinematic view of the modalities and platforms reshaping ophthalmic
            biotech — and how sponsors can lead with clarity.
          </p>
        </Reveal>

        <StaggerChildren className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {futureTopics.map((topic, i) => (
            <StaggerItem key={topic.title}>
              <article
                className={`lux-glass lux-card-glow group card-hover-lift rounded-2xl p-7 ${
                  i === 0 ? "lg:row-span-1 border-gold/20" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-px flex-1 bg-linear-to-r from-cyan-glow/60 to-transparent"
                    aria-hidden
                  />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-glow/90">
                    Innovation
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-xl text-white md:text-2xl">
                  {topic.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  {topic.description}
                </p>
                <div
                  className="mt-6 h-px w-full bg-white/10 transition-colors [@media(hover:hover)]:group-hover:bg-gold/30"
                  aria-hidden
                />
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
