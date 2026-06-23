import { EngagementProcess } from "@/components/marketing/about/engagement-process";
import { GlobalNetwork } from "@/components/marketing/about/global-network";
import { LeadershipAdvisory } from "@/components/marketing/about/leadership-advisory";
import { ScientificExpertise } from "@/components/marketing/about/scientific-expertise";
import { TrustedPartnersMarquee } from "@/components/marketing/about/trusted-partners-marquee";
import { WhyChooseUs } from "@/components/marketing/about/why-choose-us";
import { FeaturedInsights } from "@/components/marketing/about/featured-insights";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { EditorialPause } from "@/components/marketing/lux/editorial-pause";
import {
  PageHero,
  PageHeroActions,
  PageHeroLink,
} from "@/components/layout/page-hero";
import { getFeaturedPosts } from "@/lib/data/fetch-posts";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "About",
  description:
    "Senior ophthalmic biotech advisors supporting sponsors across development, regulation, access, and commercialization.",
  path: "/about",
});

export default async function AboutPage() {
  const featuredPosts = await getFeaturedPosts(3);

  return (
    <>
      <PageHero
        eyebrow="About"
        title="Vision. Science."
        titleAccent="Impact."
        description="A global ophthalmic biotech advisory firm — scientific rigor, regulatory depth, and disciplined execution for sponsors, investors, and institutional partners."
        imageSrc="/images/hero/about-hero.png"
        imageAlt="Scientist in a laboratory using a microscope"
        grade="warm"
        mood="warm"
        size="large"
      >
        <PageHeroActions>
          <PageHeroLink href="/book">Schedule a Consultation</PageHeroLink>
          <PageHeroLink href="/services" variant="secondary">
            Explore Services
          </PageHeroLink>
        </PageHeroActions>
      </PageHero>

      <WhyChooseUs />
      <EditorialPause />
      <ScientificExpertise variant="editorial" />
      <GlobalNetwork featured />
      <EngagementProcess />
      <LeadershipAdvisory />
      <FeaturedInsights posts={featuredPosts} />
      <TrustedPartnersMarquee />
      <CtaBanner />
    </>
  );
}
