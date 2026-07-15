"use client";

import { Download, RotateCcw } from "lucide-react";

import type { ConversionResult as ConversionResultData } from "@/hooks/useImageConversion";

interface ConversionResultProps {
  result: ConversionResultData;
  onReplace: () => void;
}

function formatSize(bytes: number) {
  return bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ConversionResult({ result, onReplace }: ConversionResultProps) {
  const download = () => {
    const link = document.createElement("a");
    link.href = result.previewUrl;
    link.download = result.file.name;
    link.click();
  };

  return (
    <section className="rounded-2xl border border-emerald-500/30 bg-slate-900 p-6">
      <h2 className="text-xl font-bold">Your converted image is ready</h2>
      <div className="mt-5 grid gap-6 md:grid-cols-[1fr_auto]">
        <div className="flex items-center gap-4">
          {/* Blob URLs are generated locally and cannot be optimized by next/image. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={result.previewUrl} alt="Converted image preview" className="h-24 w-24 rounded-xl border border-slate-700 object-contain" />
          <div>
            <p className="font-semibold">{result.file.type.replace("image/", "").toUpperCase()} image</p>
            <p className="mt-1 text-sm text-slate-400">{formatSize(result.file.size)} · {result.file.name}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={download} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"><Download className="h-5 w-5" />Download</button>
          <button onClick={onReplace} className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-4 py-3 font-semibold hover:border-blue-500"><RotateCcw className="h-5 w-5" />Replace</button>
        </div>
      </div>
    </section>
  );
}
