import { Mail } from "lucide-react";
import { Container } from "@/components/layout/container";
import { NewsletterForm } from "@/components/forms/newsletter-form";

export function NewsletterCta() {
  return (
    <section className="bg-forest py-12 md:py-14" id="newsletter">
      <Container>
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-sm items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
              <Mail className="h-5 w-5 text-gold" aria-hidden />
            </span>
            <div>
              <h2 className="font-serif text-2xl text-white md:text-3xl">
                Stay Informed
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Receive ophthalmic biotech insights and industry updates.
              </p>
            </div>
          </div>
          <NewsletterForm />
        </div>
      </Container>
    </section>
  );
}
