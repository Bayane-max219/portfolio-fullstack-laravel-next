"use client";

import { useEffect, useState } from "react";

type Theme = "system" | "light" | "dark";

const STORAGE_KEY = "portfolio_theme";

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.classList.remove("theme-light", "theme-dark", "dark");

  if (theme === "light") {
    root.classList.add("theme-light");
  } else if (theme === "dark") {
    root.classList.add("theme-dark", "dark");
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial: Theme = stored ?? "system";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  function handleToggle() {
    const next: Theme = theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    setTheme(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
    applyTheme(next);
  }

  const label =
    theme === "system" ? "Système" : theme === "light" ? "Clair" : "Sombre";

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/80 px-3 py-1.5 text-[11px] font-medium text-slate-100 shadow-lg shadow-black/50 backdrop-blur-md transition hover:border-emerald-400/70 hover:text-emerald-200 hover:shadow-emerald-500/30 print:hidden"
      aria-label="Changer le thème (sombre/clair)"
    >
      <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 via-sky-400 to-indigo-400 shadow-sm shadow-emerald-500/40">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5 text-slate-950"
        >
          {theme === "dark" ? (
            // Soleil
            <path
              fill="currentColor"
              d="M12 4.75a1 1 0 0 1-1-1V2.5a1 1 0 1 1 2 0v1.25a1 1 0 0 1-1 1Zm0 16.75a1 1 0 0 1-1-1v-1.25a1 1 0 1 1 2 0v1.25a1 1 0 0 1-1 1Zm9.5-8.5a1 1 0 0 1-1 1h-1.25a1 1 0 0 1 0-2H20.5a1 1 0 0 1 1 1Zm-16.75 0a1 1 0 0 1-1 1H2.5a1 1 0 0 1 0-2h1.25a1 1 0 0 1 1 1Zm12.374-5.657a1 1 0 0 1 1.414-1.414l.884.884a1 1 0 1 1-1.414 1.414l-.884-.884Zm-9.9 9.9a1 1 0 0 1 1.414-1.414l.884.884a1 1 0 0 1-1.414 1.414l-.884-.884Zm9.9 1.414a1 1 0 0 1 0-1.414l.884-.884a1 1 0 0 1 1.414 1.414l-.884.884a1 1 0 0 1-1.414 0Zm-9.9-9.9a1 1 0 0 1 0-1.414l.884-.884A1 1 0 1 1 7.64 7.64l-.884.884a1 1 0 0 1-1.414 0ZM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
            />
          ) : (
            // Lune
            <path
              fill="currentColor"
              d="M19.307 14.246A7.002 7.002 0 0 1 9.754 4.693 6 6 0 1 0 19.307 14.246ZM12 4a8 8 0 1 0 8 8 1 1 0 0 0-1.448-.894A5 5 0 0 1 12.894 5.448 1 1 0 0 0 12 4Z"
            />
          )}
        </svg>
      </span>
      <span>{label}</span>
    </button>
  );
}
