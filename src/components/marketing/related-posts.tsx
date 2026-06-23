import { InnerSection } from "@/components/layout/inner-section";
import { PostCard } from "@/components/marketing/post-card";
import type { InsightPost } from "@/lib/data/posts";

export function RelatedPosts({
  posts,
  title = "Related perspectives",
}: {
  posts: InsightPost[];
  title?: string;
}) {
  if (posts.length === 0) return null;

  return (
    <InnerSection variant="white" className="border-t border-neutral-200/50 py-20 md:py-24">
      <h2 className="font-serif text-2xl tracking-[-0.02em] text-neutral-900 md:text-3xl">
        {title}
      </h2>
      <div className="mt-10 grid gap-10 md:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} variant="editorial" />
        ))}
      </div>
    </InnerSection>
  );
}
