"use client";

const icons: Record<string, string> = {
  "Image Tools": "🖼️",
  Utilities: "🔳",
};

interface Category {
  title: string;
  count: number;
}

interface CategoriesProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export default function Categories({ categories, selectedCategory, onCategorySelect }: CategoriesProps) {
  return (
    <section className="bg-gray-950 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-center text-4xl font-bold text-white">
          Popular Categories
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <button
              key={category.title}
              onClick={() => onCategorySelect(category.title)}
              className={`rounded-2xl border p-8 text-left transition hover:-translate-y-2 hover:border-blue-500 ${selectedCategory === category.title ? "border-blue-500 bg-blue-950" : "border-gray-800 bg-gray-900"}`}
            >
              <div className="text-5xl">{icons[category.title] ?? "🧰"}</div>

              <h3 className="mt-6 text-2xl font-bold text-white">
                {category.title}
              </h3>

              <p className="mt-2 text-gray-400">{category.count} available {category.count === 1 ? "tool" : "tools"}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
