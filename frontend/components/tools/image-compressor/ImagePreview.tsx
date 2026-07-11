"use client";

import { useEffect, useMemo, useState } from "react";

import type { ImageDimensions } from "@/hooks/useImageCompression";

interface ImagePreviewProps {
  file: File;
}

function formatFileSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(1)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ImagePreview({
  file,
}: ImagePreviewProps) {
  const previewUrl = useMemo(() => URL.createObjectURL(file), [file]);
  const [dimensions, setDimensions] = useState<ImageDimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const image = new Image();

    image.onload = () => {
      setDimensions({
        width: image.width,
        height: image.height,
      });
    };

    image.src = previewUrl;

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-6 text-xl font-semibold">Original image</h3>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
          {previewUrl ? (
            // Blob URLs are generated locally and cannot be optimized by next/image.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt={file.name}
              className="max-h-80 w-auto max-w-full rounded-lg object-contain"
            />
          ) : (
            <div className="text-slate-500">
              Loading preview...
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-sm text-slate-500">
              File name
            </p>

            <p className="break-all font-medium">
              {file.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Original size
            </p>

            <p className="font-medium">
              {formatFileSize(file.size)}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Original dimensions
            </p>

            <p className="font-medium">
              {dimensions.width} × {dimensions.height}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              File type
            </p>

            <p className="font-medium uppercase">
              {file.type.replace("image/", "")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
