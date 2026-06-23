"use client";

import Image from "next/image";
import { Container } from "@/components/layout/container";
import { CinematicAtmosphere } from "@/components/marketing/lux/cinematic-atmosphere";
import { CinematicImage } from "@/components/marketing/lux/cinematic-image";
import { Reveal } from "@/components/motion/reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { expertiseAreas, expertiseHome } from "@/lib/data/about-content";
import { cn } from "@/lib/utils/cn";

export function ScientificExpertise({
  variant = "grid",
}: {
  variant?: "grid" | "editorial";
}) {
  const isEditorial = variant === "editorial";
  const items = isEditorial ? expertiseHome : expertiseAreas;

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-forest text-white",
        isEditorial ? "lux-section-y" : "py-16 md:py-24",
      )}
    >
      <CinematicImage
        src="/images/about/expertise.jpg"
        alt=""
        fill
        sizes="100vw"
        grade="cool"
      />
      <CinematicAtmosphere mood="cool" intensity="soft" />

      <Container className="relative">
        {isEditorial ? (
          <div className="grid gap-20 lg:grid-cols-12 lg:gap-20 lg:items-start">
            <Reveal className="lg:col-span-5 lg:sticky lg:top-32">
              <p className="lux-eyebrow">Scientific expertise</p>
              <h2 className="lux-heading mt-6 text-2xl md:text-4xl lg:text-[2.75rem]">
                Depth across
                <br />
                <span className="text-white/70">the ophthalmic lifecycle</span>
              </h2>
              <p className="mt-9 max-w-sm text-[0.95rem] leading-[1.8] text-white/75 md:text-base">
                Integrated advisory from translational science through regulatory
                dialogue, access planning, and launch readiness.
              </p>
              <div className="group relative mt-14 aspect-4/5 overflow-hidden rounded-[1.75rem] shadow-[0_48px_120px_rgba(0,0,0,0.4)] lg:mt-16">
                <Image
                  src="/images/about/expertise.jpg"
                  alt="Biotech laboratory research"
                  fill
                  className="lux-image-grade object-cover transition-transform duration-[1.4s] ease-out [@media(hover:hover)]:group-hover:scale-[1.03] motion-reduce:transition-none"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="lux-image-overlay lux-image-overlay--cool absolute inset-0" />
                <div className="lux-image-vignette absolute inset-0" />
              </div>
            </Reveal>

            <StaggerChildren className="lg:col-span-7 lg:pt-6">
              {items.map((area, i) => (
                <StaggerItem key={area.title}>
                  <div
                    className={cn(
                      "group border-b border-white/[0.06] py-10 md:py-14",
                      i === 0 && "border-t",
                    )}
                  >
                    <div className="flex items-start gap-6 md:gap-10">
                      <span className="lux-icon-capsule lux-ring size-12 shrink-0 text-cyan-glow/90">
                        <area.icon className="size-5 shrink-0" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif text-xl leading-[1.2] tracking-[-0.025em] text-white md:text-2xl">
                          {area.title}
                        </h3>
                        <p className="mt-4 max-w-md text-[0.9rem] leading-[1.85] text-white/55 md:text-[0.95rem]">
                          {"description" in area
                            ? area.description
                            : "Evidence strategy and cross-functional alignment for ophthalmic programs."}
                        </p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        ) : (
          <>
            <Reveal className="max-w-2xl">
              <p className="lux-eyebrow">Scientific expertise</p>
              <h2 className="lux-heading mt-5 text-3xl md:text-4xl">
                Therapeutic and lifecycle depth in ophthalmology
              </h2>
              <p className="lux-body mt-7">
                From retina and rare disease to gene therapy and commercial readiness,
                our team connects mechanism to evidence, evidence to strategy, and
                strategy to outcomes.
              </p>
            </Reveal>
            <StaggerChildren className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((area) => (
                <StaggerItem key={area.title}>
                  <div className="lux-glass lux-card-glow group card-hover-lift p-7">
                    <span className="lux-icon-capsule size-11 text-cyan-glow">
                      <area.icon className="size-5 shrink-0" aria-hidden />
                    </span>
                    <h3 className="mt-6 font-serif text-xl text-white">{area.title}</h3>
                    <p className="mt-4 text-sm leading-[1.7] text-white/60">
                      Evidence strategy and cross-functional alignment designed for
                      ophthalmic programs.
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </>
        )}
      </Container>
    </section>
  );
}
