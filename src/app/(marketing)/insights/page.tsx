import { Suspense } from "react";
import { InnerSection } from "@/components/layout/inner-section";
import { PageHero } from "@/components/layout/page-hero";
import { InsightsSection } from "@/components/marketing/insights-section";
import { InsightsSearch } from "@/components/marketing/insights-search";
import { PostCard } from "@/components/marketing/post-card";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { getAllPosts } from "@/lib/data/fetch-post-detail";
import { STOCK_IMAGES } from "@/lib/data/stock-images";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Insights",
  description:
    "Latest perspectives on ophthalmic biotech, industry trends, and regulatory developments.",
  path: "/insights",
});

function filterPosts(
  posts: Awaited<ReturnType<typeof getAllPosts>>,
  query?: string,
) {
  if (!query?.trim()) return posts;
  const q = query.toLowerCase();
  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q),
  );
}

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const allPosts = await getAllPosts();
  const posts = filterPosts(allPosts, q);
  const hasSearch = Boolean(q?.trim());

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Latest"
        titleAccent="perspectives"
        description="Analysis and guidance on ophthalmic development, regulation, and commercial strategy."
        imageSrc={STOCK_IMAGES.insightRegulatory}
        grade="cool"
        mood="cool"
        size="large"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Insights" },
        ]}
      />

      {!hasSearch && posts.length >= 3 ? (
        <InsightsSection posts={posts.slice(0, 3)} layout="featured" />
      ) : null}

      <InnerSection variant="ivory" className="lux-section-y-tight">
        <Suspense
          fallback={<div className="mb-10 h-14 max-w-md rounded-2xl bg-neutral-100/80" />}
        >
          <InsightsSearch defaultValue={q ?? ""} />
        </Suspense>

        <p className="mb-10 text-[12px] tracking-[0.08em] text-muted uppercase" aria-live="polite">
          {posts.length === 1 ? "1 article" : `${posts.length} articles`}
          {hasSearch ? ` · “${q!.trim()}”` : ""}
        </p>

        {posts.length === 0 ? (
          <p className="text-muted">
            No articles match your search.{" "}
            <a href="/insights" className="font-medium text-forest hover:text-gold">
              View all insights
            </a>
          </p>
        ) : hasSearch || posts.length < 3 ? (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} variant="editorial" />
            ))}
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(3).map((post) => (
              <PostCard key={post.slug} post={post} variant="editorial" />
            ))}
          </div>
        )}
      </InnerSection>

      <CtaBanner />
    </>
  );
}
