import type { LucideIcon } from "lucide-react";
import {
  FlaskConical,
  Globe2,
  LineChart,
  Microscope,
  Target,
} from "lucide-react";

export type ServiceItem = {
  slug: string;
  title: string;
  summary: string;
  icon: LucideIcon;
};

export const staticServices: ServiceItem[] = [
  {
    slug: "strategy-advisory",
    title: "Strategy & Advisory",
    summary:
      "Portfolio prioritization, partnership strategy, and board-ready development scenarios for ophthalmic sponsors.",
    icon: Target,
  },
  {
    slug: "product-development",
    title: "Product Development",
    summary:
      "Integrated development planning, endpoint strategy, and clinical operations advisory for ophthalmic programs.",
    icon: FlaskConical,
  },
  {
    slug: "regulatory-clinical",
    title: "Regulatory & Clinical",
    summary:
      "Global pathway design, agency interactions, and clinical program oversight for novel ophthalmic therapies.",
    icon: Microscope,
  },
  {
    slug: "market-access",
    title: "Market Access",
    summary:
      "Evidence planning and payer engagement aligned to HTA and US reimbursement expectations in ophthalmology.",
    icon: Globe2,
  },
  {
    slug: "commercialization",
    title: "Commercialization",
    summary:
      "Launch readiness, medical affairs alignment, and lifecycle strategy for specialty ophthalmic markets.",
    icon: LineChart,
  },
];

/** Display titles for internal links */
export const serviceSlugToTitle: Record<string, string> = Object.fromEntries(
  staticServices.map((s) => [s.slug, s.title]),
);
