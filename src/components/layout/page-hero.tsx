import Link from "next/link";
import { Container } from "@/components/layout/container";
import {
  Breadcrumbs,
  type BreadcrumbItem,
} from "@/components/layout/breadcrumbs";
import { CinematicAtmosphere } from "@/components/marketing/lux/cinematic-atmosphere";
import { CinematicImage } from "@/components/marketing/lux/cinematic-image";
import type { AtmosphereMood } from "@/components/marketing/lux/cinematic-atmosphere";
import { cn } from "@/lib/utils/cn";

type ImageGrade = "warm" | "cool" | "neutral" | "deep";

export function PageHero({
  eyebrow,
  title,
  titleAccent,
  description,
  breadcrumbs,
  imageSrc,
  imageAlt = "",
  grade = "neutral",
  mood = "warm",
  size = "default",
  align = "left",
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  imageSrc?: string;
  imageAlt?: string;
  grade?: ImageGrade;
  mood?: AtmosphereMood;
  size?: "default" | "large" | "compact";
  align?: "left" | "center";
  children?: React.ReactNode;
  className?: string;
}) {
  const isLarge = size === "large";
  const isCompact = size === "compact";

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-forest pt-24 text-white md:pt-28",
        isLarge && "md:pt-32",
        isCompact ? "pb-12 md:pb-16" : "pb-16 md:pb-24",
        className,
      )}
    >
      {imageSrc ? (
        <CinematicImage
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          grade={grade}
        />
      ) : null}
      <CinematicAtmosphere mood={mood} intensity="soft" />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-forest-dark/55 via-forest/30 to-forest-dark/80"
        aria-hidden
      />

      <Container
        size={isCompact ? "content" : "default"}
        className={cn("relative", align === "center" && "text-center")}
      >
        {breadcrumbs?.length ? (
          <Breadcrumbs items={breadcrumbs} className={align === "center" ? "justify-center" : ""} />
        ) : null}
        {eyebrow ? <p className="lux-eyebrow">{eyebrow}</p> : null}
        <h1
          className={cn(
            "font-serif leading-[1.08] tracking-[-0.03em] text-white",
            eyebrow || breadcrumbs?.length ? "mt-5" : "mt-0",
            isLarge
              ? "text-3xl md:text-5xl lg:text-[3.25rem]"
              : isCompact
                ? "text-3xl md:text-4xl"
                : "text-3xl md:text-4xl lg:text-[2.85rem]",
            align === "center" && "mx-auto",
          )}
        >
          {title}
          {titleAccent ? (
            <>
              <br />
              <span className="text-gold/90">{titleAccent}</span>
            </>
          ) : null}
        </h1>
        {description ? (
          <p
            className={cn(
              "mt-6 leading-[1.8] text-white/78",
              isLarge ? "max-w-2xl text-base md:text-lg" : "max-w-xl text-[0.95rem] md:text-base",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        ) : null}
        {children ? (
          <div
            className={cn(
              "mt-10 flex flex-col gap-4 sm:flex-row sm:items-center",
              align === "center" && "justify-center",
            )}
          >
            {children}
          </div>
        ) : null}
      </Container>
    </section>
  );
}

export function PageHeroActions({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("flex flex-wrap gap-3", className)}>{children}</div>;
}

export function PageHeroLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-flex h-12 items-center justify-center rounded-full px-8 text-base font-medium transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-forest";
  if (variant === "primary") {
    return (
      <Link
        href={href}
        className={cn(
          base,
          "bg-gold text-forest-dark shadow-[0_18px_56px_rgba(247,195,95,0.2)] hover:bg-gold-hover",
        )}
      >
        {children}
      </Link>
    );
  }
  return (
    <Link
      href={href}
      className={cn(
        base,
        "border border-white/15 bg-white/[0.04] text-white backdrop-blur-sm hover:bg-white/[0.08]",
      )}
    >
      {children}
    </Link>
  );
}
