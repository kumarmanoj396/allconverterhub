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
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24">

        <span className="inline-flex rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold sm:px-5 sm:text-sm">
          🚀 Fast • Secure • Free
        </span>

        <h1 className="mt-7 text-4xl font-extrabold leading-tight sm:mt-8 sm:text-5xl lg:text-6xl">
          All Your Online
          <br />
          <span className="text-blue-400">
            Conversion Tools
          </span>
          <br />
          In One Place
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-300 sm:mt-8 sm:text-xl sm:leading-8">
          Compress Images, Merge PDFs, Generate QR Codes,
          Calculate EMI, Convert Files and much more —
          completely free.
        </p>

        <div className="relative mx-auto mt-8 max-w-2xl sm:mt-10">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 sm:left-5" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            onFocus={() => document.getElementById("tool-discovery")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="w-full rounded-xl border border-gray-700 bg-gray-900 py-4 pl-12 pr-4 text-base outline-none transition focus:border-blue-500 sm:py-5 sm:pl-14 sm:pr-5 sm:text-lg"
            placeholder="Search tools, such as image compressor..."
            aria-label="Search available tools"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:flex sm:flex-wrap sm:justify-center sm:gap-4">

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

        <div className="mt-14 grid grid-cols-2 gap-6 sm:mt-20 sm:gap-8 md:grid-cols-4">

          <div>
            <h2 className="text-3xl font-bold text-blue-400 sm:text-4xl">100+</h2>
            <p className="text-sm text-gray-400 sm:text-base">Online Tools</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-blue-400 sm:text-4xl">10K+</h2>
            <p className="text-sm text-gray-400 sm:text-base">Users</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-blue-400 sm:text-4xl">1M+</h2>
            <p className="text-sm text-gray-400 sm:text-base">Conversions</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-blue-400 sm:text-4xl">99.9%</h2>
            <p className="text-sm text-gray-400 sm:text-base">Uptime</p>
          </div>

        </div>

      </div>
    </section>
  );
}
