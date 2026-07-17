"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { APP } from "@/lib/constants";
import { NAVIGATION } from "@/lib/navigation";
import Button from "@/components/ui/Button";
import GlobalToolSearch from "@/components/layout/GlobalToolSearch";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          {APP.NAME}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAVIGATION.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-gray-600 transition hover:text-blue-600"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <GlobalToolSearch />
          <button className="hidden rounded-lg border px-4 py-2 md:block">
            Login
          </button>

          <Button>Sign Up</Button>

          <button className="md:hidden">
            <Menu />
          </button>
        </div>
      </div>
    </header>
  );
}
