"use client";

import ImagePreview from "@/components/tools/image-compressor/ImagePreview";
import UploadBox from "@/components/tools/image-compressor/UploadBox";
import { useImageResizer } from "@/hooks/useImageResizer";

import ResizeResult from "./ResizeResult";
import ResizeSettings from "./ResizeSettings";

export default function ImageResizer() {
  const {
    clearImage,
    error,
    file,
    height,
    isResizing,
    maintainAspectRatio,
    previewUrl,
    replaceImage,
    resize,
    result,
    setMaintainAspectRatio,
    updateHeight,
    updateWidth,
    width,
  } = useImageResizer();

  if (!file || !previewUrl) return <UploadBox onFileSelect={replaceImage} />;

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2"><ImagePreview file={file} previewUrl={previewUrl} /></div>
        <ResizeSettings
          width={width}
          height={height}
          maintainAspectRatio={maintainAspectRatio}
          isResizing={isResizing}
          onWidthChange={updateWidth}
          onHeightChange={updateHeight}
          onAspectRatioChange={setMaintainAspectRatio}
          onResize={resize}
        />
      </div>
      {error && <p className="text-sm font-medium text-red-400">{error}</p>}
      {result && <ResizeResult result={result} onReplace={clearImage} />}
    </div>
  );
}
