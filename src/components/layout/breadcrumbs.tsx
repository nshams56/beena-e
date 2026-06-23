import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({
  items,
  className,
  tone = "hero",
}: {
  items: BreadcrumbItem[];
  className?: string;
  tone?: "hero" | "light";
}) {
  const isLight = tone === "light";

  return (
    <nav aria-label="Breadcrumb" className={cn("mb-6 md:mb-8", className)}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5 text-[12px] tracking-[0.06em]",
          isLight ? "text-muted" : "text-white/50",
        )}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight
                  className={cn("h-3 w-3 shrink-0", isLight ? "opacity-40" : "opacity-50")}
                  aria-hidden
                />
              ) : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "uppercase transition-colors duration-300 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                    isLight ? "hover:text-forest" : "hover:text-gold/90",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    "uppercase",
                    isLast && (isLight ? "font-medium text-forest" : "text-white/80"),
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
