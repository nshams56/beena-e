"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { RISE_IMAGES } from "@/lib/data/rise-content";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export function RiseCta() {
  return (
    <section className="relative overflow-hidden bg-rise-green py-24 md:py-32">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal className="group relative aspect-4/3 overflow-hidden rounded-[1.75rem] shadow-[0_32px_90px_rgba(0,0,0,0.2)]">
            <Image
              src={RISE_IMAGES.healthcare}
              alt="Healthcare team collaborating on patient care initiatives"
              fill
              className="lux-image-grade object-cover transition-transform duration-[1s] [@media(hover:hover)]:group-hover:scale-[1.03] motion-reduce:transition-none"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
          <Reveal delay={0.08} className="text-white">
            <h2 className="font-serif text-3xl md:text-4xl">
              Join the founding circle
            </h2>
            <p className="mt-4 leading-relaxed text-white/85">
              Whether you are a diaspora physician, academic partner, or
              organization committed to health in Pakistan — we welcome your
              interest in RISE Pakistan Health.
            </p>
            <Link
              href="/contact?interest=rise-pakistan-health"
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
                "mt-8 inline-flex bg-rise-yellow text-rise-green-dark hover:bg-rise-yellow-hover",
              )}
            >
              Contact BEEÑA-E →
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
