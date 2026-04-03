export type Education = {
  school: string;
  degree: string;
  location?: string;
  startYear?: number;
  endYear?: number | "en cours";
};

export type Skill = {
  name: string;
  category: "language" | "framework" | "tool" | "soft" | "cms";
  level: number;
};

export type Language = {
  name: string;
  level: string;
};

export type Profile = {
  fullName: string;
  title: string;
  location: string;
  shortBio: string;
  avatarUrl?: string;
  email?: string;
  phone?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
};

export const profile: Profile = {
  fullName: "BAYANE Miguel Singcol",
  title: "Développeur Web Fullstack & CMS (Laravel, React, Next.js, WordPress)",
  location: "Antananarivo, Madagascar",
  shortBio: `Développeur Web Fullstack basé à Antananarivo, spécialisé en Laravel, React et Next.js, avec une expertise CMS en WordPress (thèmes custom, WooCommerce, CPT, AJAX) et Shopify.
Expérience dans la création d’applications web, d’API REST et de sites CMS avec plusieurs projets réalisés (ERP, e-learning, gestion d’événements, sites WordPress déployés).
Motivé, autonome et passionné par le développement d’applications modernes.`,
  avatarUrl: "/storage/avatars/JdZFcxVEOIfpjIwwsiOTpC3UkcAGQZJNxgX0WtsH.jpg",
  email: "baymi312@gmail.com",
  phone: "0348349886",
  githubUrl: "https://github.com/Bayane-max219",
  linkedinUrl: "https://www.linkedin.com/in/miguel-singcol-bayane",
  websiteUrl: "https://miguel-next-portfolio.vercel.app/",
};

export const educations: Education[] = [
  {
    school: "ESMIA Innovation",
    degree: "Licence – Informatique Risques et Décision (IRD)",
    location: "Antananarivo, Madagascar",
    startYear: 2023,
    endYear: 2026,
  },
  {
    school: "ENEAM IVATO",
    degree: "Licence – Pilote Avion Privé",
    location: "Antananarivo, Madagascar",
    startYear: 2020,
    endYear: 2023,
  },
  {
    school: "Collège Sacré Coeur Tsianaloka (Tuléar)",
    degree: "Baccalauréat – Série D",
    location: "Tuléar, Madagascar",
    startYear: 2019,
    endYear: 2020,
  },
];

export const skills: Skill[] = [
  { name: "PHP", category: "language", level: 90 },
  { name: "JavaScript", category: "language", level: 85 },
  { name: "Java", category: "language", level: 85 },
  { name: "Python", category: "language", level: 75 },
  { name: "HTML/CSS", category: "language", level: 90 },

  { name: "MySQL", category: "tool", level: 80 },
  { name: "PostgreSQL", category: "tool", level: 80 },
  { name: "SQLite", category: "tool", level: 80 },
  { name: "MongoDB", category: "tool", level: 75 },

  { name: "Laravel", category: "framework", level: 85 },
  { name: "Django", category: "framework", level: 80 },
  { name: "React.js", category: "framework", level: 90 },
  { name: "Spring Boot", category: "framework", level: 85 },
  { name: "Symfony", category: "framework", level: 85 },
  { name: "Vue.js", category: "framework", level: 85 },
  { name: "Angular", category: "framework", level: 85 },

  { name: "WordPress", category: "cms", level: 85 },
  { name: "Shopify", category: "cms", level: 70 },
  { name: "Git / GitHub", category: "tool", level: 85 },
  { name: "Postman / Swagger", category: "tool", level: 75 },
  { name: "Docker", category: "tool", level: 75 },
  { name: "Résolution de problèmes", category: "soft", level: 85 },
  { name: "Travail en équipe", category: "soft", level: 75 },
  { name: "Apprentissage rapide", category: "soft", level: 90 },
  { name: "Communication technique", category: "soft", level: 70 },
];

export const languages: Language[] = [
  { name: "Français", level: "Intermédiaire" },
  { name: "Malgache", level: "Courant" },
  { name: "Anglais", level: "Débutant" },
  { name: "Chinois (HSK2)", level: "Débutant" },
];
