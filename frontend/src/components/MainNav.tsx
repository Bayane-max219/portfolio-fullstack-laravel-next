"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/vitrine", label: "Vitrine" },
  { href: "/profile", label: "Profil" },
  { href: "/admin/login", label: "Admin" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 text-slate-900 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/70 dark:text-slate-50 print:hidden">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 via-sky-400 to-indigo-500 shadow-sm shadow-emerald-400/50">
            <span className="text-xs font-bold tracking-tight text-slate-950">N</span>
          </div>
          <div className="hidden flex-col text-xs sm:flex">
            <span className="font-semibold tracking-tight">Portfolio Fullstack</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">
              Laravel API · Next.js Frontend
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-1 rounded-full border border-slate-200/80 bg-slate-50/80 px-1 py-0.5 text-xs text-slate-700 shadow-sm dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-200">
          {links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  "rounded-full px-3 py-1 transition-colors " +
                  (active
                    ? "bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900"
                    : "hover:bg-slate-200/80 dark:hover:bg-slate-800/80")
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 text-right text-[11px] text-slate-500 sm:flex dark:text-slate-400">
          <span className="block font-medium text-slate-700 dark:text-slate-200">
            Disponible
          </span>
          <span className="block text-[10px]">Ouvert aux opportunités</span>
        </div>
      </div>
    </header>
  );
}
