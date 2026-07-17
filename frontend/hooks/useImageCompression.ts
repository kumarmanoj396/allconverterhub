"use client";

import imageCompression from "browser-image-compression";
import { useCallback, useRef, useState } from "react";

export type OutputFormat = "image/jpeg" | "image/png" | "image/webp";
export type CompressionMode = "quality" | "target-size";

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface CompressionResult {
  file: File;
  sizeSaved: number;
  savingsPercentage: number;
  targetSizeKB?: number;
  targetReached?: boolean;
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(80);
  const [compressionMode, setCompressionMode] = useState<CompressionMode>("quality");
  const [targetSizeKB, setTargetSizeKB] = useState(200);
  const [format, setFormat] = useState<OutputFormat>("image/jpeg");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const previewUrlRef = useRef<string | null>(null);

  const revokePreviewUrl = useCallback(() => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
  }, []);

  const replaceImage = useCallback((nextFile: File) => {
    revokePreviewUrl();
    const nextPreviewUrl = URL.createObjectURL(nextFile);

    previewUrlRef.current = nextPreviewUrl;
    setFile(nextFile);
    setPreviewUrl(nextPreviewUrl);
    setResult(null);
    setError(null);
    setProgress(0);
  }, [revokePreviewUrl]);

  const clearImage = useCallback(() => {
    revokePreviewUrl();
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    setProgress(0);
  }, [revokePreviewUrl]);

  const compress = useCallback(async () => {
    if (!file || isCompressing) {
      return;
    }

    setIsCompressing(true);
    setError(null);
    setResult(null);
    setProgress(0);

    try {
      const targetBytes = targetSizeKB * 1024;
      const isTargetMode = compressionMode === "target-size";
      const compressed = await imageCompression(file, {
        maxSizeMB: isTargetMode
          ? Math.max(0.02, targetBytes / BYTES_PER_MEGABYTE)
          : Math.max(0.1, (file.size / BYTES_PER_MEGABYTE) * (quality / 100)),
        maxWidthOrHeight: 4096,
        alwaysKeepResolution: true,
        fileType: format,
        initialQuality: isTargetMode ? 1 : quality / 100,
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
        ...(isTargetMode ? { targetSizeKB, targetReached: compressedFile.size <= targetBytes } : {}),
      });
      setProgress(100);
    } catch (compressionError: unknown) {
      setError(errorMessage(compressionError));
      setProgress(0);
    } finally {
      setIsCompressing(false);
    }
  }, [compressionMode, file, format, isCompressing, quality, targetSizeKB]);

  return {
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
  };
}
