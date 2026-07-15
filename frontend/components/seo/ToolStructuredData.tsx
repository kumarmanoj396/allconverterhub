import { APP } from "@/lib/constants";
import type { Tool } from "@/lib/tools";

interface ToolStructuredDataProps {
  tool: Tool;
}

export default function ToolStructuredData({ tool }: ToolStructuredDataProps) {
  const url = new URL(tool.route, APP.URL).toString();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    applicationCategory: tool.category,
    description: tool.description,
    isAccessibleForFree: true,
    name: tool.title,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    operatingSystem: "Any",
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
