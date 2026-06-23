import Link from "next/link";
import { Container } from "@/components/layout/container";
import { CinematicAtmosphere } from "@/components/marketing/lux/cinematic-atmosphere";
import { CinematicImage } from "@/components/marketing/lux/cinematic-image";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { STOCK_IMAGES } from "@/lib/data/stock-images";
import { cn } from "@/lib/utils/cn";

export function CtaBanner({
  title = "Discuss your ophthalmic program",
  description = "Schedule a confidential consultation with our senior advisory team.",
  primaryHref = "/book",
  primaryLabel = "Schedule a Consultation",
  secondaryHref = "/contact",
  secondaryLabel = "Contact Us",
}: {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-forest-dark py-24 text-white md:py-32">
      <CinematicImage
        src={STOCK_IMAGES.portfolioLab}
        alt=""
        fill
        sizes="100vw"
        grade="deep"
      />
      <CinematicAtmosphere mood="warm" intensity="soft" vignette />
      <Container className="relative text-center">
        <Reveal className="mx-auto max-w-3xl">
          <p className="lux-eyebrow">Next steps</p>
          <h2 className="mt-5 font-serif text-3xl leading-[1.12] tracking-[-0.025em] md:text-4xl lg:text-[2.75rem]">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[0.95rem] leading-[1.8] text-white/75 md:text-base">
            {description}
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row sm:items-center">
            <Link
              href={primaryHref}
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
              )}
            >
              {primaryLabel}
            </Link>
            <Link
              href={secondaryHref}
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
            >
              {secondaryLabel}
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
