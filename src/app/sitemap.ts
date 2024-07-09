import { siteAddress } from "@/utils/config";
import { categoryItems } from "@/utils/util";
import { MetadataRoute } from "next";

const categories: MetadataRoute.Sitemap = categoryItems.map((cat) => ({
  url: `${siteAddress}/category/${cat.key}`,
  lastModified: new Date(),
  changeFrequency: "daily",
  priority: 0.8,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteAddress!,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...categories,
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
