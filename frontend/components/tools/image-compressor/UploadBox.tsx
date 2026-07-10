"use client";

import { useRef, useState } from "react";
import { ImageIcon, Upload, X } from "lucide-react";

interface UploadBoxProps {
  file: File | null;
  onFileSelect: (file: File | null) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export default function UploadBox({
  file,
  onFileSelect,
}: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  function validateFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Only image files are supported.");
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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const selected = e.target.files?.[0];

    if (!selected) return;

    selectFile(selected);
  }

  function handleDrop(
    e: React.DragEvent<HTMLDivElement>
  ) {
    e.preventDefault();

    setIsDragging(false);

    const selected = e.dataTransfer.files?.[0];

    if (!selected) return;

    selectFile(selected);
  }

  function clearFile() {
    onFileSelect(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`rounded-2xl border-2 border-dashed p-10 text-center transition-all cursor-pointer
        ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:bg-slate-800"
            : "border-slate-300 dark:border-slate-700"
        }`}
      >
        <Upload className="mx-auto mb-4 h-16 w-16 text-blue-600" />

        <h2 className="text-2xl font-bold">
          Upload Image
        </h2>

        <p className="mt-2 text-slate-500">
          Drag & Drop your image here
        </p>

        <p className="text-slate-500">
          or
        </p>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-5 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Choose Image
        </button>

        <input
          ref={inputRef}
          hidden
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-500">
          {error}
        </p>
      )}

    </>
  );
}