"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { useCallback, useEffect, useRef, useState } from "react";
import { footerContact } from "@/lib/data/home-content";
import { isNavActive, mainNavLinks } from "@/lib/data/navigation";
import { cn } from "@/lib/utils/cn";

export function MobileNav({ activePath = "/" }: { activePath?: string }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    if (!open || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || focusable.length === 0) return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          "fixed inset-0 top-16 z-40 bg-forest/98 backdrop-blur-md transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <nav className="flex max-h-[calc(100dvh-4rem)] flex-col gap-1 overflow-y-auto px-6 py-8">
          <div className="mb-6 flex justify-center">
            <BrandLogo size="lg" href="/" />
          </div>
          {mainNavLinks.map((link) => {
            const active = isNavActive(link.href, activePath);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className={cn(
                  "rounded-lg px-4 py-3.5 text-lg text-white/90 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                  active && "bg-white/10 text-gold",
                )}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={`tel:${footerContact.phone.replace(/\D/g, "")}`}
            className="mt-4 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 font-semibold text-forest-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            onClick={close}
          >
            <Phone className="h-4 w-4" aria-hidden />
            Call Us Today
          </a>
        </nav>
      </div>
    </div>
  );
}
