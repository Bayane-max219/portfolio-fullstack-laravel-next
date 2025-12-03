export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-5xl">
        <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-950 text-slate-50 px-6 py-10 shadow-2xl shadow-emerald-500/20 sm:px-10 sm:py-14 dark:border-slate-800/80">
          <div className="absolute inset-0 hero-wave-overlay pointer-events-none" />
          <div className="pointer-events-none hero-wave-layer-1" />
          <div className="pointer-events-none hero-wave-layer-2" />
          <div className="pointer-events-none hero-wave-layer-3" />

          <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center">
            <div className="flex-1 space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
                Portfolio développeur fullstack
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-50">
                Applications web, APIs Laravel &amp; interfaces Next.js
              </h1>
              <p className="max-w-xl text-sm sm:text-base text-slate-200/90">
                Découvrez mes projets (vitrine), mon profil détaillé (CV) et un
                espace d&apos;administration privé pour gérer les contenus du
                portfolio.
              </p>

              <div className="mt-4 flex flex-wrap gap-3 text-xs">
                <a
                  href="/vitrine"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2 font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 hover:bg-emerald-400"
                >
                  Voir la vitrine (projets)
                </a>
                <a
                  href="/profile"
                  className="inline-flex items-center justify-center rounded-full border border-emerald-300/70 bg-slate-900/40 px-5 py-2 font-medium text-emerald-100 hover:bg-slate-900/70"
                >
                  Voir mon profil / CV
                </a>
                <a
                  href="/admin/login"
                  className="inline-flex items-center justify-center rounded-full border border-slate-500/70 bg-slate-900/60 px-4 py-2 font-medium text-slate-100 hover:bg-slate-800/80"
                >
                  Accès administration
                </a>
              </div>
            </div>

            <div className="mt-6 flex-1 md:mt-0 md:pl-6">
              <div className="mx-auto max-w-sm space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-black/50">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Stack principale
                </p>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-50">
                    Laravel API · Next.js Frontend
                  </p>
                  <p className="text-xs text-slate-400">
                    APIs REST, backoffice sécurisé et interface moderne côté
                    frontend.
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-[11px] text-slate-300">
                  <div className="rounded-xl bg-slate-900/80 px-3 py-2 border border-slate-700/70">
                    <p className="font-semibold text-emerald-300">Projets</p>
                    <p className="mt-1 text-slate-400">
                      Vitrine interactive avec captures, diplômes et
                      certificats.
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-900/80 px-3 py-2 border border-slate-700/70">
                    <p className="font-semibold text-sky-300">Profil</p>
                    <p className="mt-1 text-slate-400">
                      Page CV dédiée : photo, formations, compétences et
                      langues.
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-900/80 px-3 py-2 border border-slate-700/70">
                    <p className="font-semibold text-violet-300">Admin</p>
                    <p className="mt-1 text-slate-400">
                      Espace privé pour gérer projets, médias et profil.
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-900/80 px-3 py-2 border border-slate-700/70">
                    <p className="font-semibold text-amber-300">Disponible</p>
                    <p className="mt-1 text-slate-400">
                      Ouvert aux opportunités de CDI, CDD ou mission.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}