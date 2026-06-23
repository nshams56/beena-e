"use client";

import {
  BookOpen,
  Globe2,
  LineChart,
  MessageSquare,
  Scale,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const deliverables = [
  {
    icon: Scale,
    title: "Regulatory perspectives",
    detail: "Agency dialogue, pathway context, and governance considerations.",
  },
  {
    icon: Globe2,
    title: "Ophthalmic market developments",
    detail: "Global market signals relevant to sponsor strategy.",
  },
  {
    icon: LineChart,
    title: "Commercialization insights",
    detail: "Access, launch readiness, and portfolio positioning.",
  },
  {
    icon: MessageSquare,
    title: "Executive commentary",
    detail: "Senior advisor perspectives on emerging program decisions.",
  },
  {
    icon: BookOpen,
    title: "Clinical & access considerations",
    detail: "Evidence, endpoints, and patient-relevant program design.",
  },
] as const;

export function NewsletterBriefingDeliverables() {
  return (
    <Reveal delay={0.06}>
      <div className="relative overflow-hidden rounded-[1.75rem] border border-neutral-200/55 bg-white/85 p-7 shadow-[0_20px_64px_rgba(11,28,22,0.06)] backdrop-blur-sm md:p-8 lg:p-9">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/45 to-transparent"
          aria-hidden
        />
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted">
          What you&apos;ll receive
        </p>
        <h2 className="mt-3 font-serif text-xl tracking-[-0.03em] text-neutral-900 md:text-2xl">
          Briefing scope
        </h2>
        <p className="mt-4 text-sm leading-[1.85] text-muted">
          Periodic intelligence curated for development, regulatory, and
          commercial leadership — delivered with institutional restraint.
        </p>

        <ul className="mt-8 space-y-0 divide-y divide-neutral-200/55">
          {deliverables.map(({ icon: Icon, title, detail }) => (
            <li key={title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neutral-200/70 bg-ivory text-gold/90">
                <Icon className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.5} aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-medium tracking-[-0.01em] text-neutral-900">
                  {title}
                </span>
                <span className="mt-1.5 block text-[0.8rem] leading-[1.75] text-muted">
                  {detail}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
