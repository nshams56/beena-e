"use client";

import { Clock, Globe2, Lock, Users } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils/cn";

const assurances = [
  { icon: Lock, label: "Confidential handling" },
  { icon: Users, label: "Senior advisor review" },
  { icon: Clock, label: "Response within one business day" },
  { icon: Globe2, label: "Global sponsor coordination" },
] as const;

export function ContactExecutiveAssurance() {
  return (
    <Reveal>
      <div
        className={cn(
          "lux-contact-assurance relative -mt-6 rounded-[1.5rem] border border-neutral-200/50 bg-white/90 px-6 py-7 shadow-[0_20px_60px_rgba(11,28,22,0.06)] backdrop-blur-sm md:-mt-8 md:px-10 md:py-8",
        )}
      >
        <div
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent"
          aria-hidden
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {assurances.map(({ icon: Icon, label }, index) => (
            <li
              key={label}
              className={cn(
                "flex items-center gap-3 lg:px-6",
                index > 0 && "lg:border-l lg:border-neutral-200/70",
                index === 0 && "lg:pl-0",
                index === assurances.length - 1 && "lg:pr-0",
              )}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neutral-200/70 bg-ivory/80 text-gold/90 transition-colors duration-500 group-hover:border-gold/30">
                <Icon className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.5} aria-hidden />
              </span>
              <span className="text-[0.72rem] font-medium uppercase leading-snug tracking-[0.16em] text-muted">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
