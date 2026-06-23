import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const LOGO_SRC = "/images/beena-e-logo.png";

const sizeClasses = {
  sm: "h-9 w-9",
  md: "h-11 w-11 md:h-12 md:w-12",
  lg: "h-20 w-20",
  xl: "h-28 w-28",
} as const;

type BrandLogoProps = {
  size?: keyof typeof sizeClasses;
  className?: string;
  href?: string;
  priority?: boolean;
  showWordmark?: boolean;
  wordmarkClassName?: string;
};

export function BrandLogo({
  size = "md",
  className,
  href = "/",
  priority = false,
  showWordmark = false,
  wordmarkClassName,
}: BrandLogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src={LOGO_SRC}
        alt=""
        width={160}
        height={160}
        priority={priority}
        aria-hidden
        className={cn(sizeClasses[size], "shrink-0 object-contain")}
      />
      {showWordmark ? (
        <span
          className={cn(
            "hidden font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white sm:inline md:text-xs",
            wordmarkClassName,
          )}
        >
          BEEÑA-E Consulting
        </span>
      ) : null}
    </span>
  );

  if (!href) {
    return (
      <span aria-label="BEEÑA-E Consulting">{content}</span>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center transition-opacity hover:opacity-90"
      aria-label="BEEÑA-E Consulting — Home"
    >
      {content}
    </Link>
  );
}
