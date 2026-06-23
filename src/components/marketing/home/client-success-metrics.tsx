"use client";

import { Container } from "@/components/layout/container";
import { CinematicAtmosphere } from "@/components/marketing/lux/cinematic-atmosphere";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedStat } from "@/components/marketing/lux/animated-stat";
import { EnterpriseTrustLine } from "@/components/marketing/lux/enterprise-trust-line";
import { impactMetrics, impactMetricsHome } from "@/lib/data/about-content";
import { cn } from "@/lib/utils/cn";

export function ClientSuccessMetrics({
  variant = "dashboard",
}: {
  variant?: "dashboard" | "minimal";
}) {
  const isMinimal = variant === "minimal";
  const metrics = isMinimal ? impactMetricsHome : impactMetrics;

  return (
    <section
      className={cn(
        "relative overflow-hidden text-white",
        isMinimal ? "lux-section-y-tight bg-forest" : "bg-forest-dark py-16 md:py-24",
      )}
    >
      {isMinimal && (
        <CinematicAtmosphere mood="neutral" intensity="soft" vignette={false} />
      )}

      <Container className="relative">
        <Reveal className={isMinimal ? "max-w-lg" : "mx-auto max-w-2xl text-center"}>
          <p className="lux-eyebrow">Track record</p>
          <h2
            className={cn(
              "lux-heading mt-6",
              isMinimal ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl",
            )}
          >
            {isMinimal ? "Representative program experience" : "Ophthalmic advisory experience"}
          </h2>
        </Reveal>

        <div
          className={
            isMinimal
              ? "mt-24 grid gap-20 sm:grid-cols-2 lg:mt-32 lg:grid-cols-4 lg:gap-0"
              : "mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5"
          }
        >
          {metrics.map((metric, i) => (
            <Reveal
              key={metric.label}
              delay={i * 0.1}
              className={
                isMinimal
                  ? "text-center lg:border-l lg:border-white/[0.06] lg:px-12 first:lg:border-l-0 first:lg:pl-0"
                  : undefined
              }
            >
              {isMinimal ? (
                <div>
                  <p
                    className="lux-stat-value text-[2.75rem] md:text-5xl lg:text-[3.5rem] lg:leading-none"
                    aria-label={`${metric.value}${metric.suffix} ${metric.label}`}
                  >
                    <AnimatedStat value={metric.value} suffix={metric.suffix} />
                  </p>
                  <div
                    className="mx-auto mt-8 h-px w-6 bg-linear-to-r from-transparent via-gold/35 to-transparent lg:mx-0 lg:via-gold/35"
                    aria-hidden
                  />
                  <p className="mx-auto mt-6 max-w-[12rem] text-[13px] leading-[1.65] text-white/65 lg:mx-0">
                    {metric.label}
                  </p>
                </div>
              ) : (
                <article className="lux-glass lux-card-glow rounded-2xl p-6 text-center lg:text-left">
                  <p className="lux-stat-value text-4xl md:text-[2.75rem]">
                    <AnimatedStat value={metric.value} suffix={metric.suffix} />
                  </p>
                  <p className="mt-4 text-sm text-white/60">{metric.label}</p>
                </article>
              )}
            </Reveal>
          ))}
        </div>
        {isMinimal ? (
          <EnterpriseTrustLine className="text-white/50">
            Metrics reflect cumulative experience across leadership and selected
            engagements. Individual results vary by program and indication.
          </EnterpriseTrustLine>
        ) : null}
      </Container>
    </section>
  );
}
