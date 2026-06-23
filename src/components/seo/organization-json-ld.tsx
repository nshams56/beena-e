import { footerContact } from "@/lib/data/home-content";

export function OrganizationJsonLd() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "BEEÑA-E Consulting",
    url: baseUrl,
    logo: `${baseUrl}/images/beena-e-logo.png`,
    description:
      "Senior ophthalmic biotech advisory for development, regulatory strategy, market access, and commercialization.",
    areaServed: "Worldwide",
    email: footerContact.email,
    telephone: footerContact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Danville",
      addressRegion: "CA",
      addressCountry: "US",
    },
    serviceType: [
      "Ophthalmic Biotech Consulting",
      "Product Development Advisory",
      "Regulatory Affairs",
      "Market Access",
      "Commercialization",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
