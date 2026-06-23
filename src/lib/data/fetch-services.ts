import { createClient } from "@/lib/supabase/server";
import { staticServices, type ServiceItem } from "@/lib/data/services";
import {
  FlaskConical,
  Globe2,
  LineChart,
  Microscope,
  Target,
  type LucideIcon,
} from "lucide-react";

const iconBySlug: Record<string, LucideIcon> = {
  "strategy-advisory": Target,
  "product-development": FlaskConical,
  "regulatory-clinical": Microscope,
  "market-access": Globe2,
  commercialization: LineChart,
};

export async function getServices(): Promise<ServiceItem[]> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return staticServices;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("slug, title, summary")
      .eq("published", true)
      .order("sort_order", { ascending: true });

    if (error || !data?.length) {
      return staticServices;
    }

    return data.map((row) => ({
      slug: row.slug,
      title: row.title,
      summary: row.summary ?? "",
      icon: iconBySlug[row.slug] ?? Target,
    }));
  } catch {
    return staticServices;
  }
}
