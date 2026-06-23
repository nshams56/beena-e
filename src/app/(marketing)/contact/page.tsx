import { ContactCanvas } from "@/components/marketing/contact/contact-canvas";
import { ContactHero } from "@/components/marketing/contact/contact-hero";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Confidential executive consultation intake for BEEÑA-E Consulting — ophthalmic biotech advisory.",
  path: "/contact",
});

type Props = {
  searchParams: Promise<{ interest?: string }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const { interest } = await searchParams;
  const isRise = interest === "rise-pakistan-health";
  const tallyFormId = process.env.NEXT_PUBLIC_TALLY_CONTACT_FORM_ID;
  const mapsEmbedUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL;
  const useTally = Boolean(tallyFormId);

  return (
    <>
      <ContactHero isRise={isRise} />
      <ContactCanvas
        isRise={isRise}
        mapsEmbedUrl={mapsEmbedUrl}
        useTally={useTally}
        tallyFormId={tallyFormId}
      />
    </>
  );
}
