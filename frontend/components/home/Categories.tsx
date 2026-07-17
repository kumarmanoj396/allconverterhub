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
    <section className="bg-gray-950 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="mb-8 text-center text-3xl font-bold text-white sm:mb-12 sm:text-4xl">
          Popular Categories
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {categories.map((category) => (
            <button
              key={category.title}
              onClick={() => onCategorySelect(category.title)}
              className={`rounded-2xl border p-6 text-left transition hover:-translate-y-2 hover:border-blue-500 sm:p-8 ${selectedCategory === category.title ? "border-blue-500 bg-blue-950" : "border-gray-800 bg-gray-900"}`}
            >
              <div className="text-5xl">{icons[category.title] ?? "🧰"}</div>

              <h3 className="mt-5 text-xl font-bold text-white sm:mt-6 sm:text-2xl">
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
