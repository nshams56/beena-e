"use client";

import { AmbientParticles } from "@/components/marketing/lux/ambient-particles";
import { cn } from "@/lib/utils/cn";

export type AtmosphereMood =
  | "warm"
  | "cool"
  | "stage"
  | "deep"
  | "statement"
  | "neutral";

/** Layered backgrounds — `rich` adds optional motion/glow (homepage hero only). */
export function CinematicAtmosphere({
  className,
  intensity = "soft",
  vignette = true,
  particles = false,
  mood = "warm",
  rich = false,
}: {
  className?: string;
  intensity?: "soft" | "medium" | "deep";
  vignette?: boolean;
  particles?: boolean;
  mood?: AtmosphereMood;
  rich?: boolean;
}) {
  const noiseOpacity =
    intensity === "soft" ? "opacity-25" : intensity === "deep" ? "opacity-50" : "opacity-35";

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      <div className={cn("lux-noise absolute inset-0", noiseOpacity)} />
      <div className={cn("absolute inset-0 lux-mood-base", `lux-mood-base--${mood}`)} />
      {rich ? (
        <>
          <div className={cn("absolute inset-0 lux-mood-glow opacity-60", `lux-mood-glow--${mood}`)} />
          <div className="lux-gradient-radial absolute inset-0 opacity-50" />
        </>
      ) : null}
      {vignette ? <div className="lux-vignette absolute inset-0 opacity-70" /> : null}
      {particles && rich ? <AmbientParticles density="low" /> : null}
    </div>
  );
}
