import { ReactNode } from "react";

type ToolLayoutProps = {
  title: string;
  description: string;
  icon: string;
  children: ReactNode;
};

export default function ToolLayout({
  title,
  description,
  icon,
  children,
}: ToolLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8">
          <div className="text-5xl">{icon}</div>

          <h1 className="mt-4 text-4xl font-bold">
            {title}
          </h1>

          <p className="mt-3 text-slate-400">
            {description}
          </p>
        </div>

        {children}
      </div>
    </main>
  );
}