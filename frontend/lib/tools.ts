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
    id: "image-converter",
    title: "Image Converter",
    description: "Convert JPG, PNG and WEBP images in your browser.",
    icon: "🔄",
    badge: "New",
    category: "Image Tools",
    route: "/tools/image-converter",
    enabled: true,
  },
  {
    id: "image-editor",
    title: "Image Editor",
    description: "Crop, rotate, and flip JPG, PNG, or WEBP images in your browser.",
    icon: "✨",
    badge: "New",
    category: "Image Tools",
    route: "/tools/image-editor",
    enabled: true,
  },
  {
    id: "image-watermark",
    title: "Image Watermark",
    description: "Add a text watermark to JPG, PNG, or WEBP images in your browser.",
    icon: "©️",
    badge: "New",
    category: "Image Tools",
    route: "/tools/image-watermark",
    enabled: true,
  },
  {
    id: "metadata-remover",
    title: "Metadata Remover",
    description: "Remove EXIF, GPS, and camera metadata from images in your browser.",
    icon: "🛡️",
    badge: "New",
    category: "Image Tools",
    route: "/tools/metadata-remover",
    enabled: true,
  },
  {
    id: "background-remover",
    title: "Background Remove",
    description: "Remove image backgrounds with private, browser-based AI.",
    icon: "✂️",
    badge: "New",
    category: "Image Tools",
    route: "/tools/background-remover",
    enabled: true,
  },
  {
    id: "merge-pdf",
    title: "Merge PDF",
    description: "Merge multiple PDF files into one document in your browser.",
    icon: "📄",
    badge: "Top",
    category: "PDF Tools",
    route: "/tools/merge-pdf",
    enabled: true,
  },
  {
    id: "split-pdf",
    title: "Split PDF",
    description: "Split PDF pages or custom ranges into separate files in your browser.",
    icon: "✂️",
    badge: "New",
    category: "PDF Tools",
    route: "/tools/split-pdf",
    enabled: true,
  },
  {
    id: "image-to-pdf",
    title: "Image to PDF",
    description: "Convert multiple JPG, PNG, or WEBP images into one PDF in your browser.",
    icon: "🖼️",
    badge: "New",
    category: "PDF Tools",
    route: "/tools/image-to-pdf",
    enabled: true,
  },
  {
    id: "pdf-to-image",
    title: "PDF to Image",
    description: "Convert each PDF page to PNG, JPEG, or WEBP images in your browser.",
    icon: "📑",
    badge: "New",
    category: "PDF Tools",
    route: "/tools/pdf-to-image",
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
    enabled: false,
  },
];

export function getToolById(id: string) {
  return featuredTools.find((tool) => tool.id === id);
}
