"use client";

import { useEffect, useRef, useState } from "react";

import type { CropRegion, ImageEditSettings } from "@/lib/imageEditor";
import { loadImage, renderEditedImage } from "@/lib/imageEditor";

interface EditorPreviewProps {
  crop: CropRegion;
  previewUrl: string;
  settings: ImageEditSettings;
}

export default function EditorPreview({ crop, previewUrl, settings }: EditorPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    loadImage(previewUrl).then((image) => {
      if (!active) return;
      renderEditedImage(canvas, image, { ...settings, crop });
      setError("");
    }).catch(() => active && setError("Unable to preview this image."));

    return () => { active = false; };
  }, [crop, previewUrl, settings]);

  return <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5"><div className="flex items-center justify-between"><div><h2 className="text-xl font-bold">Preview</h2><p className="mt-1 text-sm text-slate-400">Your downloaded image will match this preview.</p></div><span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">{crop.width} × {crop.height}px</span></div><div className="mt-5 flex min-h-80 items-center justify-center overflow-auto rounded-xl bg-[linear-gradient(45deg,#1e293b_25%,transparent_25%),linear-gradient(-45deg,#1e293b_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1e293b_75%),linear-gradient(-45deg,transparent_75%,#1e293b_75%)] bg-[length:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px] p-4">{error ? <p className="text-sm text-red-400">{error}</p> : <canvas ref={canvasRef} className="h-auto max-h-[32rem] max-w-full rounded-lg shadow-lg" />}</div></section>;
}
