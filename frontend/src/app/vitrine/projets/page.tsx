"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api";

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
  description: string | null;
  github_url: string | null;
  demo_url: string | null;
  media: ProjectMedia[];
};

async function fetchProject(id: string): Promise<{ project: Project | null; error: string | null }>{
  try {
    const requestUrl = `${API_BASE_URL}/projects/${encodeURIComponent(id)}`;
    const response = await fetch(requestUrl, { cache: "no-store" });

    if (!response.ok) {
      return { project: null, error: `Erreur API ${response.status}` };
    }

    const project = (await response.json()) as Project;
    return { project, error: null };
  } catch (error) {
    return {
      project: null,
      error:
        error instanceof Error
          ? `Erreur lors de l'appel API: ${error.message}`
          : "Erreur inconnue lors de l'appel API.",
    };
  }
}

async function fetchProjectsByStack(
  stack: string,
): Promise<{ projects: Project[]; error: string | null }> {
  try {
    const requestUrl = `${API_BASE_URL}/projects?stack=${encodeURIComponent(stack)}`;
    const response = await fetch(requestUrl, { cache: "no-store" });

    if (!response.ok) {
      return { projects: [], error: `Erreur API ${response.status}` };
    }

    const projects = (await response.json()) as Project[];
    return { projects, error: null };
  } catch (error) {
    return {
      projects: [],
      error:
        error instanceof Error
          ? `Erreur lors de l'appel API: ${error.message}`
          : "Erreur inconnue lors de l'appel API.",
    };
  }
}

const STACK_LABELS: Record<string, string> = {
  laravel: "Laravel",
  symfony: "Symfony",
  react: "React.js",
  python: "Python pure",
  "vue-laravel": "Vue.js + Laravel API",
  "symfony-flutter": "Symfony + Flutter API",
  "react-django": "React + Django API",
  "react-pure": "React.js pure",
  "next-laravel": "Next.js + Laravel API",
};

export default function ProjectPage() {
  const searchParams = useSearchParams();
  const stack = searchParams.get("stack");
  const id = searchParams.get("id");

  if (stack) {
    return <ProjectsByStackClient stack={stack} />;
  }

  if (id) {
    return <ProjectDetailClient id={id} />;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <p className="text-sm text-slate-700 dark:text-slate-300">
        Aucun projet ou stack sélectionné. Veuillez revenir à la vitrine et cliquer sur une stack.
      </p>
    </main>
  );
}

function ProjectsByStackClient({ stack }: { stack: string }) {
  const [state, setState] = React.useState<{
    loading: boolean;
    projects: Project[];
    error: string | null;
  }>({ loading: true, projects: [], error: null });

  React.useEffect(() => {
    let mounted = true;
    setState({ loading: true, projects: [], error: null });

    void fetchProjectsByStack(stack).then((result) => {
      if (!mounted) return;
      setState({ loading: false, projects: result.projects, error: result.error });
    });

    return () => {
      mounted = false;
    };
  }, [stack]);

  if (state.loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Chargement des projets…
        </p>
      </main>
    );
  }

  if (state.error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
        <div className="max-w-lg text-center space-y-2">
          <h1 className="text-xl font-semibold">Impossible de charger les projets</h1>
          <p className="text-sm text-red-500 dark:text-red-300">{state.error}</p>
        </div>
      </main>
    );
  }

  const projects = state.projects;

  if (projects.length === 0) {
    const stackLabel = STACK_LABELS[stack] ?? stack;
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Aucun projet n'est encore associé à la stack "{stackLabel}".
        </p>
      </main>
    );
  }

  const stackLabel = STACK_LABELS[stack] ?? stack;

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-10 flex items-start justify-center">
      <div className="w-full max-w-5xl space-y-8">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-500/80 dark:text-emerald-300/80">
            Vitrine publique · Projets de la stack
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            {stackLabel}
          </h1>
          <p className="max-w-3xl text-sm sm:text-base text-slate-800 dark:text-slate-300">
            Retrouvez ici l'ensemble des projets réalisés avec cette stack : description,
            liens GitHub et captures d'écran principales.
          </p>
        </header>

        <section className="space-y-6">
          {projects.map((project) => {
            const screenshots = project.media?.filter(
              (m) => m.type === "screenshot",
            );
            const cover = screenshots && screenshots.length > 0 ? screenshots[0] : null;

            return (
              <article
                key={project.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-black/40"
              >
                {cover && (
                  <div className="aspect-[16/9] w-full overflow-hidden bg-slate-900/80">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cover.url ?? ""}
                      alt={cover.caption ?? project.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-3 px-5 py-4">
                  <div className="space-y-1">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                      {project.title}
                    </h2>
                    {project.short_description && (
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {project.short_description}
                      </p>
                    )}
                  </div>

                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-600 dark:text-slate-300">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-full border border-slate-300 px-3 py-1 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
                      >
                        GitHub · {project.github_url}
                      </a>
                    )}
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-full border border-slate-300 px-3 py-1 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
                      >
                        Démo en ligne · {project.demo_url}
                      </a>
                    )}
                    <a
                      href={`/vitrine/projets?id=${project.id}`}
                      className="inline-flex items-center rounded-full border border-emerald-400/80 px-3 py-1 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-500/80 dark:text-emerald-300 dark:hover:bg-emerald-950/40"
                    >
                      Voir le détail du projet
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}

function ProjectDetailClient({ id }: { id: string }) {
  const [state, setState] = React.useState<{
    loading: boolean;
    project: Project | null;
    error: string | null;
  }>({ loading: true, project: null, error: null });

  React.useEffect(() => {
    let mounted = true;
    setState({ loading: true, project: null, error: null });

    void fetchProject(id).then((result) => {
      if (!mounted) return;
      setState({ loading: false, project: result.project, error: result.error });
    });

    return () => {
      mounted = false;
    };
  }, [id]);

  if (state.loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
        <p className="text-sm text-slate-700 dark:text-slate-300">Chargement du projet…</p>
      </main>
    );
  }

  if (!state.project) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
        <div className="max-w-lg text-center space-y-2">
          <h1 className="text-xl font-semibold">Impossible de charger ce projet</h1>
          {state.error && (
            <p className="text-sm text-red-500 dark:text-red-300">{state.error}</p>
          )}
        </div>
      </main>
    );
  }

  const project = state.project;
  const screenshots = project.media?.filter((m) => m.type === "screenshot");

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-10 flex items-start justify-center">
      <div className="w-full max-w-5xl space-y-8">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-500/80 dark:text-emerald-300/80">
            Vitrine publique · Détails du projet
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            {project.title}
          </h1>
          {project.short_description && (
            <p className="max-w-3xl text-sm sm:text-base text-slate-800 dark:text-slate-300">
              {project.short_description}
            </p>
          )}
        </header>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/70 px-6 py-6 text-sm text-slate-800 dark:text-slate-200">
          {project.description && (
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-800 dark:text-slate-300">
              {project.description}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-600 dark:text-slate-300">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-slate-300 px-3 py-1 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
              >
                GitHub · {project.github_url}
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-slate-300 px-3 py-1 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
              >
                Démo en ligne · {project.demo_url}
              </a>
            )}
          </div>
        </section>

        {screenshots && screenshots.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              Captures d'écran du projet
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {screenshots.map((media) => (
                <figure
                  key={media.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950/5 dark:border-slate-700 dark:bg-slate-900/80"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={media.url ?? ""}
                    alt={media.caption ?? project.title}
                    className="h-56 w-full object-cover sm:h-64 md:h-72"
                  />
                  {media.caption && (
                    <figcaption className="px-3 py-2 text-[11px] text-slate-600 dark:text-slate-300">
                      {media.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
