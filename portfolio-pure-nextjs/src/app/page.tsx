import { MainNav } from "@/components/MainNav";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-[conic-gradient(from_200deg,#f97316,#eab308,#22c55e,#22d3ee)] blur-3xl opacity-70" />
        <div className="absolute -right-40 top-10 h-80 w-80 rounded-full bg-[conic-gradient(from_20deg,#6366f1,#ec4899,#f97316,#22d3ee)] blur-3xl opacity-60" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <MainNav />

        <section className="hero-ribbon mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-10 px-4 py-16 text-center md:flex-row md:text-left">
          <div className="space-y-5 max-w-xl">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/90">
              Portfolio Next.js · Version statique
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
              Une vitrine 3D colorée pour mes projets, certificats et parcours.
            </h1>
            <p className="text-sm text-slate-200/90 sm:text-base">
              Inspirée de mon premier portfolio Laravel + Next.js, cette version 100% Next.js
              statique met l'accent sur l'animation, les couleurs et un déploiement ultra-fiable
              sur Vercel.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <a
                href="/vitrine"
                className="rounded-full bg-emerald-400 px-7 py-2.5 text-sm font-medium text-emerald-950 shadow-lg shadow-emerald-500/40 transition hover:-translate-y-0.5 hover:bg-emerald-300"
              >
                Découvrir la vitrine
              </a>
              <a
                href="/profile"
                className="rounded-full border border-slate-300/70 bg-slate-900/60 px-7 py-2.5 text-sm font-medium text-slate-50 shadow-sm shadow-slate-900/40 transition hover:-translate-y-0.5 hover:bg-slate-900/80"
              >
                Voir le profil détaillé
              </a>
            </div>
          </div>

          <div className="relative flex h-64 w-full max-w-md items-center justify-center md:h-72">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-amber-300 via-fuchsia-500 to-sky-400 opacity-90" />
            <div className="absolute -left-10 -top-6 h-20 w-20 rounded-full bg-sky-300/80 blur-2xl" />
            <div className="absolute -right-6 top-10 h-24 w-24 rounded-full bg-emerald-400/80 blur-2xl" />
            <div className="absolute -bottom-6 left-6 h-24 w-24 rounded-full bg-fuchsia-400/80 blur-2xl" />
            <div className="relative z-10 flex h-[85%] w-[88%] items-center justify-center rounded-[2rem] bg-slate-950/40 backdrop-blur-xl shadow-2xl shadow-slate-950/80">
              <p className="max-w-[80%] text-center text-xs font-medium text-slate-50/95 sm:text-sm">
                Design inspiré par des courbes 3D et des rubans multicolores, pour un portfolio qui
                se démarque clairement de la version précédente.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
