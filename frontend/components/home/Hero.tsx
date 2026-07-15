"use client";

import { Search } from "lucide-react";

interface HeroProps {
  query: string;
  onQueryChange: (query: string) => void;
  onCategorySelect: (category: string) => void;
}

export default function Hero({ query, onQueryChange, onCategorySelect }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">

        <span className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold">
          🚀 Fast • Secure • Free
        </span>

        <h1 className="mt-8 text-6xl font-extrabold leading-tight">
          All Your Online
          <br />
          <span className="text-blue-400">
            Conversion Tools
          </span>
          <br />
          In One Place
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-xl text-gray-300">
          Compress Images, Merge PDFs, Generate QR Codes,
          Calculate EMI, Convert Files and much more —
          completely free.
        </p>

        <div className="relative mx-auto mt-10 max-w-2xl">
          <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            onFocus={() => document.getElementById("tool-discovery")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="w-full rounded-xl border border-gray-700 bg-gray-900 py-5 pl-14 pr-5 text-lg outline-none transition focus:border-blue-500"
            placeholder="Search tools, such as image compressor..."
            aria-label="Search available tools"
          />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">

          <button onClick={() => onCategorySelect("Image Tools")} className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700">
            Image Tools
          </button>

          <button onClick={() => onCategorySelect("Utilities")} className="rounded-xl bg-purple-600 px-6 py-3 font-semibold hover:bg-purple-700">
            Utilities
          </button>

          <button onClick={() => onCategorySelect("All")} className="rounded-xl border border-slate-400 px-6 py-3 font-semibold hover:bg-white/10">
            Browse All Tools
          </button>

        </div>

        <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">

          <div>
            <h2 className="text-4xl font-bold text-blue-400">100+</h2>
            <p className="text-gray-400">Online Tools</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-400">10K+</h2>
            <p className="text-gray-400">Users</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-400">1M+</h2>
            <p className="text-gray-400">Conversions</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-400">99.9%</h2>
            <p className="text-gray-400">Uptime</p>
          </div>

        </div>

      </div>
    </section>
  );
}
