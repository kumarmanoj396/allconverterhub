import ToolLayout from "@/components/layout/ToolLayout";
import ImageCompressor from "@/components/tools/image-compressor/ImageCompressor";

export default function ImageCompressorPage() {
  return (
    <ToolLayout
      title="Image Compressor"
      description="Compress JPG, JPEG, PNG and WEBP images directly in your browser."
    >
      <ImageCompressor />
    </ToolLayout>
  );
}