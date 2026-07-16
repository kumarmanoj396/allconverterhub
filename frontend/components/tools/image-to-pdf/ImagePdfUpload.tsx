"use client";

import { Images } from "lucide-react";
import { useState } from "react";

interface ImagePdfUploadProps {
  onImagesSelect: (files: File[]) => void;
}

export default function ImagePdfUpload({ onImagesSelect }: ImagePdfUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const selectImages = (files: FileList | null) => {
    if (files) onImagesSelect(Array.from(files));
  };

  return (
    <section
      onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(event) => { event.preventDefault(); setIsDragging(false); selectImages(event.dataTransfer.files); }}
      className={`rounded-2xl border-2 border-dashed p-8 text-center transition sm:p-10 ${isDragging ? "border-blue-500 bg-blue-500/10" : "border-slate-700 bg-slate-900"}`}
    >
      <Images className="mx-auto h-12 w-12 text-blue-400" />
      <h2 className="mt-4 text-xl font-bold">Add images</h2>
      <p className="mt-2 text-sm text-slate-400">Drag and drop images here, or choose files from your device.</p>
      <p className="mt-1 text-xs text-slate-500">JPG, PNG, or WEBP · up to 20 images</p>
      <label htmlFor="image-to-pdf-upload" className="mt-5 inline-flex cursor-pointer rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">Choose images</label>
      <input id="image-to-pdf-upload" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => { selectImages(event.target.files); event.target.value = ""; }} className="sr-only" />
    </section>
  );
}
