import type { Metadata } from "next";

export const siteName = "BEEÑA-E Consulting";

const defaultOgImagePath = "/images/beena-e-logo.png";

export function buildPageMetadata({
  title,
  description,
  path = "",
  imagePath = defaultOgImagePath,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  imagePath?: string;
  noIndex?: boolean;
}): Metadata {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const url = `${baseUrl}${path}`;
  const imageUrl = imagePath.startsWith("http")
    ? imagePath
    : `${baseUrl}${imagePath}`;

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "en_US",
      type: "website",
      images: [{ url: imageUrl, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

const homeMeta = buildPageMetadata({
  title: "Global Ophthalmic Biotech Advisory & Development Partner",
  description:
    "Senior ophthalmic biotech advisory for development, regulatory strategy, market access, and commercialization — serving sponsors globally.",
  path: "/",
});

export const defaultMetadata: Metadata = {
  ...homeMeta,
  title: {
    default: "Global Ophthalmic Biotech Advisory & Development Partner",
    template: `%s | ${siteName}`,
  },
  icons: {
    icon: "/images/beena-e-logo.png",
    apple: "/images/beena-e-logo.png",
  },
};
