"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface BackgroundRemovalResult {
  file: File;
  previewUrl: string;
}

function outputName(name: string) {
  const baseName = name.replace(/\.[^/.]+$/, "") || "image";
  return `${baseName}-no-background.png`;
}

export function useBackgroundRemoval() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<BackgroundRemovalResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const sourceUrlRef = useRef<string | null>(null);
  const resultUrlRef = useRef<string | null>(null);

  const revokeUrls = useCallback(() => {
    if (sourceUrlRef.current) URL.revokeObjectURL(sourceUrlRef.current);
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    sourceUrlRef.current = null;
    resultUrlRef.current = null;
  }, []);

  useEffect(() => revokeUrls, [revokeUrls]);

  const replaceImage = useCallback((nextFile: File) => {
    revokeUrls();
    const nextUrl = URL.createObjectURL(nextFile);
    sourceUrlRef.current = nextUrl;
    setFile(nextFile);
    setPreviewUrl(nextUrl);
    setResult(null);
    setProgress(0);
    setError(null);
  }, [revokeUrls]);

  const clearImage = useCallback(() => {
    revokeUrls();
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setProgress(0);
    setError(null);
  }, [revokeUrls]);

  const removeBackground = useCallback(async () => {
    if (!file || isRemoving) return;
    setError(null);
    setProgress(1);
    setIsRemoving(true);

    try {
      const { removeBackground: remove } = await import("@imgly/background-removal");
      const imageBlob = await remove(file, {
        progress: (_key, current, total) => {
          if (total > 0) setProgress(Math.max(1, Math.min(99, Math.round((current / total) * 100))));
        },
      });
      const cleanFile = new File([imageBlob], outputName(file.name), { type: "image/png", lastModified: Date.now() });
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
      const cleanUrl = URL.createObjectURL(cleanFile);
      resultUrlRef.current = cleanUrl;
      setResult({ file: cleanFile, previewUrl: cleanUrl });
      setProgress(100);
    } catch (removalError: unknown) {
      setError(removalError instanceof Error ? removalError.message : "Unable to remove the background. Please try another image.");
      setProgress(0);
    } finally {
      setIsRemoving(false);
    }
  }, [file, isRemoving]);

  return { clearImage, error, file, isRemoving, previewUrl, progress, removeBackground, replaceImage, result };
}
