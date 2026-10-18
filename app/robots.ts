import type { MetadataRoute } from "next";

// Demo build: keep crawlers out entirely until the client signs off.
// At launch: allow "/" and restore the sitemap line.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
