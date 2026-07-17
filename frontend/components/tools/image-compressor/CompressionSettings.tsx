"use client";

import type { CompressionMode, OutputFormat } from "@/hooks/useImageCompression";

interface CompressionSettingsProps {
  quality: number;
  compressionMode: CompressionMode;
  targetSizeKB: number;
  format: OutputFormat;
  isCompressing: boolean;
  progress: number;
  onQualityChange: (value: number) => void;
  onCompressionModeChange: (mode: CompressionMode) => void;
  onTargetSizeChange: (size: number) => void;
  onFormatChange: (value: OutputFormat) => void;
  onCompress: () => void;
}

export default function CompressionSettings({
  quality,
  compressionMode,
  targetSizeKB,
  format,
  isCompressing,
  progress,
  onQualityChange,
  onCompressionModeChange,
  onTargetSizeChange,
  onFormatChange,
  onCompress,
}: CompressionSettingsProps) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold">Compression settings</h2>

      <p className="mt-2 text-sm text-slate-400">
        Choose an output format and quality. Your image stays on this device.
      </p>

      <div className="mt-8">
        <span className="mb-2 block font-medium">Compression mode</span>
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-800 p-1">
          <button type="button" onClick={() => onCompressionModeChange("quality")} className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${compressionMode === "quality" ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white"}`}>Quality</button>
          <button type="button" onClick={() => onCompressionModeChange("target-size")} className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${compressionMode === "target-size" ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white"}`}>Target size</button>
        </div>
      </div>

      {compressionMode === "quality" ? <div className="mt-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-medium">Quality</span>

          <span className="rounded-md bg-blue-600 px-2 py-1 text-sm font-semibold text-white">
            {quality}%
          </span>
        </div>

        <input
          type="range"
          min={10}
          max={100}
          step={5}
          value={quality}
          onChange={(event) =>
            onQualityChange(Number(event.target.value))
          }
          className="w-full cursor-pointer"
        />
      </div> : <div className="mt-8"><label htmlFor="target-size" className="mb-2 block font-medium">Target file size</label><div className="relative"><input id="target-size" type="number" min="20" max="10240" value={targetSizeKB} onChange={(event) => onTargetSizeChange(Math.max(20, Math.min(10240, Number(event.target.value) || 20)))} className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 pr-12 outline-none focus:border-blue-500" /><span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">KB</span></div><div className="mt-3 flex flex-wrap gap-2">{[100, 200, 500].map((size) => <button key={size} type="button" onClick={() => onTargetSizeChange(size)} className={`rounded-lg border px-3 py-1.5 text-sm font-semibold ${targetSizeKB === size ? "border-blue-500 bg-blue-500/15 text-blue-300" : "border-slate-700 text-slate-300 hover:border-slate-500"}`}>{size} KB</button>)}</div><p className="mt-3 text-sm text-slate-400">We keep the best quality possible while aiming for this size.</p></div>}

      <div className="mt-8">
        <label
          htmlFor="output-format"
          className="mb-2 block font-medium"
        >
          Output Format
        </label>

        <select
          id="output-format"
          value={format}
          onChange={(event) =>
            onFormatChange(event.target.value as OutputFormat)
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-blue-500"
        >
          <option value="image/jpeg">JPEG</option>
          <option value="image/png">PNG</option>
          <option value="image/webp">WEBP</option>
        </select>
      </div>

      <button
        onClick={onCompress}
        disabled={isCompressing}
        className="mt-10 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isCompressing ? `Compressing… ${progress}%` : compressionMode === "target-size" ? `Compress to ${targetSizeKB} KB` : "Compress image"}
      </button>
      {isCompressing && (
        <div className="mt-4" aria-live="polite">
          <div className="h-2 overflow-hidden rounded-full bg-slate-700">
            <div
              className="h-full rounded-full bg-blue-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Preparing your download…
          </p>
        </div>
      )}
    </div>
  );
}
