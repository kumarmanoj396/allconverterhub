"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const SUPPORTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function UploadBox({
  onFileSelect,
}: UploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  function validateFile(file: File) {
    if (!SUPPORTED_TYPES.includes(file.type)) {
      setError("Choose a JPG, PNG, or WEBP image.");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Maximum file size is 10 MB.");
      return false;
    }

    setError("");
    return true;
  }

  function selectFile(file: File) {
    if (!validateFile(file)) return;

    onFileSelect(file);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];

    if (!selected) return;

    selectFile(selected);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();

    setIsDragging(false);

    const selected = event.dataTransfer.files?.[0];

    if (!selected) return;

    selectFile(selected);
  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all sm:p-12
        ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:bg-slate-800"
            : "border-slate-300 dark:border-slate-700"
        }`}
      >
        <ImageIcon className="mx-auto mb-4 h-14 w-14 text-blue-600" />

        <h2 className="text-2xl font-bold">
          Upload Image
        </h2>

        <p className="mt-2 text-slate-500">
          Drag and drop an image here, or click to browse.
        </p>

        <p className="mt-1 text-sm text-slate-500">JPG, PNG, or WEBP up to 10 MB</p>

        <label
  htmlFor="image-upload"
  className="mt-5 inline-flex cursor-pointer rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
>
  Choose Image
</label>

        <input
          id="image-upload"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleChange}
          className="sr-only"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
