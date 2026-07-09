"use client";

import { useState } from "react";
import Dropzone from "./Dropzone";

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="mx-auto max-w-5xl">

      <Dropzone
        file={file}
        onFileSelect={setFile}
      />

      {!file && (
        <div className="mt-10 rounded-xl border border-dashed p-10 text-center">
          <h3 className="text-xl font-semibold">
            Drag & Drop your image here
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            JPG, JPEG, PNG and WEBP supported
          </p>
        </div>
      )}

      {file && (
        <div className="mt-10 rounded-xl border p-8">
          <h2 className="text-xl font-semibold">
            Image Selected
          </h2>

          <div className="mt-5 grid gap-3 text-sm">

            <div>
              <span className="font-medium">
                Name:
              </span>{" "}
              {file.name}
            </div>

            <div>
              <span className="font-medium">
                Type:
              </span>{" "}
              {file.type}
            </div>

            <div>
              <span className="font-medium">
                Size:
              </span>{" "}
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </div>

          </div>

          <p className="mt-8 text-gray-500">
            Compression controls will appear in the next step.
          </p>

        </div>
      )}

    </div>
  );
}