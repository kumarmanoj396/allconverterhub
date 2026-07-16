"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { type CropRegion, type ImageEditSettings, loadImage, renderEditedImage, type Rotation } from "@/lib/imageEditor";

export type EditorOutputFormat = "image/jpeg" | "image/png" | "image/webp";

export interface ImageEditorResult {
  file: File;
}

const EXTENSIONS: Record<EditorOutputFormat, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

function editedFilename(name: string, format: EditorOutputFormat) {
  const baseName = name.replace(/\.[^/.]+$/, "") || "edited-image";
  return `${baseName}-edited.${EXTENSIONS[format]}`;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function useImageEditor() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [crop, setCrop] = useState<CropRegion>({ x: 0, y: 0, width: 0, height: 0 });
  const [rotation, setRotation] = useState<Rotation>(0);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);
  const [format, setFormat] = useState<EditorOutputFormat>("image/png");
  const [quality, setQuality] = useState(92);
  const [result, setResult] = useState<ImageEditorResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const previewUrlRef = useRef<string | null>(null);

  const revokePreview = useCallback(() => {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    previewUrlRef.current = null;
  }, []);

  useEffect(() => revokePreview, [revokePreview]);

  const replaceImage = useCallback(async (nextFile: File) => {
    revokePreview();
    const nextUrl = URL.createObjectURL(nextFile);
    previewUrlRef.current = nextUrl;

    try {
      const image = await loadImage(nextUrl);
      const nextDimensions = { width: image.naturalWidth, height: image.naturalHeight };
      setFile(nextFile);
      setPreviewUrl(nextUrl);
      setDimensions(nextDimensions);
      setCrop({ x: 0, y: 0, width: nextDimensions.width, height: nextDimensions.height });
      setRotation(0);
      setFlipHorizontal(false);
      setFlipVertical(false);
      setResult(null);
      setError(null);
    } catch (imageError: unknown) {
      revokePreview();
      setError(imageError instanceof Error ? imageError.message : "Unable to read this image.");
    }
  }, [revokePreview]);

  const clearImage = useCallback(() => {
    revokePreview();
    setFile(null);
    setPreviewUrl(null);
    setDimensions({ width: 0, height: 0 });
    setCrop({ x: 0, y: 0, width: 0, height: 0 });
    setResult(null);
    setError(null);
  }, [revokePreview]);

  const updateCrop = useCallback((field: keyof CropRegion, value: number) => {
    setCrop((currentCrop) => {
      const safeValue = Number.isFinite(value) ? Math.floor(value) : 0;
      const nextCrop = { ...currentCrop, [field]: safeValue };
      const x = clamp(nextCrop.x, 0, Math.max(0, dimensions.width - 1));
      const y = clamp(nextCrop.y, 0, Math.max(0, dimensions.height - 1));
      return {
        x,
        y,
        width: clamp(nextCrop.width, 1, dimensions.width - x),
        height: clamp(nextCrop.height, 1, dimensions.height - y),
      };
    });
    setResult(null);
  }, [dimensions]);

  const resetCrop = useCallback(() => {
    setCrop({ x: 0, y: 0, width: dimensions.width, height: dimensions.height });
    setResult(null);
  }, [dimensions]);

  const rotate = useCallback((direction: -90 | 90) => {
    setRotation((currentRotation) => ((currentRotation + direction + 360) % 360) as Rotation);
    setResult(null);
  }, []);

  const toggleFlipHorizontal = useCallback(() => { setFlipHorizontal((value) => !value); setResult(null); }, []);
  const toggleFlipVertical = useCallback(() => { setFlipVertical((value) => !value); setResult(null); }, []);

  const exportImage = useCallback(async () => {
    if (!file || !previewUrl || isExporting) return;
    setIsExporting(true);
    setError(null);

    try {
      const image = await loadImage(previewUrl);
      const canvas = document.createElement("canvas");
      const settings: ImageEditSettings = { crop, flipHorizontal, flipVertical, rotation };
      renderEditedImage(canvas, image, settings, format === "image/jpeg");
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((value) => value ? resolve(value) : reject(new Error("Unable to create the edited image.")), format, quality / 100);
      });
      setResult({ file: new File([blob], editedFilename(file.name, format), { type: format, lastModified: Date.now() }) });
    } catch (exportError: unknown) {
      setError(exportError instanceof Error ? exportError.message : "Unable to edit this image.");
    } finally {
      setIsExporting(false);
    }
  }, [crop, file, flipHorizontal, flipVertical, format, isExporting, previewUrl, quality, rotation]);

  return { clearImage, crop, dimensions, error, exportImage, file, flipHorizontal, flipVertical, format, isExporting, previewUrl, quality, replaceImage, resetCrop, result, rotate, rotation, setFormat, setQuality, toggleFlipHorizontal, toggleFlipVertical, updateCrop };
}
