"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { createZip } from "@/lib/createZip";

export type PdfImageFormat = "image/png" | "image/jpeg" | "image/webp";

export interface ConvertedPdfPage {
  file: File;
  pageNumber: number;
  previewUrl: string;
}

export interface PdfToImageResult {
  images: ConvertedPdfPage[];
  zipFile: File;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const EXTENSIONS: Record<PdfImageFormat, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function isPdf(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

function filenameBase(name: string) {
  return name.replace(/\.pdf$/i, "") || "pdf-page";
}

function canvasBlob(canvas: HTMLCanvasElement, format: PdfImageFormat, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Unable to create the image.")), format, quality);
  });
}

export function usePdfToImage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [result, setResult] = useState<PdfToImageResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const previewUrls = useRef(new Set<string>());

  const revokePreviews = useCallback(() => {
    previewUrls.current.forEach((url) => URL.revokeObjectURL(url));
    previewUrls.current.clear();
  }, []);

  useEffect(() => revokePreviews, [revokePreviews]);

  const selectFile = useCallback(async (files: File[]) => {
    const selected = files[0];
    if (!selected || !isPdf(selected)) {
      setError("Choose a PDF file.");
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setError("The PDF must be 50 MB or smaller.");
      return;
    }

    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
      const task = pdfjs.getDocument({ data: new Uint8Array(await selected.arrayBuffer()) });
      const pdfDocument = await task.promise;
      const pages = pdfDocument.numPages;
      await pdfDocument.destroy();
      setFile(selected);
      setPageCount(pages);
      setResult(null);
      setError(null);
    } catch {
      setError("This file is not a readable PDF.");
    }
  }, []);

  const convert = useCallback(async (format: PdfImageFormat, quality: number) => {
    if (!file || isConverting) return;

    setIsConverting(true);
    setProgress(0);
    setError(null);
    revokePreviews();

    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
      const task = pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
      const pdfDocument = await task.promise;
      const base = filenameBase(file.name);
      const extension = EXTENSIONS[format];
      const images: ConvertedPdfPage[] = [];

      for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
        const page = await pdfDocument.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Your browser does not support PDF rendering.");

        await page.render({ canvas, canvasContext: context, viewport }).promise;
        const blob = await canvasBlob(canvas, format, quality);
        const output = new File([blob], `${base}-page-${pageNumber}.${extension}`, { type: format, lastModified: Date.now() });
        const previewUrl = URL.createObjectURL(output);
        previewUrls.current.add(previewUrl);
        images.push({ file: output, pageNumber, previewUrl });
        setProgress(Math.round((pageNumber / pdfDocument.numPages) * 100));
      }

      await pdfDocument.destroy();
      const zipBytes = createZip(await Promise.all(images.map(async (image) => ({ data: new Uint8Array(await image.file.arrayBuffer()), name: image.file.name }))));
      const zipFile = new File([new Uint8Array(zipBytes)], `${base}-images.zip`, { type: "application/zip", lastModified: Date.now() });
      setResult({ images, zipFile });
    } catch {
      setError("We could not convert this PDF. Try a file without a password or restrictions.");
    } finally {
      setIsConverting(false);
    }
  }, [file, isConverting, revokePreviews]);

  const reset = useCallback(() => {
    revokePreviews();
    setFile(null);
    setPageCount(0);
    setResult(null);
    setError(null);
    setProgress(0);
  }, [revokePreviews]);

  return { convert, error, file, isConverting, pageCount, progress, reset, result, selectFile };
}
