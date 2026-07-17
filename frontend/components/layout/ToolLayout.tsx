import { ReactNode } from "react";

import Header from "@/components/layout/Header";
import RecentToolTracker from "@/components/layout/RecentToolTracker";
import ToolSeoContent from "@/components/seo/ToolSeoContent";
import { getToolById } from "@/lib/tools";

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
  const tool = toolId ? getToolById(toolId) : undefined;

  return (
    <>
      <Header />
      <RecentToolTracker toolId={toolId} />
      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10">
        <div className="mb-7 sm:mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>

          <p className="mt-3 max-w-3xl text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {children}
        {tool && <ToolSeoContent tool={tool} />}
      </main>
    </>
  );
}
