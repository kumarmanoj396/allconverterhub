"use client";

import { useEffect, useState } from "react";

interface ImagePreviewProps {
  file: File;
}

export default function ImagePreview({
  file,
}: ImagePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const url = URL.createObjectURL(file);

    setPreviewUrl(url);

    const image = new Image();

    image.onload = () => {
      setDimensions({
        width: image.width,
        height: image.height,
      });
    };

    image.src = url;

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold">
        Original Image
      </h2>

      <div className="flex justify-center">
        {previewUrl && (
          <img
            src={previewUrl}
            alt={file.name}
            className="max-h-96 rounded-xl"
          />
        )}
      </div>

      <div className="mt-8 grid gap-4 text-sm">

        <div className="flex justify-between">
          <span>Name</span>

          <span className="font-medium">
            {file.name}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Size</span>

          <span className="font-medium">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </span>
        </div>

        <div className="flex justify-between">
          <span>Dimensions</span>

          <span className="font-medium">
            {dimensions.width} × {dimensions.height}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Format</span>

          <span className="font-medium">
            {file.type.replace("image/", "").toUpperCase()}
          </span>
        </div>

      </div>
    </div>
  );
}