import ImageCompressor from "@/components/tools/image-compressor/ImageCompressor";

export default function ImageCompressorPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">
          Image Compressor
        </h1>

        <p className="mt-3 text-gray-500">
          Compress JPG, PNG and WEBP images directly in your browser.
        </p>

        <div className="mt-8">
          <ImageCompressor />
        </div>
      </div>
    </main>
  );
}