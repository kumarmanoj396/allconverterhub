"use client";

import UploadBox from "./UploadBox";
import ImagePreview from "./ImagePreview";
import CompressionSettings from "./CompressionSettings";
import CompressionResult from "./CompressionResult";
import { useImageCompression } from "@/hooks/useImageCompression";

export default function ImageCompressor() {
  const {
    clearImage,
    compress,
    error,
    file,
    format,
    isCompressing,
    progress,
    quality,
    replaceImage,
    result,
    setFormat,
    setQuality,
  } = useImageCompression();

  return (
    <div className="space-y-8">
      {!file ? (
        <UploadBox onFileSelect={replaceImage} />
      ) : (
        <div className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ImagePreview file={file} />
            </div>

            <CompressionSettings
              quality={quality}
              format={format}
              isCompressing={isCompressing}
              progress={progress}
              onQualityChange={setQuality}
              onFormatChange={setFormat}
              onCompress={compress}
            />
          </div>
          {error && (
            <p className="text-sm font-medium text-red-600">{error}</p>
          )}
          {result && (
            <CompressionResult
              originalFile={file}
              result={result}
              onReplace={clearImage}
            />
          )}
        </div>
      )}
    </div>
  );
}
