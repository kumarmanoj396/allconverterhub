"use client";

import QRCode from "qrcode";
import { Copy, Download, QrCode } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

const SIZES = [256, 512, 768] as const;

export default function QrGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [content, setContent] = useState("https://allconverterhub.vercel.app");
  const [size, setSize] = useState<(typeof SIZES)[number]>(512);
  const [level, setLevel] = useState<ErrorCorrectionLevel>("M");
  const [foreground, setForeground] = useState("#0f172a");
  const [background, setBackground] = useState("#ffffff");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const value = content.trim();

    if (!canvas || !value) {
      return;
    }

    QRCode.toCanvas(canvas, value, {
      color: { dark: foreground, light: background },
      errorCorrectionLevel: level,
      margin: 2,
      width: size,
    }).then(
      () => setError(""),
      () => setError("Enter shorter text or remove unsupported characters."),
    );
  }, [background, content, foreground, level, size]);

  const downloadQr = () => {
    const canvas = canvasRef.current;
    if (!canvas || !content.trim()) return;

    const link = document.createElement("a");
    link.download = "allconverterhub-qr-code.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const copyContent = async () => {
    if (!content.trim()) return;

    await navigator.clipboard.writeText(content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
        <div className="flex items-center gap-3">
          <QrCode className="h-6 w-6 text-blue-400" />
          <div>
            <h2 className="text-xl font-bold">Create your QR code</h2>
            <p className="text-sm text-slate-400">URLs, text, phone numbers, and more.</p>
          </div>
        </div>

        <label htmlFor="qr-content" className="mt-7 block text-sm font-semibold">
          Content
        </label>
        <textarea
          id="qr-content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Enter a URL or text"
          rows={5}
          className="mt-2 w-full resize-none rounded-xl border border-slate-700 bg-slate-800 p-3 text-sm outline-none focus:border-blue-500"
        />

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold">
            QR size
            <select
              value={size}
              onChange={(event) => setSize(Number(event.target.value) as (typeof SIZES)[number])}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 font-normal outline-none focus:border-blue-500"
            >
              {SIZES.map((option) => <option key={option} value={option}>{option} × {option}px</option>)}
            </select>
          </label>
          <label className="text-sm font-semibold">
            Error correction
            <select
              value={level}
              onChange={(event) => setLevel(event.target.value as ErrorCorrectionLevel)}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 font-normal outline-none focus:border-blue-500"
            >
              <option value="L">Low (7%)</option>
              <option value="M">Medium (15%)</option>
              <option value="Q">Quartile (25%)</option>
              <option value="H">High (30%)</option>
            </select>
          </label>
          <ColorInput label="Foreground" value={foreground} onChange={setForeground} />
          <ColorInput label="Background" value={background} onChange={setBackground} />
        </div>

        {error && <p className="mt-5 text-sm font-medium text-red-400">{error}</p>}
      </section>

      <section className="flex flex-col rounded-2xl border border-slate-700 bg-slate-900 p-6">
        <h2 className="text-xl font-bold">Preview</h2>
        <div className="mt-5 flex flex-1 items-center justify-center rounded-2xl bg-white p-5">
          {content.trim() ? <canvas ref={canvasRef} className="h-auto max-w-full" /> : <p className="text-sm text-slate-500">Enter content to generate a QR code.</p>}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button onClick={downloadQr} disabled={!content.trim()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
            <Download className="h-5 w-5" /> Download PNG
          </button>
          <button onClick={copyContent} disabled={!content.trim()} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-4 py-3 font-semibold hover:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50">
            <Copy className="h-5 w-5" /> {copied ? "Copied" : "Copy content"}
          </button>
        </div>
      </section>
    </div>
  );
}

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="text-sm font-semibold">
      {label}
      <span className="mt-2 flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 p-2 font-mono text-xs font-normal">
        <input aria-label={`${label} color`} type="color" value={value} onChange={(event) => onChange(event.target.value)} className="h-8 w-10 cursor-pointer rounded border-0 bg-transparent" />
        {value.toUpperCase()}
      </span>
    </label>
  );
}
