"use client";
import Link from "next/link";
import { LogOut, Menu, UserRound, X } from "lucide-react";
import { useState } from "react";
import { APP } from "@/lib/constants";
import { NAVIGATION } from "@/lib/navigation";
import Button from "@/components/ui/Button";
import GlobalToolSearch from "@/components/layout/GlobalToolSearch";
import ThemeToggle from "@/components/layout/ThemeToggle";
import AuthDialog, { type AuthMode } from "@/components/auth/AuthDialog";
import { useAuth } from "@/components/providers/AuthProvider";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { email, logout } = useAuth();
  const openAuth = (mode: AuthMode) => { setAuthMode(mode); setIsAuthOpen(true); setIsMenuOpen(false); };
  const displayName = email ? getDisplayName(email) : null;

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex min-h-16 max-w-[1600px] items-center gap-3 px-4 py-2 sm:px-6">
        <Link href="/" className="shrink-0 text-xl font-bold tracking-tight text-blue-600 sm:text-2xl">
          {APP.NAME}
        </Link>

        <nav className="hidden shrink-0 items-center gap-5 xl:flex">
          {NAVIGATION.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="whitespace-nowrap text-gray-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <GlobalToolSearch />
          <ThemeToggle />
          {email ? (
            <>
              <Link
                href="/dashboard"
                className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-left transition hover:border-blue-400 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-500 dark:hover:bg-slate-800 lg:flex"
                title={`Signed in as ${email}`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                  {displayName?.charAt(0)}
                </span>
                <span className="hidden max-w-36 xl:block">
                  <span className="block truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{displayName}</span>
                  <span className="block truncate text-xs text-slate-500 dark:text-slate-400">{email}</span>
                </span>
              </Link>
              <button
                className="hidden items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-red-400 hover:text-red-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-red-500 dark:hover:text-red-400 lg:inline-flex"
                onClick={logout}
                type="button"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden 2xl:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <button className="hidden rounded-lg border px-4 py-2 lg:block" onClick={() => openAuth("login")} type="button">Login</button>
              <Button className="hidden sm:block" onClick={() => openAuth("register")} type="button">Sign Up</Button>
            </>
          )}

          <button type="button" onClick={() => setIsMenuOpen((open) => !open)} className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800 xl:hidden" aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isMenuOpen}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isMenuOpen && <nav className="border-t border-gray-200 bg-white px-4 py-3 shadow-lg dark:border-slate-800 dark:bg-slate-950 xl:hidden" aria-label="Mobile navigation"><div className="mx-auto grid max-w-7xl gap-1"><Link href="/" onClick={() => setIsMenuOpen(false)} className="rounded-lg px-3 py-3 font-semibold text-gray-800 hover:bg-gray-100 dark:text-slate-100 dark:hover:bg-slate-800">Home</Link>{NAVIGATION.filter((item) => item.href !== "/").map((item) => <Link key={item.title} href={item.href} onClick={() => setIsMenuOpen(false)} className="rounded-lg px-3 py-3 font-semibold text-gray-700 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800">{item.title}</Link>)}<div className="mt-2 border-t border-gray-200 pt-3 dark:border-slate-800">{email ? <><Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="mb-3 flex items-center gap-3 rounded-xl bg-slate-100 px-3 py-3 dark:bg-slate-900"><UserRound className="h-5 w-5 text-blue-600" /><span><span className="block font-semibold text-slate-800 dark:text-slate-100">{displayName}</span><span className="block text-sm text-slate-500 dark:text-slate-400">{email}</span></span></Link><button className="w-full rounded-lg border px-4 py-2 font-semibold text-gray-700 dark:border-slate-700 dark:text-slate-200" onClick={() => { logout(); setIsMenuOpen(false); }} type="button">Logout</button></> : <div className="grid grid-cols-2 gap-3"><button className="rounded-lg border px-4 py-2 font-semibold text-gray-700 dark:border-slate-700 dark:text-slate-200" onClick={() => openAuth("login")} type="button">Login</button><Button onClick={() => openAuth("register")} type="button">Sign Up</Button></div>}</div></div></nav>}
    </header>
    {isAuthOpen && <AuthDialog mode={authMode} onClose={() => setIsAuthOpen(false)} onModeChange={setAuthMode} />}
    </>
  );
}

function getDisplayName(email: string) {
  const localPart = email.split("@")[0] ?? "Account";
  const words = localPart
    .replace(/[._-]+/g, " ")
    .replace(/\d+/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!words.length) return "Account";
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
