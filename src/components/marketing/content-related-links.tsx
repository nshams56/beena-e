import Link from "next/link";
import { serviceSlugToTitle } from "@/lib/data/services";

export function ContentRelatedLinks({
  serviceSlug,
  insightSlug,
  portfolioHref,
}: {
  serviceSlug?: string;
  insightSlug?: string;
  portfolioHref?: string;
}) {
  const serviceTitle = serviceSlug ? serviceSlugToTitle[serviceSlug] : null;

  if (!serviceTitle && !insightSlug && !portfolioHref) return null;

  return (
    <nav
      className="mx-auto mt-16 max-w-3xl border-t border-neutral-200/80 pt-10"
      aria-label="Related content"
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
        Continue exploring
      </p>
      <ul className="mt-5 space-y-3 text-sm">
        {serviceTitle && serviceSlug ? (
          <li>
            <Link
              href={`/services/${serviceSlug}`}
              className="font-medium text-forest transition-colors duration-300 hover:text-gold"
            >
              {serviceTitle} advisory
            </Link>
          </li>
        ) : null}
        {insightSlug ? (
          <li>
            <Link
              href={`/insights/${insightSlug}`}
              className="font-medium text-forest transition-colors duration-300 hover:text-gold"
            >
              Related perspective
            </Link>
          </li>
        ) : null}
        {portfolioHref ? (
          <li>
            <Link
              href={portfolioHref}
              className="font-medium text-forest transition-colors duration-300 hover:text-gold"
            >
              Representative engagement
            </Link>
          </li>
        ) : null}
        <li>
          <Link
            href="/book"
            className="font-medium text-forest transition-colors duration-300 hover:text-gold"
          >
            Schedule a consultation
          </Link>
        </li>
      </ul>
    </nav>
  );
}
