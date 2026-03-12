import React from "react";
import { ProfilePrintButton } from "@/components/ProfilePrintButton";
import { FaJava } from "react-icons/fa";
import {
  SiAndroidstudio,
  SiAngular,
  SiCss,
  SiDjango,
  SiDocker,
  SiGit,
  SiGithub,
  SiHtml5,
  SiIntellijidea,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiSpring,
  SiSqlite,
  SiSwagger,
  SiSymfony,
  SiTypescript,
  SiVite,
  SiVuedotjs,
} from "react-icons/si";

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

type Project = {
  id: number;
  title: string;
  short_description: string | null;
  stack_slug: string | null;
  github_url: string | null;
  demo_url: string | null;
  is_featured?: boolean;
  display_order?: number;
};

type SkillIconDefinition = {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color?: string;
  style?: React.CSSProperties;
};

function getSkillIconDefinition(name: string): SkillIconDefinition | null {
  const n = name.trim().toLowerCase();

  const map: Record<string, SkillIconDefinition> = {
    "html": { icon: SiHtml5, color: "#e34f26" },
    "html/css": { icon: SiHtml5, color: "#e34f26" },
    "html/csss": { icon: SiHtml5, color: "#e34f26" },
    "css": { icon: SiCss, color: "#1572B6" },
    "css3": { icon: SiCss, color: "#1572B6" },
    "javascript": { icon: SiJavascript, color: "#F7DF1E" },
    "typescript": { icon: SiTypescript, color: "#3178C6" },
    "php": { icon: SiPhp, color: "#777BB4" },
    "python": { icon: SiPython, color: "#3776AB" },
    "java": { icon: FaJava, color: "#E11F21" },

    "laravel": { icon: SiLaravel, color: "#FF2D20" },
    "react": { icon: SiReact, color: "#61DAFB" },
    "react.js": { icon: SiReact, color: "#61DAFB" },
    "next.js": { icon: SiNextdotjs, color: "#ffffff" },
    "nextjs": { icon: SiNextdotjs, color: "#ffffff" },
    "angular": { icon: SiAngular, color: "#DD0031" },
    "django": { icon: SiDjango, color: "#092E20" },
    "vue": { icon: SiVuedotjs, color: "#4FC08D" },
    "vue.js": { icon: SiVuedotjs, color: "#4FC08D" },
    "symfony": { icon: SiSymfony, color: "#ffffff" },
    "spring boot": { icon: SiSpring, color: "#6DB33F" },
    "spring": { icon: SiSpring, color: "#6DB33F" },

    "docker": { icon: SiDocker, color: "#2496ED" },
    "git": { icon: SiGit, color: "#F05032" },
    "github": { icon: SiGithub, color: "#ffffff" },
    "git / github": { icon: SiGithub, color: "#ffffff" },
    "postman": { icon: SiPostman, color: "#FF6C37" },
    "postman / swagger": { icon: SiPostman, color: "#FF6C37" },
    "swagger": { icon: SiSwagger, color: "#85EA2D" },

    "mysql": { icon: SiMysql, color: "#4479A1" },
    "postgresql": { icon: SiPostgresql, color: "#4169E1" },
    "sqlite": { icon: SiSqlite, color: "#003B57" },
    "mongodb": { icon: SiMongodb, color: "#47A248" },
    "mongo db": { icon: SiMongodb, color: "#47A248" },
    "mongo": { icon: SiMongodb, color: "#47A248" },
    "sql (mysql, postgresql, sqlite)": { icon: SiMysql, color: "#4479A1" },

    "intellij": { icon: SiIntellijidea, color: "#ffffff" },
    "intellij idea": { icon: SiIntellijidea, color: "#ffffff" },
    "android studio": { icon: SiAndroidstudio, color: "#3DDC84" },
    "node.js": { icon: SiNodedotjs, color: "#339933" },
    "vite": { icon: SiVite, color: "#646CFF" },
  };

  return map[n] ?? null;
}

function SkillChip({ name, showIcon }: { name: string; showIcon: boolean }) {
  const def = showIcon ? getSkillIconDefinition(name) : null;
  const Icon = def?.icon;

  const n = name.trim().toLowerCase();
  const isPython = showIcon && n === "python";
  const isHtmlCss = showIcon && (n === "html/css" || n === "html/csss" || n === "html css");

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-950/40 px-2.5 py-1 text-xs text-slate-800 dark:text-slate-200">
      {isHtmlCss ? (
        <>
          <SiHtml5 className="h-4 w-4" style={{ color: "#e34f26" }} />
          <SiCss className="h-4 w-4" style={{ color: "#1572B6" }} />
        </>
      ) : isPython ? (
        <SiPython className="h-4 w-4" style={{ color: "#3776AB" }} />
      ) : (
        Icon && (
          <Icon
            className="h-4 w-4"
            style={def?.style ?? (def?.color ? { color: def.color } : undefined)}
          />
        )
      )}
      <span>{name}</span>
    </span>
  );
}

function getDatabaseSkills(skills: Skill[]): Skill[] {
  const result: Skill[] = [];

  const dbSkills = skills.filter(
    (skill) => (skill.category ?? "").trim().toLowerCase() === "base de données"
  );

  const source = dbSkills.map((skill) => skill.name);

  const hasCombined = source.some((name) => name.trim().toLowerCase().startsWith("sql ("));
  const combinedValue = source.find((name) => name.trim().toLowerCase().startsWith("sql ("));

  if (hasCombined && combinedValue) {
    const normalized = combinedValue.toLowerCase();
    const wantMysql = normalized.includes("mysql");
    const wantPg = normalized.includes("postgresql") || normalized.includes("postgre");
    const wantSqlite = normalized.includes("sqlite");
    const wantMongo = normalized.includes("mongo");

    if (wantMysql) result.push({ id: -101, name: "MySQL", level: 0, category: "Base de données" });
    if (wantPg) result.push({ id: -102, name: "PostgreSQL", level: 0, category: "Base de données" });
    if (wantSqlite) result.push({ id: -103, name: "SQLite", level: 0, category: "Base de données" });
    if (wantMongo) result.push({ id: -104, name: "MongoDB", level: 0, category: "Base de données" });
  }

  // also keep explicit DB skills if they exist
  if (source.some((n) => n.trim().toLowerCase() === "mysql")) {
    result.push({ id: -201, name: "MySQL", level: 0, category: "Base de données" });
  }
  if (source.some((n) => n.trim().toLowerCase() === "postgresql")) {
    result.push({ id: -202, name: "PostgreSQL", level: 0, category: "Base de données" });
  }
  if (source.some((n) => n.trim().toLowerCase() === "sqlite")) {
    result.push({ id: -203, name: "SQLite", level: 0, category: "Base de données" });
  }
  if (source.some((n) => n.trim().toLowerCase() === "mongodb")) {
    result.push({ id: -204, name: "MongoDB", level: 0, category: "Base de données" });
  }
  if (source.some((n) => n.trim().toLowerCase() === "mongo db")) {
    result.push({ id: -205, name: "MongoDB", level: 0, category: "Base de données" });
  }

  // fallback: if MongoDB exists in the API skills list but category is inconsistent,
  // still show it in the DB section.
  const hasMongoAnywhere = skills.some((s) => s.name.trim().toLowerCase().includes("mongo"));
  if (hasMongoAnywhere) {
    result.push({ id: -206, name: "MongoDB", level: 0, category: "Base de données" });
  }

  // dedupe by name
  const seen = new Set<string>();
  return result.filter((s) => {
    const key = s.name.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

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

async function fetchFeaturedProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      cache: "no-store",
    });

    if (!response.ok) return [];

    const data = (await response.json()) as Project[];

    return (Array.isArray(data) ? data : [])
      .filter((project) => Boolean((project as any).is_featured))
      .sort((a, b) => {
        const orderA = (a.display_order ?? 0) as number;
        const orderB = (b.display_order ?? 0) as number;
        if (orderA !== orderB) return orderA - orderB;
        return a.id - b.id;
      })
      .slice(0, 4);
  } catch {
    return [];
  }
}

function skillCategoryToCvSection(category: string | null):
  | "Langages"
  | "Frameworks principaux"
  | "Autres frameworks utilisés"
  | "Bases de données"
  | "Outils & environnements"
  | "Qualités (soft skills)" {
  const value = (category ?? "").trim().toLowerCase();

  if (["langage", "language"].includes(value)) return "Langages";
  if (["framework"].includes(value)) return "Autres frameworks utilisés";
  if (["soft skill", "softskill", "soft skills"].includes(value)) {
    return "Qualités (soft skills)";
  }

  if (
    [
      "base de données",
      "base de donnees",
      "database",
      "bdd",
    ].includes(value)
  ) {
    return "Bases de données";
  }

  if (["outil", "tool", "outils"].includes(value)) return "Outils & environnements";
  if (["environnement", "environment", "env"].includes(value)) return "Outils & environnements";

  return "Outils & environnements";
}

function normalizeExternalUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export default async function ProfilePage() {
  const data = await fetchProfileData();
  const featuredProjects = await fetchFeaturedProjects();

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

  const mainFrameworks = new Set(["laravel", "react", "react.js", "next.js", "nextjs"]);

  const databaseSkills = getDatabaseSkills(skills);

  const skillSections = {
    "Langages": [] as Skill[],
    "Frameworks principaux": [] as Skill[],
    "Autres frameworks utilisés": [] as Skill[],
    "Bases de données": [] as Skill[],
    "Outils & environnements": [] as Skill[],
    "Qualités (soft skills)": [] as Skill[],
  };

  for (const skill of skills) {
    const type = getSkillCategoryType(skill.category);

    if (type === "framework") {
      const normalized = skill.name.trim().toLowerCase();
      if (mainFrameworks.has(normalized)) {
        skillSections["Frameworks principaux"].push(skill);
      } else {
        skillSections["Autres frameworks utilisés"].push(skill);
      }
      continue;
    }

    const section = skillCategoryToCvSection(skill.category);

    if (section === "Bases de données") {
      continue;
    }

    skillSections[section].push(skill);
  }

  if (databaseSkills.length > 0) {
    skillSections["Bases de données"].push(...databaseSkills);
  }

  return (
    <main className="profile-print-root min-h-screen bg-background text-foreground px-4 py-10 flex items-start justify-center print:py-2">
      <div className="w-full max-w-5xl space-y-8 print:space-y-2">
        <header className="flex flex-col md:flex-row md:items-center gap-6 print:gap-3">
          <div className="flex-shrink-0">
            <div className="h-40 w-40 md:h-48 md:w-48 rounded-3xl overflow-hidden bg-slate-800 shadow-xl shadow-slate-900/40 print:h-28 print:w-28">
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
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 print:text-2xl">
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

        <div className="flex justify-end print:hidden">
          <ProfilePrintButton />
        </div>

        {profile.short_bio && (
          <section className="cv-print-block rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 px-6 py-5 text-sm text-slate-800 dark:text-slate-200 print:px-4 print:py-3">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Profil
            </h2>
            <p className="whitespace-pre-line leading-relaxed">
              {profile.short_bio}
            </p>
          </section>
        )}

        {educations.length > 0 && (
          <section className="cv-print-block rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 px-6 py-5 text-sm text-slate-800 dark:text-slate-200 print:px-4 print:py-3">
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

        {featuredProjects.length > 0 && (
          <section className="cv-print-block rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 px-6 py-5 text-sm text-slate-800 dark:text-slate-200 print:px-4 print:py-3">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Projets principaux
            </h2>
            <ul className="space-y-3">
              {featuredProjects.map((project) => (
                <li key={project.id} className="space-y-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {project.title}
                    </p>
                    {project.stack_slug && (
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">
                        {project.stack_slug}
                      </p>
                    )}
                  </div>
                  {project.short_description && (
                    <p className="text-xs text-slate-700 dark:text-slate-300">
                      {project.short_description}
                    </p>
                  )}
                  {(project.github_url || project.demo_url) && (
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
                      {project.github_url && (
                        <a
                          href={normalizeExternalUrl(project.github_url)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-600 dark:text-emerald-300 hover:underline"
                        >
                          GitHub
                        </a>
                      )}
                      {project.demo_url && (
                        <a
                          href={normalizeExternalUrl(project.demo_url)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-600 dark:text-emerald-300 hover:underline"
                        >
                          Démo
                        </a>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {(profile.email || profile.phone || profile.github_url || profile.linkedin_url || profile.website_url) && (
          <section className="cv-print-block cv-print-links rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 px-6 py-5 text-sm text-slate-800 dark:text-slate-200 print:px-4 print:py-3">
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
                    <span>Email : </span>
                    <span className="cv-link-value">{profile.email}</span>
                  </a>
                </li>
              )}
              {profile.phone && (
                <li>
                  <a
                    href={`tel:${profile.phone}`}
                    className="text-emerald-600 dark:text-emerald-300 hover:underline"
                  >
                    <span>Téléphone : </span>
                    <span className="cv-link-value">{profile.phone}</span>
                  </a>
                </li>
              )}
              {profile.github_url && (
                <li>
                  <a
                    href={normalizeExternalUrl(profile.github_url)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 dark:text-emerald-300 hover:underline break-all"
                  >
                    <span>GitHub : </span>
                    <span className="cv-link-value">{profile.github_url}</span>
                  </a>
                </li>
              )}
              {profile.linkedin_url && (
                <li>
                  <a
                    href={normalizeExternalUrl(profile.linkedin_url)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 dark:text-emerald-300 hover:underline break-all"
                  >
                    <span>LinkedIn : </span>
                    <span className="cv-link-value">{profile.linkedin_url}</span>
                  </a>
                </li>
              )}
              {profile.website_url && (
                <li>
                  <a
                    href={normalizeExternalUrl(profile.website_url)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 dark:text-emerald-300 hover:underline break-all"
                  >
                    <span>Portfolio : </span>
                    <span className="cv-link-value">{profile.website_url}</span>
                  </a>
                </li>
              )}
            </ul>
          </section>
        )}

        {skills.length > 0 && (
          <section className="cv-print-block print-break-before rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 px-6 py-5 text-sm text-slate-800 dark:text-slate-200 print:px-4 print:py-3">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Compétences
            </h2>

            <div className="space-y-5 print:space-y-4">
              {(Object.keys(skillSections) as Array<keyof typeof skillSections>).map(
                (section) => {
                  const sectionSkills = skillSections[section]
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name));

                  if (sectionSkills.length === 0) return null;

                  return (
                    <div key={section}>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600 dark:text-slate-300">
                        {section}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-x-2 gap-y-2">
                        {sectionSkills.map((skill) => (
                          <SkillChip
                            key={skill.id}
                            name={skill.name}
                            showIcon={section !== "Qualités (soft skills)"}
                          />
                        ))}
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section className="cv-print-block rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 px-6 py-5 text-sm text-slate-800 dark:text-slate-200 print:px-4 print:py-3">
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
