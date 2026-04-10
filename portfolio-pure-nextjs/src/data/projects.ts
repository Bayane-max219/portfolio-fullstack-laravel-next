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
    id: 22,
    title: "Talanty MG — Marketplace Freelance Madagascar",
    stack: "Spring Boot + Node.js + Next.js + Docker",
    category: "fullstack",
    shortDescription:
      "Marketplace de services freelance pour Madagascar — Architecture 3 couches : Spring Boot (API données) + Node.js (logique métier) + Next.js (frontend) | PostgreSQL + Docker.",
    githubUrl: "https://github.com/Bayane-max219/talanty-mg",
    coverImageUrl: "/storage/project_media/01-talenty.png",
  },
  {
    id: 23,
    title: "GPS Fleet Management — Simulation Traccar",
    stack: "Traccar + Docker + MariaDB + OsmAnd",
    category: "fullstack",
    shortDescription:
      "Simulation de gestion de flotte GPS avec Traccar, Docker, MariaDB et le protocole OsmAnd — suivi de 5 véhicules en temps réel à Antananarivo, Madagascar.",
    githubUrl: "https://github.com/Bayane-max219/traccar-fleet-simulation",
    coverImageUrl: "/storage/project_media/02-Gps.png",
  },
  {
    id: 24,
    title: "Lumine — Thème Shopify OS 2.0 Custom",
    stack: "Shopify Liquid — OS 2.0",
    category: "fullstack",
    shortDescription:
      "Thème Shopify OS 2.0 100% custom en Liquid — boutique fashion : sections dynamiques, variantes produits, AJAX add-to-cart & cart drawer, UI responsive, optimisé performance et SEO. Démo protégée par mot de passe : yeedow.",
    githubUrl: "https://github.com/Bayane-max219/lumine-shopify-theme",
    demoUrl: "https://lumine-fashion-store.myshopify.com/",
    coverImageUrl: "/storage/project_media/03-Shopify.png",
  },
  {
    id: 18,
    title: "Église Alliance Évangélique — Thème WordPress Custom",
    stack: "WordPress Custom Theme — PHP, JS, MySQL",
    category: "fullstack",
    shortDescription:
      "Thème WordPress 100% custom pour une église : événements hebdomadaires (CPT + meta boxes), annonces avec expiration automatique, galerie photos (max 7/semaine), message YouTube/SoundCloud, carte Google Maps, interface admin dédiée.",
    githubUrl: "https://github.com/Bayane-max219/eglise-alliance-evangelique-wordpress",
    demoUrl: "https://eglise-alliance-evangelique.infinityfreeapp.com",
    coverImageUrl: "/storage/project_media/wp-alliance-evangelique.png",
  },
  {
    id: 19,
    title: "Immo Tana — Thème WordPress Immobilier Custom",
    stack: "WordPress Custom Theme — PHP OOP, AJAX, WP_Query",
    category: "fullstack",
    shortDescription:
      "Thème WordPress immobilier 100% custom : CPT bien_immo, taxonomies (type_bien, quartier), CRUD backend complet, AJAX filter sans rechargement, formulaire contact sauvegardé en DB, intégration WhatsApp, design Navy + Gold.",
    githubUrl: "https://github.com/Bayane-max219/immo-tana",
    demoUrl: "https://immo-tana.infinityfreeapp.com",
    coverImageUrl: "/storage/project_media/wp-immo-tana.png",
  },
  {
    id: 20,
    title: "Tany Hatsaka — Boutique WooCommerce Custom",
    stack: "WordPress + WooCommerce — PHP, AJAX, Schema.org",
    category: "fullstack",
    shortDescription:
      "Boutique e-commerce d'artisanat malgache : WooCommerce custom (template overrides), AJAX filter + pagination, CPT Artisan, mini-cart temps réel, checkout complet, SEO Schema.org JSON-LD, performance optimisée.",
    githubUrl: "https://github.com/Bayane-max219/tany-hatsaka",
    demoUrl: "https://tany-hatsaka.infinityfreeapp.com",
    coverImageUrl: "/storage/project_media/wp-tany-hatsaka.png",
  },
  {
    id: 21,
    title: "MediCare Tana — Thème WordPress Clinique Médicale",
    stack: "WordPress Custom Theme — PHP, Fetch API, CPT",
    category: "fullstack",
    shortDescription:
      "Thème WordPress pour clinique médicale : CPT Médecins et Rendez-vous, formulaire AJAX sécurisé (nonce), stockage en DB, navigation responsive, animations scroll, SEO meta auto, Google Maps intégré.",
    githubUrl: "https://github.com/Bayane-max219/medicare-tana-wp-theme",
    demoUrl: "http://medicare-tana.infinityfreeapp.com",
    coverImageUrl: "/storage/project_media/wp-medicare-tana.png",
  },
  {
    id: 2,
    title: "Echeck-in Event - Système de Gestion d'Événements",
    stack: "Symfony 6.3 + Flutter + Docker",
    category: "fullstack",
    shortDescription:
      "Plateforme de gestion d'événements conteneurisée avec Docker (Symfony 6.3 + MySQL + Nginx) : invitations électroniques, QR codes uniques, contrôle d'accès mobile Flutter (projet de stage de 3 mois).",
    githubUrl: "https://github.com/Bayane-max219/Echeck-in-Event",
    coverImageUrl: "/storage/project_media/gm30qOLjmziLNFBa0ENXLmam9a71mBLOxjFSO4QN.png",
  },
  {
    id: 3,
    title: "IT Project Management System",
    stack: "React + Django API + Docker",
    category: "fullstack",
    shortDescription:
      "Application web fullstack conteneurisée avec Docker (React + Django REST API + PostgreSQL + Nginx) : gestion de projets IT, suivi des clients et pointage des employés.",
    githubUrl: "https://github.com/Bayane-max219/IT-Project-Management-System",
    coverImageUrl: "/storage/project_media/WkKTJAgRFYeKPS9kzuskr0CFTcLpFXoG5Rl8UqST.png",
  },
  {
    id: 4,
    title: "SmartERP Pro - Système de Gestion de Stock",
    stack: "Vue.js 3 + Laravel API + Docker",
    category: "fullstack",
    shortDescription:
      "ERP web fullstack conteneurisé avec Docker (Vue.js 3 + Laravel API + MySQL + Nginx) : gestion des stocks, point de vente, reporting et support hors ligne (localStorage).",
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
  {
    id: 11,
    title: "Gestion de stock – Java Swing",
    stack: "Java Swing + Hibernate + MySQL",
    category: "fullstack",
    shortDescription:
      "Application de gestion de stock de type vitrine recruteur : interface moderne, gestion des produits et mouvements de stock, rapports, authentification et tests unitaires.",
    githubUrl: "https://github.com/Bayane-max219/Gestion_Stock_Java_Swing",
    coverImageUrl: "/storage/project_media/03_Java_swing.jpg",
  },
  {
    id: 12,
    title: "Gestion de budget personnelle",
    stack: "C# / .NET 8 WinForms + SQLite",
    category: "fullstack",
    shortDescription:
      "Application de gestion de budget personnelle : comptes utilisateurs séparés avec revenus, dépenses et soldes isolés par utilisateur.",
    githubUrl: "https://github.com/Bayane-max219/Gestion_Portefeuil",
    coverImageUrl: "/storage/project_media/03-Gestion_portefeuil.jpg",
  },
  {
    id: 13,
    title: "Outage Alerts MG – suivi des coupures",
    stack: "Angular 17 + NestJS API + Docker",
    category: "fullstack",
    shortDescription:
      "Plateforme conteneurisée avec Docker (Angular 17 + NestJS + SQLite) : suivi des coupures d'électricité et d'eau inspiré du contexte JIRAMA, avec rôles (client, agent, admin) et API REST.",
    githubUrl: "https://github.com/Bayane-max219/outage-alerts-mg",
    coverImageUrl: "/storage/project_media/01-Outage_Jirama.jpg",
  },
  {
    id: 14,
    title: "Alerte Communautaire Cyclone & Sécurité",
    stack: "Express.js API + Angular frontend",
    category: "fullstack",
    shortDescription:
      "Application web full stack pour la diffusion d'alertes cyclone, pluie, inondation et sécurité partagées par la communauté et des contributeurs de confiance.",
    githubUrl: "https://github.com/Bayane-max219/Alerte_Communautaire_Cyclone_Securite",
    coverImageUrl: "/storage/project_media/01-Alerte_cyclone.png",
  },
  {
    id: 15,
    title: "Gestion de réservation de salles",
    stack: "Java Swing + MongoDB",
    category: "fullstack",
    shortDescription:
      "Application de réservation (admin / client) : CRUD des salles, réservations avec vérification des conflits d’horaires, paiements partiels et blocage en cas de solde impayé.",
    githubUrl:
      "https://github.com/Bayane-max219/reservation-chambres-swing-mongodb?tab=readme-ov-file",
    coverImageUrl: "/storage/project_media/04-Ajout_Chambre.jpg",
  },
  {
    id: 16,
    title: "Gestion de parkings & réservations",
    stack: "Spring Boot 3 + Angular + MySQL",
    category: "fullstack",
    shortDescription:
      "Application avec authentification JWT et rôles (ADMIN / OWNER / CLIENT) : gestion des parkings, réservations, statut payé/confirmé et revenus (jour/semaine/mois) côté propriétaire.",
    githubUrl:
      "https://github.com/Bayane-max219/Gestion_Parking_Spring_Boot_-_Angular",
    coverImageUrl:
      "/storage/project_media/03-Tableau_de_bord_proprietaire.png",
  },
  {
    id: 17,
    title: "ERP universitaire (mini-système)",
    stack: "JEE + JPA + JSF + Docker",
    category: "fullstack",
    shortDescription:
      "Mini-système ERP pour la gestion universitaire, avec stack JEE/JPA/JSF et conteneurisation Docker.",
    githubUrl: "https://github.com/Bayane-max219/Gestion-universitaire-ERP",
    coverImageUrl: "/storage/project_media/02-Dashboard_admin.png",
  },
];
