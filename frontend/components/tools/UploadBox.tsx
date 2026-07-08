"use client";

import { ChangeEvent } from "react";

type UploadBoxProps = {
  onFileSelect: (file: File) => void;
};

export default function UploadBox({
  onFileSelect,
}: UploadBoxProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    onFileSelect(file);
  }

  return (
    <div className="rounded-xl border-2 border-dashed border-slate-700 bg-slate-900 p-10 text-center">
      <div className="text-6xl">📤</div>

      <h2 className="mt-5 text-2xl font-bold">
        Upload Image
      </h2>

      <p className="mt-3 text-slate-400">
        JPG, PNG and WEBP supported
      </p>

      <label className="mt-8 inline-block cursor-pointer rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700">
        Choose Image

        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </label>
    </div>
  );
}