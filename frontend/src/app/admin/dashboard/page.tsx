import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-5xl space-y-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-300/80">
            Espace administration
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Tableau de bord du portfolio
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-slate-800 dark:text-slate-300">
            Ici nous ajouterons les écrans de gestion : projets, captures d&apos;écran, vidéos,
            relevés de notes, certificats, profil, compétences et langues. Pour l&apos;instant, cette
            page sert juste de point d&apos;arrivée après la connexion.
          </p>
        </header>

        <section className="mt-6 rounded-2xl border border-dashed border-slate-300/70 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/60 px-6 py-8 text-sm text-slate-700 dark:text-slate-300 transition-colors">
          <p className="font-medium text-slate-900 dark:text-slate-100">Prochaine étape</p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>Commencer par ajouter vos premiers projets et captures via la page "Projets admin".</li>
            <li>Ensuite, mettre en place la gestion des diplômes, certificats et relevés.</li>
            <li>Enfin, connecter la vitrine publique aux données réelles du backend.</li>
          </ul>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/admin/projects"
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm shadow-sky-500/40 hover:bg-sky-500"
            >
              Créer un projet
            </Link>

            <Link
              href="/admin/projects/media-upload"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm shadow-emerald-500/40 hover:bg-emerald-500"
            >
              Ajouter des captures
            </Link>

            <Link
              href="/admin/documents"
              className="inline-flex items-center justify-center rounded-full bg-purple-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm shadow-purple-500/40 hover:bg-purple-500"
            >
              Ajouter diplômes & certificats
            </Link>

            <Link
              href="/admin/profile"
              className="inline-flex items-center justify-center rounded-full bg-amber-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm shadow-amber-500/40 hover:bg-amber-500"
            >
              Éditer le profil / CV
            </Link>

            <Link
              href="/vitrine"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Voir la vitrine publique
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
