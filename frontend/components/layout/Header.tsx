"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { APP } from "@/lib/constants";
import { NAVIGATION } from "@/lib/navigation";
import Button from "@/components/ui/Button";
import GlobalToolSearch from "@/components/layout/GlobalToolSearch";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-xl font-bold text-blue-600 sm:text-2xl">
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

          <Button className="hidden sm:block">Sign Up</Button>

          <button type="button" onClick={() => setIsMenuOpen((open) => !open)} className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden" aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isMenuOpen}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isMenuOpen && <nav className="border-t border-gray-200 bg-white px-4 py-3 shadow-lg md:hidden" aria-label="Mobile navigation"><div className="mx-auto grid max-w-7xl gap-1"><Link href="/" onClick={() => setIsMenuOpen(false)} className="rounded-lg px-3 py-3 font-semibold text-gray-800 hover:bg-gray-100">Home</Link>{NAVIGATION.filter((item) => item.href !== "/").map((item) => <Link key={item.title} href={item.href} onClick={() => setIsMenuOpen(false)} className="rounded-lg px-3 py-3 font-semibold text-gray-700 hover:bg-gray-100">{item.title}</Link>)}<div className="mt-2 grid grid-cols-2 gap-3 border-t border-gray-200 pt-3"><button className="rounded-lg border px-4 py-2 font-semibold text-gray-700">Login</button><Button>Sign Up</Button></div></div></nav>}
    </header>
  );
}
