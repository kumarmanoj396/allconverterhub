"use client";

import ToolLayout from "./ToolLayout";
import UploadBox from "./UploadBox";

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
  function handleFile(file: File) {
    console.log("Selected File:", file);
  }

  return (
    <ToolLayout
      title={tool.title}
      description={tool.description}
      icon={tool.icon}
    >
      <UploadBox onFileSelect={handleFile} />
    </ToolLayout>
  );
}