import { notFound } from "next/navigation";
import { InnerSection } from "@/components/layout/inner-section";
import { PageHero } from "@/components/layout/page-hero";
import { ArticleProse } from "@/components/cms/article-prose";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { DetailHeroMedia } from "@/components/marketing/lux/detail-hero-media";
import { ReadingProgress } from "@/components/marketing/lux/reading-progress";
import { ContentRelatedLinks } from "@/components/marketing/content-related-links";
import { RelatedPosts } from "@/components/marketing/related-posts";
import { StickyMobileCta } from "@/components/marketing/sticky-mobile-cta";
import {
  getPostBySlug,
  getPostSlugs,
  getAllPosts,
} from "@/lib/data/fetch-post-detail";
import { buildPageMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const ogImage = post.imageUrl
    ? post.imageUrl.startsWith("http")
      ? post.imageUrl
      : `${baseUrl}${post.imageUrl}`
    : undefined;

  const meta = buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/insights/${slug}`,
    imagePath: ogImage,
  });

  return {
    ...meta,
    openGraph: {
      ...(typeof meta.openGraph === "object" ? meta.openGraph : {}),
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const articleUrl = `${baseUrl}/insights/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: "BEEÑA-E Consulting" },
    publisher: { "@type": "Organization", name: "BEEÑA-E Consulting" },
    mainEntityOfPage: articleUrl,
    url: articleUrl,
    ...(post.imageUrl ? { image: [post.imageUrl] } : {}),
  };

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        grade="cool"
        mood="cool"
        size="compact"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: post.title },
        ]}
      >
        <p className="text-[12px] tracking-[0.12em] text-white/50 uppercase">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span className="mx-3" aria-hidden>
            ·
          </span>
          {post.readTimeMin} min read
        </p>
      </PageHero>

      <DetailHeroMedia
        src={post.imageUrl}
        alt={post.title}
        gradientClassName={post.imageGradient}
      />

      <InnerSection variant="ivory" className="pb-32 pt-16 md:pb-32 md:pt-20">
        <ArticleProse paragraphs={post.content} />
        <ContentRelatedLinks serviceSlug={post.relatedServiceSlug} />
      </InnerSection>

      <RelatedPosts posts={related} />
      <CtaBanner
        title="Discuss strategic priorities with our advisors"
        description="Confidential consultation on development, regulatory, access, or commercialization planning."
        primaryLabel="Schedule a Consultation"
        secondaryLabel="Contact Our Team"
      />
      <StickyMobileCta />
    </>
  );
}
