"use client";

import { CheckCircle2, Download, RotateCcw } from "lucide-react";

import type { ImageToPdfResult } from "@/hooks/useImageToPdf";

interface PdfResultProps {
  result: ImageToPdfResult;
  onStartOver: () => void;
}

export default function PdfResult({ result, onStartOver }: PdfResultProps) {
  const download = () => {
    const url = URL.createObjectURL(result.file);
    const link = document.createElement("a");
    link.href = url;
    link.download = result.file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return <section className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6"><div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-400" /><div><h2 className="text-xl font-bold">Your PDF is ready</h2><p className="mt-1 text-sm text-slate-300">{result.pageCount} {result.pageCount === 1 ? "page" : "pages"} created from your images.</p></div></div><div className="mt-6 flex flex-col gap-3 sm:flex-row"><button type="button" onClick={download} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"><Download className="h-5 w-5" />Download PDF</button><button type="button" onClick={onStartOver} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-5 py-3 font-semibold hover:border-slate-400"><RotateCcw className="h-5 w-5" />Start over</button></div></section>;
}
