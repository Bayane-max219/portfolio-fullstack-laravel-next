import { MainNav } from "@/components/MainNav";
import { educations, languages, profile, skills } from "@/data/profile";
import { projects } from "@/data/projects";
import {
  SiAngular,
  SiCss,
  SiDjango,
  SiDocker,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiSpring,
  SiSqlite,
  SiSwagger,
  SiSymfony,
  SiVuedotjs,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

type SkillIconDefinition = {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color?: string;
};

function getSkillIconDefinition(name: string): SkillIconDefinition | null {
  const n = name.trim().toLowerCase();

  const map: Record<string, SkillIconDefinition> = {
    "html": { icon: SiHtml5, color: "#e34f26" },
    "html/css": { icon: SiHtml5, color: "#e34f26" },
    "css": { icon: SiCss, color: "#1572B6" },
    "javascript": { icon: SiJavascript, color: "#F7DF1E" },
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
    "spring boot": { icon: SiSpring, color: "#6DB33F" },
    "spring": { icon: SiSpring, color: "#6DB33F" },
    "symfony": { icon: SiSymfony, color: "#ffffff" },
    "vue.js": { icon: SiVuedotjs, color: "#4FC08D" },
    "vue": { icon: SiVuedotjs, color: "#4FC08D" },

    "mysql": { icon: SiMysql, color: "#4479A1" },
    "postgresql": { icon: SiPostgresql, color: "#4169E1" },
    "sqlite": { icon: SiSqlite, color: "#003B57" },
    "mongodb": { icon: SiMongodb, color: "#47A248" },

    "docker": { icon: SiDocker, color: "#2496ED" },
    "git / github": { icon: SiGithub, color: "#ffffff" },
    "git": { icon: SiGit, color: "#F05032" },
    "github": { icon: SiGithub, color: "#ffffff" },
    "postman / swagger": { icon: SiPostman, color: "#FF6C37" },
    "postman": { icon: SiPostman, color: "#FF6C37" },
    "swagger": { icon: SiSwagger, color: "#85EA2D" },
  };

  return map[n] ?? null;
}

function SkillChip({ name, showIcon }: { name: string; showIcon: boolean }) {
  const n = name.trim().toLowerCase();
  const isHtmlCss = showIcon && (n === "html/css" || n === "html css");

  const def = showIcon ? getSkillIconDefinition(name) : null;
  const Icon = def?.icon;

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/60 px-2.5 py-1 text-xs text-slate-200">
      {isHtmlCss ? (
        <>
          <SiHtml5 className="h-4 w-4" style={{ color: "#e34f26" }} />
          <SiCss className="h-4 w-4" style={{ color: "#1572B6" }} />
        </>
      ) : (
        Icon && <Icon className="h-4 w-4" style={def?.color ? { color: def.color } : undefined} />
      )}
      <span>{name}</span>
    </span>
  );
}

export default function ProfilePage() {
  const mainFrameworks = new Set(["laravel", "react", "react.js", "next.js", "nextjs"]);
  const databaseNames = new Set(["mysql", "postgresql", "sqlite", "mongodb"]);

  const languageSkills = skills
    .filter((s) => s.category === "language")
    .map((s) => s.name)
    .sort((a, b) => a.localeCompare(b));

  const frameworkSkills = skills
    .filter((s) => s.category === "framework")
    .map((s) => s.name);

  const mainFrameworkSkills = frameworkSkills
    .filter((name) => mainFrameworks.has(name.trim().toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  const otherFrameworkSkills = frameworkSkills
    .filter((name) => !mainFrameworks.has(name.trim().toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  const toolSkillsRaw = skills
    .filter((s) => s.category === "tool")
    .map((s) => s.name);

  const databaseSkills = toolSkillsRaw
    .filter((name) => databaseNames.has(name.trim().toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  const toolSkills = toolSkillsRaw
    .filter((name) => !databaseNames.has(name.trim().toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  const softSkills = skills
    .filter((s) => s.category === "soft")
    .map((s) => s.name)
    .sort((a, b) => a.localeCompare(b));

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-72 w-72 rounded-[999px] bg-[conic-gradient(from_180deg,rgba(250,204,21,0.9),rgba(34,197,94,0.9),rgba(56,189,248,0.9),rgba(129,140,248,0.9))] blur-3xl opacity-40" />
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-[999px] bg-[conic-gradient(from_0deg,rgba(56,189,248,0.9),rgba(236,72,153,0.9),rgba(249,115,22,0.9))] blur-3xl opacity-40" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <MainNav />

        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-10">
          {/* Header profil */}
          <section className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex-shrink-0">
              <div className="h-28 w-28 overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900 shadow-lg shadow-black/50">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xl font-semibold text-slate-200">
                    {profile.fullName
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/80">
                Profil
              </p>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
                {profile.fullName}
              </h1>
              <p className="text-sm font-medium text-emerald-300/90">
                {profile.title}
              </p>
              <p className="text-sm text-slate-300/90">{profile.location}</p>
            </div>
          </section>

          {/* Profil + coordonnées */}
          <section className="grid gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <article className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-900/80 px-5 py-5 text-sm shadow-sm shadow-black/40">
              <h2 className="text-base font-semibold text-slate-50">Profil</h2>
              <p className="text-sm leading-relaxed text-slate-200/90">
                {profile.shortBio}
              </p>
            </article>

            <article className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-900/80 px-5 py-5 text-sm shadow-sm shadow-black/40">
              <h2 className="text-base font-semibold text-slate-50">
                Coordonnées
              </h2>
              <ul className="space-y-1 text-sm text-slate-200/90">
                {profile.email && <li>Email : {profile.email}</li>}
                {profile.githubUrl && (
                  <li>
                    GitHub :
                    <a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-1 text-emerald-300 hover:underline"
                    >
                      {profile.githubUrl}
                    </a>
                  </li>
                )}
                {profile.linkedinUrl && (
                  <li>
                    LinkedIn :
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-1 text-emerald-300 hover:underline"
                    >
                      {profile.linkedinUrl}
                    </a>
                  </li>
                )}
              </ul>
              <div className="pt-3">
                <a
                  href="/storage/Bayane_Miguel_Singcol_CV.pdf"
                  download
                  className="inline-flex items-center rounded-full border border-emerald-400/80 bg-emerald-500/90 px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-sm hover:bg-emerald-400/90"
                >
                  Télécharger le CV (PDF)
                </a>
              </div>
            </article>
          </section>

          {/* Formations + langues */}
          <section className="grid gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <article className="space-y-4 rounded-2xl border border-slate-800/80 bg-slate-900/80 px-5 py-5 text-sm shadow-sm shadow-black/40">
              <h2 className="text-base font-semibold text-slate-50">
                Formations
              </h2>
              <ul className="space-y-3">
                {educations.map((edu, index) => (
                  <li key={index} className="space-y-1">
                    <p className="text-sm font-medium text-slate-100">
                      {edu.school}
                    </p>
                    <p className="text-xs text-slate-300/90">{edu.degree}</p>
                    <p className="text-[11px] text-slate-400">
                      {edu.startYear}{" "}
                      {edu.endYear && <>- {edu.endYear}</>}
                      {edu.location && <> · {edu.location}</>}
                    </p>
                  </li>
                ))}
              </ul>
            </article>

            <article className="space-y-4 rounded-2xl border border-slate-800/80 bg-slate-900/80 px-5 py-5 text-sm shadow-sm shadow-black/40">
              <h2 className="text-base font-semibold text-slate-50">
                Langues
              </h2>
              <ul className="space-y-2">
                {languages.map((lang, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-slate-200/90">{lang.name}</span>
                  </li>
                ))}
              </ul>
            </article>
          </section>

          {/* Compétences */}
          <section className="space-y-4 pb-8">
            <h2 className="text-base font-semibold text-slate-50">
              Compétences
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                { title: "Langages", items: languageSkills },
                { title: "Frameworks principaux", items: mainFrameworkSkills },
                { title: "Autres frameworks utilisés", items: otherFrameworkSkills },
                { title: "Bases de données", items: databaseSkills },
                { title: "Outils & environnements", items: toolSkills },
                { title: "Qualités (soft skills)", items: softSkills },
              ]
                .filter((group) => group.items.length > 0)
                .map((group) => (
                  <div key={group.title} className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                      {group.title}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((name) => (
                        <SkillChip
                          key={name}
                          name={name}
                          showIcon={group.title !== "Qualités (soft skills)"}
                        />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* Projets principaux */}
          <section className="space-y-4 pb-8">
            <h2 className="text-base font-semibold text-slate-50">
              Projets principaux
            </h2>

            <div className="grid gap-4">
              {projects.slice(0, 4).map((project) => (
                <article
                  key={project.id}
                  className="rounded-2xl border border-slate-800/80 bg-slate-900/80 px-5 py-4 text-sm shadow-sm shadow-black/40"
                >
                  <p className="text-sm font-semibold text-slate-50">
                    {project.title}
                  </p>
                  <p className="text-xs text-slate-300/90 mt-1">
                    {project.stack}
                  </p>
                  <p className="text-sm text-slate-200/90 mt-2">
                    {project.shortDescription}
                  </p>

                  {(project.githubUrl || project.demoUrl) && (
                    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-300 hover:underline"
                        >
                          GitHub
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-300 hover:underline"
                        >
                          Démo
                        </a>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}