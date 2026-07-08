"use client";

import ToolLayout from "./ToolLayout";

type Tool = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

type Props = {
  tool: Tool;
};

export default function ImageCompressor({ tool }: Props) {
  return (
    <ToolLayout
      title={tool.title}
      description={tool.description}
      icon={tool.icon}
    >
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-10 text-center">
        <h2 className="text-2xl font-bold">
          🚧 Image Upload Coming Next
        </h2>

        <p className="mt-4 text-slate-400">
          Next feature pack will add drag & drop upload,
          preview, compression settings, and download.
        </p>
      </div>
    </ToolLayout>
  );
}