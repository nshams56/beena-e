import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils/cn";

type Grade = "warm" | "cool" | "neutral" | "deep";

export function CinematicImage({
  className,
  grade = "neutral",
  ...props
}: ImageProps & { grade?: Grade }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden={props.alt === ""}>
      <Image
        {...props}
        className={cn("lux-image-grade h-full w-full object-cover", className)}
      />
      <div
        className={cn(
          "lux-image-overlay absolute inset-0 opacity-[0.32]",
          `lux-image-overlay--${grade}`,
        )}
      />
      <div className="lux-image-vignette absolute inset-0 opacity-60" />
    </div>
  );
}
