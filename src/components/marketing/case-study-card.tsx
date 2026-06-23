import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/data/case-studies";
import { cn } from "@/lib/utils/cn";

export function CaseStudyCard({
  study,
  featured = false,
}: {
  study: CaseStudy;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "group card-hover-lift relative flex h-full flex-col overflow-hidden bg-white shadow-[0_28px_90px_rgba(11,28,22,0.07)]",
        featured ? "rounded-[1.75rem] md:flex-row" : "rounded-[1.75rem]",
      )}
    >
      <span className="lux-read-bar" aria-hidden />
      <Link
        href={`/portfolio/${study.slug}`}
        className={cn(
          "relative block overflow-hidden bg-neutral-100",
          featured ? "aspect-16/10 md:aspect-auto md:w-1/2 md:min-h-[320px]" : "aspect-16/10",
        )}
      >
        {study.imageUrl ? (
          <>
            <Image
              src={study.imageUrl}
              alt={study.title}
              fill
              className="lux-image-grade object-cover transition-[transform] duration-[1s] ease-out [@media(hover:hover)]:group-hover:scale-[1.04] motion-reduce:transition-none"
              sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 50vw"}
            />
            <div className="lux-image-overlay lux-image-overlay--neutral absolute inset-0" aria-hidden />
            <div className="lux-image-vignette absolute inset-0" aria-hidden />
          </>
        ) : (
          <div
            className={cn("absolute inset-0 bg-gradient-to-br", study.imageGradient)}
            aria-hidden
          />
        )}
      </Link>
      <div className={cn("flex flex-1 flex-col", featured ? "p-8 md:p-10 lg:p-12" : "p-7 md:p-8")}>
        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold/90">
          {study.clientLabel}
        </p>
        <h3
          className={cn(
            "mt-4 font-serif leading-[1.2] tracking-[-0.02em] text-neutral-900 transition-colors duration-300 [@media(hover:hover)]:group-hover:text-forest",
            featured ? "text-2xl md:text-3xl" : "text-xl",
          )}
        >
          <Link href={`/portfolio/${study.slug}`}>{study.title}</Link>
        </h3>
        <p
          className={cn(
            "mt-4 flex-1 leading-[1.75] text-muted",
            featured ? "text-base line-clamp-3" : "text-sm line-clamp-3",
          )}
        >
          {study.summary}
        </p>
        <div className="mt-8 flex flex-wrap gap-8 border-t border-neutral-200/60 pt-8">
          {study.metrics.slice(0, 3).map((m) => (
            <div key={m.label}>
              <p className="font-serif text-2xl tracking-[-0.03em] text-forest">{m.value}</p>
              <p className="mt-1 text-[11px] tracking-wide text-muted uppercase">{m.label}</p>
            </div>
          ))}
        </div>
        <Link
          href={`/portfolio/${study.slug}`}
          className="mt-8 inline-flex text-sm font-medium tracking-wide text-forest/80 transition-colors duration-500 group-hover:text-gold"
        >
          View case study →
        </Link>
      </div>
    </article>
  );
}
