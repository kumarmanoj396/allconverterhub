"use client";

import UploadBox from "@/components/tools/image-compressor/UploadBox";
import { useImageEditor } from "@/hooks/useImageEditor";

import EditorPreview from "./EditorPreview";
import EditorResult from "./EditorResult";
import EditorSettings from "./EditorSettings";

export default function ImageEditor() {
  const editor = useImageEditor();
  if (!editor.file || !editor.previewUrl) return <div className="space-y-4"><UploadBox onFileSelect={editor.replaceImage} />{editor.error && <p className="text-sm font-medium text-red-400" role="alert">{editor.error}</p>}</div>;

  const settings = { crop: editor.crop, flipHorizontal: editor.flipHorizontal, flipVertical: editor.flipVertical, rotation: editor.rotation };
  return <div className="space-y-6"><div className="grid gap-6 lg:grid-cols-[1fr_22rem]"><EditorPreview crop={editor.crop} previewUrl={editor.previewUrl} settings={settings} /><EditorSettings crop={editor.crop} dimensions={editor.dimensions} flipHorizontal={editor.flipHorizontal} flipVertical={editor.flipVertical} format={editor.format} isExporting={editor.isExporting} quality={editor.quality} rotation={editor.rotation} onCropChange={editor.updateCrop} onExport={editor.exportImage} onFormatChange={editor.setFormat} onQualityChange={editor.setQuality} onResetCrop={editor.resetCrop} onRotate={editor.rotate} onToggleFlipHorizontal={editor.toggleFlipHorizontal} onToggleFlipVertical={editor.toggleFlipVertical} /></div>{editor.error && <p className="text-sm font-medium text-red-400" role="alert">{editor.error}</p>}{editor.result && <EditorResult result={editor.result} onStartOver={editor.clearImage} />}</div>;
}
