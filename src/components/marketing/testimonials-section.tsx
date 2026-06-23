import { Container } from "@/components/layout/container";
import { CinematicAtmosphere } from "@/components/marketing/lux/cinematic-atmosphere";
import { Reveal } from "@/components/motion/reveal";
import { testimonials } from "@/lib/data/trust-content";
import { cn } from "@/lib/utils/cn";

export function TestimonialsSection({
  variant = "light",
  limit = 3,
}: {
  variant?: "light" | "dark";
  limit?: number;
}) {
  const isDark = variant === "dark";
  const items = testimonials.slice(0, limit);

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        isDark ? "lux-section-y-tight bg-black text-white" : "bg-white py-16 md:py-24",
      )}
    >
      {isDark && <CinematicAtmosphere mood="deep" intensity="soft" vignette={false} />}
      <Container className="relative">
        <Reveal className={isDark ? "max-w-lg" : "mx-auto max-w-2xl text-center"}>
          <p className="lux-eyebrow">Client perspectives</p>
          <h2
            className={cn(
              "mt-6 font-serif leading-[1.15] tracking-[-0.025em]",
              isDark
                ? "text-3xl text-white md:text-[2.5rem]"
                : "text-3xl text-neutral-900 md:text-4xl",
            )}
          >
            What sponsors say
          </h2>
        </Reveal>

        <ul
          className={
            isDark
              ? "mt-24 space-y-24 md:mt-32 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-24"
              : "mt-12 grid gap-6 md:grid-cols-3"
          }
        >
          {items.map((item, i) => (
            <Reveal key={item.organization} delay={i * 0.12}>
              <li className={isDark ? "max-w-md" : "flex h-full flex-col rounded-xl border border-neutral-200/80 bg-neutral-50 p-8"}>
                <blockquote
                  className={
                    isDark
                      ? "text-lg leading-[1.7] text-white/88 md:text-xl md:leading-[1.65]"
                      : "text-sm leading-relaxed text-neutral-800"
                  }
                >
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <footer className={isDark ? "mt-12" : "mt-6 border-t border-neutral-200 pt-5"}>
                  <p className={cn("text-[13px] font-medium tracking-wide", isDark ? "text-gold/75" : "text-forest")}>
                    {item.name}
                  </p>
                  <p className={cn("mt-2.5 text-[11px] tracking-[0.12em] uppercase", isDark ? "text-white/38" : "text-muted")}>
                    {item.organization}
                  </p>
                </footer>
              </li>
            </Reveal>
          ))}
        </ul>

        <p
          className={cn(
            "mt-20 text-[11px] tracking-[0.08em]",
            isDark ? "text-white/30" : "mt-8 text-center text-muted",
          )}
        >
          Client names withheld for confidentiality. References available upon request.
        </p>
      </Container>
    </section>
  );
}
