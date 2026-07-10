"use client";

interface CompressionSettingsProps {
  quality: number;
  format: "image/jpeg" | "image/png" | "image/webp";
  loading: boolean;
  onQualityChange: (value: number) => void;
  onFormatChange: (
    value: "image/jpeg" | "image/png" | "image/webp"
  ) => void;
  onCompress: () => void;
}

export default function CompressionSettings({
  quality,
  format,
  loading,
  onQualityChange,
  onFormatChange,
  onCompress,
}: CompressionSettingsProps) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold">
        Compression Settings
      </h2>

      <p className="mt-2 text-sm text-slate-400">
        Adjust the quality and output format before compressing your image.
      </p>

      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-medium">Quality</span>

          <span className="rounded-md bg-blue-600 px-2 py-1 text-sm font-semibold text-white">
            {quality}%
          </span>
        </div>

        <input
          type="range"
          min={10}
          max={100}
          step={5}
          value={quality}
          onChange={(e) =>
            onQualityChange(Number(e.target.value))
          }
          className="w-full cursor-pointer"
        />
      </div>

      <div className="mt-8">
        <label
          htmlFor="output-format"
          className="mb-2 block font-medium"
        >
          Output Format
        </label>

        <select
          id="output-format"
          value={format}
          onChange={(e) =>
            onFormatChange(
              e.target.value as
                | "image/jpeg"
                | "image/png"
                | "image/webp"
            )
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-blue-500"
        >
          <option value="image/jpeg">JPEG</option>
          <option value="image/png">PNG</option>
          <option value="image/webp">WEBP</option>
        </select>
      </div>

      <button
        onClick={onCompress}
        disabled={loading}
        className="mt-10 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Compressing..." : "Compress Image"}
      </button>
    </div>
  );
}