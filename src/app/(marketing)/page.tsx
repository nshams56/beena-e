import { GlobalNetwork } from "@/components/marketing/about/global-network";
import { ScientificExpertise } from "@/components/marketing/about/scientific-expertise";
import { WhyChooseUs } from "@/components/marketing/about/why-choose-us";
import { ClientSuccessMetrics } from "@/components/marketing/home/client-success-metrics";
import { PremiumFinalCta } from "@/components/marketing/home/premium-final-cta";
import { EditorialPause } from "@/components/marketing/lux/editorial-pause";
import { HomeHero } from "@/components/marketing/home-hero";
import { InsightsSection } from "@/components/marketing/insights-section";
import { ServicesGrid } from "@/components/marketing/services-grid";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";
import { getFeaturedPosts } from "@/lib/data/fetch-posts";
import { getServices } from "@/lib/data/fetch-services";

export default async function HomePage() {
  const [services, posts] = await Promise.all([
    getServices(),
    getFeaturedPosts(3),
  ]);

  return (
    <>
      <OrganizationJsonLd />
      <HomeHero />
      <WhyChooseUs variant="home" />
      <ServicesGrid services={services} variant="home" />
      <EditorialPause />
      <GlobalNetwork featured />
      <ScientificExpertise variant="editorial" />
      <ClientSuccessMetrics variant="minimal" />
      <InsightsSection posts={posts} layout="featured" />
      <TestimonialsSection variant="dark" limit={2} />
      <PremiumFinalCta />
    </>
  );
}
