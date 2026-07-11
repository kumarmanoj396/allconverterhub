"use client";

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

    URL.revokeObjectURL(url);
  }

  return (
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