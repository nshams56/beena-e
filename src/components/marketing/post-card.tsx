import Image from "next/image";
import Link from "next/link";
import type { InsightPost } from "@/lib/data/posts";
import { cn } from "@/lib/utils/cn";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export function PostCard({
  post,
  variant = "default",
  compact = false,
}: {
  post: InsightPost;
  variant?: "default" | "editorial";
  compact?: boolean;
}) {
  const editorial = variant === "editorial";

  return (
    <article
      className={cn(
        "group card-hover-lift relative flex h-full flex-col overflow-hidden bg-white",
        editorial
          ? "rounded-[1.75rem] border border-neutral-200/40 shadow-[0_20px_60px_rgba(11,28,22,0.05)]"
          : "rounded-xl border border-neutral-200/80 shadow-sm",
      )}
    >
      <span className="lux-read-bar" aria-hidden />
      <Link href={`/insights/${post.slug}`} className="flex h-full flex-col">
        <div
          className={cn(
            "relative overflow-hidden bg-neutral-100",
            compact ? "aspect-[16/11]" : "aspect-[16/10]",
          )}
        >
          {post.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="lux-image-grade object-cover transition-[transform] duration-[1s] ease-out [@media(hover:hover)]:group-hover:scale-[1.04] motion-reduce:transition-none"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div
              className={cn("absolute inset-0 bg-gradient-to-br", post.imageGradient)}
              aria-hidden
            />
          )}
          <div className="lux-image-overlay lux-image-overlay--neutral absolute inset-0 opacity-40" aria-hidden />
          <div
            className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-700 [@media(hover:hover)]:group-hover:opacity-100"
            aria-hidden
          />
        </div>
        <div className={cn("flex flex-1 flex-col", compact ? "p-6" : "p-6 md:p-7")}>
          <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-forest/80">
            {post.category}
          </p>
          <h3
            className={cn(
              "mt-3 font-serif leading-[1.25] tracking-[-0.02em] text-neutral-900 transition-colors duration-300 [@media(hover:hover)]:group-hover:text-forest",
              compact ? "text-lg" : "text-xl",
            )}
          >
            {post.title}
          </h3>
          {!compact && (
            <p className="mt-3 line-clamp-2 text-sm leading-[1.7] text-muted">
              {post.excerpt}
            </p>
          )}
          <div className="mt-auto flex gap-3 pt-5 text-[12px] tracking-wide text-muted/90">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden>·</span>
            <span>{post.readTimeMin} min</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
