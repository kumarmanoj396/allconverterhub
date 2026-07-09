import { featuredTools } from "@/lib/tools";
import ImageCompressor from "@/components/tools/image-compressor/ImageCompressor";
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

  return <ImageCompressor tool={tool} />;
}