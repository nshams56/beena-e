"use client";

import { Container } from "@/components/layout/container";
import { CinematicAtmosphere } from "@/components/marketing/lux/cinematic-atmosphere";
import { CinematicImage } from "@/components/marketing/lux/cinematic-image";
import { Reveal } from "@/components/motion/reveal";
import { globalRegions } from "@/lib/data/about-content";
import { cn } from "@/lib/utils/cn";

const CONNECTION_PATHS = [
  "M26 42 C34 36, 42 33, 53 32",
  "M53 32 C60 32, 67 36, 76 46",
  "M53 32 C58 38, 60 44, 58 58",
  "M26 42 C40 38, 48 35, 53 32",
] as const;

function WorldMap({
  className,
  featured = false,
}: {
  className?: string;
  featured?: boolean;
}) {
  const uid = featured ? "home" : "default";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-black/40 shadow-[0_32px_80px_rgba(0,0,0,0.45)]",
        featured && "lux-map-stage",
        className,
      )}
    >
      <div className="lux-map-bloom pointer-events-none absolute inset-0" aria-hidden />
      <div className="lux-gradient-radial pointer-events-none absolute inset-0 opacity-100" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent"
        aria-hidden
      />
      <svg
        viewBox="0 0 100 60"
        className="relative h-full w-full px-6 py-8 md:px-12 md:py-14"
        role="img"
        aria-label="Global reach map"
      >
        <defs>
          <radialGradient id={`glow-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(70,242,213,0.25)" />
            <stop offset="100%" stopColor="rgba(70,242,213,0)" />
          </radialGradient>
          <linearGradient id={`line-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(247,195,95,0.2)" />
            <stop offset="50%" stopColor="rgba(70,242,213,0.4)" />
            <stop offset="100%" stopColor="rgba(247,195,95,0.08)" />
          </linearGradient>
          <filter id={`blur-${uid}`}>
            <feGaussianBlur stdDeviation="0.8" result="blur" />
          </filter>
        </defs>

        <path
          d="M9 22 C18 10, 30 12, 34 18 C36 22, 33 26, 26 28 C18 30, 12 30, 9 22 Z"
          fill="rgba(255,255,255,0.04)"
        />
        <path
          d="M38 20 C45 14, 56 14, 62 19 C66 23, 62 28, 54 30 C46 32, 40 28, 38 20 Z"
          fill="rgba(255,255,255,0.04)"
        />
        <path
          d="M62 24 C69 19, 82 19, 90 26 C93 29, 89 34, 80 36 C71 38, 64 33, 62 24 Z"
          fill="rgba(255,255,255,0.04)"
        />
        <path
          d="M52 36 C56 34, 64 35, 66 40 C67 44, 62 47, 56 48 C50 49, 48 41, 52 36 Z"
          fill="rgba(255,255,255,0.03)"
        />

        {CONNECTION_PATHS.map((d, i) => (
          <path
            key={d}
            d={d}
            stroke={`url(#line-${uid})`}
            strokeWidth="0.3"
            fill="none"
            strokeDasharray="3 5"
            filter={`url(#blur-${uid})`}
          />
        ))}

        {globalRegions.map((r, i) => (
          <g key={r.label}>
            <circle
              cx={r.x}
              cy={r.y}
              r={featured ? "8" : "5.5"}
              fill={`url(#glow-${uid})`}
            />
            <circle cx={r.x} cy={r.y} r="0.9" fill="rgba(255,255,255,0.95)" />
          </g>
        ))}
      </svg>
    </div>
  );
}

export function GlobalNetwork({
  featured = false,
}: {
  featured?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-black text-white",
        featured ? "lux-section-y-tight" : "py-16 md:py-24",
      )}
    >
      <CinematicImage
        src="/images/about/network.jpg"
        alt=""
        fill
        sizes="100vw"
        grade="deep"
      />
      <CinematicAtmosphere mood="neutral" intensity="soft" vignette />

      <Container className="relative">
        <Reveal className={cn("max-w-3xl", featured && "mx-auto text-center")}>
          <p className="lux-eyebrow">Global reach</p>
          <h2
            className={cn(
              "lux-heading mt-6",
              featured
                ? "text-[2rem] leading-[1.1] md:text-5xl lg:text-[3.75rem]"
                : "text-3xl md:text-4xl",
            )}
          >
            Global advisory coverage
            {featured && (
              <>
                <br />
                <span className="text-white/65">across major markets</span>
              </>
            )}
            {!featured && " across major markets"}
          </h2>
          <p
            className={cn(
              "mt-8 leading-[1.8] text-white/72",
              featured
                ? "mx-auto max-w-lg text-[0.95rem] md:text-lg"
                : "lux-prose-narrow text-base md:text-lg",
            )}
          >
            United States, Europe, MENA, APAC, and select emerging markets —
            supported through established CRO, regulatory, and commercial
            partners with ophthalmic depth.
          </p>
        </Reveal>

        <Reveal delay={0.12} className={cn("mt-20 md:mt-32", featured && "md:mt-40")}>
          <WorldMap
            featured={featured}
            className={
              featured
                ? "aspect-[2/1] min-h-[320px] md:min-h-[480px] lg:min-h-[520px]"
                : "aspect-16/10"
            }
          />
        </Reveal>

        {featured && (
          <Reveal
            delay={0.18}
            className="mt-16 flex flex-wrap justify-center gap-x-14 gap-y-5 md:mt-20"
          >
            {globalRegions.map((r) => (
              <span
                key={r.label}
                className="text-[11px] font-medium tracking-[0.2em] text-white/40 uppercase"
              >
                {r.label}
              </span>
            ))}
          </Reveal>
        )}
      </Container>
    </section>
  );
}
