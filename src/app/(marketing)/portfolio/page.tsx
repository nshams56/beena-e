import { InnerSection } from "@/components/layout/inner-section";
import { PageHero } from "@/components/layout/page-hero";
import { CaseStudyCard } from "@/components/marketing/case-study-card";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { getCaseStudies } from "@/lib/data/fetch-case-studies";
import { STOCK_IMAGES } from "@/lib/data/stock-images";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Portfolio",
  description:
    "Representative ophthalmic advisory engagements across regulatory, development, access, and launch readiness.",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const studies = await getCaseStudies();

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Representative"
        titleAccent="engagements"
        description="Selected advisory work across regulatory pathway design, development planning, access strategy, and launch readiness. Client details anonymized."
        imageSrc={STOCK_IMAGES.portfolioLab}
        grade="deep"
        mood="cool"
        size="large"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio" },
        ]}
      />

      <InnerSection variant="ivory" className="lux-section-y">
        <StaggerChildren className="grid gap-12 md:grid-cols-2">
          {studies.map((study, i) => (
            <StaggerItem key={study.slug} className={i === 0 ? "md:col-span-2" : ""}>
              <CaseStudyCard study={study} featured={i === 0} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </InnerSection>

      <CtaBanner />
    </>
  );
}
