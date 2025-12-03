# Portfolio Fullstack – Laravel API & Next.js

Portfolio personnel de développeur fullstack avec :

- **Backend** : API REST Laravel (profil, projets, certificats)
- **Frontend** : Next.js (vitrine projets, page profil / CV, admin)
- **Base de données** : MySQL (dump d'exemple inclus)

---

## 🔧 Stack technique

- **Backend** : PHP 8 · Laravel
- **Frontend** : Next.js (React) · TypeScript
- **Base de données** : MySQL
- **UI** : Tailwind CSS, design sombre/clair, responsive

---

## ✨ Fonctionnalités principales

- **Vitrine publique des projets**
  - Projets classés par stack (Laravel, React, Django, Next.js, etc.)
  - Détails des projets : description, liens GitHub, captures d'écran
  - Relevés de notes, diplômes et certificats affichés proprement

- **Profil / CV en ligne**
  - Photo de profil, titre, résumé, formations
  - Compétences avec barres de progression par catégorie
  - Langues
  - Liens de contact : email, téléphone, GitHub, LinkedIn, Facebook, site web
  - Bouton d'export **PDF** en conservant le thème (clair/sombre)

- **Espace administration**
  - Connexion admin
  - Tableau de bord
  - Gestion des projets et des captures
  - Gestion des certificats (relevés, diplômes, attestations)
  - Gestion du profil (informations générales, contact, formations, compétences, langues)

---

## 🗄️ Données d'exemple (MySQL)

Un dump MySQL est fourni pour reproduire les données de démonstration :

```text
backend/database/portfolio_fullstack.sql
```

Ce fichier contient :

- Les projets de la vitrine
- Les médias des projets (captures, vidéos)
- Les certificats (relevés, diplômes, attestations)
- Le profil utilisé sur la page `/profile`

À importer via **phpMyAdmin** dans une base `portfolio_fullstack` (ou autre, en adaptant `.env`).

---

## 📸 Captures d'écran

Les captures sont dans le dossier :

```text
screenshoots/
```

### Aperçu visuel

#### 01 – Accueil
![01 – Accueil](screenshoots/01-Acueil.png)

#### 02 – Vitrine – Projets par stack
![02 – Vitrine – Projets par stack](screenshoots/02-Vitrine_Projet.png)

#### 03 – Vitrine – Relevés de notes
![03 – Vitrine – Relevés de notes](screenshoots/03-Vitrine_Releve_Note.png)

#### 04 – Vitrine – Certificats & attestations
![04 – Vitrine – Certificats & attestations](screenshoots/04-Vitrine_Certificat.png)

#### 05 – Profil – CV (vue principale)
![05 – Profil – CV (vue principale)](screenshoots/05-Profil.png)

#### 06 – Profil – CV (suite / bas de page)
![06 – Profil – CV (suite / bas de page)](screenshoots/06-Profil_suite.png)

#### 07 – Connexion admin
![07 – Connexion admin](screenshoots/07-Connexion_Admin.png)

#### 08 – Tableau de bord admin
![08 – Tableau de bord admin](screenshoots/08-Tableau_de_bord_Admin.png)

#### 09 – Création d'un projet dans l'admin
![09 – Création d'un projet dans l'admin](screenshoots/09-Creation_projet_Admin.png)

#### 10 – Ajout des captures d'écran d'un projet
![10 – Ajout des captures d'écran d'un projet](screenshoots/10-Ajout_des_captures.png)

#### 11 – Ajout d'un diplôme / certificat
![11 – Ajout d'un diplôme / certificat](screenshoots/11-Ajout_diplome_Admin.png)

#### 12 – Édition des informations du profil
![12 – Édition des informations du profil](screenshoots/12-Ajout_Profil.png)

#### 13 – Détails d'un projet sur la vitrine
![13 – Détails d'un projet sur la vitrine](screenshoots/13-Details_Projet_Vitrine.png)

---

## 🚀 Lancement en local

### 1. Backend Laravel

```bash
cd backend
cp .env.example .env   # si nécessaire
# Adapter .env pour votre MySQL local (DB_DATABASE, DB_USERNAME, DB_PASSWORD)
php artisan key:generate
php artisan migrate    # si vous n'importez pas déjà le dump SQL
php artisan serve
```

L'API sera disponible sur `http://127.0.0.1:8000/api` (ou selon votre config).

### 2. Frontend Next.js

```bash
cd frontend
npm install
# ou: pnpm install / yarn install

# Adapter le fichier .env.local si besoin
# NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api

npm run dev
```

Le frontend sera accessible sur `http://localhost:3000`.

---

## 🔐 Sécurité & bonnes pratiques

- Les fichiers d'environnement (`.env`, `.env.local`, etc.) sont exclus du dépôt via `.gitignore`.
- Le dump SQL ne contient pas de mots de passe applicatifs sensibles (uniquement des données de démonstration pour la vitrine et le profil).

Ce dépôt est donc adapté pour un **portfolio public GitHub** (CV technique).
