import type { NextConfig } from "next";
import { legacyRedirects } from "./src/lib/seo/redirects";

const nextConfig: NextConfig = {
  async redirects() {
    return legacyRedirects;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
