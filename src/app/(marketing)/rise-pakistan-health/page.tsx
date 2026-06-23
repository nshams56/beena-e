import { RiseCta } from "@/components/marketing/rise/rise-cta";
import { RiseHero } from "@/components/marketing/rise/rise-hero";
import { RisePillars } from "@/components/marketing/rise/rise-pillars";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "RISE Pakistan Health",
  description:
    "Research, Innovation, Service, and Education — mobilizing diaspora excellence for Pakistan's health. A project of Beena-E Consulting, USA.",
  path: "/rise-pakistan-health",
});

export default function RisePakistanHealthPage() {
  return (
    <div className="rise-theme">
      <RiseHero />
      <RisePillars />
      <RiseCta />
    </div>
  );
}
