"use client";

import { useState } from "react";
import ToolLayout from "./ToolLayout";
import UploadBox from "./UploadBox";
import ImagePreview from "./ImagePreview";
import type { Tool } from "@/types/tool";

export default function ImageCompressor({
  tool,
}: {
  tool: Tool;
}) {
  const [file, setFile] = useState<File | null>(null);

  return (
    <ToolLayout
      title={tool.title}
      description={tool.description}
      icon={tool.icon}
    >
      <UploadBox
        onFileSelect={(selectedFile) => {
          setFile(selectedFile);
        }}
      />

      <ImagePreview file={file} />
    </ToolLayout>
  );
}