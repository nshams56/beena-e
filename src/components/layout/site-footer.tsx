import Link from "next/link";
import { Mail } from "lucide-react";
import { LinkedInIcon, XIcon } from "@/components/icons/social-icons";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Container } from "@/components/layout/container";
import { footerContact } from "@/lib/data/home-content";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/insights", label: "Insights" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/rise-pakistan-health", label: "RISE Pakistan Health" },
  { href: "/contact", label: "Contact Us" },
];

const serviceLinks = [
  { href: "/services/strategy-advisory", label: "Strategy & Advisory" },
  { href: "/services/product-development", label: "Product Development" },
  { href: "/services/regulatory-clinical", label: "Regulatory & Clinical" },
  { href: "/services/market-access", label: "Market Access" },
  { href: "/services/commercialization", label: "Commercialization" },
];

export function SiteFooter() {
  return (
    <footer className="bg-forest-dark text-white">
      <Container className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <BrandLogo size="lg" href="/" />
          <p className="text-sm leading-relaxed text-white/75">
            Global ophthalmic biotech advisory — development, regulatory,
            access, and commercialization.
          </p>
          <div className="flex gap-3 pt-2">
            <a
              href={
                process.env.NEXT_PUBLIC_LINKEDIN_URL ??
                "https://www.linkedin.com/company/beena-e-consulting"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <a
              href={
                process.env.NEXT_PUBLIC_X_URL ?? "https://x.com/beena_e"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="X (Twitter)"
            >
              <XIcon className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${footerContact.email}`}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <nav aria-label="Quick links">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold">
            Quick Links
          </p>
          <ul className="space-y-2.5 text-sm text-white/80">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold">
            Services
          </p>
          <ul className="space-y-2.5 text-sm text-white/80">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold">
            Contact Us
          </p>
          <ul className="space-y-3 text-sm text-white/80">
            <li>
              <a href={`tel:${footerContact.phone.replace(/\D/g, "")}`} className="hover:text-gold">
                {footerContact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${footerContact.email}`} className="hover:text-gold">
                {footerContact.email}
              </a>
            </li>
            <li className="leading-relaxed">{footerContact.address}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/55 md:flex-row">
          <p className="max-w-xl text-center md:text-left">
            © {new Date().getFullYear()} BEEÑA-E Consulting. All rights reserved.
            <span className="mt-1 block text-white/45">
              Confidential engagements. Site content is for general reference.
            </span>
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gold">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold">
              Terms of Use
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
