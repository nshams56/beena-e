/**
 * Local stock photography (Pexels / Unsplash) — see docs/IMAGE_CREDITS.md
 */
export const STOCK_IMAGES = {
  heroEye: "/images/stock/hero-eye.jpg",
  aboutLab: "/images/home/about-vision-science-impact.png",
  insightEmerging: "/images/stock/insight-emerging.jpg",
  insightRegulatory: "/images/stock/insight-regulatory.jpg",
  insightBiomarkers: "/images/stock/insight-biomarkers.jpg",
  riseHero: "/images/stock/rise-hero.jpg",
  riseHealthcare: "/images/stock/rise-healthcare.jpg",
  contactHero: "/images/stock/contact-hero.jpg",
  portfolioLab: "/images/stock/portfolio-lab.jpg",
  portfolioLaunch: "/images/stock/contact-hero.jpg",
  portfolioRegulatory: "/images/stock/insight-regulatory.jpg",
  portfolioStrategy: "/images/stock/insight-biomarkers.jpg",
} as const;

/** Remote fallbacks when local files are missing (dev) */
export const STOCK_IMAGES_REMOTE = {
  heroEye:
    "https://images.pexels.com/photos/576581/pexels-photo-576581.jpeg?auto=compress&cs=tinysrgb&w=1920",
  aboutLab:
    "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1200",
} as const;
