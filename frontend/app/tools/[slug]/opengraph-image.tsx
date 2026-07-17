import { createToolOpenGraphImage, contentType, size } from "@/components/seo/ToolOpenGraphImage";
import { featuredTools } from "@/lib/tools";

export { contentType, size };

export const alt = "AllConverterHub online tool";

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = featuredTools.find((item) => item.id === slug) ?? featuredTools[0];
  return createToolOpenGraphImage(tool);
}
