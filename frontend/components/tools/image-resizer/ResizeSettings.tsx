"use client";

import { Lock, Unlock } from "lucide-react";

interface ResizeSettingsProps {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  isResizing: boolean;
  onWidthChange: (value: number) => void;
  onHeightChange: (value: number) => void;
  onAspectRatioChange: (value: boolean) => void;
  onResize: () => void;
}

export default function ResizeSettings({
  width,
  height,
  maintainAspectRatio,
  isResizing,
  onWidthChange,
  onHeightChange,
  onAspectRatioChange,
  onResize,
}: ResizeSettingsProps) {
  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <h2 className="text-xl font-bold">Resize settings</h2>
      <p className="mt-2 text-sm text-slate-400">Set exact pixel dimensions. Your image stays on this device.</p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <DimensionInput id="resize-width" label="Width" value={width} onChange={onWidthChange} />
        <DimensionInput id="resize-height" label="Height" value={height} onChange={onHeightChange} />
      </div>

      <label className="mt-6 flex cursor-pointer items-center justify-between rounded-xl border border-slate-700 bg-slate-800 p-4">
        <span>
          <span className="block font-semibold">Lock aspect ratio</span>
          <span className="text-sm text-slate-400">Avoid stretching the image.</span>
        </span>
        <input className="sr-only" type="checkbox" checked={maintainAspectRatio} onChange={(event) => onAspectRatioChange(event.target.checked)} />
        {maintainAspectRatio ? <Lock className="h-5 w-5 text-blue-400" /> : <Unlock className="h-5 w-5 text-slate-400" />}
      </label>

      <button onClick={onResize} disabled={isResizing || width < 1 || height < 1} className="mt-7 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
        {isResizing ? "Resizing image…" : "Resize image"}
      </button>
    </section>
  );
}

function DimensionInput({ id, label, value, onChange }: { id: string; label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label htmlFor={id} className="text-sm font-semibold">
      {label}
      <span className="relative mt-2 block">
        <input id={id} type="number" min="1" value={value || ""} onChange={(event) => onChange(Math.max(0, Number(event.target.value)))} className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 pr-12 font-normal outline-none focus:border-blue-500" />
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-slate-400">px</span>
      </span>
    </label>
  );
}
