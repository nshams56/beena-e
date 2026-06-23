import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { CinematicAtmosphere } from "@/components/marketing/lux/cinematic-atmosphere";
import { CinematicImage } from "@/components/marketing/lux/cinematic-image";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { whyChoose, whyChooseHome } from "@/lib/data/about-content";
import { cn } from "@/lib/utils/cn";

type WhyItem = (typeof whyChoose)[number];

export function WhyChooseUs({
  variant = "full",
}: {
  variant?: "full" | "home";
}) {
  const isHome = variant === "home";
  const items: readonly WhyItem[] = isHome ? whyChooseHome : whyChoose;

  return (
    <Section
      variant="forest"
      className={cn("relative overflow-hidden", isHome && "lux-section-y")}
    >
      <CinematicImage
        src="/images/about/why-choose.jpg"
        alt=""
        fill
        sizes="100vw"
        grade="warm"
      />
      <CinematicAtmosphere mood="warm" intensity="soft" />

      <Container className="relative">
        <SectionHeader
          eyebrow="Why sponsors choose us"
          title={
            isHome
              ? "Built for institutional ophthalmic programs"
              : "Ophthalmic advisory built for institutional sponsors"
          }
          description={
            isHome
              ? "Senior advisors who align science, regulation, and commercialization — with the clarity global sponsors expect."
              : "Senior advisors who align development, regulatory, access, and commercialization — with governance-ready deliverables."
          }
          align="left"
          light
          size={isHome ? "large" : "default"}
        />

        <StaggerChildren
          className={cn(
            "mt-20 md:mt-28",
            isHome
              ? "grid gap-10 md:grid-cols-2 md:gap-x-14 md:gap-y-16"
              : "grid gap-8 sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {items.map((item) => (
            <StaggerItem key={item.title}>
              <article
                className={cn(
                  "lux-glass lux-card-glow group card-hover-lift h-full",
                  isHome ? "p-10 md:p-12 lg:p-14" : "p-7",
                )}
              >
                <span
                  className={cn(
                    "lux-icon-capsule lux-ring",
                    isHome ? "size-14" : "size-12",
                  )}
                >
                  <item.icon
                    className={cn("shrink-0", isHome ? "size-6" : "size-5")}
                    aria-hidden
                  />
                </span>
                <h3
                  className={cn(
                    "mt-10 font-serif leading-[1.18] tracking-[-0.025em] text-white",
                    isHome ? "text-2xl md:text-[1.8rem]" : "text-xl",
                  )}
                >
                  {item.title}
                </h3>
                <p
                  className={cn(
                    "mt-5 max-w-md leading-[1.8] text-white/62",
                    isHome ? "text-[0.95rem] md:text-base" : "text-sm",
                  )}
                >
                  {item.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </Section>
  );
}
