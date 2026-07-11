"use client";

import { useState } from "react";

import UploadBox from "./UploadBox";
import ImagePreview from "./ImagePreview";
import CompressionSettings from "./CompressionSettings";

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);

  const [quality, setQuality] = useState(80);

  const [format, setFormat] = useState<
    "image/jpeg" | "image/png" | "image/webp"
  >("image/jpeg");

  function handleCompress() {
    console.log("Compress", {
      file,
      quality,
      format,
    });
  }

  return (
    <div className="space-y-8">
      {!file ? (
        <UploadBox
          onFileSelect={setFile}
        />
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ImagePreview file={file} />
          </div>

          <CompressionSettings
            quality={quality}
            format={format}
            loading={false}
            onQualityChange={setQuality}
            onFormatChange={setFormat}
            onCompress={handleCompress}
          />
        </div>
      )}
    </div>
  );
}