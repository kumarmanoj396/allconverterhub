"use client";

import { PDFDocument, rgb } from "pdf-lib";
import { useCallback, useEffect, useRef, useState } from "react";

export type PageFormat = "a4" | "letter";
export type PageOrientation = "portrait" | "landscape";
export type PageMargin = 0 | 18 | 36 | 72;

export interface PdfImage {
  id: string;
  file: File;
  previewUrl: string;
  width: number;
  height: number;
}

export interface ImageToPdfResult {
  file: File;
  pageCount: number;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_TOTAL_SIZE = 100 * 1024 * 1024;
const MAX_IMAGES = 20;
const SUPPORTED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function loadImage(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to read this image."));
    image.src = source;
  });
}

async function toPngBytes(source: string) {
  const image = await loadImage(source);
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Your browser does not support image conversion.");

  context.drawImage(image, 0, 0);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((value) => value ? resolve(value) : reject(new Error("Unable to convert this image.")), "image/png");
  });

  return new Uint8Array(await blob.arrayBuffer());
}

function pageDimensions(format: PageFormat, orientation: PageOrientation) {
  const dimensions = format === "a4" ? [595.28, 841.89] : [612, 792];
  return orientation === "portrait" ? dimensions : [dimensions[1], dimensions[0]];
}

export function useImageToPdf() {
  const [images, setImages] = useState<PdfImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [result, setResult] = useState<ImageToPdfResult | null>(null);
  const sequence = useRef(0);
  const urls = useRef(new Set<string>());

  const revokeUrl = useCallback((url: string) => {
    URL.revokeObjectURL(url);
    urls.current.delete(url);
  }, []);

  const revokeAllUrls = useCallback(() => {
    urls.current.forEach((url) => URL.revokeObjectURL(url));
    urls.current.clear();
  }, []);

  useEffect(() => revokeAllUrls, [revokeAllUrls]);

  const addImages = useCallback(async (files: File[]) => {
    const candidates = files.filter((file) => SUPPORTED_TYPES.has(file.type));

    if (!candidates.length) {
      setError("Choose JPG, PNG, or WEBP images.");
      return;
    }
    if (candidates.some((file) => file.size > MAX_FILE_SIZE)) {
      setError("Each image must be 10 MB or smaller.");
      return;
    }
    if (images.length + candidates.length > MAX_IMAGES) {
      setError(`Add up to ${MAX_IMAGES} images at a time.`);
      return;
    }
    const currentSize = images.reduce((total, image) => total + image.file.size, 0);
    const addedSize = candidates.reduce((total, file) => total + file.size, 0);
    if (currentSize + addedSize > MAX_TOTAL_SIZE) {
      setError("The combined image size must be 100 MB or smaller.");
      return;
    }

    try {
      const nextImages = await Promise.all(candidates.map(async (file) => {
        const previewUrl = URL.createObjectURL(file);
        urls.current.add(previewUrl);

        try {
          const image = await loadImage(previewUrl);
          sequence.current += 1;
          return { file, height: image.naturalHeight, id: `${file.name}-${file.lastModified}-${sequence.current}`, previewUrl, width: image.naturalWidth };
        } catch (imageError) {
          revokeUrl(previewUrl);
          throw imageError;
        }
      }));

      setImages((currentImages) => [...currentImages, ...nextImages]);
      setResult(null);
      setError(null);
    } catch {
      setError("One of the selected images could not be read.");
    }
  }, [images, revokeUrl]);

  const moveImage = useCallback((id: string, direction: -1 | 1) => {
    setImages((currentImages) => {
      const index = currentImages.findIndex((image) => image.id === id);
      const destination = index + direction;
      if (index < 0 || destination < 0 || destination >= currentImages.length) return currentImages;

      const reordered = [...currentImages];
      const [movedImage] = reordered.splice(index, 1);
      reordered.splice(destination, 0, movedImage);
      return reordered;
    });
    setResult(null);
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages((currentImages) => {
      const image = currentImages.find((item) => item.id === id);
      if (image) revokeUrl(image.previewUrl);
      return currentImages.filter((item) => item.id !== id);
    });
    setResult(null);
  }, [revokeUrl]);

  const createPdf = useCallback(async (format: PageFormat, orientation: PageOrientation, margin: PageMargin) => {
    if (!images.length || isCreating) return;

    setIsCreating(true);
    setError(null);

    try {
      const document = await PDFDocument.create();
      const [pageWidth, pageHeight] = pageDimensions(format, orientation);

      for (const image of images) {
        const bytes = new Uint8Array(await image.file.arrayBuffer());
        const embedded = image.file.type === "image/jpeg"
          ? await document.embedJpg(bytes)
          : image.file.type === "image/png"
            ? await document.embedPng(bytes)
            : await document.embedPng(await toPngBytes(image.previewUrl));
        const page = document.addPage([pageWidth, pageHeight]);
        const availableWidth = pageWidth - margin * 2;
        const availableHeight = pageHeight - margin * 2;
        const scale = Math.min(availableWidth / embedded.width, availableHeight / embedded.height);
        const width = embedded.width * scale;
        const height = embedded.height * scale;

        page.drawRectangle({ color: rgb(1, 1, 1), height: pageHeight, width: pageWidth, x: 0, y: 0 });
        page.drawImage(embedded, { height, width, x: (pageWidth - width) / 2, y: (pageHeight - height) / 2 });
      }

      const bytes = await document.save();
      const output = new File([new Uint8Array(bytes)], "images-to-pdf.pdf", { type: "application/pdf", lastModified: Date.now() });
      setResult({ file: output, pageCount: images.length });
    } catch {
      setError("We could not create the PDF. Try different images or smaller files.");
    } finally {
      setIsCreating(false);
    }
  }, [images, isCreating]);

  const reset = useCallback(() => {
    revokeAllUrls();
    setImages([]);
    setResult(null);
    setError(null);
  }, [revokeAllUrls]);

  return { addImages, createPdf, error, images, isCreating, moveImage, removeImage, reset, result };
}
