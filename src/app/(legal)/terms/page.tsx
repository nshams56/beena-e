import { InnerSection } from "@/components/layout/inner-section";
import { PageHero } from "@/components/layout/page-hero";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Terms of Use",
  description: "BEEÑA-E Consulting terms of use.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description="Terms governing use of this website and our services."
        mood="neutral"
        grade="neutral"
        size="compact"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms" },
        ]}
      />
      <InnerSection variant="ivory" className="lux-section-y-tight pb-28">
        <div className="lux-legal-prose">
          <p>
            Legal content will be provided by BEEÑA-E Consulting prior to production
            launch. For questions about these terms, contact{" "}
            <a
              href="mailto:info@beena-e.com"
              className="font-medium text-forest transition-colors hover:text-gold"
            >
              info@beena-e.com
            </a>
            .
          </p>
        </div>
      </InnerSection>
    </>
  );
}
