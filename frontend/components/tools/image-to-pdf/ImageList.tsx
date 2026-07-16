"use client";

import { ArrowDown, ArrowUp, ImageIcon, Trash2 } from "lucide-react";

import type { PdfImage } from "@/hooks/useImageToPdf";

interface ImageListProps {
  images: PdfImage[];
  onMove: (id: string, direction: -1 | 1) => void;
  onRemove: (id: string) => void;
}

export default function ImageList({ images, onMove, onRemove }: ImageListProps) {
  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
      <div className="flex items-center justify-between"><div><h2 className="text-xl font-bold">Image order</h2><p className="mt-1 text-sm text-slate-400">Each image becomes one page in this order.</p></div><span className="rounded-full bg-slate-800 px-3 py-1 text-sm font-semibold text-slate-300">{images.length} images</span></div>
      <ol className="mt-5 space-y-3">
        {images.map((image, index) => (
          <li key={image.id} className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 p-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-500/15 text-sm font-bold text-blue-300">{index + 1}</span>
            {/* Blob URLs are generated locally and cannot be optimized by next/image. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.previewUrl} alt="" className="h-12 w-12 rounded-lg border border-slate-700 object-cover" />
            <div className="min-w-0 flex-1"><p className="truncate font-medium">{image.file.name}</p><p className="text-xs text-slate-400">{image.width} × {image.height}px</p></div>
            <ImageIcon className="hidden h-5 w-5 text-slate-500 sm:block" />
            <div className="flex shrink-0 gap-1">
              <button type="button" aria-label={`Move ${image.file.name} up`} disabled={index === 0} onClick={() => onMove(image.id, -1)} className="rounded-lg p-2 text-slate-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30"><ArrowUp className="h-4 w-4" /></button>
              <button type="button" aria-label={`Move ${image.file.name} down`} disabled={index === images.length - 1} onClick={() => onMove(image.id, 1)} className="rounded-lg p-2 text-slate-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30"><ArrowDown className="h-4 w-4" /></button>
              <button type="button" aria-label={`Remove ${image.file.name}`} onClick={() => onRemove(image.id)} className="rounded-lg p-2 text-red-300 hover:bg-red-500/15"><Trash2 className="h-4 w-4" /></button>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
