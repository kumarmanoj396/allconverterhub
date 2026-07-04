export default function Hero() {
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

        <div className="mt-10">
          <input
            className="w-full max-w-2xl rounded-xl border border-gray-700 bg-gray-900 p-5 text-lg"
            placeholder="🔍 Search over 100+ tools..."
          />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">

          <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700">
            Image Tools
          </button>

          <button className="rounded-xl bg-red-600 px-6 py-3 font-semibold hover:bg-red-700">
            PDF Tools
          </button>

          <button className="rounded-xl bg-green-600 px-6 py-3 font-semibold hover:bg-green-700">
            Calculators
          </button>

          <button className="rounded-xl bg-purple-600 px-6 py-3 font-semibold hover:bg-purple-700">
            AI Tools
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