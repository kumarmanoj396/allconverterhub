"use client";

import UploadBox from "./UploadBox";
import ImagePreview from "./ImagePreview";
import CompressionSettings from "./CompressionSettings";
import CompressionResult from "./CompressionResult";
import { useImageCompression } from "@/hooks/useImageCompression";

export default function ImageCompressor() {
  const {
    clearImage,
    compressionMode,
    compress,
    error,
    file,
    format,
    isCompressing,
    progress,
    previewUrl,
    quality,
    replaceImage,
    result,
    setFormat,
    setCompressionMode,
    setQuality,
    setTargetSizeKB,
    targetSizeKB,
  } = useImageCompression();

  return (
    <div className="space-y-8">
      {!file ? (
        <UploadBox onFileSelect={replaceImage} />
      ) : (
        <div className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {previewUrl && <ImagePreview file={file} previewUrl={previewUrl} />}
            </div>

            <CompressionSettings
              quality={quality}
              compressionMode={compressionMode}
              targetSizeKB={targetSizeKB}
              format={format}
              isCompressing={isCompressing}
              progress={progress}
              onQualityChange={setQuality}
              onCompressionModeChange={setCompressionMode}
              onTargetSizeChange={setTargetSizeKB}
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
