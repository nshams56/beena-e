"use client";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils/cn";

const PARTICLES_LOW = [
  { left: "18%", top: "28%", size: 1.5, delay: 0 },
  { left: "72%", top: "45%", size: 1.5, delay: 1.2 },
] as const;

const PARTICLES_HIGH = [
  ...PARTICLES_LOW,
  { left: "28%", top: "58%", size: 2, delay: 2.1 },
  { left: "45%", top: "18%", size: 3, delay: 0.5 },
  { left: "55%", top: "48%", size: 1.5, delay: 1.8 },
  { left: "72%", top: "28%", size: 2, delay: 1.1 },
  { left: "92%", top: "48%", size: 2, delay: 0.3 },
] as const;

export function AmbientParticles({
  className,
  density = "low",
}: {
  className?: string;
  density?: "low" | "high";
}) {
  const reduced = useReducedMotion();
  const particles = density === "high" ? PARTICLES_HIGH : PARTICLES_LOW;

  if (reduced) return null;

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-cyan-glow/10 animate-lux-float"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${8 + (i % 4)}s`,
          }}
        />
      ))}
    </div>
  );
}
