import { ReactNode } from "react";

import Header from "@/components/layout/Header";

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function ToolLayout({
  title,
  description,
  children,
}: ToolLayoutProps) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            {title}
          </h1>

          <p className="mt-3 max-w-3xl text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {children}
      </main>
    </>
  );
}
