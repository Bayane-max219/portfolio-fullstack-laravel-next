"use client";

import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api";

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

const TYPE_OPTIONS = [
  { value: "releve", label: "Relevé de notes" },
  { value: "diplome", label: "Diplôme" },
  { value: "certificat", label: "Certificat" },
  { value: "attestation", label: "Attestation" },
  { value: "autre", label: "Autre" },
];

export default function AdminDocumentsPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loadingCertificates, setLoadingCertificates] = useState(true);

  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [type, setType] = useState("diplome");
  const [issuedAt, setIssuedAt] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("portfolio_admin_token");
    if (!stored) {
      router.push("/admin/login");
      return;
    }
    setToken(stored);
    void fetchCertificates(stored);
  }, [router]);

  async function fetchCertificates(bearerToken: string) {
    try {
      setLoadingCertificates(true);
      const response = await fetch(`${API_BASE_URL}/admin/certificates`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      const data = (await response.json().catch(() => null)) as Certificate[] | null;

      if (!response.ok || !data) {
        throw new Error("Impossible de charger les documents.");
      }

      setCertificates(data);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Erreur inattendue lors du chargement des documents.";
      setError(msg);
    } finally {
      setLoadingCertificates(false);
    }
  }

  function startEdit(certificate: Certificate) {
    setEditingId(certificate.id);
    setTitle(certificate.title);
    setIssuer(certificate.issuer ?? "");
    setType(certificate.type ?? "diplome");
    setIssuedAt(certificate.issued_at ? certificate.issued_at.slice(0, 10) : "");
    setImageFile(null);
    setMessage(null);
    setError(null);

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function handleDelete(certificate: Certificate) {
    if (!token) {
      setError("Session admin expirée. Veuillez vous reconnecter.");
      router.push("/admin/login");
      return;
    }

    const confirmed = window.confirm(
      `Supprimer définitivement le document "${certificate.title}" ?`,
    );
    if (!confirmed) return;

    try {
      setError(null);
      const response = await fetch(
        `${API_BASE_URL}/admin/certificates/${certificate.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok && response.status !== 204) {
        throw new Error("Impossible de supprimer le document.");
      }

      if (editingId === certificate.id) {
        setEditingId(null);
        setTitle("");
        setIssuer("");
        setType("diplome");
        setIssuedAt("");
        setImageFile(null);
      }

      await fetchCertificates(token);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Erreur inattendue lors de la suppression.";
      setError(msg);
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setImageFile(file);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!token) {
      setError("Session admin expirée. Veuillez vous reconnecter.");
      router.push("/admin/login");
      return;
    }

    if (!imageFile && editingId === null) {
      setError("Veuillez choisir une image (JPG/PNG) pour le document.");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("issuer", issuer);
      formData.append("type", type);
      if (issuedAt) {
        formData.append("issued_at", issuedAt);
      }
      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (editingId !== null) {
        formData.append("_method", "PUT");
      }

      const url =
        editingId === null
          ? `${API_BASE_URL}/admin/certificates`
          : `${API_BASE_URL}/admin/certificates/${editingId}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = (await response.json().catch(() => null)) as
        | { certificate?: Certificate; url?: string; message?: string }
        | null;

      if (!response.ok || !data || !data.certificate) {
        const msg = data?.message ?? "Impossible d'enregistrer le document.";
        throw new Error(msg);
      }

      setMessage(
        editingId === null
          ? "Document enregistré avec succès."
          : "Document mis à jour avec succès.",
      );
      setTitle("");
      setIssuer("");
      setType("diplome");
      setIssuedAt("");
      setImageFile(null);
      setEditingId(null);

      await fetchCertificates(token);
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
            Espace administration · Diplômes & certificats
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Relevés de notes, diplômes, certificats & attestations
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-slate-800 dark:text-slate-300">
            Téléversez ici les images JPG/PNG de vos relevés S1–S6, diplômes,
            certificats de stage et attestations diverses. Elles pourront ensuite
            être affichées dans la vitrine publique.
          </p>
        </header>

        <section className="rounded-2xl border border-slate-300/70 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/60 px-6 py-6 text-sm text-slate-800 dark:text-slate-200">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
            {editingId === null
              ? "Nouveau document"
              : "Modifier le document sélectionné"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label
                htmlFor="title"
                className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
              >
                Titre du document
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Ex: Relevé de notes S1, Diplôme Licence MIASHS, Attestation de stage..."
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label
                  htmlFor="type"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Type de document
                </label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                >
                  {TYPE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="issuer"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Établissement / organisme (optionnel)
                </label>
                <input
                  id="issuer"
                  type="text"
                  value={issuer}
                  onChange={(e) => setIssuer(e.target.value)}
                  placeholder="Ex: Université d'Antananarivo, Entreprise X..."
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label
                  htmlFor="issuedAt"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Date d'émission (optionnel)
                </label>
                <input
                  id="issuedAt"
                  type="date"
                  value={issuedAt}
                  onChange={(e) => setIssuedAt(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="image"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Image (JPG/PNG)
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-xs text-slate-700 file:mr-3 file:rounded-full file:border-0 file:bg-slate-900 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-slate-700 dark:text-slate-200"
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
                {loading ? "Enregistrement..." : "Enregistrer le document"}
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-300/70 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/60 px-6 py-6 text-sm text-slate-800 dark:text-slate-200">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
            Documents existants
          </h2>

          {loadingCertificates ? (
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Chargement des documents...
            </p>
          ) : certificates.length === 0 ? (
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Aucun document enregistré pour le moment.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {certificates.map((certificate) => (
                <article
                  key={certificate.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900/70 dark:shadow-black/40 flex flex-col"
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
                    <div className="mt-2 flex gap-2 text-[11px]">
                      <button
                        type="button"
                        onClick={() => startEdit(certificate)}
                        className="rounded-full border border-slate-300 px-2 py-0.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Modifier
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDelete(certificate)}
                        className="rounded-full border border-red-300 px-2 py-0.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:border-red-500/60 dark:text-red-300 dark:hover:bg-red-900/40"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
