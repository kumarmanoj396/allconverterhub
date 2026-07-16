"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface MetadataRemovalResult {
  file: File;
  originalSize: number;
}

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to read this image."));
    image.src = url;
  });
}

function outputDetails(file: File) {
  if (file.type === "image/jpeg") return { extension: "jpg", type: "image/jpeg" } as const;
  if (file.type === "image/webp") return { extension: "webp", type: "image/webp" } as const;
  return { extension: "png", type: "image/png" } as const;
}

export function useMetadataRemoval() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<MetadataRemovalResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);
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
      await loadImage(nextUrl);
      setFile(nextFile);
      setPreviewUrl(nextUrl);
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
    setResult(null);
    setError(null);
  }, [revokePreview]);

  const removeMetadata = useCallback(async () => {
    if (!file || !previewUrl || isRemoving) return;
    setIsRemoving(true);
    setError(null);
    try {
      const image = await loadImage(previewUrl);
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Your browser does not support image editing.");
      context.drawImage(image, 0, 0);
      const output = outputDetails(file);
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((value) => value ? resolve(value) : reject(new Error("Unable to create the clean image.")), output.type, 0.95);
      });
      const baseName = file.name.replace(/\.[^/.]+$/, "") || "image";
      setResult({ file: new File([blob], `${baseName}-clean.${output.extension}`, { type: output.type, lastModified: Date.now() }), originalSize: file.size });
    } catch (removalError: unknown) {
      setError(removalError instanceof Error ? removalError.message : "Unable to remove image metadata.");
    } finally {
      setIsRemoving(false);
    }
  }, [file, isRemoving, previewUrl]);

  return { clearImage, error, file, isRemoving, previewUrl, removeMetadata, replaceImage, result };
}
