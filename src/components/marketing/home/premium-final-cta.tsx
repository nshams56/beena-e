"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { CinematicAtmosphere } from "@/components/marketing/lux/cinematic-atmosphere";
import { CinematicImage } from "@/components/marketing/lux/cinematic-image";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { buttonVariants } from "@/components/ui/button";
import { STOCK_IMAGES } from "@/lib/data/stock-images";
import { cn } from "@/lib/utils/cn";

export function PremiumFinalCta() {
  const reduced = useReducedMotion();

  const content = (
    <div className="max-w-4xl px-2">
      <p className="lux-eyebrow">Engagement</p>
      <h2 className="mt-6 font-serif text-3xl leading-[1.12] tracking-[-0.02em] text-white md:text-4xl lg:text-[2.75rem]">
        Discuss your ophthalmic program with senior advisors
      </h2>
      <p className="mx-auto mt-6 max-w-lg text-[0.95rem] leading-[1.8] text-white/75 md:text-base">
        Confidential consultations for development, regulatory, access, and
        commercialization planning.
      </p>
      <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row sm:items-center">
        <Link
          href="/book"
          className={cn(buttonVariants({ variant: "primary", size: "lg" }), "min-w-[240px]")}
        >
          <Calendar className="mr-2 h-4 w-4" aria-hidden />
          Schedule a Consultation
        </Link>
        <Link
          href="/contact"
          className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "min-w-[200px]")}
        >
          Contact Our Team
        </Link>
      </div>
      <p className="mx-auto mt-8 max-w-md text-xs leading-relaxed text-white/45">
        NDA-first engagement. Client references available upon request.
      </p>
    </div>
  );

  return (
    <section className="relative min-h-[72vh] overflow-hidden bg-black text-white md:min-h-[78vh]">
      <CinematicImage
        src={STOCK_IMAGES.portfolioLab}
        alt=""
        fill
        sizes="100vw"
        grade="neutral"
      />
      <CinematicAtmosphere mood="warm" intensity="soft" vignette />

      <Container className="relative flex min-h-[72vh] flex-col items-center justify-center py-24 text-center md:min-h-[78vh] md:py-32">
        {reduced ? (
          content
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {content}
          </motion.div>
        )}
      </Container>
    </section>
  );
}
