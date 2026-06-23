export const primaryNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

export const moreNavLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/rise-pakistan-health", label: "RISE Pakistan Health" },
] as const;

/** All routes for mobile menu and active-state checks */
export const mainNavLinks = [
  ...primaryNavLinks,
  ...moreNavLinks,
] as const;

export type NavLink = (typeof mainNavLinks)[number];

export function isNavActive(href: string, activePath: string): boolean {
  if (href === "/") return activePath === "/";
  return activePath === href || activePath.startsWith(`${href}/`);
}

export function isMoreNavActive(activePath: string): boolean {
  return moreNavLinks.some((link) => isNavActive(link.href, activePath));
}
