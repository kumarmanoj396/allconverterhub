"use client";

import imageCompression from "browser-image-compression";
import { useCallback, useState } from "react";

export type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface CompressionResult {
  file: File;
  sizeSaved: number;
  savingsPercentage: number;
}

const BYTES_PER_MEGABYTE = 1024 * 1024;

function outputFilename(fileName: string, format: OutputFormat) {
  const extension = format.split("/")[1];
  const basename = fileName.replace(/\.[^/.]+$/, "") || "compressed-image";

  return `${basename}-compressed.${extension}`;
}

function errorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "We couldn't compress this image. Please try another file.";
}

export function useImageCompression() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState<OutputFormat>("image/jpeg");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  const replaceImage = useCallback((nextFile: File) => {
    setFile(nextFile);
    setResult(null);
    setError(null);
    setProgress(0);
  }, []);

  const clearImage = useCallback(() => {
    setFile(null);
    setResult(null);
    setError(null);
    setProgress(0);
  }, []);

  const compress = useCallback(async () => {
    if (!file || isCompressing) {
      return;
    }

    setIsCompressing(true);
    setError(null);
    setResult(null);
    setProgress(0);

    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: Math.max(0.1, (file.size / BYTES_PER_MEGABYTE) * (quality / 100)),
        maxWidthOrHeight: 4096,
        alwaysKeepResolution: true,
        fileType: format,
        initialQuality: quality / 100,
        onProgress: (value) => setProgress(Math.round(value)),
        useWebWorker: true,
      });
      const compressedFile = new File(
        [compressed],
        outputFilename(file.name, format),
        { type: format, lastModified: Date.now() },
      );
      const sizeSaved = file.size - compressedFile.size;

      setResult({
        file: compressedFile,
        sizeSaved,
        savingsPercentage: Math.max(0, (sizeSaved / file.size) * 100),
      });
      setProgress(100);
    } catch (compressionError: unknown) {
      setError(errorMessage(compressionError));
      setProgress(0);
    } finally {
      setIsCompressing(false);
    }
  }, [file, format, isCompressing, quality]);

  return {
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
  };
}
