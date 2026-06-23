import { createClient } from "@/lib/supabase/server";
import {
  getStaticPostContent,
  staticInsightPosts,
  toFullPost,
  type InsightPostFull,
} from "@/lib/data/posts";
import { getFeaturedPosts } from "@/lib/data/fetch-posts";

export async function getPostBySlug(
  slug: string,
): Promise<InsightPostFull | null> {
  const staticPost = staticInsightPosts.find((p) => p.slug === slug);
  const staticFull = staticPost ? toFullPost(staticPost) : null;

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return staticFull;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select(
        "slug, title, excerpt, content, cover_image_url, published_at, read_time_min, related_service_slug, categories(name)",
      )
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error || !data) {
      return staticFull;
    }

    const category =
      data.categories &&
      typeof data.categories === "object" &&
      "name" in data.categories
        ? String((data.categories as { name: string }).name)
        : staticFull?.category ?? "Insights";

    const gradients = staticInsightPosts.map((p) => p.imageGradient);

    return {
      slug: data.slug,
      title: data.title,
      category,
      excerpt: data.excerpt ?? "",
      publishedAt: data.published_at ?? new Date().toISOString(),
      readTimeMin: data.read_time_min ?? 5,
      imageGradient:
        staticFull?.imageGradient ?? gradients[0] ?? "from-forest to-forest-dark",
      imageUrl: data.cover_image_url ?? staticFull?.imageUrl,
      relatedServiceSlug:
        (data.related_service_slug as string | null) ??
        staticFull?.relatedServiceSlug,
      content: data.content
        ? data.content.split("\n\n").filter(Boolean)
        : getStaticPostContent(slug),
    };
  } catch {
    return staticFull;
  }
}

export async function getAllPosts(): Promise<InsightPostFull[]> {
  const featured = await getFeaturedPosts(20);
  return featured.map((p) => toFullPost(p));
}

export async function getPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
}
