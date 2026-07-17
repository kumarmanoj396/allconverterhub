import { ReactNode } from "react";

import Header from "@/components/layout/Header";
import RecentToolTracker from "@/components/layout/RecentToolTracker";

interface ToolLayoutProps {
  title: string;
  toolId?: string;
  description: string;
  children: ReactNode;
}

export default function ToolLayout({
  title,
  toolId,
  description,
  children,
}: ToolLayoutProps) {
  return (
    <>
      <Header />
      <RecentToolTracker toolId={toolId} />
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
