import type { MetadataRoute } from "next";

import { APP } from "@/lib/constants";
import { featuredTools } from "@/lib/tools";

const toAbsoluteUrl = (path: string) => new URL(path, APP.URL).toString();

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = featuredTools
    .filter((tool) => tool.enabled)
    .map((tool) => ({
      url: toAbsoluteUrl(tool.route),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  return [
    {
      url: APP.URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...toolPages,
  ];
}
