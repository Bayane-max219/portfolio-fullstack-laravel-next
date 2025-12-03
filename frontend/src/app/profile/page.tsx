import React from "react";
import { ProfilePrintButton } from "@/components/ProfilePrintButton";

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

function getSkillCategoryType(category: string | null): "language" | "framework" | "soft" | "other" {
  const value = (category ?? "").trim().toLowerCase();

  if (value === "langage" || value === "language") return "language";
  if (value === "framework") return "framework";
  if (value === "soft skill" || value === "softskill" || value === "soft skills") return "soft";

  return "other";
}

function getSkillBarColor(category: string | null): string {
  const type = getSkillCategoryType(category);

  if (type === "language") return "bg-sky-400";
  if (type === "framework") return "bg-violet-400";
  if (type === "soft") return "bg-amber-400";

  return "bg-emerald-500";
}

async function fetchProfileData() {
  try {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as {
      profile: Profile | null;
      educations: Education[];
      skills: Skill[];
      languages: Language[];
    };

    return data;
  } catch {
    return null;
  }
}

export default async function ProfilePage() {
  const data = await fetchProfileData();

  if (!data || !data.profile) {
    return (
      <main className="profile-print-root min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-10">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Le profil n'est pas encore configuré.
        </p>
      </main>
    );
  }

  const { profile, educations, skills, languages } = data;

  const languageSkills = skills.filter(
    (skill) => getSkillCategoryType(skill.category) === "language",
  );
  const frameworkSkills = skills.filter(
    (skill) => getSkillCategoryType(skill.category) === "framework",
  );
  const softSkills = skills.filter(
    (skill) => getSkillCategoryType(skill.category) === "soft",
  );
  const otherSkills = skills.filter(
    (skill) => getSkillCategoryType(skill.category) === "other",
  );

  return (
    <main className="profile-print-root min-h-screen bg-background text-foreground px-4 py-10 flex items-start justify-center">
      <div className="w-full max-w-5xl space-y-8">
        <header className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-shrink-0">
            <div className="h-40 w-40 md:h-48 md:w-48 rounded-3xl overflow-hidden bg-slate-800 shadow-xl shadow-slate-900/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.full_name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-slate-400 text-xs">
                  Photo de profil
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-500/80 dark:text-emerald-300/80">
              Profil
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              {profile.full_name}
            </h1>
            {profile.title && (
              <p className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-200">
                {profile.title}
              </p>
            )}
            <div className="flex flex-wrap gap-3 text-xs text-slate-600 dark:text-slate-300">
              {profile.location && <span>{profile.location}</span>}
              {profile.years_of_experience != null && (
                <span>{profile.years_of_experience} ans d'expérience</span>
              )}
            </div>
          </div>
        </header>

        <div className="flex justify-end">
          <ProfilePrintButton />
        </div>

        {profile.short_bio && (
          <section className="cv-print-block rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 px-6 py-5 text-sm text-slate-800 dark:text-slate-200">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Profil
            </h2>
            <p className="whitespace-pre-line leading-relaxed">
              {profile.short_bio}
            </p>
          </section>
        )}

        {educations.length > 0 && (
          <section className="cv-print-block rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 px-6 py-5 text-sm text-slate-800 dark:text-slate-200">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Formation
            </h2>
            <ul className="space-y-3">
              {educations.map((education) => (
                <li key={education.id} className="flex flex-col gap-0.5">
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
                    <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
                      {education.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {(profile.email || profile.phone || profile.github_url || profile.linkedin_url || profile.facebook_url || profile.website_url) && (
          <section className="cv-print-block rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 px-6 py-5 text-sm text-slate-800 dark:text-slate-200">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Liens
            </h2>
            <ul className="space-y-1 text-sm">
              {profile.email && (
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-emerald-600 dark:text-emerald-300 hover:underline"
                  >
                    Email : {profile.email}
                  </a>
                </li>
              )}
              {profile.phone && (
                <li>
                  <a
                    href={`tel:${profile.phone}`}
                    className="text-emerald-600 dark:text-emerald-300 hover:underline"
                  >
                    Téléphone : {profile.phone}
                  </a>
                </li>
              )}
              {profile.github_url && (
                <li>
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 dark:text-emerald-300 hover:underline"
                  >
                    GitHub
                  </a>
                </li>
              )}
              {profile.linkedin_url && (
                <li>
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 dark:text-emerald-300 hover:underline"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
              {profile.facebook_url && (
                <li>
                  <a
                    href={profile.facebook_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 dark:text-emerald-300 hover:underline"
                  >
                    Facebook
                  </a>
                </li>
              )}
              {profile.website_url && (
                <li>
                  <a
                    href={profile.website_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 dark:text-emerald-300 hover:underline"
                  >
                    Site web
                  </a>
                </li>
              )}
            </ul>
          </section>
        )}

        {skills.length > 0 && (
          <section className="cv-print-block rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 px-6 py-5 text-sm text-slate-800 dark:text-slate-200">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Compétences
            </h2>

            <div className="space-y-6">
              {languageSkills.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-400 dark:text-sky-300">
                    Langages
                  </p>
                  <div className="mt-2 grid gap-4 sm:grid-cols-2">
                    {languageSkills.map((skill) => (
                      <div key={skill.id} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {skill.name}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {skill.level}%
                          </p>
                        </div>
                        {skill.category && (
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {skill.category}
                          </p>
                        )}
                        <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getSkillBarColor(skill.category)}`}
                            style={{ width: `${Math.min(skill.level, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {frameworkSkills.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-400 dark:text-violet-300">
                    Frameworks
                  </p>
                  <div className="mt-2 grid gap-4 sm:grid-cols-2">
                    {frameworkSkills.map((skill) => (
                      <div key={skill.id} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {skill.name}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {skill.level}%
                          </p>
                        </div>
                        {skill.category && (
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {skill.category}
                          </p>
                        )}
                        <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getSkillBarColor(skill.category)}`}
                            style={{ width: `${Math.min(skill.level, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {softSkills.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-400 dark:text-amber-300">
                    Soft skills
                  </p>
                  <div className="mt-2 grid gap-4 sm:grid-cols-2">
                    {softSkills.map((skill) => (
                      <div key={skill.id} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {skill.name}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {skill.level}%
                          </p>
                        </div>
                        {skill.category && (
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {skill.category}
                          </p>
                        )}
                        <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getSkillBarColor(skill.category)}`}
                            style={{ width: `${Math.min(skill.level, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {otherSkills.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-400 dark:text-emerald-300">
                    Autres / Outils
                  </p>
                  <div className="mt-2 grid gap-4 sm:grid-cols-2">
                    {otherSkills.map((skill) => (
                      <div key={skill.id} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {skill.name}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {skill.level}%
                          </p>
                        </div>
                        {skill.category && (
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {skill.category}
                          </p>
                        )}
                        <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getSkillBarColor(skill.category)}`}
                            style={{ width: `${Math.min(skill.level, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section className="cv-print-block rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 px-6 py-5 text-sm text-slate-800 dark:text-slate-200">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Langues
            </h2>
            <ul className="space-y-2">
              {languages.map((language) => (
                <li key={language.id} className="flex justify-between text-sm">
                  <span className="text-slate-900 dark:text-slate-100">
                    {language.name}
                  </span>
                  {language.level && (
                    <span className="text-xs text-slate-600 dark:text-slate-300">
                      {language.level}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
