"use client";

import { ArrowDown, ArrowUp, FileText, Trash2 } from "lucide-react";

import type { PdfMergeFile } from "@/hooks/usePdfMerge";

interface PdfFileListProps {
  files: PdfMergeFile[];
  onMove: (id: string, direction: -1 | 1) => void;
  onRemove: (id: string) => void;
}

function formatFileSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(1)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function PdfFileList({ files, onMove, onRemove }: PdfFileListProps) {
  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Merge order</h2>
          <p className="mt-1 text-sm text-slate-400">Move files up or down to choose the page order.</p>
        </div>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-sm font-semibold text-slate-300">{files.length} files</span>
      </div>

      <ol className="mt-5 space-y-3">
        {files.map((item, index) => (
          <li key={item.id} className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 p-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-500/15 text-sm font-bold text-blue-300">{index + 1}</span>
            <FileText className="h-5 w-5 shrink-0 text-red-400" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{item.file.name}</p>
              <p className="text-xs text-slate-400">{item.pageCount} {item.pageCount === 1 ? "page" : "pages"} · {formatFileSize(item.file.size)}</p>
            </div>
            <div className="flex shrink-0 gap-1">
              <button type="button" aria-label={`Move ${item.file.name} up`} onClick={() => onMove(item.id, -1)} disabled={index === 0} className="rounded-lg p-2 text-slate-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30"><ArrowUp className="h-4 w-4" /></button>
              <button type="button" aria-label={`Move ${item.file.name} down`} onClick={() => onMove(item.id, 1)} disabled={index === files.length - 1} className="rounded-lg p-2 text-slate-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30"><ArrowDown className="h-4 w-4" /></button>
              <button type="button" aria-label={`Remove ${item.file.name}`} onClick={() => onRemove(item.id)} className="rounded-lg p-2 text-red-300 hover:bg-red-500/15"><Trash2 className="h-4 w-4" /></button>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
