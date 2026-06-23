import Image from "next/image";
import { cn } from "@/lib/utils/cn";

export function DetailHeroMedia({
  src,
  alt,
  gradientClassName,
}: {
  src?: string | null;
  alt: string;
  gradientClassName?: string;
}) {
  if (src) {
    return (
      <div className="relative h-56 w-full md:h-80 lg:h-[28rem]">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="lux-image-grade object-cover"
          sizes="100vw"
        />
        <div className="lux-image-overlay lux-image-overlay--neutral absolute inset-0" aria-hidden />
        <div className="lux-image-vignette absolute inset-0" aria-hidden />
        <div
          className="absolute inset-0 bg-linear-to-t from-ivory via-forest/20 to-transparent"
          aria-hidden
        />
      </div>
    );
  }

  if (gradientClassName) {
    return (
      <div
        className={cn("h-48 w-full bg-gradient-to-br md:h-64", gradientClassName)}
        aria-hidden
      />
    );
  }

  return null;
}
