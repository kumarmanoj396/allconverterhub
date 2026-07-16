"use client";

import { FlipHorizontal, FlipVertical, RotateCcw, RotateCw } from "lucide-react";
import { type ReactNode } from "react";

import type { CropRegion } from "@/lib/imageEditor";
import type { EditorOutputFormat } from "@/hooks/useImageEditor";

interface EditorSettingsProps {
  crop: CropRegion;
  dimensions: { width: number; height: number };
  flipHorizontal: boolean;
  flipVertical: boolean;
  format: EditorOutputFormat;
  isExporting: boolean;
  quality: number;
  rotation: number;
  onCropChange: (field: keyof CropRegion, value: number) => void;
  onExport: () => void;
  onFormatChange: (format: EditorOutputFormat) => void;
  onQualityChange: (quality: number) => void;
  onResetCrop: () => void;
  onRotate: (direction: -90 | 90) => void;
  onToggleFlipHorizontal: () => void;
  onToggleFlipVertical: () => void;
}

export default function EditorSettings(props: EditorSettingsProps) {
  const supportsQuality = props.format !== "image/png";
  return <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6"><h2 className="text-xl font-bold">Edit image</h2><div className="mt-6 grid grid-cols-2 gap-3"><ActionButton icon={<RotateCcw className="h-4 w-4" />} label="Rotate left" onClick={() => props.onRotate(-90)} /><ActionButton icon={<RotateCw className="h-4 w-4" />} label="Rotate right" onClick={() => props.onRotate(90)} /><ActionButton active={props.flipHorizontal} icon={<FlipHorizontal className="h-4 w-4" />} label="Flip horizontal" onClick={props.onToggleFlipHorizontal} /><ActionButton active={props.flipVertical} icon={<FlipVertical className="h-4 w-4" />} label="Flip vertical" onClick={props.onToggleFlipVertical} /></div><p className="mt-3 text-center text-xs text-slate-400">Rotation: {props.rotation}°</p><div className="mt-7 border-t border-slate-700 pt-6"><div className="flex items-center justify-between"><h3 className="font-semibold">Crop</h3><button type="button" onClick={props.onResetCrop} className="text-sm font-medium text-blue-400 hover:text-blue-300">Reset crop</button></div><div className="mt-4 grid grid-cols-2 gap-3"><CropInput label="X" value={props.crop.x} max={Math.max(0, props.dimensions.width - 1)} onChange={(value) => props.onCropChange("x", value)} /><CropInput label="Y" value={props.crop.y} max={Math.max(0, props.dimensions.height - 1)} onChange={(value) => props.onCropChange("y", value)} /><CropInput label="Width" value={props.crop.width} max={props.dimensions.width} onChange={(value) => props.onCropChange("width", value)} /><CropInput label="Height" value={props.crop.height} max={props.dimensions.height} onChange={(value) => props.onCropChange("height", value)} /></div></div><div className="mt-7 border-t border-slate-700 pt-6"><label htmlFor="editor-format" className="text-sm font-semibold">Output format<select id="editor-format" value={props.format} onChange={(event) => props.onFormatChange(event.target.value as EditorOutputFormat)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 font-normal outline-none focus:border-blue-500"><option value="image/png">PNG</option><option value="image/jpeg">JPEG</option><option value="image/webp">WEBP</option></select></label><div className="mt-5"><div className="flex items-center justify-between"><label htmlFor="editor-quality" className="text-sm font-semibold">Quality</label><span className="text-sm text-slate-400">{supportsQuality ? `${props.quality}%` : "Lossless"}</span></div><input id="editor-quality" type="range" min="10" max="100" step="5" value={props.quality} disabled={!supportsQuality} onChange={(event) => props.onQualityChange(Number(event.target.value))} className="mt-3 w-full disabled:cursor-not-allowed disabled:opacity-40" /></div></div><button type="button" onClick={props.onExport} disabled={props.isExporting} className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">{props.isExporting ? "Preparing image…" : "Create edited image"}</button></section>;
}

function ActionButton({ active = false, icon, label, onClick }: { active?: boolean; icon: ReactNode; label: string; onClick: () => void }) { return <button type="button" onClick={onClick} className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold ${active ? "border-blue-500 bg-blue-500/15 text-blue-300" : "border-slate-700 bg-slate-800 hover:border-slate-500"}`}>{icon}{label}</button>; }
function CropInput({ label, max, onChange, value }: { label: string; max: number; onChange: (value: number) => void; value: number }) { return <label className="text-xs font-semibold text-slate-300">{label}<input type="number" min="0" max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-sm font-normal outline-none focus:border-blue-500" /></label>; }
