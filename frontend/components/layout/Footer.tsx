export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h2 className="text-2xl font-bold text-blue-500">
              AllConverterHub
            </h2>
            <p className="mt-4 text-sm text-slate-400">
              Your one-stop platform for free online tools. Fast, secure and
              easy to use.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">Image Tools</h3>
            <ul className="space-y-2 text-slate-400">
              <li>Image Compressor</li>
              <li>Resize Image</li>
              <li>Convert Image</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">PDF Tools</h3>
            <ul className="space-y-2 text-slate-400">
              <li>Merge PDF</li>
              <li>Split PDF</li>
              <li>Compress PDF</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">Developer</h3>
            <ul className="space-y-2 text-slate-400">
              <li>JSON Formatter</li>
              <li>JWT Decoder</li>
              <li>Base64 Encoder</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © {year} AllConverterHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}