"use client";

import { Download, RotateCcw, ShieldCheck } from "lucide-react";

import ImagePreview from "@/components/tools/image-compressor/ImagePreview";
import UploadBox from "@/components/tools/image-compressor/UploadBox";
import { useMetadataRemoval } from "@/hooks/useMetadataRemoval";

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MetadataRemover() {
  const remover = useMetadataRemoval();

  function download() {
    if (!remover.result) return;
    const url = URL.createObjectURL(remover.result.file);
    const link = document.createElement("a");
    link.href = url;
    link.download = remover.result.file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  if (!remover.file || !remover.previewUrl) {
    return <div className="space-y-3"><UploadBox onFileSelect={remover.replaceImage} />{remover.error && <p className="text-sm font-medium text-red-400" role="alert">{remover.error}</p>}</div>;
  }

  return <div className="space-y-6"><div className="grid gap-6 lg:grid-cols-3"><div className="lg:col-span-2"><ImagePreview file={remover.file} previewUrl={remover.previewUrl} /></div><section className="rounded-2xl border border-slate-700 bg-slate-900 p-6"><ShieldCheck className="h-9 w-9 text-blue-400" /><h2 className="mt-4 text-xl font-bold">Remove metadata</h2><p className="mt-2 text-sm leading-6 text-slate-400">A clean copy is created from the image pixels. This removes EXIF data, including GPS location, camera model, and creation details.</p><div className="mt-6 rounded-xl bg-slate-800 p-4 text-sm text-slate-300"><p>Original file</p><p className="mt-1 font-semibold text-white">{formatSize(remover.file.size)}</p></div><button type="button" onClick={remover.removeMetadata} disabled={remover.isRemoving} className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">{remover.isRemoving ? "Removing metadata…" : "Remove metadata"}</button></section></div>{remover.error && <p className="text-sm font-medium text-red-400" role="alert">{remover.error}</p>}{remover.result && <section className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6"><h2 className="text-xl font-bold">Clean image ready</h2><p className="mt-1 text-sm text-slate-300">Metadata was removed before creating this new file.</p><div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="rounded-xl bg-slate-950/40 p-4"><p className="text-sm text-slate-400">Original</p><p className="mt-1 font-semibold">{formatSize(remover.result.originalSize)}</p></div><div className="rounded-xl bg-slate-950/40 p-4"><p className="text-sm text-slate-400">Clean copy</p><p className="mt-1 font-semibold">{formatSize(remover.result.file.size)}</p></div></div><div className="mt-5 flex flex-col gap-3 sm:flex-row"><button type="button" onClick={download} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"><Download className="h-5 w-5" />Download clean image</button><button type="button" onClick={remover.clearImage} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-5 py-3 font-semibold hover:border-slate-400"><RotateCcw className="h-5 w-5" />Start over</button></div></section>}</div>;
}
