import Link from "next/link";
import { notFound } from "next/navigation";
import { InnerSection } from "@/components/layout/inner-section";
import { PageHero } from "@/components/layout/page-hero";
import { Accordion } from "@/components/ui/accordion";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { DetailHeroMedia } from "@/components/marketing/lux/detail-hero-media";
import { ServiceSidebar } from "@/components/marketing/lux/service-sidebar";
import { StickyMobileCta } from "@/components/marketing/sticky-mobile-cta";
import { getServiceDetail, getServiceSlugs } from "@/lib/data/fetch-service-detail";
import { getServices } from "@/lib/data/fetch-services";
import { buildPageMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceDetail(slug);
  if (!service) return {};

  return buildPageMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceDetail(slug);
  if (!service) notFound();

  const allServices = await getServices();
  const related = allServices.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={service.title}
        description={service.summary}
        grade="cool"
        mood="cool"
        size="compact"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      {service.imageUrl ? (
        <DetailHeroMedia src={service.imageUrl} alt={service.title} />
      ) : null}

      <InnerSection variant="ivory" className="lux-section-y-tight pb-24 md:pb-28">
        <div className="grid gap-16 lg:grid-cols-[1fr_300px] lg:items-start lg:gap-20">
          <div className="min-w-0 space-y-14">
            <div className="space-y-6">
              {service.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-[1.05rem] leading-[1.9] text-muted/95"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {service.outcomes.length > 0 ? (
              <div>
                <h2 className="font-serif text-2xl tracking-[-0.02em] text-forest">
                  Key outcomes
                </h2>
                <ul className="mt-6 space-y-4 border-l border-gold/30 pl-6">
                  {service.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="text-[0.95rem] leading-[1.8] text-muted"
                    >
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {service.faqs.length > 0 ? (
              <div>
                <h2 className="font-serif text-2xl tracking-[-0.02em] text-forest">
                  Frequently asked questions
                </h2>
                <Accordion items={service.faqs} className="mt-8" />
              </div>
            ) : null}
          </div>

          <ServiceSidebar serviceTitle={service.title} />
        </div>
      </InnerSection>

      {related.length > 0 ? (
        <InnerSection variant="white" className="border-t border-neutral-200/60 py-16 md:py-20">
          <h2 className="font-serif text-xl tracking-[-0.02em] text-neutral-900">
            Related services
          </h2>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {related.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-sm font-medium text-forest transition-colors duration-300 hover:text-gold"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </InnerSection>
      ) : null}

      <CtaBanner
        title={`Discuss ${service.title.toLowerCase()} priorities`}
        description="Confidential consultation with senior advisors on your ophthalmic program."
        primaryLabel="Schedule a Consultation"
        secondaryLabel="Contact Our Team"
      />
      <StickyMobileCta />
    </>
  );
}
