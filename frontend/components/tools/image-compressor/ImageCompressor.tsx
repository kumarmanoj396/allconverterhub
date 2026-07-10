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

  const [loading, setLoading] = useState(false);

  async function handleCompress() {
    if (!file) return;

    setLoading(true);

    try {
      // Compression implementation comes in the next step
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Compression engine will be implemented in the next step.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {!file ? (
        <UploadBox
          file={file}
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
            loading={loading}
            onQualityChange={setQuality}
            onFormatChange={(value) =>
              setFormat(
                value as "image/jpeg" | "image/png" | "image/webp"
              )
            }
            onCompress={handleCompress}
          />
        </div>
      )}
    </div>
  );
}