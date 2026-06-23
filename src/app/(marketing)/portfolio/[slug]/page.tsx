import Link from "next/link";
import { notFound } from "next/navigation";
import { InnerSection } from "@/components/layout/inner-section";
import { PageHero } from "@/components/layout/page-hero";
import { ContentRelatedLinks } from "@/components/marketing/content-related-links";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { serviceSlugToTitle } from "@/lib/data/services";
import { DetailHeroMedia } from "@/components/marketing/lux/detail-hero-media";
import { StickyMobileCta } from "@/components/marketing/sticky-mobile-cta";
import { buttonVariants } from "@/components/ui/button";
import {
  getCaseStudyBySlug,
  getCaseStudySlugs,
} from "@/lib/data/fetch-case-studies";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils/cn";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return {};

  return buildPageMetadata({
    title: study.title,
    description: study.summary,
    path: `/portfolio/${slug}`,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  return (
    <>
      <PageHero
        eyebrow={study.clientLabel}
        title={study.title}
        description={study.summary}
        grade="deep"
        mood="cool"
        size="compact"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: study.title },
        ]}
      />

      <DetailHeroMedia
        src={study.imageUrl}
        alt={study.title}
        gradientClassName={study.imageGradient}
      />

      <InnerSection variant="ivory" className="lux-section-y-tight pb-28 md:pb-32">
        <div className="mx-auto max-w-3xl space-y-16">
          <section>
            <h2 className="font-serif text-2xl tracking-[-0.02em] text-forest">Challenge</h2>
            <p className="mt-5 text-[1.05rem] leading-[1.9] text-muted/95">{study.challenge}</p>
          </section>
          <div className="h-px w-16 bg-gold/35" aria-hidden />
          <section>
            <h2 className="font-serif text-2xl tracking-[-0.02em] text-forest">Approach</h2>
            <p className="mt-5 text-[1.05rem] leading-[1.9] text-muted/95">{study.approach}</p>
          </section>
          <div className="h-px w-16 bg-gold/35" aria-hidden />
          <section>
            <h2 className="font-serif text-2xl tracking-[-0.02em] text-forest">Results</h2>
            <ul className="mt-6 space-y-4">
              {study.results.map((r) => (
                <li
                  key={r}
                  className="border-l border-gold/30 pl-6 text-[0.95rem] leading-[1.8] text-muted"
                >
                  {r}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mx-auto mt-20 grid max-w-3xl gap-10 sm:grid-cols-3">
          {study.metrics.map((m) => (
            <div key={m.label} className="text-center sm:text-left">
              <p className="font-serif text-4xl tracking-[-0.03em] text-forest md:text-5xl">
                {m.value}
              </p>
              <p className="mt-3 text-[11px] tracking-[0.12em] text-muted uppercase">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        <ContentRelatedLinks
          serviceSlug={study.serviceSlugs[0]}
          insightSlug={study.relatedInsightSlug}
        />

        {study.serviceSlugs.length > 0 ? (
          <div className="mx-auto mt-20 max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted">
              Related services
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {study.serviceSlugs.map((s) => (
                <Link
                  key={s}
                  href={`/services/${s}`}
                  className={cn(buttonVariants({ variant: "dark", size: "sm" }))}
                >
                  {serviceSlugToTitle[s] ?? s}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </InnerSection>

      <CtaBanner />
      <StickyMobileCta />
    </>
  );
}
