"use client";

import { useImageToPdf } from "@/hooks/useImageToPdf";

import ImageList from "./ImageList";
import ImagePdfUpload from "./ImagePdfUpload";
import PdfResult from "./PdfResult";
import PdfSettings from "./PdfSettings";

export default function ImageToPdf() {
  const { addImages, createPdf, error, images, isCreating, moveImage, removeImage, reset, result } = useImageToPdf();

  return <div className="space-y-6"><ImagePdfUpload onImagesSelect={addImages} />{images.length > 0 && <div className="grid gap-6 lg:grid-cols-[1fr_20rem]"><ImageList images={images} onMove={moveImage} onRemove={removeImage} /><PdfSettings isCreating={isCreating} onCreate={createPdf} /></div>}{error && <p className="text-sm font-medium text-red-400" role="alert">{error}</p>}{result && <PdfResult result={result} onStartOver={reset} />}</div>;
}
