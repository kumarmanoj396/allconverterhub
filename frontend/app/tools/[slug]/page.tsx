import { featuredTools } from "@/lib/tools";
import ImageCompressor from "@/components/tools/image-compressor/ImageCompressor";
import ImageConverter from "@/components/tools/image-converter/ImageConverter";
import ImageResizer from "@/components/tools/image-resizer/ImageResizer";
import QrGenerator from "@/components/tools/qr-generator/QrGenerator";
import ToolLayout from "@/components/layout/ToolLayout";
import EmptyState from "@/components/tools/shared/EmptyState";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;

  const tool = featuredTools.find((item) => item.id === slug);

  if (!tool) {
    notFound();
  }

  if (slug === "image-compressor") {
    return <ImageCompressor />;
  }

  if (slug === "image-resizer") {
    return (
      <ToolLayout
        title="Image Resizer"
        description="Resize JPG, PNG and WEBP images to exact dimensions, directly in your browser."
      >
        <ImageResizer />
      </ToolLayout>
    );
  }

  if (slug === "image-converter") {
    return (
      <ToolLayout
        title="Image Converter"
        description="Convert JPG, PNG and WEBP images directly in your browser."
      >
        <ImageConverter />
      </ToolLayout>
    );
  }

  if (slug === "qr-generator") {
    return (
      <ToolLayout
        title="QR Generator"
        description="Create a custom QR code for any URL or text, directly in your browser."
      >
        <QrGenerator />
      </ToolLayout>
    );
  }

  return (
    <ToolLayout title={tool.title} description={tool.description}>
      <EmptyState message="This tool is coming soon." />
    </ToolLayout>
  );
}
