import { siteAddress } from "@/utils/config";
import service from "@/lib/service";
import { ItemCategory } from "@prisma/client";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let categoryEntries: MetadataRoute.Sitemap = [];
  try {
    const categories = await service.getCategories();
    categoryEntries = categories.map((cat: ItemCategory) => ({
      url: `${siteAddress}/category/${cat.id}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    }));
  } catch {
    // DB may be unavailable at build time (e.g. Vercel); sitemap still works without category URLs
  }

  return [
    {
      url: siteAddress!,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...categoryEntries,
    {
      url: `${siteAddress}/search`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteAddress}/signin`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteAddress}/signup`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteAddress}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    },
  ];
}
