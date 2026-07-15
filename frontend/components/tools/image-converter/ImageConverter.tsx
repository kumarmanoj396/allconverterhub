"use client";

import ImagePreview from "@/components/tools/image-compressor/ImagePreview";
import UploadBox from "@/components/tools/image-compressor/UploadBox";
import { useImageConversion } from "@/hooks/useImageConversion";

import ConversionResult from "./ConversionResult";
import ConversionSettings from "./ConversionSettings";

export default function ImageConverter() {
  const { clearImage, convert, error, file, format, isConverting, previewUrl, quality, replaceImage, result, setFormat, setQuality } = useImageConversion();

  if (!file || !previewUrl) return <UploadBox onFileSelect={replaceImage} />;

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2"><ImagePreview file={file} previewUrl={previewUrl} /></div>
        <ConversionSettings format={format} quality={quality} isConverting={isConverting} onFormatChange={setFormat} onQualityChange={setQuality} onConvert={convert} />
      </div>
      {error && <p className="text-sm font-medium text-red-400">{error}</p>}
      {result && <ConversionResult result={result} onReplace={clearImage} />}
    </div>
  );
}
