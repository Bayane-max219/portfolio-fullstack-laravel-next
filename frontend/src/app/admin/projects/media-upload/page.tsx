"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api";

type Project = {
  id: number;
  title: string;
};

export default function AdminProjectMediaPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | "">("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [loadingProjects, setLoadingProjects] = useState(true);
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
      if (data.length > 0) {
        setSelectedProjectId(data[0].id);
      }
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

    if (!selectedProjectId) {
      setError("Veuillez choisir un projet.");
      return;
    }

    if (!files || files.length === 0) {
      setError("Veuillez sélectionner au moins une capture d'écran.");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (!file) continue;

        const formData = new FormData();
        formData.append("type", "screenshot");
        formData.append("image", file);

        const response = await fetch(
          `${API_BASE_URL}/admin/projects/${selectedProjectId}/media`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          },
        );

        if (!response.ok) {
          throw new Error("Erreur lors de l'enregistrement d'une capture.");
        }
      }

      setMessage("Captures enregistrées avec succès pour ce projet.");
      setFiles(null);
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

  const hasProjects = projects.length > 0;

  return (
    <main className="min-h-screen bg-background text-foreground flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-3xl space-y-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-300/80">
            Espace administration · Captures projets
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Ajouter des captures d'écran à un projet
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-slate-800 dark:text-slate-300">
            Choisissez un projet existant puis téléversez une ou plusieurs
            captures d'écran (JPG/PNG). Vous pouvez répéter cette opération
            autant de fois que nécessaire.
          </p>
        </header>

        {loadingProjects && (
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Chargement des projets...
          </p>
        )}

        {!loadingProjects && !hasProjects && (
          <section className="rounded-2xl border border-dashed border-slate-300/70 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/60 px-6 py-6 text-sm text-slate-700 dark:text-slate-300">
            <p className="font-medium text-slate-900 dark:text-slate-100">
              Aucun projet pour le moment
            </p>
            <p className="mt-2 text-sm">
              Créez d'abord un projet via la page "Projets admin", puis
              revenez ici pour ajouter les captures d'écran.
            </p>
          </section>
        )}

        {hasProjects && (
          <section className="rounded-2xl border border-slate-300/70 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/60 px-6 py-6 text-sm text-slate-800 dark:text-slate-200">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label
                  htmlFor="project"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Projet
                </label>
                <select
                  id="project"
                  value={selectedProjectId}
                  onChange={(e) =>
                    setSelectedProjectId(
                      e.target.value ? Number(e.target.value) : "",
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                >
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="screenshots"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Captures d'écran (JPG/PNG)
                </label>
                <input
                  id="screenshots"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setFiles(e.target.files)}
                  className="block w-full text-xs text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-sky-600 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-sky-500 dark:text-slate-300"
                />
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
                  {loading ? "Enregistrement..." : "Ajouter les captures"}
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}
