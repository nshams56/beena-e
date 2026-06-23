import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { PostCard } from "@/components/marketing/post-card";
import { buttonVariants } from "@/components/ui/button";
import type { InsightPost } from "@/lib/data/posts";
import { cn } from "@/lib/utils/cn";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

function FeaturedInsight({ post }: { post: InsightPost }) {
  return (
    <Link
      href={`/insights/${post.slug}`}
      className="group card-hover-lift relative flex min-h-[440px] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-forest shadow-[0_48px_120px_rgba(11,28,22,0.14)] md:min-h-[540px]"
    >
      {post.imageUrl ? (
        <>
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="lux-image-grade object-cover transition-[transform] duration-[1.2s] ease-out [@media(hover:hover)]:group-hover:scale-[1.04] motion-reduce:transition-none"
            sizes="(max-width: 1024px) 100vw, 66vw"
            priority
          />
          <div className="lux-image-overlay lux-image-overlay--neutral absolute inset-0" aria-hidden />
          <div className="lux-image-vignette absolute inset-0" aria-hidden />
        </>
      ) : (
        <div
          className={cn("absolute inset-0 bg-gradient-to-br opacity-80", post.imageGradient)}
          aria-hidden
        />
      )}
      <div
        className="absolute inset-0 bg-linear-to-t from-forest-dark/95 via-forest/40 to-forest/10"
        aria-hidden
      />
      <div className="lux-vignette absolute inset-0 opacity-60" aria-hidden />
      <span className="lux-read-bar" aria-hidden />
      <div className="relative p-9 md:p-12 lg:p-14">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold/90">
          {post.category}
        </p>
        <h3 className="mt-5 max-w-2xl font-serif text-2xl leading-[1.2] tracking-[-0.02em] text-white md:text-3xl">
          {post.title}
        </h3>
        <p className="mt-5 line-clamp-2 max-w-xl text-base leading-[1.75] text-white/68">
          {post.excerpt}
        </p>
        <div className="mt-8 flex items-center gap-4 text-[13px] tracking-wide text-white/50">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden>·</span>
          <span>{post.readTimeMin} min read</span>
          <ArrowUpRight
            className="ml-auto h-5 w-5 text-gold/80 opacity-0 transition-all duration-500 [@media(hover:hover)]:group-hover:translate-x-0.5 [@media(hover:hover)]:group-hover:-translate-y-0.5 [@media(hover:hover)]:group-hover:opacity-100"
            aria-hidden
          />
        </div>
      </div>
    </Link>
  );
}

export function InsightsSection({
  posts,
  layout = "grid",
}: {
  posts: InsightPost[];
  layout?: "grid" | "featured";
}) {
  const isFeatured = layout === "featured";
  const [featured, ...rest] = posts;

  return (
    <Section
      variant="white"
      id="insights"
      className="relative overflow-hidden bg-ivory lux-section-y max-sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-white via-ivory to-neutral-50/80"
        aria-hidden
      />
      <Container className="relative">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-12">
          <SectionHeader
            eyebrow="Thought leadership"
            title="Perspectives for ophthalmic development leaders"
            description="Regulatory pathways, clinical evidence, and access strategy — written for executives and program owners."
            align="left"
            size="large"
          />
          <Link
            href="/insights"
            className={cn(
              buttonVariants({ variant: "dark", size: "md" }),
              "shrink-0 self-start md:mb-2",
            )}
          >
            View all insights
          </Link>
        </div>

        {isFeatured && featured ? (
          <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <FeaturedInsight post={featured} />
            </div>
            <div className="flex flex-col gap-10 lg:col-span-4 lg:gap-12">
              {rest.slice(0, 2).map((post) => (
                <PostCard key={post.slug} post={post} variant="editorial" compact />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} variant="editorial" />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
