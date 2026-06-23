"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";

export function MarketingHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return <SiteHeader transparentOnTop={isHome} activePath={pathname} />;
}
