import { InnerSection } from "@/components/layout/inner-section";
import { PageHero } from "@/components/layout/page-hero";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "BEEÑA-E Consulting privacy policy.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we collect, use, and protect your information."
        mood="neutral"
        grade="neutral"
        size="compact"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy" },
        ]}
      />
      <InnerSection variant="ivory" className="lux-section-y-tight pb-28">
        <div className="lux-legal-prose">
          <p>
            Legal content will be provided by BEEÑA-E Consulting prior to production
            launch. For privacy-related inquiries, contact{" "}
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
