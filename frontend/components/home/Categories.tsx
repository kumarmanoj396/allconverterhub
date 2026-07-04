const categories = [
  { icon: "🖼️", title: "Image Tools", count: "20+ Tools" },
  { icon: "📄", title: "PDF Tools", count: "15+ Tools" },
  { icon: "🎥", title: "Video Tools", count: "12+ Tools" },
  { icon: "💻", title: "Developer", count: "18+ Tools" },
  { icon: "🤖", title: "AI Tools", count: "25+ Tools" },
  { icon: "🧮", title: "Calculators", count: "30+ Tools" },
];

export default function Categories() {
  return (
    <section className="bg-gray-950 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-center text-4xl font-bold text-white">
          Popular Categories
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.title}
              className="rounded-2xl border border-gray-800 bg-gray-900 p-8 transition hover:-translate-y-2 hover:border-blue-500"
            >
              <div className="text-5xl">{category.icon}</div>

              <h3 className="mt-6 text-2xl font-bold text-white">
                {category.title}
              </h3>

              <p className="mt-2 text-gray-400">{category.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}