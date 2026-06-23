import { createClient } from "@/lib/supabase/server";
import { staticServiceDetails, type ServiceDetail } from "@/lib/data/service-details";
import { staticServices } from "@/lib/data/services";
import { getServices } from "@/lib/data/fetch-services";

export async function getServiceDetail(
  slug: string,
): Promise<ServiceDetail | null> {
  const fallback = staticServiceDetails[slug];
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return fallback ?? null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("slug, title, summary, body")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    if (error || !data) {
      return fallback ?? null;
    }

    const bodyParagraphs = data.body
      ? data.body.split("\n\n").filter(Boolean)
      : fallback?.body ?? [];

    return {
      slug: data.slug,
      title: data.title,
      summary: data.summary ?? fallback?.summary ?? "",
      body: bodyParagraphs,
      outcomes: fallback?.outcomes ?? [],
      imageUrl: fallback?.imageUrl ?? "",
      faqs: fallback?.faqs ?? [],
    };
  } catch {
    return fallback ?? null;
  }
}

export async function getServiceSlugs(): Promise<string[]> {
  const services = await getServices();
  return services.map((s) => s.slug);
}

export function getServiceTitle(slug: string): string {
  return (
    staticServices.find((s) => s.slug === slug)?.title ??
    slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );
}
