import { NewsletterCanvas } from "@/components/marketing/newsletter/newsletter-canvas";
import { NewsletterHero } from "@/components/marketing/newsletter/newsletter-hero";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Intelligence Briefing",
  description:
    "Subscribe to BEEÑA-E ophthalmic advisory perspectives — executive intelligence for development, regulatory, and commercial leaders.",
  path: "/newsletter",
});

export default function NewsletterPage() {
  return (
    <>
      <NewsletterHero />
      <NewsletterCanvas />
    </>
  );
}
