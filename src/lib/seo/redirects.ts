import type { Redirect } from "next/dist/lib/load-custom-routes";

/**
 * Add 301 redirects from the old Duda site after auditing URLs in Google Search Console.
 * Example entries are commented — uncomment and adjust slugs to match beena-e.com.
 */
export const legacyRedirects: Redirect[] = [
  // { source: "/blog", destination: "/insights", permanent: true },
  // { source: "/blog/:slug", destination: "/insights/:slug", permanent: true },
  // { source: "/about-us", destination: "/about", permanent: true },
  // { source: "/contact-us", destination: "/contact", permanent: true },
  // { source: "/services-page", destination: "/services", permanent: true },
];
