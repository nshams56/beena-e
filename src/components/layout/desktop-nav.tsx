"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  isMoreNavActive,
  isNavActive,
  moreNavLinks,
  primaryNavLinks,
} from "@/lib/data/navigation";
import { cn } from "@/lib/utils/cn";

const linkClass = (active: boolean) =>
  cn(
    "text-sm text-white/90 transition-colors hover:text-gold focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-forest",
    active && "border-b-2 border-gold pb-0.5 text-white",
  );

export function DesktopNav({ activePath }: { activePath: string }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const moreActive = isMoreNavActive(activePath);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!moreOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

  return (
    <nav
      className="hidden items-center justify-center gap-6 xl:gap-8 lg:flex"
      aria-label="Main navigation"
    >
      {primaryNavLinks.map((link) => {
        const active = isNavActive(link.href, activePath);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={linkClass(active)}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}

      <div className="relative" ref={panelRef}>
        <button
          type="button"
          onClick={() => setMoreOpen((v) => !v)}
          className={cn(
            "inline-flex items-center gap-1 text-sm text-white/90 transition-colors hover:text-gold focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-forest",
            (moreActive || moreOpen) && "border-b-2 border-gold pb-0.5 text-white",
          )}
          aria-expanded={moreOpen}
          aria-haspopup="true"
        >
          More
          <ChevronDown
            className={cn("h-4 w-4 transition-transform", moreOpen && "rotate-180")}
            aria-hidden
          />
        </button>
        {moreOpen ? (
          <div
            className="absolute left-1/2 top-full z-50 mt-3 min-w-[220px] -translate-x-1/2 rounded-xl border border-white/10 bg-forest-dark py-2 shadow-xl"
            role="menu"
          >
            {moreNavLinks.map((link) => {
              const active = isNavActive(link.href, activePath);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  role="menuitem"
                  onClick={() => setMoreOpen(false)}
                  className={cn(
                    "block px-4 py-2.5 text-sm text-white/90 transition-colors hover:bg-white/10 hover:text-gold focus-visible:bg-white/10 focus-visible:outline-none",
                    active && "text-gold",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
    </nav>
  );
}
