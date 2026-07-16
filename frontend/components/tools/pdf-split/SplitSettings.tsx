"use client";

import { useState } from "react";

import { parsePageRanges, type PageRange } from "@/hooks/usePdfSplit";

type SplitMode = "every-page" | "custom-ranges";

interface SplitSettingsProps {
  isSplitting: boolean;
  pageCount: number;
  onSplit: (ranges: PageRange[]) => void;
}

export default function SplitSettings({ isSplitting, pageCount, onSplit }: SplitSettingsProps) {
  const [mode, setMode] = useState<SplitMode>("every-page");
  const [ranges, setRanges] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSplit = () => {
    try {
      const nextRanges = mode === "every-page"
        ? Array.from({ length: pageCount }, (_, index) => ({ end: index + 1, start: index + 1 }))
        : parsePageRanges(ranges, pageCount);
      setValidationError("");
      onSplit(nextRanges);
    } catch (splitError: unknown) {
      setValidationError(splitError instanceof Error ? splitError.message : "Enter valid page ranges.");
    }
  };

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <h2 className="text-xl font-bold">Split options</h2>
      <p className="mt-2 text-sm text-slate-400">Your PDF has {pageCount} {pageCount === 1 ? "page" : "pages"}.</p>
      <div className="mt-6 space-y-3">
        <ModeOption checked={mode === "every-page"} description={`Create ${pageCount} individual PDFs.`} label="Split every page" onChange={() => setMode("every-page")} />
        <ModeOption checked={mode === "custom-ranges"} description="Create one PDF for each range." label="Split custom ranges" onChange={() => setMode("custom-ranges")} />
      </div>
      {mode === "custom-ranges" && (
        <label htmlFor="pdf-page-ranges" className="mt-6 block text-sm font-semibold">
          Page ranges
          <input id="pdf-page-ranges" value={ranges} onChange={(event) => setRanges(event.target.value)} placeholder="Example: 1-3, 5, 8-10" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 font-normal outline-none focus:border-blue-500" />
          <span className="mt-2 block font-normal text-slate-400">Separate groups with commas. Ranges cannot overlap.</span>
        </label>
      )}
      {validationError && <p className="mt-4 text-sm font-medium text-red-400" role="alert">{validationError}</p>}
      <button type="button" onClick={handleSplit} disabled={isSplitting} className="mt-7 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
        {isSplitting ? "Creating ZIP…" : "Split PDF"}
      </button>
    </section>
  );
}

function ModeOption({ checked, description, label, onChange }: { checked: boolean; description: string; label: string; onChange: () => void }) {
  return (
    <label className={`block cursor-pointer rounded-xl border p-4 ${checked ? "border-blue-500 bg-blue-500/10" : "border-slate-700 bg-slate-800"}`}>
      <input className="sr-only" type="radio" name="split-mode" checked={checked} onChange={onChange} />
      <span className="block font-semibold">{label}</span>
      <span className="mt-1 block text-sm text-slate-400">{description}</span>
    </label>
  );
}
