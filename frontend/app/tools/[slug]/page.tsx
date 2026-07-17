import type { Metadata } from "next";

import { featuredTools } from "@/lib/tools";
import ImageCompressor from "@/components/tools/image-compressor/ImageCompressor";
import ImageConverter from "@/components/tools/image-converter/ImageConverter";
import ImageEditor from "@/components/tools/image-editor/ImageEditor";
import ImageWatermark from "@/components/tools/image-watermark/ImageWatermark";
import BackgroundRemover from "@/components/tools/background-remover/BackgroundRemover";
import MetadataRemover from "@/components/tools/metadata-remover/MetadataRemover";
import ImageResizer from "@/components/tools/image-resizer/ImageResizer";
import ImageToPdf from "@/components/tools/image-to-pdf/ImageToPdf";
import PdfMerge from "@/components/tools/pdf-merge/PdfMerge";
import PdfSplit from "@/components/tools/pdf-split/PdfSplit";
import PdfToImage from "@/components/tools/pdf-to-image/PdfToImage";
import QrGenerator from "@/components/tools/qr-generator/QrGenerator";
import ToolLayout from "@/components/layout/ToolLayout";
import EmptyState from "@/components/tools/shared/EmptyState";
import ToolStructuredData from "@/components/seo/ToolStructuredData";
import { createToolMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = featuredTools.find((item) => item.id === slug);

  if (!tool || !tool.enabled) {
    return {
      robots: { index: false, follow: false },
      title: "Tool not found",
    };
  }

  return createToolMetadata(tool);
}

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
      <>
        <ToolStructuredData tool={tool} />
        <ToolLayout title={tool.title} toolId={tool.id} description={tool.description}>
          <ImageResizer />
        </ToolLayout>
      </>
    );
  }

  if (slug === "image-converter") {
    return (
      <>
        <ToolStructuredData tool={tool} />
        <ToolLayout title={tool.title} toolId={tool.id} description={tool.description}>
          <ImageConverter />
        </ToolLayout>
      </>
    );
  }

  if (slug === "image-editor") {
    return (
      <>
        <ToolStructuredData tool={tool} />
        <ToolLayout title={tool.title} toolId={tool.id} description={tool.description}>
          <ImageEditor />
        </ToolLayout>
      </>
    );
  }

  if (slug === "image-watermark") {
    return (
      <>
        <ToolStructuredData tool={tool} />
        <ToolLayout title={tool.title} toolId={tool.id} description={tool.description}>
          <ImageWatermark />
        </ToolLayout>
      </>
    );
  }

  if (slug === "metadata-remover") {
    return (
      <>
        <ToolStructuredData tool={tool} />
        <ToolLayout title={tool.title} toolId={tool.id} description={tool.description}>
          <MetadataRemover />
        </ToolLayout>
      </>
    );
  }

  if (slug === "background-remover") {
    return (
      <>
        <ToolStructuredData tool={tool} />
        <ToolLayout title={tool.title} toolId={tool.id} description={tool.description}>
          <BackgroundRemover />
        </ToolLayout>
      </>
    );
  }

  if (slug === "qr-generator") {
    return (
      <>
        <ToolStructuredData tool={tool} />
        <ToolLayout title={tool.title} toolId={tool.id} description={tool.description}>
          <QrGenerator />
        </ToolLayout>
      </>
    );
  }

  if (slug === "merge-pdf") {
    return (
      <>
        <ToolStructuredData tool={tool} />
        <ToolLayout title={tool.title} toolId={tool.id} description={tool.description}>
          <PdfMerge />
        </ToolLayout>
      </>
    );
  }

  if (slug === "split-pdf") {
    return (
      <>
        <ToolStructuredData tool={tool} />
        <ToolLayout title={tool.title} toolId={tool.id} description={tool.description}>
          <PdfSplit />
        </ToolLayout>
      </>
    );
  }

  if (slug === "image-to-pdf") {
    return (
      <>
        <ToolStructuredData tool={tool} />
        <ToolLayout title={tool.title} toolId={tool.id} description={tool.description}>
          <ImageToPdf />
        </ToolLayout>
      </>
    );
  }

  if (slug === "pdf-to-image") {
    return (
      <>
        <ToolStructuredData tool={tool} />
        <ToolLayout title={tool.title} toolId={tool.id} description={tool.description}>
          <PdfToImage />
        </ToolLayout>
      </>
    );
  }

  return (
    <ToolLayout title={tool.title} toolId={tool.id} description={tool.description}>
      <EmptyState title="Coming soon" message="This tool is planned and will be available soon." description="Browse the available image, PDF, and utility tools in the meantime." />
    </ToolLayout>
  );
}
