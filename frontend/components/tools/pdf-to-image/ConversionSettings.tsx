"use client";

import { useState } from "react";

import type { PdfImageFormat } from "@/hooks/usePdfToImage";

interface ConversionSettingsProps {
  isConverting: boolean;
  progress: number;
  onConvert: (format: PdfImageFormat, quality: number) => void;
}

export default function ConversionSettings({ isConverting, progress, onConvert }: ConversionSettingsProps) {
  const [format, setFormat] = useState<PdfImageFormat>("image/png");
  const [quality, setQuality] = useState(92);
  const supportsQuality = format !== "image/png";

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <h2 className="text-xl font-bold">Image settings</h2>
      <p className="mt-2 text-sm text-slate-400">Every page is rendered at high resolution.</p>
      <label htmlFor="pdf-image-format" className="mt-6 block text-sm font-semibold">Output format
        <select id="pdf-image-format" value={format} onChange={(event) => setFormat(event.target.value as PdfImageFormat)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 font-normal outline-none focus:border-blue-500"><option value="image/png">PNG</option><option value="image/jpeg">JPEG</option><option value="image/webp">WEBP</option></select>
      </label>
      <div className="mt-6">
        <div className="flex items-center justify-between"><label htmlFor="pdf-image-quality" className="text-sm font-semibold">Quality</label><span className="rounded-md bg-blue-600 px-2 py-1 text-sm font-semibold text-white">{supportsQuality ? `${quality}%` : "Lossless"}</span></div>
        <input id="pdf-image-quality" type="range" min="10" max="100" step="5" value={quality} disabled={!supportsQuality} onChange={(event) => setQuality(Number(event.target.value))} className="mt-3 w-full disabled:cursor-not-allowed disabled:opacity-40" />
      </div>
      <button type="button" onClick={() => onConvert(format, quality / 100)} disabled={isConverting} className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">{isConverting ? `Converting to Images… ${progress}%` : "Convert to Images"}</button>
      {isConverting && <div className="mt-4"><div className="h-2 overflow-hidden rounded-full bg-slate-700"><div className="h-full bg-blue-500 transition-all" style={{ width: `${progress}%` }} /></div></div>}
    </section>
  );
}
