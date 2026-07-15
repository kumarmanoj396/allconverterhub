"use client";

import { useMemo, useState } from "react";

import { featuredTools } from "@/lib/tools";

import Categories from "./Categories";
import FeaturedTools from "./FeaturedTools";
import Hero from "./Hero";

export default function HomeToolDiscovery() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const tools = useMemo(() => featuredTools.filter((tool) => tool.enabled), []);
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    tools.forEach((tool) => counts.set(tool.category, (counts.get(tool.category) ?? 0) + 1));

    return Array.from(counts, ([title, count]) => ({ title, count }));
  }, [tools]);

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    document.getElementById("tool-discovery")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Hero query={query} onQueryChange={setQuery} onCategorySelect={selectCategory} />
      <Categories categories={categories} selectedCategory={selectedCategory} onCategorySelect={selectCategory} />
      <FeaturedTools tools={tools} query={query} selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
    </>
  );
}
