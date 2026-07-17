import { createToolOpenGraphImage, contentType, size } from "@/components/seo/ToolOpenGraphImage";
import { getToolById } from "@/lib/tools";

export { contentType, size };

export const alt = "AllConverterHub Image Compressor";

export default function OpenGraphImage() {
  const tool = getToolById("image-compressor");
  if (!tool) throw new Error("Image Compressor tool configuration is missing.");
  return createToolOpenGraphImage(tool);
}
