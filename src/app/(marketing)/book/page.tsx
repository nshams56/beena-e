import { InnerSection } from "@/components/layout/inner-section";
import { LuxFormPanel } from "@/components/layout/lux-form-panel";
import { PageHero } from "@/components/layout/page-hero";
import { BookingForm } from "@/components/forms/booking-form";
import { CalendlyEmbed } from "@/components/integrations/calendly-embed";
import { STOCK_IMAGES } from "@/lib/data/stock-images";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Book a Consultation",
  description: "Schedule a consultation with BEEÑA-E Consulting.",
  path: "/book",
});

export default function BookPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <>
      <PageHero
        eyebrow="Booking"
        title="Schedule a"
        titleAccent="consultation"
        description="Book via Calendly or submit a consultation request. We confirm availability by email, typically within one business day."
        imageSrc={STOCK_IMAGES.contactHero}
        grade="warm"
        mood="warm"
        size="large"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Book" },
        ]}
      />

      <InnerSection variant="ivory" className="lux-section-y">
        {calendlyUrl ? (
          <div className="mb-16 md:mb-20">
            <h2 className="font-serif text-2xl tracking-[-0.02em] text-neutral-900">
              Book a time directly
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-[1.8] text-muted">
              Select an available slot on our calendar.
            </p>
            <div className="mt-8 rounded-[1.75rem] border border-neutral-200/40 bg-white shadow-[0_24px_80px_rgba(11,28,22,0.06)]">
              <CalendlyEmbed url={calendlyUrl} />
            </div>
          </div>
        ) : null}

        <LuxFormPanel
          title={calendlyUrl ? "Or request a consultation" : "Request a consultation"}
          description="Share your availability and program context. We confirm scheduling by email, typically within one business day."
        >
          <BookingForm />
        </LuxFormPanel>
      </InnerSection>
    </>
  );
}
