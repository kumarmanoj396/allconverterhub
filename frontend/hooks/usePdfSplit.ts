"use client";

import { PDFDocument } from "pdf-lib";
import { useCallback, useState } from "react";

import { createZip } from "@/lib/createZip";

export interface PageRange {
  start: number;
  end: number;
}

export interface PdfSplitResult {
  file: File;
  documentCount: number;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024;

function isPdf(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

function filenameBase(name: string) {
  return name.replace(/\.pdf$/i, "") || "split-pdf";
}

export function parsePageRanges(value: string, pageCount: number): PageRange[] {
  const items = value.split(",").map((item) => item.trim()).filter(Boolean);
  if (!items.length) throw new Error("Enter at least one page or range.");

  const ranges = items.map((item) => {
    const match = /^(\d+)(?:\s*-\s*(\d+))?$/.exec(item);
    if (!match) throw new Error("Use ranges such as 1-3, 5, 8-10.");

    const start = Number(match[1]);
    const end = Number(match[2] ?? match[1]);
    if (start < 1 || end < start || end > pageCount) throw new Error(`Choose pages between 1 and ${pageCount}.`);

    return { start, end };
  });

  const usedPages = new Set<number>();
  for (const range of ranges) {
    for (let page = range.start; page <= range.end; page += 1) {
      if (usedPages.has(page)) throw new Error("Custom ranges cannot overlap.");
      usedPages.add(page);
    }
  }

  return ranges;
}

export function usePdfSplit() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [result, setResult] = useState<PdfSplitResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSplitting, setIsSplitting] = useState(false);

  const selectFile = useCallback(async (selectedFiles: File[]) => {
    const selected = selectedFiles[0];
    if (!selected || !isPdf(selected)) {
      setError("Choose a PDF file.");
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setError("The PDF must be 50 MB or smaller.");
      return;
    }

    try {
      const document = await PDFDocument.load(await selected.arrayBuffer());
      setFile(selected);
      setPageCount(document.getPageCount());
      setResult(null);
      setError(null);
    } catch {
      setError("This file is not a readable PDF.");
    }
  }, []);

  const split = useCallback(async (ranges: PageRange[]) => {
    if (!file || isSplitting) return;

    setIsSplitting(true);
    setError(null);

    try {
      const sourceDocument = await PDFDocument.load(await file.arrayBuffer());
      const base = filenameBase(file.name);
      const entries = await Promise.all(ranges.map(async (range, index) => {
        const splitDocument = await PDFDocument.create();
        const pageIndices = Array.from({ length: range.end - range.start + 1 }, (_, offset) => range.start - 1 + offset);
        const pages = await splitDocument.copyPages(sourceDocument, pageIndices);
        pages.forEach((page) => splitDocument.addPage(page));
        const bytes = await splitDocument.save();
        const label = range.start === range.end ? `page-${range.start}` : `pages-${range.start}-${range.end}`;

        return { data: new Uint8Array(bytes), name: `${String(index + 1).padStart(2, "0")}-${base}-${label}.pdf` };
      }));
      const archive = createZip(entries);
      const output = new File([new Uint8Array(archive)], `${base}-split.zip`, {
        type: "application/zip",
        lastModified: Date.now(),
      });

      setResult({ documentCount: entries.length, file: output });
    } catch {
      setError("We could not split this PDF. Try a file without a password or restrictions.");
    } finally {
      setIsSplitting(false);
    }
  }, [file, isSplitting]);

  const reset = useCallback(() => {
    setFile(null);
    setPageCount(0);
    setResult(null);
    setError(null);
  }, []);

  return { error, file, isSplitting, pageCount, reset, result, selectFile, split };
}
