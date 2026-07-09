"use client";

import { UploadCloud } from "lucide-react";
import { ChangeEvent, DragEvent, useRef } from "react";

interface Props {
  file: File | null;
  onFileSelect: (file: File) => void;
}

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export default function Dropzone({
  onFileSelect,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function openPicker() {
    inputRef.current?.click();
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement>
  ) {
    if (!e.target.files?.length) return;

    onFileSelect(e.target.files[0]);
  }

  function handleDrop(
    e: DragEvent<HTMLDivElement>
  ) {
    e.preventDefault();

    const dropped = e.dataTransfer.files[0];

    if (!dropped) return;

    if (!ACCEPTED_TYPES.includes(dropped.type)) {
      alert("Unsupported file type");
      return;
    }

    onFileSelect(dropped);
  }

  function handleDragOver(
    e: DragEvent<HTMLDivElement>
  ) {
    e.preventDefault();
  }

  return (
    <>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={openPicker}
        className="cursor-pointer rounded-2xl border-2 border-dashed p-14 text-center transition hover:border-blue-500 hover:bg-blue-50"
      >
        <UploadCloud
          className="mx-auto mb-5"
          size={60}
        />

        <h2 className="text-2xl font-bold">
          Drag & Drop Image
        </h2>

        <p className="mt-3 text-gray-500">
          or click to browse
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={handleChange}
      />
    </>
  );
}