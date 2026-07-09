"use client";

import { useRef, useState } from "react";
import { Upload, ImageIcon, X } from "lucide-react";

type UploadBoxProps = {
  file: File | null;
  onFileSelect: (file: File) => void;
};

export default function UploadBox({
  file,
  onFileSelect,
}: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  function handleFile(file: File) {
    setFileName(file.name);
    onFileSelect(file);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file) {
      handleFile(file);
    }
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900 p-10 text-center"
    >
      <Upload className="mx-auto h-16 w-16 text-blue-500" />

      <h2 className="mt-4 text-2xl font-bold">
        Upload Image
      </h2>

      <p className="mt-2 text-slate-400">
        Drag & Drop or click below
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      <button
        onClick={() => inputRef.current?.click()}
        className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
      >
        Choose Image
      </button>

      {file && (
        <div className="mt-8 flex items-center justify-center gap-3 rounded-xl bg-slate-800 p-4">
          <ImageIcon className="h-5 w-5 text-green-500" />

          <span>{file.name}</span>

          <button
            onClick={() => {
              setFileName("");

              if (inputRef.current) {
                inputRef.current.value = "";
              }
            }}
          >
            <X className="h-5 w-5 text-red-500" />
          </button>
        </div>
      )}
    </div>
  );
}