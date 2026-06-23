import { createClient } from "@/lib/supabase/server";
import { staticCaseStudies, type CaseStudy } from "@/lib/data/case-studies";

export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return staticCaseStudies;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("case_studies")
      .select(
        "slug, title, client_name, summary, body, metrics, service_slugs",
      )
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data?.length) {
      return staticCaseStudies;
    }

    const gradients = staticCaseStudies.map((c) => c.imageGradient);

    return data.map((row, i) => {
      const staticMatch = staticCaseStudies.find((c) => c.slug === row.slug);
      return {
        slug: row.slug,
        title: row.title,
        clientLabel: row.client_name ?? "Confidential Client",
        summary: row.summary ?? "",
        challenge: staticMatch?.challenge ?? row.summary ?? "",
        approach: staticMatch?.approach ?? "",
        results: staticMatch?.results ?? [],
        metrics: Array.isArray(row.metrics)
          ? (row.metrics as CaseStudy["metrics"])
          : staticMatch?.metrics ?? [],
        serviceSlugs: row.service_slugs ?? [],
        imageGradient: gradients[i % gradients.length]!,
      };
    });
  } catch {
    return staticCaseStudies;
  }
}

export async function getCaseStudyBySlug(
  slug: string,
): Promise<CaseStudy | null> {
  const studies = await getCaseStudies();
  return studies.find((s) => s.slug === slug) ?? null;
}

export async function getCaseStudySlugs(): Promise<string[]> {
  const studies = await getCaseStudies();
  return studies.map((s) => s.slug);
}
