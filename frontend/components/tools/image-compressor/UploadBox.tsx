"use client";

import { Upload } from "lucide-react";

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
}

export default function UploadBox({
  onFileSelect,
}: UploadBoxProps) {
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    // Allow only image files
    if (!selectedFile.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    // Max 10 MB
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("Maximum file size is 10 MB.");
      return;
    }

    onFileSelect(selectedFile);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <label
        htmlFor="image-upload"
        className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900 px-8 py-16 text-center transition hover:border-blue-500"
      >
        <Upload className="mb-6 h-16 w-16 text-blue-500" />

        <h2 className="text-3xl font-bold text-white">
          Upload Image
        </h2>

        <p className="mt-3 text-slate-400">
          Drag & Drop is coming soon
        </p>

        <p className="mt-1 text-sm text-slate-500">
          JPG, JPEG, PNG and WEBP (Max 10 MB)
        </p>

        <div className="mt-8 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700">
          Choose Image
        </div>
      </label>

      <input
        id="image-upload"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}