import type { Metadata } from "next";

import ToolLayout from "@/components/layout/ToolLayout";
import ImageCompressor from "@/components/tools/image-compressor/ImageCompressor";
import ToolStructuredData from "@/components/seo/ToolStructuredData";
import { createToolMetadata } from "@/lib/seo";
import { getToolById } from "@/lib/tools";

function getImageCompressorTool() {
  const tool = getToolById("image-compressor");
  if (!tool) {
    throw new Error("Image Compressor tool configuration is missing.");
  }

  return tool;
}

const tool = getImageCompressorTool();

export const metadata: Metadata = createToolMetadata(tool);

export default function ImageCompressorPage() {
  return (
    <>
      <ToolStructuredData tool={tool} />
      <ToolLayout title={tool.title} toolId={tool.id} description={tool.description}>
        <ImageCompressor />
      </ToolLayout>
    </>
  );
}
