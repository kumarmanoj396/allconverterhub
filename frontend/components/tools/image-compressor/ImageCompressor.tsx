"use client";

import { useState } from "react";
import UploadBox from "./UploadBox";

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <UploadBox
        file={file}
        onFileSelect={setFile}
      />

      {file && (
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Selected Image
          </h2>

          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {file.name}
            </p>

            <p>
              <span className="font-medium">Type:</span>{" "}
              {file.type}
            </p>

            <p>
              <span className="font-medium">Size:</span>{" "}
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
}