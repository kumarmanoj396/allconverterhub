import { featuredTools } from "@/lib/tools";
import { notFound } from "next/navigation";

interface ToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;

  const tool = featuredTools.find((item) => item.id === slug);

  if (!tool) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8">
          <div className="text-5xl">{tool.icon}</div>

          <h1 className="mt-4 text-4xl font-bold">
            {tool.title}
          </h1>

          <p className="mt-3 text-slate-400">
            {tool.description}
          </p>
        </div>

        {/* Upload */}
        <div className="rounded-xl border-2 border-dashed border-slate-700 bg-slate-900 p-8 text-center">
          <div className="text-5xl">📤</div>

          <h2 className="mt-4 text-2xl font-bold">
            Upload Image
          </h2>

          <p className="mt-2 text-slate-400">
            Drag & Drop your image here
          </p>

          <button className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700">
            Choose Image
          </button>
        </div>

        {/* Compression */}
        <div className="mt-8 rounded-xl bg-slate-900 p-6">
          <h2 className="text-xl font-bold">
            Compression Level
          </h2>

          <input
            type="range"
            min={10}
            max={100}
            defaultValue={80}
            className="mt-4 w-full"
          />

          <p className="mt-2 text-sm text-slate-400">
            Quality: 80%
          </p>
        </div>

        {/* Format */}
        <div className="mt-8 rounded-xl bg-slate-900 p-6">
          <h2 className="text-xl font-bold">
            Output Format
          </h2>

          <div className="mt-4 flex gap-3">
            <button className="rounded-lg bg-blue-600 px-5 py-2">
              JPG
            </button>

            <button className="rounded-lg bg-slate-700 px-5 py-2">
              PNG
            </button>

            <button className="rounded-lg bg-slate-700 px-5 py-2">
              WEBP
            </button>
          </div>
        </div>

        <button className="mt-8 w-full rounded-xl bg-green-600 py-4 text-lg font-bold hover:bg-green-700">
          Compress Image
        </button>
      </div>
    </main>
  );
}