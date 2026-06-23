import type { MetadataRoute } from "next";
import { staticCaseStudies } from "@/lib/data/case-studies";
import { getPostSlugs } from "@/lib/data/fetch-post-detail";
import { staticServices } from "@/lib/data/services";

const staticRoutes = [
  "",
  "/about",
  "/services",
  "/insights",
  "/portfolio",
  "/contact",
  "/rise-pakistan-health",
  "/book",
  "/newsletter",
  "/privacy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const services = staticServices.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const insightSlugs = await getPostSlugs();
  const insights = insightSlugs.map((slug) => ({
    url: `${baseUrl}/insights/${slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const portfolio = staticCaseStudies.map((c) => ({
    url: `${baseUrl}/portfolio/${c.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...services, ...insights, ...portfolio];
}
