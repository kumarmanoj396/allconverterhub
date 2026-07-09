"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";

export default function ImagePreview({
  file,
}: {
  file: File | null;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  if (!file || !preview) {
    return null;
  }

  return (
    <Card className="mt-8">
      <SectionTitle
        title="Image Preview"
        subtitle="Preview your selected image"
      />

      <img
        src={preview}
        alt="Preview"
        className="mx-auto max-h-96 rounded-xl"
      />

      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <strong>File Name</strong>
          <p>{file.name}</p>
        </div>

        <div>
          <strong>File Size</strong>
          <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      </div>
    </Card>
  );
}