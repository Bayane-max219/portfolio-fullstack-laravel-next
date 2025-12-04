export type Education = {
  school: string;
  degree: string;
  location?: string;
  startYear?: number;
  endYear?: number | "en cours";
};

export type Skill = {
  name: string;
  category: "language" | "framework" | "tool" | "soft";
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
  title: "Développeur Web Fullstack (Laravel, React, Next.js)",
  location: "Antananarivo, Madagascar",
  shortBio: `Développeur Web Fullstack basé à Antananarivo, spécialisé en Laravel, React, Next.js, Django et création d’API REST. Formé en Informatique – Risques et Décision (ESMIA), avec plusieurs projets web réalisés (ERP, gestion d’événements, e-learning, rendez-vous médicaux, management de projet…).

J’ai effectué des stages en développement web (2 mois + 3 mois) et un stage de 3 mois au Call Center Accès Banque, renforçant mes compétences techniques et professionnelles.

Motivé, autonome et capable de travailler sur des applications modernes, je suis ouvert aux opportunités à Antananarivo pour évoluer en tant que Développeur Fullstack.`,
  avatarUrl: "/storage/avatars/JdZFcxVEOIfpjIwwsiOTpC3UkcAGQZJNxgX0WtsH.jpg",
  email: "baymi312@gmail.com",
  phone: "0348349886",
  githubUrl: "https://github.com/Bayane-max219",
  linkedinUrl: "https://www.linkedin.com/in/miguel-singcol-bayane",
  websiteUrl: "",
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
  { name: "TypeScript", category: "language", level: 75 },
  { name: "Python", category: "language", level: 75 },
  { name: "HTML/CSS", category: "language", level: 90 },
  { name: "SQL (MySQL, PostgreSQL, SQLite)", category: "tool", level: 80 },
  { name: "Laravel", category: "framework", level: 85 },
  { name: "Symfony", category: "framework", level: 85 },
  { name: "Django", category: "framework", level: 80 },
  { name: "React Native", category: "framework", level: 90 },
  { name: "Vue.js", category: "framework", level: 85 },
  { name: "Next.js", category: "framework", level: 85 },
  { name: "Git / GitHub", category: "tool", level: 85 },
  { name: "Postman", category: "tool", level: 75 },
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
