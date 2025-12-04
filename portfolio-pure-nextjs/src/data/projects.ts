export type Project = {
  id: number;
  title: string;
  stack: string;
  category: "backend" | "frontend" | "fullstack" | "mobile";
  shortDescription: string;
  githubUrl?: string;
  demoUrl?: string;
  coverImageUrl?: string;
};

export const projects: Project[] = [
  {
    id: 2,
    title: "Echeck-in Event - Système de Gestion d'Événements",
    stack: "Symfony + API mobile Flutter",
    category: "fullstack",
    shortDescription:
      "Solution numérique complète pour la gestion d'événements avec invitations électroniques, QR codes uniques et contrôle d'accès mobile (projet de stage de 3 mois).",
    githubUrl: "https://github.com/Bayane-max219/Echeck-in-Event",
    coverImageUrl: "/storage/project_media/gm30qOLjmziLNFBa0ENXLmam9a71mBLOxjFSO4QN.png",
  },
  {
    id: 3,
    title: "IT Project Management System",
    stack: "React + Django API",
    category: "fullstack",
    shortDescription:
      "Application web complète de gestion de projets IT avec système de pointage des employés et suivi client.",
    githubUrl: "https://github.com/Bayane-max219/IT-Project-Management-System",
    coverImageUrl: "/storage/project_media/WkKTJAgRFYeKPS9kzuskr0CFTcLpFXoG5Rl8UqST.png",
  },
  {
    id: 4,
    title: "SmartERP Pro - Système de Gestion de Stock",
    stack: "Vue.js 3 + Laravel API",
    category: "fullstack",
    shortDescription:
      "Un système ERP complet pour la gestion de stock et ventes, développé avec Vue.js 3 et Laravel (avec support localStorage pour fonctionnement hors-ligne).",
    githubUrl: "https://github.com/Bayane-max219/Gestion-de-stock",
    coverImageUrl: "/storage/project_media/C8btqwiI8BTPEFmCVRLVCk7NDiK3qV6rwVj1qZlp.png",
  },
  {
    id: 5,
    title: "Assistant intelligent de diagnostic automobile",
    stack: "Python (système expert)",
    category: "backend",
    shortDescription:
      "Mini-assistant pour mécaniciens réalisé dans le cadre d'une épreuve d'Intelligence Artificielle (système expert simplifié).",
    githubUrl: "https://github.com/Bayane-max219/Assistant_Inteligent_De_Diagnostic_Automobile",
    coverImageUrl: "/storage/project_media/LVBleI6nimTCk2bIeer8koUgtoEPGeLygAdGxLoY.png",
  },
  {
    id: 6,
    title: "Alliance Fitia Evangelique",
    stack: "React.js frontend",
    category: "frontend",
    shortDescription:
      "Application web pour l'Eglise Alliance Fitia Evangelique : gestion et diffusion de vidéos, audios et événements de l'Eglise.",
    githubUrl: "https://github.com/Bayane-max219/Alliance_Fitia_Evangelique",
    coverImageUrl: "/storage/project_media/ZSGxDmnAk5Kz97Y0uHmbpNvhbqrX9VtADEHxPznK.png",
  },
  {
    id: 7,
    title: "Docarya – Plateforme de prise de rendez-vous médicaux",
    stack: "Symfony (backend & frontend)",
    category: "fullstack",
    shortDescription:
      "Plateforme web permettant aux patients de prendre des rendez-vous auprès de professionnels de santé, avec interface d'administration pour la validation et le suivi.",
    githubUrl: "https://github.com/Bayane-max219/docarya-rdv-medical",
    coverImageUrl: "/storage/project_media/Y2IFdV7I68SH3yvCOuxmG95HqVcykJDzrJ87fNpN.png",
  },
  {
    id: 8,
    title: "EduMaster - School Management System",
    stack: "Laravel (gestion d'école)",
    category: "backend",
    shortDescription:
      "Solution Laravel complète de gestion scolaire (élèves, professeurs, classes, notes, paiements, emplois du temps) avec rôles sécurisés, génération PDF et reporting avancé.",
    githubUrl: "https://github.com/Bayane-max219/EduMaster-Gestion-Ecole",
    coverImageUrl: "/storage/project_media/gQ4cFGpKsdBLJku6EgKmsC99qopwAG0uV1vThBfx.png",
  },
  {
    id: 9,
    title: "HelloCode – Plateforme d’apprentissage de la programmation",
    stack: "React + Django API",
    category: "fullstack",
    shortDescription:
      "Plateforme web interactive pour apprendre la programmation (Python, JavaScript, Java, PHP, C#) avec leçons guidées, quiz et exercices de code exécutables en ligne.",
    githubUrl: "https://github.com/Bayane-max219/HelloCode-Plateforme",
    coverImageUrl: "/storage/project_media/L0qRcLIWXL6nN8bc4lkEBbfkIfZLRdkspYunKfop.png",
  },
  {
    id: 10,
    title: "Portfolio fullstack Laravel + Next.js",
    stack: "Next.js frontend + Laravel API",
    category: "fullstack",
    shortDescription:
      "Portfolio développeur fullstack : Laravel API + Next.js frontend, vitrine projets, profil CV et espace admin sécurisé.",
    githubUrl: "https://github.com/Bayane-max219/portfolio-fullstack-laravel-next",
    coverImageUrl: "/storage/project_media/B9El7uGtg5Tn0RpE8fSIKOX2VrYJWFZH5OyyJmqx.png",
  },
];
