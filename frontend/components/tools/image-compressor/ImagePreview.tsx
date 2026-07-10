"use client";

import { useEffect, useState } from "react";

interface ImagePreviewProps {
  file: File;
}

interface ImageDimensions {
  width: number;
  height: number;
}

export default function ImagePreview({
  file,
}: ImagePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<ImageDimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);

    setPreviewUrl(objectUrl);

    const image = new Image();

    image.onload = () => {
      setDimensions({
        width: image.width,
        height: image.height,
      });
    };

    image.src = objectUrl;

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-6 text-xl font-semibold">
        Image Preview
      </h3>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
          {previewUrl ? (
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
              File Name
            </p>

            <p className="break-all font-medium">
              {file.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              File Size
            </p>

            <p className="font-medium">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Dimensions
            </p>

            <p className="font-medium">
              {dimensions.width} × {dimensions.height}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              File Type
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