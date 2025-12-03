"use client";

import { useCallback } from "react";

export function ProfilePrintButton() {
  const handleClick = useCallback(() => {
    if (typeof window === "undefined") return;

    window.print();
  }, []);

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/80 px-4 py-1.5 text-xs font-medium text-slate-800 shadow-sm hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:bg-slate-800 print:hidden"
    >
      Télécharger en PDF
    </button>
  );
}
