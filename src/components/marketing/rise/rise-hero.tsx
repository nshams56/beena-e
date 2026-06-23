import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { riseLockup, RISE_IMAGES } from "@/lib/data/rise-content";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export function RiseHero() {
  return (
    <section className="relative overflow-hidden bg-rise-green-dark pt-28 text-white md:pt-32">
      <div className="lux-noise pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-rise-green-dark via-rise-green to-rise-green-elevated/90"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-radial-[ellipse_80%_60%_at_20%_0%] from-rise-yellow/10 via-transparent to-transparent"
        aria-hidden
      />
      <Container className="relative grid gap-14 pb-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:pb-24">
        <div className="space-y-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-rise-yellow/90">
            {riseLockup.parent}
          </p>
          <h1 className="font-serif text-4xl leading-[1.08] tracking-[-0.03em] md:text-5xl lg:text-[3.25rem]">
            {riseLockup.title}
          </h1>
          <p className="text-lg font-medium text-rise-yellow/90 md:text-xl">
            {riseLockup.tagline}
          </p>
          <p className="max-w-xl text-[0.95rem] leading-[1.85] text-white/75 md:text-base">
            {riseLockup.subtitle}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact?interest=rise-pakistan-health"
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
                "bg-rise-yellow text-rise-green-dark shadow-[0_18px_56px_rgba(249,199,79,0.25)] hover:bg-rise-yellow-hover",
              )}
            >
              Get Involved →
            </Link>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "border-white/25 text-white hover:bg-white/10",
              )}
            >
              About BEEÑA-E
            </Link>
          </div>
        </div>
        <div className="group relative mx-auto aspect-4/3 w-full max-w-xl overflow-hidden rounded-[1.75rem] shadow-[0_40px_100px_rgba(0,0,0,0.35)] lg:max-w-none">
          <Image
            src={RISE_IMAGES.hero}
            alt="Healthcare professionals collaborating"
            fill
            priority
            className="lux-image-grade object-cover transition-transform duration-[1.2s] ease-out [@media(hover:hover)]:group-hover:scale-[1.03] motion-reduce:transition-none"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            className="absolute inset-0 bg-linear-to-t from-rise-green-dark/75 via-rise-green/20 to-transparent"
            aria-hidden
          />
          <div className="lux-image-vignette absolute inset-0 opacity-70" aria-hidden />
        </div>
      </Container>
    </section>
  );
}
