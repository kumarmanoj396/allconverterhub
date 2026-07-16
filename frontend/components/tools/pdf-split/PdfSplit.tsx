"use client";

import { FileText, RotateCcw } from "lucide-react";

import PdfUpload from "@/components/tools/pdf-merge/PdfUpload";
import { usePdfSplit } from "@/hooks/usePdfSplit";

import SplitResult from "./SplitResult";
import SplitSettings from "./SplitSettings";

export default function PdfSplit() {
  const { error, file, isSplitting, pageCount, reset, result, selectFile, split } = usePdfSplit();

  if (!file) {
    return <div className="space-y-4"><PdfUpload multiple={false} onFilesSelect={selectFile} />{error && <p className="text-sm font-medium text-red-400" role="alert">{error}</p>}</div>;
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-2xl border border-slate-700 bg-slate-900 p-5 sm:flex-row sm:items-center">
        <FileText className="h-8 w-8 shrink-0 text-red-400" />
        <div className="min-w-0 flex-1"><h2 className="truncate font-semibold">{file.name}</h2><p className="mt-1 text-sm text-slate-400">Ready to split in your browser.</p></div>
        <button type="button" onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-4 py-2 font-semibold hover:border-slate-400"><RotateCcw className="h-4 w-4" />Replace PDF</button>
      </section>
      <SplitSettings isSplitting={isSplitting} pageCount={pageCount} onSplit={split} />
      {error && <p className="text-sm font-medium text-red-400" role="alert">{error}</p>}
      {result && <SplitResult result={result} onStartOver={reset} />}
    </div>
  );
}
