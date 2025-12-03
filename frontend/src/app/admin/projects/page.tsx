"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api";

type Project = {
  id: number;
  title: string;
  stack_slug?: string | null;
  short_description?: string | null;
  github_url?: string | null;
  demo_url?: string | null;
};

const STACK_OPTIONS = [
  { slug: "laravel", label: "Laravel – Backend PHP" },
  { slug: "symfony", label: "Symfony – Backend PHP" },
  { slug: "react", label: "React.js – Frontend JS" },
  { slug: "vue", label: "Vue.js – Frontend JS" },
  { slug: "django", label: "Django – Backend Python" },
  { slug: "python", label: "Python – Langage" },
  { slug: "flutter", label: "Flutter – Mobile / Desktop" },
  { slug: "vue-laravel", label: "Vue.js + Laravel API – Fullstack" },
  { slug: "symfony-flutter", label: "Symfony + Flutter API – Fullstack" },
  { slug: "react-django", label: "React + Django API – Fullstack" },
  { slug: "react-pure", label: "React.js pure – Frontend JS" },
  { slug: "next-laravel", label: "Next.js + Laravel API – Fullstack" },
];

export default function AdminProjectsPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const [title, setTitle] = useState("");
  const [stackSlug, setStackSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("portfolio_admin_token");
    if (!stored) {
      router.push("/admin/login");
      return;
    }

    setToken(stored);
    void fetchProjects(stored);
  }, [router]);

  async function fetchProjects(bearerToken: string) {
    try {
      setLoadingProjects(true);
      const response = await fetch(`${API_BASE_URL}/admin/projects`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      const data = (await response.json().catch(() => null)) as Project[] | null;

      if (!response.ok || !data) {
        throw new Error("Impossible de charger les projets.");
      }

      setProjects(data);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Erreur inattendue lors du chargement des projets.";
      setError(msg);
    } finally {
      setLoadingProjects(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!token) {
      setError("Session admin expirée. Veuillez vous reconnecter.");
      router.push("/admin/login");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(`${API_BASE_URL}/admin/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          stack_slug: stackSlug || null,
          short_description: shortDescription || null,
          github_url: githubUrl || null,
          demo_url: demoUrl || null,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | Project
        | { message?: string }
        | null;

      if (!response.ok || !data || (data as any).id == null) {
        const msg = (data as any)?.message ?? "Impossible de créer le projet.";
        throw new Error(msg);
      }

      setMessage("Projet enregistré avec succès.");
      setTitle("");
      setStackSlug("");
      setShortDescription("");
      setGithubUrl("");
      setDemoUrl("");

      await fetchProjects(token);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Erreur inattendue lors de l'enregistrement.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-5xl space-y-8">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-300/80">
            Espace administration · Projets
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Projets du portfolio
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-slate-800 dark:text-slate-300">
            Créez vos projets (titre, description courte, liens) puis ajoutez
            les captures d'écran depuis la page \"Ajouter des captures\".
          </p>
        </header>

        {/* Formulaire nouveau projet */}
        <section className="rounded-2xl border border-slate-300/70 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/60 px-6 py-6 text-sm text-slate-800 dark:text-slate-200">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
            Nouveau projet
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label
                htmlFor="title"
                className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
              >
                Titre du projet
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="stack"
                className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
              >
                Stack / technologie
              </label>
              <select
                id="stack"
                value={stackSlug}
                onChange={(e) => setStackSlug(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
              >
                <option value="">Choisir une stack…</option>
                {STACK_OPTIONS.map((stack) => (
                  <option key={stack.slug} value={stack.slug}>
                    {stack.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="shortDescription"
                className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
              >
                Courte description
              </label>
              <textarea
                id="shortDescription"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label
                  htmlFor="githubUrl"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Lien GitHub (optionnel)
                </label>
                <input
                  id="githubUrl"
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="demoUrl"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Lien de démo (optionnel)
                </label>
                <input
                  id="demoUrl"
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-xl px-3 py-2 dark:bg-red-950/40 dark:border-red-500/40 dark:text-red-200">
                {error}
              </p>
            )}

            {message && (
              <p className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 dark:bg-emerald-950/40 dark:border-emerald-500/40 dark:text-emerald-200">
                {message}
              </p>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => router.push("/admin/dashboard")}
                className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Retour au tableau de bord
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2 text-xs font-semibold text-white shadow-sm shadow-sky-500/40 hover:bg-sky-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Enregistrement..." : "Enregistrer le projet"}
              </button>
            </div>
          </form>
        </section>

        {/* Liste des projets */}
        <section className="rounded-2xl border border-slate-300/70 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/60 px-6 py-6 text-sm text-slate-800 dark:text-slate-200">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
            Projets existants
          </h2>

          {loadingProjects ? (
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Chargement des projets...
            </p>
          ) : projects.length === 0 ? (
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Aucun projet pour le moment.
            </p>
          ) : (
            <ul className="space-y-3">
              {projects.map((project) => (
                <li
                  key={project.id}
                  className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900/70"
                >
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    {project.title}
                  </p>
                  {project.short_description && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      {project.short_description}
                    </p>
                  )}
                  <div className="mt-1 flex flex-wrap gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                    {project.github_url && <span>GitHub: {project.github_url}</span>}
                    {project.demo_url && <span>Démo: {project.demo_url}</span>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}