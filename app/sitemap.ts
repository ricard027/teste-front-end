import type { MetadataRoute } from "next";
import { getPublicSiteUrl } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getPublicSiteUrl();
  if (!siteUrl) return [];

  return [
    {
      url: siteUrl.href,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
