export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge?: string;
  category: string;
  route: string;
  enabled: boolean;
}

export const featuredTools: Tool[] = [
  {
    id: "image-compressor",
    title: "Image Compressor",
    description: "Compress JPG, PNG and WEBP images instantly.",
    icon: "🖼️",
    badge: "Popular",
    category: "Image Tools",
    route: "/tools/image-compressor",
    enabled: true,
  },
  {
    id: "image-resizer",
    title: "Image Resizer",
    description: "Resize JPG, PNG and WEBP images to exact dimensions.",
    icon: "↔️",
    badge: "New",
    category: "Image Tools",
    route: "/tools/image-resizer",
    enabled: true,
  },
  {
    id: "merge-pdf",
    title: "Merge PDF",
    description: "Merge multiple PDF files into one.",
    icon: "📄",
    badge: "Top",
    category: "PDF Tools",
    route: "/tools/merge-pdf",
    enabled: true,
  },
  {
    id: "qr-generator",
    title: "QR Generator",
    description: "Generate QR codes for URLs and text.",
    icon: "🔳",
    badge: "Free",
    category: "Utilities",
    route: "/tools/qr-generator",
    enabled: true,
  },
  {
    id: "emi-calculator",
    title: "EMI Calculator",
    description: "Calculate your monthly EMI instantly.",
    icon: "🧮",
    badge: "New",
    category: "Calculators",
    route: "/tools/emi-calculator",
    enabled: true,
  },
];
