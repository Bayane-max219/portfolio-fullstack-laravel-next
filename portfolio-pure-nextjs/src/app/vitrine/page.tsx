import { MainNav } from "@/components/MainNav";
import { certificates, transcripts } from "@/data/documents";
import { projects } from "@/data/projects";

export default function VitrinePage() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-[conic-gradient(from_180deg,rgba(250,204,21,0.9),rgba(249,115,22,0.9),rgba(34,197,94,0.9),rgba(56,189,248,0.9),rgba(129,140,248,0.9))] blur-3xl opacity-50" />
        <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[conic-gradient(from_0deg,rgba(56,189,248,0.9),rgba(129,140,248,0.9),rgba(236,72,153,0.9),rgba(249,115,22,0.9))] blur-3xl opacity-40" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <MainNav />

        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-10">
          <header className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/80">
              Vitrine publique
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
              Projets, relevés de notes et certificats
            </h1>
            <p className="max-w-3xl text-sm text-slate-200/90">
              Une vitrine synthétique de vos réalisations académiques et professionnelles :
              relevés de notes universitaires, certificats de formation et projets marquants.
            </p>
          </header>

          <section className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg font-semibold text-slate-50">Relevés de notes</h2>
              <span className="text-xs text-slate-300/80">
                Relevés de notes universitaires scannés et ajoutés dans l'espace d'administration du
                portfolio fullstack original.
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {transcripts.map((doc) => (
                <article
                  key={doc.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/80 shadow-sm shadow-black/40"
                >
                  <div className="relative h-72 w-full bg-slate-900 flex items-center justify-center">
                    {doc.imageUrl ? (
                      <img
                        src={doc.imageUrl}
                        alt={doc.title}
                        className="max-h-full max-w-full object-contain rounded-md shadow-sm shadow-black/40 transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <>
                        <div className="absolute -left-10 top-0 h-24 w-24 rounded-full bg-slate-950/30 blur-2xl" />
                        <div className="absolute bottom-4 right-4 h-10 w-10 rounded-full border border-white/60 bg-slate-950/30 backdrop-blur" />
                      </>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-1 px-4 py-3 text-sm">
                    <p className="font-medium text-slate-50">{doc.title}</p>
                    <p className="text-xs text-slate-300/90">{doc.institution}</p>
                    {doc.year && (
                      <p className="text-[11px] text-slate-400">Année : {doc.year}</p>
                    )}
                    {doc.imageUrl && (
                      <a
                        href={doc.imageUrl}
                        target="_blank"
                        rel="noreferrer"
                        download
                        className="mt-2 inline-flex w-fit items-center rounded-full border border-slate-600/80 px-3 py-1 text-[11px] text-slate-200 hover:bg-slate-800"
                      >
                        Voir / télécharger le document
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg font-semibold text-slate-50">Certificats et attestations</h2>
              <span className="text-xs text-slate-300/80">
                Certificats de formation, attestations de stage et autres documents importants.
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {certificates.map((doc) => (
                <article
                  key={doc.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/80 shadow-sm shadow-black/40"
                >
                  <div className="relative h-72 w-full bg-slate-900 flex items-center justify-center">
                    {doc.imageUrl ? (
                      <img
                        src={doc.imageUrl}
                        alt={doc.title}
                        className="max-h-full max-w-full object-contain rounded-md shadow-sm shadow-black/40 transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <>
                        <div className="absolute -right-10 top-6 h-24 w-24 rounded-full bg-slate-950/30 blur-2xl" />
                        <div className="absolute bottom-4 left-6 h-10 w-10 rounded-full border border-white/60 bg-slate-950/30 backdrop-blur" />
                      </>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-1 px-4 py-3 text-sm">
                    <p className="font-medium text-slate-50">{doc.title}</p>
                    <p className="text-xs text-slate-300/90">{doc.institution}</p>
                    {doc.mention && (
                      <p className="text-[11px] text-slate-400">{doc.mention}</p>
                    )}
                    {doc.imageUrl && (
                      <a
                        href={doc.imageUrl}
                        target="_blank"
                        rel="noreferrer"
                        download
                        className="mt-2 inline-flex w-fit items-center rounded-full border border-slate-600/80 px-3 py-1 text-[11px] text-slate-200 hover:bg-slate-800"
                      >
                        Voir / télécharger le document
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-4 pb-6">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg font-semibold text-slate-50">Projets sélectionnés</h2>
              <span className="text-xs text-slate-300/80">
                Projets académiques et personnels mis en avant dans le portfolio.
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="group overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/80 shadow-sm shadow-black/40"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                    {project.coverImageUrl ? (
                      <img
                        src={project.coverImageUrl}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-[radial-gradient(circle_at_0%_0%,#facc15_0,#f97316_18%,transparent_50%),radial-gradient(circle_at_100%_100%,#22c55e_0,#22d3ee_20%,#6366f1_40%,transparent_70%)]">
                        <div className="absolute inset-0 bg-slate-950/30" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 px-5 py-4 text-sm">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-300/80">
                      {project.stack}
                    </p>
                    <h3 className="text-base font-semibold text-slate-50">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-200/90">
                      {project.shortDescription}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-slate-300/90">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center rounded-full border border-slate-600/80 px-3 py-1 hover:bg-slate-800"
                        >
                          GitHub
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center rounded-full border border-emerald-400/80 px-3 py-1 text-emerald-300 hover:bg-emerald-500/10"
                        >
                          Démo en ligne
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
