"use client";

import { Download, Replace, RotateCcw } from "lucide-react";
import { useEffect, useRef } from "react";

import UploadBox from "@/components/tools/image-compressor/UploadBox";
import { drawWatermark, type WatermarkPosition, useImageWatermark } from "@/hooks/useImageWatermark";

const positions: { label: string; value: WatermarkPosition }[] = [
  { label: "Top left", value: "top-left" }, { label: "Top center", value: "top-center" }, { label: "Top right", value: "top-right" },
  { label: "Center left", value: "center-left" }, { label: "Center", value: "center" }, { label: "Center right", value: "center-right" },
  { label: "Bottom left", value: "bottom-left" }, { label: "Bottom center", value: "bottom-center" }, { label: "Bottom right", value: "bottom-right" },
];

export default function ImageWatermark() {
  const watermark = useImageWatermark();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!watermark.previewUrl || !canvasRef.current) return;
    const image = new Image();
    image.onload = () => drawWatermark(canvasRef.current as HTMLCanvasElement, image, watermark.settings);
    image.src = watermark.previewUrl;
  }, [watermark.previewUrl, watermark.settings]);

  if (!watermark.file || !watermark.previewUrl) {
    return <div className="space-y-3"><UploadBox onFileSelect={watermark.replaceImage} />{watermark.error && <p className="text-sm font-medium text-red-400" role="alert">{watermark.error}</p>}</div>;
  }

  return <div className="space-y-6"><div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]"><section className="rounded-2xl border border-slate-700 bg-slate-900 p-5"><div className="mb-4 flex items-center justify-between gap-3"><div><h2 className="font-bold">Live preview</h2><p className="text-sm text-slate-400">{watermark.file.name}</p></div><button type="button" onClick={watermark.clearImage} className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-2 text-sm font-semibold hover:border-slate-400"><Replace className="h-4 w-4" />Replace</button></div><div className="flex min-h-80 items-center justify-center overflow-hidden rounded-xl bg-slate-950 p-3"><canvas ref={canvasRef} className="max-h-[34rem] max-w-full rounded-lg object-contain" /></div></section><section className="rounded-2xl border border-slate-700 bg-slate-900 p-6"><h2 className="text-xl font-bold">Watermark settings</h2><label className="mt-6 block text-sm font-semibold">Text<textarea value={watermark.settings.text} onChange={(event) => watermark.updateSettings({ text: event.target.value })} maxLength={120} rows={3} className="mt-2 w-full resize-none rounded-xl border border-slate-700 bg-slate-800 p-3 font-normal outline-none focus:border-blue-500" /></label><label className="mt-5 block text-sm font-semibold">Position<select value={watermark.settings.position} onChange={(event) => watermark.updateSettings({ position: event.target.value as WatermarkPosition })} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 font-normal outline-none focus:border-blue-500">{positions.map((position) => <option key={position.value} value={position.value}>{position.label}</option>)}</select></label><div className="mt-5 grid grid-cols-2 gap-4"><label className="text-sm font-semibold">Color<input type="color" value={watermark.settings.color} onChange={(event) => watermark.updateSettings({ color: event.target.value })} className="mt-2 h-11 w-full cursor-pointer rounded-lg border border-slate-700 bg-slate-800 p-1" /></label><label className="text-sm font-semibold">Size <span className="text-slate-400">{watermark.settings.fontSize}%</span><input type="range" min="2" max="15" value={watermark.settings.fontSize} onChange={(event) => watermark.updateSettings({ fontSize: Number(event.target.value) })} className="mt-4 w-full" /></label></div><label className="mt-5 block text-sm font-semibold">Opacity <span className="text-slate-400">{watermark.settings.opacity}%</span><input type="range" min="10" max="100" value={watermark.settings.opacity} onChange={(event) => watermark.updateSettings({ opacity: Number(event.target.value) })} className="mt-3 w-full" /></label><button type="button" onClick={watermark.download} className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"><Download className="h-5 w-5" />Download watermarked image</button></section></div>{watermark.error && <p className="text-sm font-medium text-red-400" role="alert">{watermark.error}</p>}<button type="button" onClick={watermark.clearImage} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white"><RotateCcw className="h-4 w-4" />Start over</button></div>;
}
