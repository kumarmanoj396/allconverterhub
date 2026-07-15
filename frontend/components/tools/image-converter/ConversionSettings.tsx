"use client";

import type { OutputFormat } from "@/hooks/useImageConversion";

interface ConversionSettingsProps {
  format: OutputFormat;
  quality: number;
  isConverting: boolean;
  onFormatChange: (format: OutputFormat) => void;
  onQualityChange: (quality: number) => void;
  onConvert: () => void;
}

export default function ConversionSettings({ format, quality, isConverting, onFormatChange, onQualityChange, onConvert }: ConversionSettingsProps) {
  const supportsQuality = format !== "image/png";

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <h2 className="text-xl font-bold">Conversion settings</h2>
      <p className="mt-2 text-sm text-slate-400">Select an output format. Conversion happens on this device.</p>

      <label htmlFor="conversion-format" className="mt-7 block text-sm font-semibold">
        Convert to
        <select id="conversion-format" value={format} onChange={(event) => onFormatChange(event.target.value as OutputFormat)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 font-normal outline-none focus:border-blue-500">
          <option value="image/jpeg">JPG</option>
          <option value="image/png">PNG</option>
          <option value="image/webp">WEBP</option>
        </select>
      </label>

      <div className="mt-7">
        <div className="flex items-center justify-between">
          <label htmlFor="conversion-quality" className="text-sm font-semibold">Quality</label>
          <span className="rounded-md bg-blue-600 px-2 py-1 text-sm font-semibold text-white">{supportsQuality ? `${quality}%` : "Lossless"}</span>
        </div>
        <input id="conversion-quality" type="range" min="10" max="100" step="5" value={quality} disabled={!supportsQuality} onChange={(event) => onQualityChange(Number(event.target.value))} className="mt-3 w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-40" />
        <p className="mt-2 text-sm text-slate-400">{supportsQuality ? "Used for JPG and WEBP output." : "PNG preserves the image without a quality setting."}</p>
      </div>

      <button onClick={onConvert} disabled={isConverting} className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
        {isConverting ? "Converting image…" : "Convert image"}
      </button>
    </section>
  );
}
