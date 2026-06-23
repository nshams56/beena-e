import { Container } from "@/components/layout/container";
import {
  Breadcrumbs,
  type BreadcrumbItem,
} from "@/components/layout/breadcrumbs";
import { CinematicAtmosphere } from "@/components/marketing/lux/cinematic-atmosphere";
import { CinematicImage } from "@/components/marketing/lux/cinematic-image";
import { STOCK_IMAGES } from "@/lib/data/stock-images";
import { cn } from "@/lib/utils/cn";

export function ContactHero({ isRise }: { isRise: boolean }) {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Contact" },
  ];

  return (
    <section className="relative overflow-hidden bg-forest pt-24 text-white md:pt-28 lg:pt-32">
      <CinematicImage
        src={STOCK_IMAGES.contactHero}
        alt=""
        fill
        priority
        sizes="100vw"
        grade="warm"
      />
      <CinematicAtmosphere mood="warm" intensity="soft" vignette />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-forest-dark/60 via-forest/25 to-forest-dark/85"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(11,44,36,0.45),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_100%_50%,rgba(247,195,95,0.06),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[28%] max-w-xs bg-linear-to-r from-forest-dark/50 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[28%] max-w-xs bg-linear-to-l from-forest-dark/50 to-transparent"
        aria-hidden
      />
      <div className="lux-vignette pointer-events-none absolute inset-0 opacity-80" aria-hidden />

      <Container className="relative pb-14 md:pb-16 lg:pb-20">
        <Breadcrumbs items={breadcrumbs} />
        <p className="lux-eyebrow mt-5 tracking-[0.26em]">
          {isRise ? "Program intake" : "Executive intake"}
        </p>
        <h1
          className={cn(
            "mt-5 max-w-3xl font-serif text-3xl leading-[1.06] tracking-[-0.035em] text-white md:text-5xl lg:text-[3.35rem]",
          )}
        >
          {isRise ? (
            <>
              RISE Pakistan
              <br />
              <span className="text-gold/85">Health inquiry</span>
            </>
          ) : (
            <>
              Confidential
              <br />
              <span className="text-gold/85">consultation</span>
            </>
          )}
        </h1>
        <p className="mt-6 max-w-xl text-[0.98rem] leading-[1.85] text-white/72 md:text-lg md:leading-[1.8]">
          {isRise
            ? "Structured intake for RISE Pakistan Health — reviewed by our advisory team with discretion and operational rigor."
            : "A private channel for sponsors and leadership teams coordinating ophthalmic development, regulatory, and commercial priorities."}
        </p>
      </Container>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-ivory to-transparent"
        aria-hidden
      />
    </section>
  );
}
