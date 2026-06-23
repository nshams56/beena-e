import { Container } from "@/components/layout/container";
import { trustHeadline, trustPartners } from "@/lib/data/trust-content";

export function TrustStrip() {
  return (
    <section
      className="border-y border-white/10 bg-forest-dark py-10 md:py-12"
      aria-label="Trusted partners"
    >
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          {trustHeadline}
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {trustPartners.map((partner) => (
            <li
              key={partner}
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/85"
            >
              {partner}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
