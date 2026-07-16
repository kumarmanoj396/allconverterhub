"use client";

import { useState } from "react";

import type { PageFormat, PageMargin, PageOrientation } from "@/hooks/useImageToPdf";

interface PdfSettingsProps {
  isCreating: boolean;
  onCreate: (format: PageFormat, orientation: PageOrientation, margin: PageMargin) => void;
}

export default function PdfSettings({ isCreating, onCreate }: PdfSettingsProps) {
  const [format, setFormat] = useState<PageFormat>("a4");
  const [orientation, setOrientation] = useState<PageOrientation>("portrait");
  const [margin, setMargin] = useState<PageMargin>(36);

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <h2 className="text-xl font-bold">PDF settings</h2>
      <p className="mt-2 text-sm text-slate-400">Images are centred and scaled without cropping.</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
        <SettingSelect id="pdf-page-format" label="Page size" value={format} onChange={(value) => setFormat(value as PageFormat)} options={[{ label: "A4", value: "a4" }, { label: "Letter", value: "letter" }]} />
        <SettingSelect id="pdf-orientation" label="Orientation" value={orientation} onChange={(value) => setOrientation(value as PageOrientation)} options={[{ label: "Portrait", value: "portrait" }, { label: "Landscape", value: "landscape" }]} />
        <SettingSelect id="pdf-margin" label="Margins" value={String(margin)} onChange={(value) => setMargin(Number(value) as PageMargin)} options={[{ label: "None", value: "0" }, { label: "Small", value: "18" }, { label: "Normal", value: "36" }, { label: "Large", value: "72" }]} />
      </div>
      <button type="button" onClick={() => onCreate(format, orientation, margin)} disabled={isCreating} className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">{isCreating ? "Creating PDF…" : "Create PDF"}</button>
    </section>
  );
}

function SettingSelect({ id, label, onChange, options, value }: { id: string; label: string; onChange: (value: string) => void; options: { label: string; value: string }[]; value: string }) {
  return <label htmlFor={id} className="text-sm font-semibold">{label}<select id={id} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 font-normal outline-none focus:border-blue-500">{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>;
}
