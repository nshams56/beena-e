import Link from "next/link";
import { InnerSection } from "@/components/layout/inner-section";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { ServiceCard } from "@/components/marketing/service-card";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { getServices } from "@/lib/data/fetch-services";
import { STOCK_IMAGES } from "@/lib/data/stock-images";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Services",
  description:
    "Senior ophthalmic advisory across strategy, product development, regulatory and clinical programs, market access, and commercialization.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Ophthalmic advisory"
        titleAccent="services"
        description="Senior support across strategy, integrated development, regulatory and clinical programs, market access, and commercialization."
        imageSrc={STOCK_IMAGES.portfolioLab}
        grade="neutral"
        mood="warm"
        size="large"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />

      <InnerSection variant="ivory" className="lux-section-y" id="services-list">
        <StaggerChildren className="grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, i) => (
            <StaggerItem
              key={service.slug}
              className={i % 3 === 1 ? "md:mt-6" : i % 3 === 2 ? "md:mt-3" : ""}
            >
              <ServiceCard service={service} variant="light" spacious />
            </StaggerItem>
          ))}
        </StaggerChildren>
        <p className="mt-20 text-center text-[0.95rem] leading-[1.8] text-muted">
          Ready to discuss your program?{" "}
          <Link
            href="/book"
            className="font-medium text-forest transition-colors duration-300 hover:text-gold"
          >
            Schedule a consultation
          </Link>
        </p>
      </InnerSection>

      <CtaBanner />
    </>
  );
}
