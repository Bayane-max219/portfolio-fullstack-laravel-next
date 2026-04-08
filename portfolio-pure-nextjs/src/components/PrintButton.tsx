"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print inline-flex items-center rounded-full border border-emerald-400/80 bg-emerald-500/90 px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-sm hover:bg-emerald-400/90 cursor-pointer"
    >
      Télécharger le CV (PDF)
    </button>
  );
}
