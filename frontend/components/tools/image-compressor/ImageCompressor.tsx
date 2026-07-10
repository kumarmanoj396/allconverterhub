"use client";

import { useState } from "react";

import UploadBox from "./UploadBox";
import ImagePreview from "./ImagePreview";

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);

  return (
  <div className="space-y-8">
    {!file ? (
      <UploadBox
        file={file}
        onFileSelect={setFile}
      />
    ) : (
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ImagePreview file={file} />
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
          <h3 className="text-xl font-semibold">
            Compression Settings
          </h3>

          <p className="mt-2 text-slate-400">
            Coming in the next step...
          </p>
        </div>
      </div>
    )}
  </div>
);
}