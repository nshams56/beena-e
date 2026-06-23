import { PageHero } from "@/components/layout/page-hero";
import { STOCK_IMAGES } from "@/lib/data/stock-images";

/** @deprecated Prefer PageHero with explicit image — kept for gradual migration */
export function PageHeader({
  eyebrow,
  title,
  description,
  imageSrc = STOCK_IMAGES.portfolioLab,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  imageSrc?: string;
}) {
  return (
    <PageHero
      eyebrow={eyebrow}
      title={title}
      description={description}
      imageSrc={imageSrc}
      mood="warm"
      grade="neutral"
      size="default"
    />
  );
}
