"use client";

import { Combine } from "lucide-react";

import { usePdfMerge } from "@/hooks/usePdfMerge";

import MergeResult from "./MergeResult";
import PdfFileList from "./PdfFileList";
import PdfUpload from "./PdfUpload";

export default function PdfMerge() {
  const { addFiles, error, files, isMerging, merge, moveFile, removeFile, reset, result } = usePdfMerge();

  return (
    <div className="space-y-6">
      <PdfUpload onFilesSelect={addFiles} />

      {files.length > 0 && (
        <>
          <PdfFileList files={files} onMove={moveFile} onRemove={removeFile} />
          <button
            type="button"
            onClick={merge}
            disabled={files.length < 2 || isMerging}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Combine className="h-5 w-5" />
            {isMerging ? "Merging PDFs…" : files.length < 2 ? "Add at least 2 PDFs" : "Merge PDFs"}
          </button>
        </>
      )}

      {error && <p className="text-sm font-medium text-red-400" role="alert">{error}</p>}
      {result && <MergeResult result={result} onStartOver={reset} />}
    </div>
  );
}
