import { MainNav } from "@/components/MainNav";
import { educations, languages, profile, skills } from "@/data/profile";

export default function ProfilePage() {
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
                {profile.phone && <li>Téléphone : {profile.phone}</li>}
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
                {profile.websiteUrl && (
                  <li>
                    Site web :
                    <a
                      href={profile.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-1 text-emerald-300 hover:underline"
                    >
                      {profile.websiteUrl}
                    </a>
                  </li>
                )}
              </ul>
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
                    <span className="text-xs text-slate-400">
                      {lang.level}
                    </span>
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
                { key: "language" as const, label: "Langages" },
                { key: "framework" as const, label: "Frameworks" },
                { key: "soft" as const, label: "Soft skills" },
                { key: "tool" as const, label: "Outils / Bases de données" },
              ].map((section) => {
                const sectionSkills = skills
                  .filter((skill) => skill.category === section.key)
                  .sort((a, b) => b.level - a.level); // du plus grand au plus petit

                if (sectionSkills.length === 0) return null;

                return (
                  <div key={section.key} className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                      {section.label}
                    </p>

                    <div className="space-y-2">
                      {sectionSkills.map((skill) => {
                        const baseColor =
                          skill.category === "language"
                            ? "bg-sky-400"
                            : skill.category === "framework"
                            ? "bg-violet-400"
                            : skill.category === "tool"
                            ? "bg-emerald-400"
                            : "bg-amber-400"; // soft

                        const levelLabel =
                          skill.level >= 85
                            ? "Niveau élevé"
                            : skill.level >= 70
                            ? "Niveau intermédiaire"
                            : "Niveau à renforcer";

                        return (
                          <div
                            key={skill.name}
                            className="space-y-1 text-sm"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-slate-100">
                                  {skill.name}
                                </p>
                                <p className="text-[11px] text-slate-400">
                                  {levelLabel}
                                </p>
                              </div>
                              <span className="text-xs text-slate-400">
                                {skill.level}%
                              </span>
                            </div>
                            <div className="h-2 rounded-full bg-slate-800/80">
                              <div
                                className={`${baseColor} h-2 rounded-full`}
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}