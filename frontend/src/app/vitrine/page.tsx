import Link from "next/link";

const techStacks = [
  {
    slug: "laravel",
    name: "Laravel",
    tag: "Backend PHP",
    shortLabel: "Lv",
    description: "APIs REST, backoffice, logique métier côté serveur.",
    iconGradient: "from-red-500 via-rose-400 to-orange-400",
  },
  {
    slug: "symfony",
    name: "Symfony",
    tag: "Backend PHP",
    shortLabel: "Sf",
    description: "Applications enterprise, architecture solide et sécurisée.",
    iconGradient: "from-emerald-400 via-emerald-300 to-lime-300",
  },
  {
    slug: "react",
    name: "React.js",
    tag: "Frontend JS",
    shortLabel: "R",
    description: "Interfaces modernes, SPA dynamiques et réactives.",
    iconGradient: "from-sky-500 via-cyan-400 to-sky-300",
  },
  {
    slug: "python",
    name: "Python pure",
    tag: "Langage",
    shortLabel: "Py",
    description: "Scripts, automatisation et outils sur mesure.",
    iconGradient: "from-yellow-400 via-amber-300 to-orange-400",
  },
  {
    slug: "vue-laravel",
    name: "Vue.js + Laravel API",
    tag: "Fullstack",
    shortLabel: "V+L",
    description: "Front Vue.js connecté à un backend Laravel API.",
    iconGradient: "from-emerald-400 via-sky-400 to-emerald-300",
  },
  {
    slug: "symfony-flutter",
    name: "Symfony + Flutter API",
    tag: "Fullstack",
    shortLabel: "Sf+Fl",
    description: "Backend Symfony exposant une API pour apps Flutter.",
    iconGradient: "from-emerald-400 via-blue-400 to-teal-300",
  },
  {
    slug: "react-django",
    name: "React + Django API",
    tag: "Fullstack",
    shortLabel: "R+Dj",
    description: "Frontend React moderne branché sur un backend Django.",
    iconGradient: "from-sky-500 via-cyan-400 to-emerald-300",
  },
  {
    slug: "react-pure",
    name: "React.js pure",
    tag: "Frontend JS",
    shortLabel: "R*",
    description: "Composants UI avancés sans backend dédié.",
    iconGradient: "from-sky-500 via-indigo-400 to-fuchsia-400",
  },
  {
    slug: "next-laravel",
    name: "Next.js + Laravel API",
    tag: "Fullstack",
    shortLabel: "Nx+L",
    description: "Architecture utilisée pour ce portfolio (Next + Laravel).",
    iconGradient: "from-emerald-400 via-sky-400 to-indigo-400",
  },
];

type ProjectMedia = {
  id: number;
  type: string;
  file_path: string | null;
  video_url: string | null;
  caption: string | null;
  url?: string | null;
};

type Project = {
  id: number;
  title: string;
  stack_slug?: string | null;
  short_description: string | null;
  github_url: string | null;
  demo_url: string | null;
  media: ProjectMedia[];
};

type Certificate = {
  id: number;
  title: string;
  issuer: string | null;
  type: string | null;
  issued_at: string | null;
  image_path: string;
  url?: string | null;
  display_order: number;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api";

export default async function VitrinePage() {
  let projects: Project[] = [];
  let certificates: Certificate[] = [];

  try {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      cache: "no-store",
    });

    if (response.ok) {
      projects = ((await response.json()) as Project[]) ?? [];
    }
  } catch {
    projects = [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/certificates`, {
      cache: "no-store",
    });

    if (response.ok) {
      certificates = ((await response.json()) as Certificate[]) ?? [];
    }
  } catch {
    certificates = [];
  }

  const relevés = certificates.filter((c) => c.type === "releve");
  const diplomas = certificates.filter((c) => c.type === "diplome");
  const otherCertificates = certificates.filter(
    (c) => c.type && c.type !== "releve" && c.type !== "diplome",
  );

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-10 flex items-start justify-center">
      <div className="w-full max-w-6xl space-y-10">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-500/80 dark:text-emerald-300/80">
            Vitrine publique
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Projets classés par technologies &amp; stacks
          </h1>
          <p className="max-w-3xl text-sm sm:text-base text-slate-800 dark:text-slate-300">
            Chaque carré représente une stack ou un framework que je maîtrise: Laravel, Symfony,
            React, Vue, Django, Python, Flutter, combinaisons API (Vue + Laravel, Symfony +
            Flutter, React + Django, Next.js + Laravel, etc.). En cliquant sur un stack, le
            visiteur pourra voir toutes les captures d&apos;écran, les explications et les liens
            GitHub associés.
          </p>
        </header>

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {techStacks.map((stack) => {
            const projectForStack = projects.find(
              (project) => project.stack_slug === stack.slug,
            );

            return (
              <div
                key={stack.slug}
                className="group relative stack-card-animated border border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-900/70 p-5 shadow-md shadow-black/10 dark:shadow-black/40 transition-colors"
              >
                <div className="pointer-events-none absolute inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`stack-icon-animated flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${stack.iconGradient} shadow-lg shadow-black/40`}
                    >
                      <span className="text-xs font-semibold tracking-tight text-slate-950">
                        {stack.shortLabel}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500/90 dark:text-slate-400/90">
                        {stack.tag}
                      </p>
                      <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-50">
                        {stack.name}
                      </h2>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-300/95">
                    {stack.description}
                  </p>

                  {projectForStack ? (
                    <Link
                      href={`/vitrine/projets?stack=${encodeURIComponent(stack.slug)}`}
                      className="mt-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-300/90 group-hover:translate-x-1 transition-transform inline-flex"
                    >
                      Voir tous les projets de cette stack (captures, explications, vidéos) →
                    </Link>
                  ) : (
                    <span className="mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 opacity-70">
                      Projets de cette stack à venir
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </section>

        {relevés.length > 0 && (
          <section className="mt-10 space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Relevés de notes
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 max-w-3xl">
              Relevés de notes universitaires (S1, S2, S3, etc.) scannés et ajoutés depuis
              l&apos;espace admin.
            </p>

            <div className="mt-3 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {relevés.map((certificate) => (
                <article
                  key={certificate.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-black/40 flex flex-col"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900/80">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={certificate.url ?? ""}
                      alt={certificate.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1 px-4 py-3">
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-50">
                      {certificate.title}
                    </p>
                    {certificate.issuer && (
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">
                        {certificate.issuer}
                      </p>
                    )}
                    {certificate.url && (
                      <a
                        href={certificate.url}
                        target="_blank"
                        rel="noreferrer"
                        download
                        className="mt-2 inline-flex items-center justify-center rounded-full border border-slate-300 px-3 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Télécharger l'image
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {diplomas.length > 0 && (
          <section className="mt-10 space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Diplômes
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 max-w-3xl">
              Diplômes obtenus (Licence, Master, etc.).
            </p>

            <div className="mt-3 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {diplomas.map((certificate) => (
                <article
                  key={certificate.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-black/40 flex flex-col"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900/80">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={certificate.url ?? ""}
                      alt={certificate.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1 px-4 py-3">
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-50">
                      {certificate.title}
                    </p>
                    {certificate.issuer && (
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">
                        {certificate.issuer}
                      </p>
                    )}
                    {certificate.url && (
                      <a
                        href={certificate.url}
                        target="_blank"
                        rel="noreferrer"
                        download
                        className="mt-2 inline-flex items-center justify-center rounded-full border border-slate-300 px-3 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Télécharger l'image
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {otherCertificates.length > 0 && (
          <section className="mt-10 space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Certificats &amp; attestations
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 max-w-3xl">
              Certificats de stage, attestations de formation et autres documents
              professionnels.
            </p>

            <div className="mt-3 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {otherCertificates.map((certificate) => (
                <article
                  key={certificate.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-black/40 flex flex-col"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900/80">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={certificate.url ?? ""}
                      alt={certificate.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1 px-4 py-3">
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-50">
                      {certificate.title}
                    </p>
                    {certificate.type && (
                      <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                        {certificate.type}
                      </p>
                    )}
                    {certificate.issuer && (
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">
                        {certificate.issuer}
                      </p>
                    )}
                    {certificate.url && (
                      <a
                        href={certificate.url}
                        target="_blank"
                        rel="noreferrer"
                        download
                        className="mt-2 inline-flex items-center justify-center rounded-full border border-slate-300 px-3 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Télécharger l'image
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
