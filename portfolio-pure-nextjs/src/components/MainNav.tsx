"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/vitrine", label: "Vitrine" },
  { href: "/profile", label: "Profil" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2 text-sm font-medium tracking-tight text-slate-50">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 via-emerald-400 to-fuchsia-500 text-[11px] font-semibold text-slate-950 shadow-lg shadow-amber-500/40">
            M
          </div>
          <span className="hidden text-xs text-slate-200/90 sm:inline">
            Portfolio Next.js statique
          </span>
        </div>

        <nav className="flex items-center gap-2 text-xs sm:text-sm">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  "rounded-full px-3 py-1 font-medium transition " +
                  (active
                    ? "bg-slate-50 text-slate-950 shadow-sm shadow-slate-900/40"
                    : "text-slate-200/90 hover:bg-slate-800/80 hover:text-white")
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
