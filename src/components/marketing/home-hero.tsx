"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { AmbientParticles } from "@/components/marketing/lux/ambient-particles";
import { heroCopy } from "@/lib/data/home-content";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils/cn";

export function HomeHero() {
  const reduced = useReducedMotion();

  const content = (
    <div className="space-y-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold/90">
        Ophthalmic biotech advisory
      </p>
      <h1 className="font-serif text-4xl leading-[1.06] md:text-5xl lg:text-[3.35rem]">
        Global <span className="text-gold">Ophthalmic</span> Biotech Advisory
        &amp; Development Partner
      </h1>
      <p className="max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
        {heroCopy.subheadline}
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Link
          href="/services"
          className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
        >
          Explore Our Services →
        </Link>
        <Link
          href="/book"
          className={cn(
            buttonVariants({ variant: "secondary", size: "lg" }),
            "gap-2",
          )}
        >
          <Calendar className="h-4 w-4" aria-hidden />
          Schedule a Consultation
        </Link>
      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-forest pt-24 text-white md:pt-28">
      <Image
        src="/images/hero/hero-bg.png"
        alt="Close-up of an eye with medical technology overlay"
        fill
        priority
        className="object-cover object-right"
        sizes="100vw"
      />
      <div className="lux-noise pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <AmbientParticles />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-forest-dark via-forest/85 to-forest/25"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-forest-dark/40"
        aria-hidden
      />
      <div className="lux-gradient-radial pointer-events-none absolute inset-0" aria-hidden />
      <Container className="relative pb-16 pt-2 md:pb-20">
        <div className="max-w-3xl text-left">
          {reduced ? (
            content
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {content}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
