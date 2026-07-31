import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { styles } from "@/lib/styles";
import { useCases } from "@/lib/use-cases";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/styles", "/use-cases", "/generator", "/pricing", "/privacy", "/terms", "/refund"];
  return [
    ...pages.map((path) => ({ url: `${site.url}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : 0.7 })),
    ...styles.map(({ slug }) => ({ url: `${site.url}/styles/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...useCases.map(({ slug }) => ({ url: `${site.url}/use-cases/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.85 }))
  ];
}
