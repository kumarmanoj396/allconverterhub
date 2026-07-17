"use client";

/* eslint-disable @next/next/no-img-element -- Object URLs cannot be optimized by next/image. */

import { Download, ImageOff, RotateCcw } from "lucide-react";

import UploadBox from "@/components/tools/image-compressor/UploadBox";
import { useBackgroundRemoval } from "@/hooks/useBackgroundRemoval";

export default function BackgroundRemover() {
  const remover = useBackgroundRemoval();

  function download() {
    if (!remover.result) return;
    const link = document.createElement("a");
    link.href = remover.result.previewUrl;
    link.download = remover.result.file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  if (!remover.file || !remover.previewUrl) {
    return <div className="space-y-3"><UploadBox onFileSelect={remover.replaceImage} />{remover.error && <p className="text-sm font-medium text-red-400" role="alert">{remover.error}</p>}</div>;
  }

  return <div className="space-y-6"><div className="grid gap-6 lg:grid-cols-2"><Preview label="Original" url={remover.previewUrl} /><Preview label="Background removed" url={remover.result?.previewUrl} isLoading={remover.isRemoving} /></div><section className="rounded-2xl border border-slate-700 bg-slate-900 p-6"><div className="flex items-start gap-4"><div className="rounded-xl bg-blue-500/10 p-3 text-blue-400"><ImageOff className="h-6 w-6" /></div><div><h2 className="text-xl font-bold">Remove background</h2><p className="mt-1 text-sm text-slate-400">The AI model runs in your browser. The first image can take longer while its model downloads.</p></div></div>{remover.isRemoving && <div className="mt-6"><div className="flex justify-between text-sm text-slate-300"><span>Processing image…</span><span>{remover.progress}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${remover.progress}%` }} /></div></div>}<div className="mt-6 flex flex-col gap-3 sm:flex-row">{remover.result ? <button type="button" onClick={download} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"><Download className="h-5 w-5" />Download PNG</button> : <button type="button" onClick={remover.removeBackground} disabled={remover.isRemoving} className="flex-1 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">{remover.isRemoving ? "Removing background…" : "Remove background"}</button>}<button type="button" onClick={remover.clearImage} disabled={remover.isRemoving} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-5 py-3 font-semibold hover:border-slate-400 disabled:opacity-50"><RotateCcw className="h-5 w-5" />Start over</button></div></section>{remover.error && <p className="text-sm font-medium text-red-400" role="alert">{remover.error}</p>}</div>;
}

function Preview({ isLoading = false, label, url }: { isLoading?: boolean; label: string; url?: string }) {
  return <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5"><h2 className="font-bold">{label}</h2><div className="mt-4 flex min-h-80 items-center justify-center overflow-hidden rounded-xl bg-[linear-gradient(45deg,#1e293b_25%,transparent_25%),linear-gradient(-45deg,#1e293b_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1e293b_75%),linear-gradient(-45deg,transparent_75%,#1e293b_75%)] bg-[length:24px_24px] bg-[position:0_0,0_12px,12px_-12px,-12px_0px] p-3">{url ? <img src={url} alt={`${label} preview`} className="max-h-[30rem] max-w-full object-contain" /> : <p className="text-sm text-slate-400">{isLoading ? "Creating transparent preview…" : "Your transparent PNG will appear here."}</p>}</div></section>;
}
