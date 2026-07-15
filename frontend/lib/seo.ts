import type { Metadata } from "next";

import { APP } from "./constants";
import type { Tool } from "./tools";

export function createToolMetadata(tool: Tool): Metadata {
  const title = tool.title;
  const description = tool.description;

  return {
    alternates: {
      canonical: tool.route,
    },
    description,
    keywords: [tool.title, tool.category, "free online tool", "AllConverterHub"],
    openGraph: {
      description,
      siteName: APP.NAME,
      title: `${title} | ${APP.NAME}`,
      type: "website",
      url: tool.route,
    },
    title,
    twitter: {
      card: "summary",
      description,
      title: `${title} | ${APP.NAME}`,
    },
  };
}
