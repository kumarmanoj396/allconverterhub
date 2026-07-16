"use client";

import { Download, RotateCcw } from "lucide-react";

import type { PdfToImageResult } from "@/hooks/usePdfToImage";

interface ConversionResultProps {
  result: PdfToImageResult;
  onStartOver: () => void;
}

function downloadFile(file: File) {
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function ConversionResult({ result, onStartOver }: ConversionResultProps) {
  return (
    <section className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
      <h2 className="text-xl font-bold">Your images are ready</h2>
      <p className="mt-1 text-sm text-slate-300">Download every page at once or save individual images below.</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={() => downloadFile(result.zipFile)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"><Download className="h-5 w-5" />Download ZIP</button>
        <button type="button" onClick={onStartOver} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-5 py-3 font-semibold hover:border-slate-400"><RotateCcw className="h-5 w-5" />Start over</button>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {result.images.map((image) => (
          <article key={image.pageNumber} className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
            {/* Blob URLs are generated locally and cannot be optimized by next/image. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.previewUrl} alt={`Page ${image.pageNumber}`} className="aspect-[3/4] w-full bg-white object-contain" />
            <div className="flex items-center justify-between gap-3 p-3"><span className="text-sm font-medium">Page {image.pageNumber}</span><button type="button" onClick={() => downloadFile(image.file)} className="rounded-lg p-2 text-blue-300 hover:bg-blue-500/10" aria-label={`Download page ${image.pageNumber}`}><Download className="h-4 w-4" /></button></div>
          </article>
        ))}
      </div>
    </section>
  );
}
