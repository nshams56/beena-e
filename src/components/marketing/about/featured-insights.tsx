import Link from "next/link";
import { InnerSection } from "@/components/layout/inner-section";
import { SectionHeader } from "@/components/layout/section-header";
import { PostCard } from "@/components/marketing/post-card";
import { buttonVariants } from "@/components/ui/button";
import type { InsightPost } from "@/lib/data/posts";
import { cn } from "@/lib/utils/cn";

export function FeaturedInsights({ posts }: { posts: InsightPost[] }) {
  return (
    <InnerSection variant="ivory" className="lux-section-y-tight">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          eyebrow="Featured insights"
          title="Perspectives for development and commercial leaders"
          description="Analysis across regulatory pathways, clinical evidence, and access strategy in ophthalmology."
          align="left"
          size="large"
        />
        <Link
          href="/insights"
          className={cn(
            buttonVariants({ variant: "dark", size: "md" }),
            "shrink-0 self-start",
          )}
        >
          View all insights →
        </Link>
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} variant="editorial" />
        ))}
      </div>
    </InnerSection>
  );
}
