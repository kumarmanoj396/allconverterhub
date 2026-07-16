"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type WatermarkPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface WatermarkSettings {
  color: string;
  fontSize: number;
  opacity: number;
  position: WatermarkPosition;
  text: string;
}

const defaultSettings: WatermarkSettings = {
  color: "#ffffff",
  fontSize: 6,
  opacity: 65,
  position: "bottom-right",
  text: "© Your watermark",
};

function loadImage(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to read this image."));
    image.src = source;
  });
}

export function drawWatermark(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  settings: WatermarkSettings,
) {
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Your browser does not support image editing.");

  context.drawImage(image, 0, 0);
  if (!settings.text.trim()) return;

  const fontSize = Math.max(16, Math.round((Math.min(canvas.width, canvas.height) * settings.fontSize) / 100));
  const padding = Math.max(16, Math.round(fontSize * 0.8));
  context.font = `600 ${fontSize}px Arial, sans-serif`;
  context.textBaseline = "middle";
  context.globalAlpha = settings.opacity / 100;
  context.fillStyle = settings.color;

  const horizontal = settings.position.endsWith("left") ? "left" : settings.position.endsWith("right") ? "right" : "center";
  const vertical = settings.position.startsWith("top") ? "top" : settings.position.startsWith("bottom") ? "bottom" : "center";
  context.textAlign = horizontal;
  const x = horizontal === "left" ? padding : horizontal === "right" ? canvas.width - padding : canvas.width / 2;
  const y = vertical === "top" ? padding + fontSize / 2 : vertical === "bottom" ? canvas.height - padding - fontSize / 2 : canvas.height / 2;
  context.fillText(settings.text, x, y);
  context.globalAlpha = 1;
}

export function useImageWatermark() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [settings, setSettings] = useState<WatermarkSettings>(defaultSettings);
  const [error, setError] = useState<string | null>(null);
  const urlRef = useRef<string | null>(null);

  const revokeUrl = useCallback(() => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
  }, []);

  useEffect(() => revokeUrl, [revokeUrl]);

  const replaceImage = useCallback(async (nextFile: File) => {
    revokeUrl();
    const nextUrl = URL.createObjectURL(nextFile);
    urlRef.current = nextUrl;
    try {
      await loadImage(nextUrl);
      setFile(nextFile);
      setPreviewUrl(nextUrl);
      setError(null);
    } catch (nextError: unknown) {
      revokeUrl();
      setError(nextError instanceof Error ? nextError.message : "Unable to read this image.");
    }
  }, [revokeUrl]);

  const updateSettings = useCallback((updates: Partial<WatermarkSettings>) => {
    setSettings((current) => ({ ...current, ...updates }));
  }, []);

  const clearImage = useCallback(() => {
    revokeUrl();
    setFile(null);
    setPreviewUrl(null);
    setError(null);
  }, [revokeUrl]);

  const download = useCallback(async () => {
    if (!file || !previewUrl) return;
    try {
      const image = await loadImage(previewUrl);
      const canvas = document.createElement("canvas");
      drawWatermark(canvas, image, settings);
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((value) => value ? resolve(value) : reject(new Error("Unable to create the watermarked image.")), file.type || "image/png", 0.95);
      });
      const baseName = file.name.replace(/\.[^/.]+$/, "") || "image";
      const extension = file.type === "image/jpeg" ? "jpg" : file.type === "image/webp" ? "webp" : "png";
      const url = URL.createObjectURL(new File([blob], `${baseName}-watermarked.${extension}`, { type: blob.type }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `${baseName}-watermarked.${extension}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setError(null);
    } catch (downloadError: unknown) {
      setError(downloadError instanceof Error ? downloadError.message : "Unable to create the watermarked image.");
    }
  }, [file, previewUrl, settings]);

  return { clearImage, download, error, file, previewUrl, replaceImage, settings, updateSettings };
}
