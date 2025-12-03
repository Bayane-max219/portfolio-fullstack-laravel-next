"use client";

import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api";

type Profile = {
  id: number;
  full_name: string;
  title: string | null;
  short_bio: string | null;
  location: string | null;
  years_of_experience: number | null;
  email: string | null;
  phone: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  facebook_url: string | null;
  website_url: string | null;
  avatar_url?: string | null;
};

type Education = {
  id: number;
  institution: string;
  degree: string | null;
  field: string | null;
  start_year: number | null;
  end_year: number | null;
  description: string | null;
};

type Skill = {
  id: number;
  name: string;
  level: number;
  category: string | null;
};

type Language = {
  id: number;
  name: string;
  level: string | null;
};

export default function AdminProfilePage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [educations, setEducations] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);

  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [shortBio, setShortBio] = useState("");
  const [location, setLocation] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState<string>("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [newEducation, setNewEducation] = useState<{
    institution: string;
    degree: string;
    field: string;
    start_year: string;
    end_year: string;
    description: string;
  }>({
    institution: "",
    degree: "",
    field: "",
    start_year: "",
    end_year: "",
    description: "",
  });

  const [newSkill, setNewSkill] = useState<{
    name: string;
    level: string;
    category: string;
  }>({
    name: "",
    level: "",
    category: "",
  });

  const [newLanguage, setNewLanguage] = useState<{
    name: string;
    level: string;
  }>({
    name: "",
    level: "",
  });

  const [editingEducationId, setEditingEducationId] = useState<number | null>(
    null,
  );
  const [editingSkillId, setEditingSkillId] = useState<number | null>(null);
  const [editingLanguageId, setEditingLanguageId] = useState<number | null>(
    null,
  );

  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
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
    void fetchProfile(stored);
  }, [router]);

  async function fetchProfile(bearerToken: string) {
    try {
      setLoadingProfile(true);
      const response = await fetch(`${API_BASE_URL}/admin/profile`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      const data = (await response.json().catch(() => null)) as
        | {
            profile: Profile | null;
            educations: Education[];
            skills: Skill[];
            languages: Language[];
          }
        | null;

      if (!response.ok || !data) {
        throw new Error("Impossible de charger le profil.");
      }

      setProfile(data.profile);
      setEducations(data.educations ?? []);
      setSkills(data.skills ?? []);
      setLanguages(data.languages ?? []);

      if (data.profile) {
        setFullName(data.profile.full_name);
        setTitle(data.profile.title ?? "");
        setShortBio(data.profile.short_bio ?? "");
        setLocation(data.profile.location ?? "");
        setYearsOfExperience(
          data.profile.years_of_experience != null
            ? String(data.profile.years_of_experience)
            : "",
        );
        setEmail(data.profile.email ?? "");
        setPhone(data.profile.phone ?? "");
        setGithubUrl(data.profile.github_url ?? "");
        setLinkedinUrl(data.profile.linkedin_url ?? "");
        setFacebookUrl(data.profile.facebook_url ?? "");
        setWebsiteUrl(data.profile.website_url ?? "");
      }
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Erreur inattendue lors du chargement du profil.";
      setError(msg);
    } finally {
      setLoadingProfile(false);
    }
  }

  function handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setAvatarFile(file);
  }

  async function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
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
      const formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("title", title);
      formData.append("short_bio", shortBio);
      formData.append("location", location);
      if (yearsOfExperience) {
        formData.append("years_of_experience", yearsOfExperience);
      }
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("github_url", githubUrl);
      formData.append("linkedin_url", linkedinUrl);
      formData.append("facebook_url", facebookUrl);
      formData.append("website_url", websiteUrl);
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const response = await fetch(`${API_BASE_URL}/admin/profile`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = (await response.json().catch(() => null)) as
        | { profile?: Profile; message?: string }
        | null;

      if (!response.ok || !data || !data.profile) {
        const msg = data?.message ?? "Impossible d'enregistrer le profil.";
        throw new Error(msg);
      }

      setMessage("Profil mis à jour avec succès.");
      setProfile(data.profile);
      setAvatarFile(null);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Erreur inattendue lors de l'enregistrement du profil.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

    async function handleAddEducation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const payload = {
        institution: newEducation.institution,
        degree: newEducation.degree || null,
        field: newEducation.field || null,
        start_year: newEducation.start_year
          ? Number(newEducation.start_year)
          : null,
        end_year: newEducation.end_year
          ? Number(newEducation.end_year)
          : null,
        description: newEducation.description || null,
      };

      let response: Response;
      if (editingEducationId == null) {
        // Création d'une nouvelle formation
        response = await fetch(`${API_BASE_URL}/admin/educations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        // Mise à jour d'une formation existante
        response = await fetch(
          `${API_BASE_URL}/admin/educations/${editingEducationId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          },
        );
      }

      const data = (await response.json().catch(() => null)) as
        | Education
        | { message?: string }
        | null;

      if (!response.ok || !data || (data as any).id == null) {
        const msg =
          (data as any)?.message ??
          (editingEducationId == null
            ? "Impossible d'ajouter la formation."
            : "Impossible de mettre à jour la formation.");
        throw new Error(msg);
      }

      const education = data as Education;

      if (editingEducationId == null) {
        // Ajout
        setEducations((prev) => [education, ...prev]);
      } else {
        // Update dans la liste locale
        setEducations((prev) =>
          prev.map((e) => (e.id === education.id ? education : e)),
        );
        setEditingEducationId(null);
      }

      // Reset du formulaire
      setNewEducation({
        institution: "",
        degree: "",
        field: "",
        start_year: "",
        end_year: "",
        description: "",
      });
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Erreur inattendue lors de l'ajout de la formation.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }
  async function handleDeleteEducation(education: Education) {
    if (!token) return;

    const confirmed = window.confirm(
      `Supprimer la formation "${education.institution}" ?`,
    );
    if (!confirmed) return;

    try {
      setError(null);
      const response = await fetch(
        `${API_BASE_URL}/admin/educations/${education.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok && response.status !== 204) {
        throw new Error("Impossible de supprimer la formation.");
      }

      setEducations((prev) => prev.filter((e) => e.id !== education.id));
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Erreur inattendue lors de la suppression de la formation.";
      setError(msg);
    }
  }

  async function handleAddSkill(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const payload = {
        name: newSkill.name,
        level: newSkill.level ? Number(newSkill.level) : 0,
        category: newSkill.category || null,
      };

      let response: Response;
      if (editingSkillId == null) {
        response = await fetch(`${API_BASE_URL}/admin/skills`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch(`${API_BASE_URL}/admin/skills/${editingSkillId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      const data = (await response.json().catch(() => null)) as
        | Skill
        | { message?: string }
        | null;

      if (!response.ok || !data || (data as any).id == null) {
        const msg = (data as any)?.message ??
          (editingSkillId == null
            ? "Impossible d'ajouter la compétence."
            : "Impossible de mettre à jour la compétence.");
        throw new Error(msg);
      }

      const skill = data as Skill;
      if (editingSkillId == null) {
        setSkills((prev) => [skill, ...prev]);
      } else {
        setSkills((prev) => prev.map((s) => (s.id === skill.id ? skill : s)));
        setEditingSkillId(null);
      }
      setNewSkill({ name: "", level: "", category: "" });
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Erreur inattendue lors de l'ajout de la compétence.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteSkill(skill: Skill) {
    if (!token) return;

    const confirmed = window.confirm(
      `Supprimer la compétence "${skill.name}" ?`,
    );
    if (!confirmed) return;

    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/admin/skills/${skill.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok && response.status !== 204) {
        throw new Error("Impossible de supprimer la compétence.");
      }

      setSkills((prev) => prev.filter((s) => s.id !== skill.id));
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Erreur inattendue lors de la suppression de la compétence.";
      setError(msg);
    }
  }

  async function handleAddLanguage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const payload = {
        name: newLanguage.name,
        level: newLanguage.level || null,
      };

      let response: Response;
      if (editingLanguageId == null) {
        response = await fetch(`${API_BASE_URL}/admin/languages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch(
          `${API_BASE_URL}/admin/languages/${editingLanguageId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          },
        );
      }

      const data = (await response.json().catch(() => null)) as
        | Language
        | { message?: string }
        | null;

      if (!response.ok || !data || (data as any).id == null) {
        const msg = (data as any)?.message ??
          (editingLanguageId == null
            ? "Impossible d'ajouter la langue."
            : "Impossible de mettre à jour la langue.");
        throw new Error(msg);
      }

      const language = data as Language;
      if (editingLanguageId == null) {
        setLanguages((prev) => [language, ...prev]);
      } else {
        setLanguages((prev) =>
          prev.map((l) => (l.id === language.id ? language : l)),
        );
        setEditingLanguageId(null);
      }
      setNewLanguage({ name: "", level: "" });
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Erreur inattendue lors de l'ajout de la langue.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteLanguage(language: Language) {
    if (!token) return;

    const confirmed = window.confirm(
      `Supprimer la langue "${language.name}" ?`,
    );
    if (!confirmed) return;

    try {
      setError(null);
      const response = await fetch(
        `${API_BASE_URL}/admin/languages/${language.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok && response.status !== 204) {
        throw new Error("Impossible de supprimer la langue.");
      }

      setLanguages((prev) => prev.filter((l) => l.id !== language.id));
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Erreur inattendue lors de la suppression de la langue.";
      setError(msg);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-5xl space-y-8">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-300/80">
            Espace administration · Profil / CV
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Informations personnelles &amp; CV
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-slate-800 dark:text-slate-300">
            Gérez ici votre photo de profil, votre résumé professionnel, vos
            formations, vos compétences et vos langues. Ces informations seront
            utilisées pour construire la page publique de type CV.
          </p>
        </header>

        {loadingProfile && (
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Chargement du profil...
          </p>
        )}

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

        {/* Profil principal */}
        <section className="rounded-2xl border border-slate-300/70 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/60 px-6 py-6 text-sm text-slate-800 dark:text-slate-200">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
            Profil principal
          </h2>

          <form onSubmit={handleProfileSubmit} className="space-y-5">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-1">
                <label
                  htmlFor="fullName"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Nom complet
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>

              <div className="flex-1 space-y-1">
                <label
                  htmlFor="title"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Titre / poste
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Développeur d'applications, etc."
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="shortBio"
                className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
              >
                Résumé / profil
              </label>
              <textarea
                id="shortBio"
                value={shortBio}
                onChange={(e) => setShortBio(e.target.value)}
                rows={4}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1">
                <label
                  htmlFor="location"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Localisation
                </label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ville, pays"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="years"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Années d'expérience
                </label>
                <input
                  id="years"
                  type="number"
                  min={0}
                  max={60}
                  value={yearsOfExperience}
                  onChange={(e) => setYearsOfExperience(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="avatar"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Photo de profil (JPG/PNG)
                </label>
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="block w-full text-xs text-slate-700 file:mr-3 file:rounded-full file:border-0 file:bg-slate-900 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-slate-700 dark:text-slate-200"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Adresse email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="phone"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Téléphone
                </label>
                <input
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="githubUrl"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Lien GitHub
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
                  htmlFor="linkedinUrl"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Lien LinkedIn
                </label>
                <input
                  id="linkedinUrl"
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="facebookUrl"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Lien Facebook
                </label>
                <input
                  id="facebookUrl"
                  type="url"
                  value={facebookUrl}
                  onChange={(e) => setFacebookUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="websiteUrl"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Site web
                </label>
                <input
                  id="websiteUrl"
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>
            </div>

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
                {loading ? "Enregistrement..." : "Enregistrer le profil"}
              </button>
            </div>
          </form>
        </section>

        {/* Formations */}
        <section className="rounded-2xl border border-slate-300/70 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/60 px-6 py-6 text-sm text-slate-800 dark:text-slate-200">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
            Formations
          </h2>

          <form onSubmit={handleAddEducation} className="space-y-3 mb-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label
                  htmlFor="institution"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Établissement
                </label>
                <input
                  id="institution"
                  type="text"
                  value={newEducation.institution}
                  onChange={(e) =>
                    setNewEducation((prev) => ({ ...prev, institution: e.target.value }))
                  }
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="degree"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Diplôme
                </label>
                <input
                  id="degree"
                  type="text"
                  value={newEducation.degree}
                  onChange={(e) =>
                    setNewEducation((prev) => ({ ...prev, degree: e.target.value }))
                  }
                  placeholder="Licence, Master, etc."
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1">
                <label
                  htmlFor="field"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Spécialité / filière
                </label>
                <input
                  id="field"
                  type="text"
                  value={newEducation.field}
                  onChange={(e) =>
                    setNewEducation((prev) => ({ ...prev, field: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="start_year"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Année début
                </label>
                <input
                  id="start_year"
                  type="number"
                  value={newEducation.start_year}
                  onChange={(e) =>
                    setNewEducation((prev) => ({ ...prev, start_year: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="end_year"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Année fin
                </label>
                <input
                  id="end_year"
                  type="number"
                  value={newEducation.end_year}
                  onChange={(e) =>
                    setNewEducation((prev) => ({ ...prev, end_year: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="educationDescription"
                className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
              >
                Description (optionnel)
              </label>
              <textarea
                id="educationDescription"
                rows={3}
                value={newEducation.description}
                onChange={(e) =>
                  setNewEducation((prev) => ({ ...prev, description: e.target.value }))
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2 text-xs font-semibold text-white shadow-sm shadow-sky-500/40 hover:bg-sky-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Enregistrement..."
                  : editingEducationId == null
                    ? "Ajouter la formation"
                    : "Mettre à jour la formation"}
              </button>

              {editingEducationId != null && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingEducationId(null);
                    setNewEducation({
                      institution: "",
                      degree: "",
                      field: "",
                      start_year: "",
                      end_year: "",
                      description: "",
                    });
                  }}
                  className="rounded-full border border-slate-300 px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Annuler la modification
                </button>
              )}
            </div>
          </form>

          {educations.length === 0 ? (
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Aucune formation enregistrée pour le moment.
            </p>
          ) : (
            <ul className="space-y-3">
              {educations.map((education) => (
                <li
                  key={education.id}
                  className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900/70 flex items-start justify-between gap-3"
                >
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {education.institution}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {[education.degree, education.field]
                        .filter(Boolean)
                        .join(" · ") || ""}
                    </p>
                    {(education.start_year || education.end_year) && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {education.start_year ?? "?"} - {education.end_year ?? "?"}
                      </p>
                    )}
                    {education.description && (
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                        {education.description}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingEducationId(education.id);
                        setNewEducation({
                          institution: education.institution,
                          degree: education.degree ?? "",
                          field: education.field ?? "",
                          start_year: education.start_year
                            ? String(education.start_year)
                            : "",
                          end_year: education.end_year
                            ? String(education.end_year)
                            : "",
                          description: education.description ?? "",
                        });
                      }}
                      className="rounded-full border border-slate-300 px-2 py-0.5 text-[11px] font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-500/60 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDeleteEducation(education)}
                      className="rounded-full border border-red-300 px-2 py-0.5 text-[11px] font-medium text-red-600 hover:bg-red-50 dark:border-red-500/60 dark:text-red-300 dark:hover:bg-red-900/40"
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Compétences */}
        <section className="rounded-2xl border border-slate-300/70 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/60 px-6 py-6 text-sm text-slate-800 dark:text-slate-200">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
            Compétences
          </h2>

          <form onSubmit={handleAddSkill} className="space-y-3 mb-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1">
                <label
                  htmlFor="skillName"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Nom de la compétence
                </label>
                <input
                  id="skillName"
                  type="text"
                  value={newSkill.name}
                  onChange={(e) =>
                    setNewSkill((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="skillLevel"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Niveau (%)
                </label>
                <input
                  id="skillLevel"
                  type="number"
                  min={0}
                  max={100}
                  value={newSkill.level}
                  onChange={(e) =>
                    setNewSkill((prev) => ({ ...prev, level: e.target.value }))
                  }
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="skillCategory"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Catégorie (langage, framework, soft skill...)
                </label>
                <input
                  id="skillCategory"
                  type="text"
                  value={newSkill.category}
                  onChange={(e) =>
                    setNewSkill((prev) => ({ ...prev, category: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2 text-xs font-semibold text-white shadow-sm shadow-sky-500/40 hover:bg-sky-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Enregistrement..."
                  : editingSkillId == null
                    ? "Ajouter la compétence"
                    : "Mettre à jour la compétence"}
              </button>

              {editingSkillId != null && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingSkillId(null);
                    setNewSkill({ name: "", level: "", category: "" });
                  }}
                  className="rounded-full border border-slate-300 px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Annuler la modification
                </button>
              )}
            </div>
          </form>

          {skills.length === 0 ? (
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Aucune compétence enregistrée pour le moment.
            </p>
          ) : (
            <ul className="space-y-3">
              {skills.map((skill) => (
                <li
                  key={skill.id}
                  className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900/70 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {skill.name}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {skill.category || ""}
                    </p>
                    <div className="mt-1 h-1.5 w-40 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-sky-500"
                        style={{ width: `${Math.min(skill.level, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingSkillId(skill.id);
                        setNewSkill({
                          name: skill.name,
                          level: String(skill.level),
                          category: skill.category ?? "",
                        });
                      }}
                      className="rounded-full border border-slate-300 px-2 py-0.5 text-[11px] font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-500/60 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDeleteSkill(skill)}
                      className="rounded-full border border-red-300 px-2 py-0.5 text-[11px] font-medium text-red-600 hover:bg-red-50 dark:border-red-500/60 dark:text-red-300 dark:hover:bg-red-900/40"
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Langues */}
        <section className="rounded-2xl border border-slate-300/70 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/60 px-6 py-6 text-sm text-slate-800 dark:text-slate-200">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
            Langues
          </h2>

          <form onSubmit={handleAddLanguage} className="space-y-3 mb-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label
                  htmlFor="languageName"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Langue
                </label>
                <input
                  id="languageName"
                  type="text"
                  value={newLanguage.name}
                  onChange={(e) =>
                    setNewLanguage((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="languageLevel"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Niveau (ex: Courant, Intermédiaire)
                </label>
                <input
                  id="languageLevel"
                  type="text"
                  value={newLanguage.level}
                  onChange={(e) =>
                    setNewLanguage((prev) => ({ ...prev, level: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2 text-xs font-semibold text-white shadow-sm shadow-sky-500/40 hover:bg-sky-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Enregistrement..."
                  : editingLanguageId == null
                    ? "Ajouter la langue"
                    : "Mettre à jour la langue"}
              </button>

              {editingLanguageId != null && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingLanguageId(null);
                    setNewLanguage({ name: "", level: "" });
                  }}
                  className="rounded-full border border-slate-300 px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Annuler la modification
                </button>
              )}
            </div>
          </form>

          {languages.length === 0 ? (
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Aucune langue enregistrée pour le moment.
            </p>
          ) : (
            <ul className="space-y-3">
              {languages.map((language) => (
                <li
                  key={language.id}
                  className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900/70 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {language.name}
                    </p>
                    {language.level && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {language.level}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingLanguageId(language.id);
                        setNewLanguage({
                          name: language.name,
                          level: language.level ?? "",
                        });
                      }}
                      className="rounded-full border border-slate-300 px-2 py-0.5 text-[11px] font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-500/60 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDeleteLanguage(language)}
                      className="rounded-full border border-red-300 px-2 py-0.5 text-[11px] font-medium text-red-600 hover:bg-red-50 dark:border-red-500/60 dark:text-red-300 dark:hover:bg-red-900/40"
                    >
                      Supprimer
                    </button>
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
