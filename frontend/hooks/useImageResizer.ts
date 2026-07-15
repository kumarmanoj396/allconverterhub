"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface Dimensions {
  width: number;
  height: number;
}

export interface ResizeResult {
  file: File;
  previewUrl: string;
  dimensions: Dimensions;
}

const SUPPORTED_OUTPUT_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function resizedFilename(name: string, type: string) {
  const extension = type.split("/")[1] ?? "png";
  const baseName = name.replace(/\.[^/.]+$/, "") || "resized-image";

  return `${baseName}-resized.${extension}`;
}

function loadImage(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to read this image."));
    image.src = source;
  });
}

export function useImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<Dimensions | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [result, setResult] = useState<ResizeResult | null>(null);
  const [isResizing, setIsResizing] = useState(false);
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

  const replaceImage = useCallback(async (nextFile: File) => {
    revokeUrls();
    const nextPreviewUrl = URL.createObjectURL(nextFile);
    previewUrlRef.current = nextPreviewUrl;
    setFile(nextFile);
    setPreviewUrl(nextPreviewUrl);
    setResult(null);
    setError(null);

    try {
      const image = await loadImage(nextPreviewUrl);
      const dimensions = { width: image.naturalWidth, height: image.naturalHeight };
      setOriginalDimensions(dimensions);
      setWidth(dimensions.width);
      setHeight(dimensions.height);
    } catch (imageError: unknown) {
      setError(imageError instanceof Error ? imageError.message : "Unable to read this image.");
    }
  }, [revokeUrls]);

  const clearImage = useCallback(() => {
    revokeUrls();
    setFile(null);
    setPreviewUrl(null);
    setOriginalDimensions(null);
    setResult(null);
    setError(null);
  }, [revokeUrls]);

  const updateWidth = useCallback((nextWidth: number) => {
    setWidth(nextWidth);
    if (maintainAspectRatio && originalDimensions) {
      setHeight(Math.max(1, Math.round(nextWidth * (originalDimensions.height / originalDimensions.width))));
    }
  }, [maintainAspectRatio, originalDimensions]);

  const updateHeight = useCallback((nextHeight: number) => {
    setHeight(nextHeight);
    if (maintainAspectRatio && originalDimensions) {
      setWidth(Math.max(1, Math.round(nextHeight * (originalDimensions.width / originalDimensions.height))));
    }
  }, [maintainAspectRatio, originalDimensions]);

  const resize = useCallback(async () => {
    if (!file || !previewUrl || !width || !height || isResizing) return;

    setIsResizing(true);
    setError(null);
    try {
      const image = await loadImage(previewUrl);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Your browser does not support image resizing.");

      context.drawImage(image, 0, 0, width, height);
      const outputType = SUPPORTED_OUTPUT_TYPES.has(file.type) ? file.type : "image/png";
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((value) => value ? resolve(value) : reject(new Error("Unable to create the resized image.")), outputType, 0.92);
      });
      const resizedFile = new File([blob], resizedFilename(file.name, outputType), { type: outputType, lastModified: Date.now() });
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
      const resultUrl = URL.createObjectURL(resizedFile);
      resultUrlRef.current = resultUrl;
      setResult({ file: resizedFile, previewUrl: resultUrl, dimensions: { width, height } });
    } catch (resizeError: unknown) {
      setError(resizeError instanceof Error ? resizeError.message : "Unable to resize this image.");
    } finally {
      setIsResizing(false);
    }
  }, [file, height, isResizing, previewUrl, width]);

  return { clearImage, error, file, height, isResizing, maintainAspectRatio, originalDimensions, previewUrl, replaceImage, resize, result, setMaintainAspectRatio, updateHeight, updateWidth, width };
}
