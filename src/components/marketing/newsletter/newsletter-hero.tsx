import { Container } from "@/components/layout/container";
import {
  Breadcrumbs,
  type BreadcrumbItem,
} from "@/components/layout/breadcrumbs";
import { CinematicAtmosphere } from "@/components/marketing/lux/cinematic-atmosphere";
import { CinematicImage } from "@/components/marketing/lux/cinematic-image";
import { STOCK_IMAGES } from "@/lib/data/stock-images";

export function NewsletterHero() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Briefing" },
  ];

  return (
    <section className="relative overflow-hidden bg-forest pt-24 text-white md:pt-28 lg:pt-32">
      <CinematicImage
        src={STOCK_IMAGES.insightEmerging}
        alt=""
        fill
        priority
        sizes="100vw"
        grade="cool"
      />
      <CinematicAtmosphere mood="cool" intensity="soft" vignette />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-forest-dark/62 via-forest/22 to-forest-dark/88"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_0%,rgba(11,44,36,0.5),transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_0%_80%,rgba(247,195,95,0.05),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[30%] max-w-sm bg-linear-to-r from-forest-dark/55 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[30%] max-w-sm bg-linear-to-l from-forest-dark/55 to-transparent"
        aria-hidden
      />
      <div className="lux-vignette pointer-events-none absolute inset-0 opacity-85" aria-hidden />

      <Container className="relative pb-14 md:pb-16 lg:pb-20">
        <Breadcrumbs items={breadcrumbs} />
        <p className="lux-eyebrow mt-5 tracking-[0.26em]">Intelligence briefing</p>
        <h1 className="mt-5 max-w-3xl font-serif text-3xl leading-[1.06] tracking-[-0.035em] text-white md:text-5xl lg:text-[3.35rem]">
          Ophthalmic
          <br />
          <span className="text-gold/85">advisory perspectives</span>
        </h1>
        <p className="mt-6 max-w-xl text-[0.98rem] leading-[1.85] text-white/72 md:text-lg md:leading-[1.8]">
          A measured briefing for leaders navigating development, regulatory
          dialogue, and commercialization across global ophthalmic biotech.
        </p>
      </Container>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-ivory to-transparent"
        aria-hidden
      />
    </section>
  );
}
