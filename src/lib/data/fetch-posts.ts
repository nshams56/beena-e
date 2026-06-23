import { createClient } from "@/lib/supabase/server";
import { HOME_IMAGES } from "@/lib/data/home-content";
import { staticInsightPosts, type InsightPost } from "@/lib/data/posts";

const gradients = [
  "from-forest via-forest-elevated to-forest-dark",
  "from-emerald-900 via-forest to-forest-dark",
  "from-teal-900 via-forest-elevated to-forest",
];

export async function getFeaturedPosts(limit = 3): Promise<InsightPost[]> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return staticInsightPosts.slice(0, limit);
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select(
        "slug, title, excerpt, published_at, read_time_min, cover_image_url, related_service_slug, categories(name)",
      )
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error || !data?.length) {
      return staticInsightPosts.slice(0, limit);
    }

    const fallbackImages = [HOME_IMAGES.insight1, HOME_IMAGES.insight2, HOME_IMAGES.insight3];

    return data.map((row, i) => {
      const staticMatch = staticInsightPosts.find((p) => p.slug === row.slug);
      return {
        slug: row.slug,
        title: row.title,
        category:
          row.categories &&
          typeof row.categories === "object" &&
          "name" in row.categories
            ? String((row.categories as { name: string }).name)
            : "Insights",
        excerpt: row.excerpt ?? "",
        publishedAt: row.published_at ?? new Date().toISOString(),
        readTimeMin: row.read_time_min ?? 5,
        imageGradient: gradients[i % gradients.length]!,
        imageUrl: row.cover_image_url ?? fallbackImages[i % fallbackImages.length],
        relatedServiceSlug:
          (row.related_service_slug as string | null) ??
          staticMatch?.relatedServiceSlug,
      };
    });
  } catch {
    return staticInsightPosts.slice(0, limit);
  }
}
