"use client";

type ImagePreviewProps = {
  file: File | null;
  preview: string | null;
  width: number;
  height: number;
};

export default function ImagePreview({
  file,
  preview,
  width,
  height,
}: ImagePreviewProps) {
  if (!file || !preview) return null;

  return (
    <div className="mt-8 rounded-xl border border-slate-700 bg-slate-900 p-6">
      <h2 className="mb-4 text-2xl font-bold">
        Image Preview
      </h2>

      <img
        src={preview}
        alt="Preview"
        className="mx-auto max-h-96 rounded-lg"
      />

      <div className="mt-6 grid grid-cols-2 gap-4 text-slate-300">
        <div>
          <span className="font-semibold">File Name</span>
          <p>{file.name}</p>
        </div>

        <div>
          <span className="font-semibold">File Size</span>
          <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>

        <div>
          <span className="font-semibold">Width</span>
          <p>{width}px</p>
        </div>

        <div>
          <span className="font-semibold">Height</span>
          <p>{height}px</p>
        </div>
      </div>
    </div>
  );
}