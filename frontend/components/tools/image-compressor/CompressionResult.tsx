"use client";

<<<<<<< HEAD
import { Download, RotateCcw } from "lucide-react";

interface CompressionResultProps {
  originalSize: number;
  compressedSize: number;
  savedPercentage: number;
  compressedFile: File;
  onReset: () => void;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function CompressionResult({
  originalSize,
  compressedSize,
  savedPercentage,
  compressedFile,
  onReset,
}: CompressionResultProps) {
  function handleDownload() {
    const url = URL.createObjectURL(compressedFile);

    const link = document.createElement("a");
    link.href = url;
    link.download = compressedFile.name;

    document.body.appendChild(link);
    link.click();
    link.remove();

=======
import { CheckCircle2, Download, RefreshCw } from "lucide-react";

import type { CompressionResult as CompressionResultData } from "@/hooks/useImageCompression";

interface CompressionResultProps {
  originalFile: File;
  result: CompressionResultData;
  onReplace: () => void;
}

function formatFileSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(1)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function CompressionResult({
  originalFile,
  result,
  onReplace,
}: CompressionResultProps) {
  function download() {
    const url = URL.createObjectURL(result.file);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = result.file.name;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
>>>>>>> feat(image-compressor): rebuild production image compressor
    URL.revokeObjectURL(url);
  }

  return (
<<<<<<< HEAD
    <div className="rounded-2xl border border-green-700 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold">
        Compression Complete
      </h2>

      <div className="mt-8 space-y-5">

        <div className="flex justify-between">
          <span>Original Size</span>
          <strong>{formatFileSize(originalSize)}</strong>
        </div>

        <div className="flex justify-between">
          <span>Compressed Size</span>
          <strong>{formatFileSize(compressedSize)}</strong>
        </div>

        <div className="flex justify-between">
          <span>Space Saved</span>
          <strong className="text-green-500">
            {savedPercentage}%
          </strong>
        </div>

      </div>

      <button
        onClick={handleDownload}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        <Download size={18} />
        Download Image
      </button>

      <button
        onClick={onReset}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 py-3 transition hover:bg-slate-800"
      >
        <RotateCcw size={18} />
        Compress Another
      </button>
    </div>
  );
}
=======
    <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/40">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />
        <div>
          <h2 className="text-xl font-bold">Your image is ready</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            You saved {formatFileSize(Math.max(0, result.sizeSaved))} ({result.savingsPercentage.toFixed(1)}%).
          </p>
        </div>
      </div>

      <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-xl bg-white/70 p-4 dark:bg-slate-900/60">
          <dt className="text-slate-500">Original</dt>
          <dd className="mt-1 font-semibold">{formatFileSize(originalFile.size)}</dd>
        </div>
        <div className="rounded-xl bg-white/70 p-4 dark:bg-slate-900/60">
          <dt className="text-slate-500">Compressed</dt>
          <dd className="mt-1 font-semibold">{formatFileSize(result.file.size)}</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button onClick={download} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700">
          <Download className="h-5 w-5" />
          Download image
        </button>
        <button onClick={onReplace} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold transition hover:bg-white dark:border-slate-700 dark:hover:bg-slate-800">
          <RefreshCw className="h-5 w-5" />
          Replace image
        </button>
      </div>
    </section>
  );
}
>>>>>>> feat(image-compressor): rebuild production image compressor
