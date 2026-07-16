"use client";

import { Download, RotateCcw } from "lucide-react";

import type { ImageEditorResult } from "@/hooks/useImageEditor";

export default function EditorResult({ result, onStartOver }: { result: ImageEditorResult; onStartOver: () => void }) {
  const download = () => { const url = URL.createObjectURL(result.file); const link = document.createElement("a"); link.href = url; link.download = result.file.name; document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url); };
  return <section className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6"><h2 className="text-xl font-bold">Your edited image is ready</h2><p className="mt-1 text-sm text-slate-300">{result.file.name}</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><button type="button" onClick={download} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"><Download className="h-5 w-5" />Download image</button><button type="button" onClick={onStartOver} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-5 py-3 font-semibold hover:border-slate-400"><RotateCcw className="h-5 w-5" />Start over</button></div></section>;
}
