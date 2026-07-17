import { APP } from "@/lib/constants";
import { getToolFaqs, getToolHowToSteps } from "@/lib/toolContent";
import type { Tool } from "@/lib/tools";

interface ToolStructuredDataProps {
  tool: Tool;
}

export default function ToolStructuredData({ tool }: ToolStructuredDataProps) {
  const url = new URL(tool.route, APP.URL).toString();
  const breadcrumbs = [
    { "@type": "ListItem", item: APP.URL, name: "Home", position: 1 },
    { "@type": "ListItem", item: `${APP.URL}/#tool-discovery`, name: tool.category, position: 2 },
    { "@type": "ListItem", item: url, name: tool.title, position: 3 },
  ];
  const structuredData = [
    {
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
    },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: breadcrumbs },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: getToolFaqs(tool).map((faq) => ({ "@type": "Question", acceptedAnswer: { "@type": "Answer", text: faq.answer }, name: faq.question })) },
    { "@context": "https://schema.org", "@type": "HowTo", name: `How to use ${tool.title}`, step: getToolHowToSteps(tool).map((text, position) => ({ "@type": "HowToStep", position: position + 1, text })) },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
