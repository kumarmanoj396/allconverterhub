"use client";

import imageCompression from "browser-image-compression";
import { useState } from "react";

export interface CompressionData {
  originalFile: File;
  compressedFile: File;
  originalSize: number;
  compressedSize: number;
  savedPercentage: number;
}

export default function useImageCompression() {
  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);

  async function compress(
    file: File,
    quality: number,
    format: "image/jpeg" | "image/png" | "image/webp"
  ) {
    setLoading(true);

    setProgress(0);

    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 10,
        maxWidthOrHeight: 4096,
        useWebWorker: true,
        initialQuality: quality / 100,
        fileType: format,
        onProgress: setProgress,
      });

      return {
        originalFile: file,
        compressedFile: compressed,
        originalSize: file.size,
        compressedSize: compressed.size,
        savedPercentage: Number(
          (
            ((file.size - compressed.size) / file.size) *
            100
          ).toFixed(1)
        ),
      } satisfies CompressionData;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    progress,
    compress,
  };
}