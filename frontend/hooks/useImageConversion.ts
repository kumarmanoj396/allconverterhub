"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

export interface ConversionResult {
  file: File;
  previewUrl: string;
}

const EXTENSIONS: Record<OutputFormat, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function loadImage(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to read this image."));
    image.src = source;
  });
}

function convertedFilename(name: string, format: OutputFormat) {
  const baseName = name.replace(/\.[^/.]+$/, "") || "converted-image";

  return `${baseName}-converted.${EXTENSIONS[format]}`;
}

export function useImageConversion() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [format, setFormat] = useState<OutputFormat>("image/png");
  const [quality, setQuality] = useState(92);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);
  const resultUrlRef = useRef<string | null>(null);

  const revokeUrls = useCallback(() => {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    previewUrlRef.current = null;
    resultUrlRef.current = null;
  }, []);

  useEffect(() => revokeUrls, [revokeUrls]);

  const replaceImage = useCallback((nextFile: File) => {
    revokeUrls();
    const nextPreviewUrl = URL.createObjectURL(nextFile);
    previewUrlRef.current = nextPreviewUrl;
    setFile(nextFile);
    setPreviewUrl(nextPreviewUrl);
    setResult(null);
    setError(null);
  }, [revokeUrls]);

  const clearImage = useCallback(() => {
    revokeUrls();
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  }, [revokeUrls]);

  const convert = useCallback(async () => {
    if (!file || !previewUrl || isConverting) return;

    setIsConverting(true);
    setError(null);
    try {
      const image = await loadImage(previewUrl);
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Your browser does not support image conversion.");

      if (format === "image/jpeg") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
      context.drawImage(image, 0, 0);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((value) => value ? resolve(value) : reject(new Error("Unable to create the converted image.")), format, quality / 100);
      });
      const convertedFile = new File([blob], convertedFilename(file.name, format), { type: format, lastModified: Date.now() });
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
      const resultUrl = URL.createObjectURL(convertedFile);
      resultUrlRef.current = resultUrl;
      setResult({ file: convertedFile, previewUrl: resultUrl });
    } catch (conversionError: unknown) {
      setError(conversionError instanceof Error ? conversionError.message : "Unable to convert this image.");
    } finally {
      setIsConverting(false);
    }
  }, [file, format, isConverting, previewUrl, quality]);

  return { clearImage, convert, error, file, format, isConverting, previewUrl, quality, replaceImage, result, setFormat, setQuality };
}
