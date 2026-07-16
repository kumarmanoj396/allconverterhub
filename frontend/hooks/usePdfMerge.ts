"use client";

import { PDFDocument } from "pdf-lib";
import { useCallback, useRef, useState } from "react";

export interface PdfMergeFile {
  id: string;
  file: File;
  pageCount: number;
}

export interface PdfMergeResult {
  file: File;
  pageCount: number;
}

const MAX_FILE_SIZE = 25 * 1024 * 1024;
const MAX_TOTAL_SIZE = 100 * 1024 * 1024;

function isPdf(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

function mergedFilename() {
  return `merged-${new Date().toISOString().slice(0, 10)}.pdf`;
}

export function usePdfMerge() {
  const [files, setFiles] = useState<PdfMergeFile[]>([]);
  const [result, setResult] = useState<PdfMergeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMerging, setIsMerging] = useState(false);
  const idSequence = useRef(0);

  const addFiles = useCallback(async (selectedFiles: File[]) => {
    const candidates = selectedFiles.filter(isPdf);

    if (!candidates.length) {
      setError("Choose one or more PDF files.");
      return;
    }

    if (candidates.some((file) => file.size > MAX_FILE_SIZE)) {
      setError("Each PDF must be 25 MB or smaller.");
      return;
    }

    const currentTotal = files.reduce((total, item) => total + item.file.size, 0);
    const addedTotal = candidates.reduce((total, file) => total + file.size, 0);

    if (currentTotal + addedTotal > MAX_TOTAL_SIZE) {
      setError("The combined PDF size must be 100 MB or smaller.");
      return;
    }

    try {
      const validatedFiles = await Promise.all(
        candidates.map(async (file) => {
          const document = await PDFDocument.load(await file.arrayBuffer());
          idSequence.current += 1;

          return {
            id: `${file.name}-${file.lastModified}-${idSequence.current}`,
            file,
            pageCount: document.getPageCount(),
          };
        }),
      );

      setFiles((currentFiles) => [...currentFiles, ...validatedFiles]);
      setResult(null);
      setError(null);
    } catch {
      setError("One of the selected files is not a readable PDF.");
    }
  }, [files]);

  const removeFile = useCallback((id: string) => {
    setFiles((currentFiles) => currentFiles.filter((file) => file.id !== id));
    setResult(null);
    setError(null);
  }, []);

  const moveFile = useCallback((id: string, direction: -1 | 1) => {
    setFiles((currentFiles) => {
      const index = currentFiles.findIndex((file) => file.id === id);
      const destination = index + direction;

      if (index < 0 || destination < 0 || destination >= currentFiles.length) {
        return currentFiles;
      }

      const nextFiles = [...currentFiles];
      const [movedFile] = nextFiles.splice(index, 1);
      nextFiles.splice(destination, 0, movedFile);
      return nextFiles;
    });
    setResult(null);
  }, []);

  const merge = useCallback(async () => {
    if (files.length < 2 || isMerging) return;

    setIsMerging(true);
    setError(null);

    try {
      const mergedDocument = await PDFDocument.create();
      let pageCount = 0;

      for (const item of files) {
        const sourceDocument = await PDFDocument.load(await item.file.arrayBuffer());
        const copiedPages = await mergedDocument.copyPages(sourceDocument, sourceDocument.getPageIndices());
        copiedPages.forEach((page) => mergedDocument.addPage(page));
        pageCount += copiedPages.length;
      }

      const bytes = await mergedDocument.save();
      const file = new File([new Uint8Array(bytes)], mergedFilename(), {
        type: "application/pdf",
        lastModified: Date.now(),
      });

      setResult({ file, pageCount });
    } catch {
      setError("We could not merge these PDFs. Try files without passwords or restrictions.");
    } finally {
      setIsMerging(false);
    }
  }, [files, isMerging]);

  const reset = useCallback(() => {
    setFiles([]);
    setResult(null);
    setError(null);
  }, []);

  return { addFiles, error, files, isMerging, merge, moveFile, removeFile, reset, result };
}
