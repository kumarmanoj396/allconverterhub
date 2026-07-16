"use client";

import { FileUp } from "lucide-react";
import { useState } from "react";

interface PdfUploadProps {
  onFilesSelect: (files: File[]) => void;
}

export default function PdfUpload({ onFilesSelect }: PdfUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const selectFiles = (files: FileList | null) => {
    if (files) onFilesSelect(Array.from(files));
  };

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);
        selectFiles(event.dataTransfer.files);
      }}
      className={`rounded-2xl border-2 border-dashed p-8 text-center transition sm:p-10 ${
        isDragging ? "border-blue-500 bg-blue-500/10" : "border-slate-700 bg-slate-900"
      }`}
    >
      <FileUp className="mx-auto h-12 w-12 text-blue-400" />
      <h2 className="mt-4 text-xl font-bold">Add PDF files</h2>
      <p className="mt-2 text-sm text-slate-400">Drag and drop PDFs here, or choose files from your device.</p>
      <p className="mt-1 text-xs text-slate-500">Up to 25 MB per file and 100 MB in total.</p>
      <label htmlFor="pdf-merge-upload" className="mt-5 inline-flex cursor-pointer rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
        Choose PDFs
      </label>
      <input
        id="pdf-merge-upload"
        type="file"
        accept="application/pdf,.pdf"
        multiple
        onChange={(event) => {
          selectFiles(event.target.files);
          event.target.value = "";
        }}
        className="sr-only"
      />
    </div>
  );
}
