-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 03 déc. 2025 à 10:14
-- Version du serveur : 8.0.31
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `portfolio_fullstack`
--

-- --------------------------------------------------------

--
-- Structure de la table `cache`
--

DROP TABLE IF EXISTS `cache`;
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `certificates`
--

DROP TABLE IF EXISTS `certificates`;
CREATE TABLE IF NOT EXISTS `certificates` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `issuer` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `issued_at` date DEFAULT NULL,
  `image_path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_order` smallint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `certificates_user_id_foreign` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `certificates`
--

INSERT INTO `certificates` (`id`, `user_id`, `title`, `issuer`, `type`, `issued_at`, `image_path`, `display_order`, `created_at`, `updated_at`) VALUES
(1, 1, 'Relevé de note S1', 'ESMIA', 'releve', '2024-02-19', 'certificates/hWAzVGGTR5y6vziHrcpf5XhjoGBvM1Y4OWTJBG5M.jpg', 1, '2025-11-30 09:09:56', '2025-11-30 09:09:56'),
(2, 1, 'Relevé de notes S2', 'ESMIA', 'releve', '2024-05-03', 'certificates/bSBTkMtf6BJrqk2fb7rjBYToC9XKWJPmE5DqPdXe.jpg', 2, '2025-11-30 09:16:51', '2025-11-30 09:16:51'),
(3, 1, 'Relevé de notes S3', 'ESMIA', 'releve', '2025-01-10', 'certificates/4Ug030qtKAqF1mew1QJV1zsvjuEWeM7y0M6ATmJn.jpg', 3, '2025-11-30 09:18:21', '2025-11-30 09:18:21'),
(4, 1, 'Relevé de notes S4', 'ESMIA', 'releve', '2025-01-10', 'certificates/iNAMSuPp5CwxOsQ13jWXGahWwGgpIB1j5Zp9N9pr.jpg', 4, '2025-11-30 09:19:20', '2025-11-30 10:13:13'),
(6, 1, 'Certificat Comptabilité Général et informatisé', 'CFPM', 'certificat', '2023-10-13', 'certificates/SK86rMPfmN69KrUtyKcrChTQllC40uvWJCZOQz4I.jpg', 5, '2025-11-30 10:16:08', '2025-11-30 10:16:08'),
(7, 1, 'Attestation de Stage', 'RandevTeam', 'attestation', '2025-01-09', 'certificates/VPJDqpmuBfQNF4TIaeRKE7GmMNoJvKUMWs0GnFV0.jpg', 6, '2025-11-30 10:25:41', '2025-11-30 10:25:41'),
(8, 1, 'Certificat de Stage', 'Teko', 'certificat', '2025-06-04', 'certificates/ApCP4CSXbfXvmhHNQvNY6zLtGxQZuaLbT3baF7v9.jpg', 7, '2025-11-30 10:28:57', '2025-11-30 10:28:57'),
(9, 1, 'Attestation Formation en Informatique Bureautique', 'Help Education', 'attestation', '2025-02-14', 'certificates/EBI02Fct4x6uhVoDcd6I8eZA7ulGPKKJ4lloJZAM.jpg', 8, '2025-11-30 10:31:08', '2025-11-30 10:31:08'),
(10, 1, 'Attestation Formation en Operateur de Saisie', 'Help Education', 'attestation', '2025-02-14', 'certificates/J9lo7n24M2gkvZPRxbC1bZ9gLdcAM7mFNTFvvKcL.jpg', 9, '2025-11-30 10:32:07', '2025-11-30 10:32:07'),
(11, 1, 'Certificat  de Pasteur', 'Eglise Rhema de Madagascar', 'certificat', '2023-09-09', 'certificates/e1Oq7aUX4tGmBbT7EusndJCuJ7GlwnEDWPsmByAZ.jpg', 10, '2025-11-30 10:34:03', '2025-11-30 10:34:03'),
(12, 1, 'Certificat de Stage', 'Accès Bannque', 'certificat', '2004-06-03', 'certificates/MP4cggA1LmxIlSPtJeu5kDq6FrHCD7Czw76SSOGH.jpg', 11, '2025-11-30 10:35:35', '2025-11-30 10:35:35'),
(13, 1, 'HSK Test Level 2', 'CFPM', 'autre', '2023-11-18', 'certificates/qZdcm93IcfzrprZAPuxCxrPy22CF0UN9PXwK6jML.jpg', 12, '2025-11-30 10:37:25', '2025-11-30 10:37:25'),
(14, 1, 'Relevé de note S5', 'ESMIA', 'releve', '2025-06-20', 'certificates/3lAcGkWBSTY1kmegwoG9v6xPHDmtCFOJavT23IV8.jpg', 13, '2025-12-02 04:11:57', '2025-12-02 04:11:57'),
(15, 1, 'Relevé de note S6', 'ESMIA', 'releve', '2025-11-27', 'certificates/n5HuBL49m6Q1yiNmdQMLigziR3gCVeD2oj238XMN.jpg', 14, '2025-12-02 04:13:32', '2025-12-02 04:13:32'),
(16, 1, 'Relevé de note Pilote Privé (PPL)', 'ENEAM', 'releve', '2023-05-09', 'certificates/jkYk1awPW35aJdnhFedXFxiqX6bDuRJTtmreF1dI.jpg', 15, '2025-12-02 04:15:45', '2025-12-02 04:15:45');

-- --------------------------------------------------------

--
-- Structure de la table `educations`
--

DROP TABLE IF EXISTS `educations`;
CREATE TABLE IF NOT EXISTS `educations` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `institution` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `degree` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `field` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_year` smallint UNSIGNED DEFAULT NULL,
  `end_year` smallint UNSIGNED DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `educations_user_id_foreign` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `educations`
--

INSERT INTO `educations` (`id`, `user_id`, `institution`, `degree`, `field`, `start_year`, `end_year`, `description`, `created_at`, `updated_at`) VALUES
(1, 1, 'ESMIA Innovation', 'Licence', 'Informatique Risque et Décision (IRD)', 2023, 2026, 'Programmation, développement d’applications web, systèmes d’information, bases de données et mathématiques décisionnelles.', '2025-11-30 12:57:16', '2025-11-30 12:57:16'),
(2, 1, 'ENEAM IVATO', 'Licence', 'Pilote Avion Privé', 2020, 2023, 'Formation complète couvrant la théorie du pilotage, la mécanique du vol, la météorologie, la planification de vol, la sécurité aérienne ainsi que les heures pratiques de pilotage pour l’obtention du brevet de pilote privé.', '2025-11-30 13:20:18', '2025-11-30 13:20:18'),
(3, 1, 'Collège Sacré Coeur Tsianaloka (Tuléar)', 'Baccalauréat', 'Série D', 2019, 2020, 'Formation orientée vers les sciences naturelles et les mathématiques appliquées, avec un renforcement en biologie, chimie et physique. Participation régulière aux travaux pratiques et projets scolaires, développant ainsi une bonne capacité d’analyse et de résolution de problèmes.', '2025-11-30 13:22:51', '2025-11-30 13:22:51');

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `languages`
--

DROP TABLE IF EXISTS `languages`;
CREATE TABLE IF NOT EXISTS `languages` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `languages_user_id_foreign` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `languages`
--

INSERT INTO `languages` (`id`, `user_id`, `name`, `level`, `created_at`, `updated_at`) VALUES
(1, 1, 'Francais', 'Intermédiaire', '2025-11-30 12:27:02', '2025-11-30 12:27:02'),
(2, 1, 'Malgache', 'Courant', '2025-11-30 12:27:21', '2025-11-30 12:27:21'),
(3, 1, 'Anglais', 'Débutant', '2025-11-30 12:27:38', '2025-12-02 04:39:24'),
(4, 1, 'Chinois (HSK2)', 'Débutant', '2025-11-30 12:28:00', '2025-11-30 12:28:00');

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_11_28_000003_add_api_token_to_users_table', 2),
(5, '2025_11_29_000100_create_profiles_table', 3),
(6, '2025_11_29_000110_create_technologies_table', 3),
(7, '2025_11_29_000120_create_projects_table', 3),
(8, '2025_11_29_000130_create_project_technology_table', 3),
(9, '2025_11_29_000140_create_project_media_table', 3),
(10, '2025_11_29_000150_create_skills_table', 3),
(11, '2025_11_29_000160_create_languages_table', 3),
(12, '2025_11_29_000170_create_educations_table', 3),
(13, '2025_11_29_000180_create_transcripts_table', 3),
(14, '2025_11_29_000190_create_certificates_table', 3),
(15, '2025_11_29_000200_create_portfolio_videos_table', 3),
(16, '2025_11_30_000200_add_stack_slug_to_projects_table', 4),
(17, '2025_11_30_000210_alter_short_description_in_projects_table', 5),
(18, '2025_12_02_000200_add_contact_fields_to_profiles_table', 6);

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `portfolio_videos`
--

DROP TABLE IF EXISTS `portfolio_videos`;
CREATE TABLE IF NOT EXISTS `portfolio_videos` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `video_url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail_path` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` smallint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `portfolio_videos_user_id_foreign` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
CREATE TABLE IF NOT EXISTS `profiles` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `full_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar_path` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_bio` text COLLATE utf8mb4_unicode_ci,
  `location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `years_of_experience` tinyint UNSIGNED DEFAULT NULL,
  `github_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `linkedin_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `profiles_user_id_foreign` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `profiles`
--

INSERT INTO `profiles` (`id`, `user_id`, `full_name`, `title`, `avatar_path`, `short_bio`, `location`, `email`, `phone`, `years_of_experience`, `github_url`, `linkedin_url`, `facebook_url`, `website_url`, `created_at`, `updated_at`) VALUES
(1, 1, 'BAYANE Miguel Singcol', 'Développeur Web Fullstack (Laravel, React, Next.js)', 'avatars/JdZFcxVEOIfpjIwwsiOTpC3UkcAGQZJNxgX0WtsH.jpg', 'Développeur Web Fullstack basé à Antananarivo, spécialisé en Laravel, React, Next.js, Django et création d’API REST. Formé en Informatique – Risques et Décision (ESMIA), avec plusieurs projets web réalisés (ERP, gestion d’événements, e-learning, rendez-vous médicaux, management de projet…).\r\nJ’ai effectué des stages en développement web (2 mois + 3 mois) et un stage de 3 mois au Call Center Accès Banque, renforçant mes compétences techniques et professionnelles.\r\nMotivé, autonome et capable de travailler sur des applications modernes, je suis ouvert aux opportunités à Antananarivo pour évoluer en tant que Développeur Fullstack.', 'Antananarivo, Madagascar', 'baymi312@gmail.com', '0348349886', NULL, 'https://github.com/Bayane-max219', 'https://www.linkedin.com/in/miguel-singcol-bayane', 'https://www.facebook.com/bayane.miguel.singcol.2025?locale=fr_FR', NULL, '2025-11-30 12:28:42', '2025-12-02 05:46:28');

-- --------------------------------------------------------

--
-- Structure de la table `projects`
--

DROP TABLE IF EXISTS `projects`;
CREATE TABLE IF NOT EXISTS `projects` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stack_slug` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `short_description` text COLLATE utf8mb4_unicode_ci,
  `description` text COLLATE utf8mb4_unicode_ci,
  `github_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `demo_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `display_order` smallint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `projects_slug_unique` (`slug`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `projects`
--

INSERT INTO `projects` (`id`, `title`, `stack_slug`, `slug`, `short_description`, `description`, `github_url`, `demo_url`, `is_featured`, `display_order`, `created_at`, `updated_at`) VALUES
(3, 'IT Project Management System', 'react-django', 'it-project-management-system', 'Application web complète de gestion de projets IT avec système de pointage des employés et suivi client.', NULL, 'https://github.com/Bayane-max219/IT-Project-Management-System', NULL, 0, 0, '2025-11-30 08:58:18', '2025-11-30 08:58:18'),
(2, 'Echeck-in Event - Système de Gestion d\'Événements', 'symfony-flutter', 'echeck-in-event-systeme-de-gestion-devenements', 'Solution numérique complète pour la gestion d\'événements avec invitations électroniques, QR codes uniques, et contrôle d\'accès mobile. Développé dans le cadre d\'un stage de 3 mois.', NULL, 'https://github.com/Bayane-max219/Echeck-in-Event', NULL, 0, 0, '2025-11-30 08:26:37', '2025-11-30 08:26:37'),
(4, 'SmartERP Pro - Système de Gestion de Stock', 'vue-laravel', 'smarterp-pro-systeme-de-gestion-de-stock', 'Un système ERP complet pour la gestion de stock et ventes, développé avec Vue.js 3 et Laravel (avec support localStorage pour fonctionnement hors-ligne).', NULL, 'https://github.com/Bayane-max219/Gestion-de-stock', NULL, 0, 0, '2025-11-30 10:45:04', '2025-11-30 10:45:04'),
(5, 'Assistant intelligent de diagnostic automobile', 'python', 'assistant-intelligent-de-diagnostic-automobile', 'Ce projet a été réalisé dans le cadre d’une épreuve / sujet d’Intelligence Artificielle (système expert simplifié) et sert de mini-assistant pour mécaniciens.', NULL, 'https://github.com/Bayane-max219/Assistant_Inteligent_De_Diagnostic_Automobile', NULL, 0, 0, '2025-11-30 10:49:56', '2025-11-30 10:49:56'),
(6, 'Alliance Fitia Evangelique', 'react', 'alliance-fitia-evangelique', 'Application web pour l Eglise Alliance Fitia Evangelique : gestion et diffusion de videos, audios et evenements de l Eglise.', NULL, 'https://github.com/Bayane-max219/Alliance_Fitia_Evangelique', NULL, 0, 0, '2025-11-30 10:54:17', '2025-11-30 10:54:17'),
(7, 'Docarya – Plateforme de prise de rendez-vous médicaux', 'symfony', 'docarya-plateforme-de-prise-de-rendez-vous-medicaux', 'Docarya est une plateforme web permettant aux patients de prendre facilement des rendez-vous auprès de professionnels de santé, et aux administrateurs de valider les comptes et de superviser l’activité.', NULL, 'https://github.com/Bayane-max219/docarya-rdv-medical', NULL, 0, 0, '2025-11-30 11:03:19', '2025-11-30 11:03:19'),
(8, 'EduMaster - School Management System', 'laravel', 'edumaster-school-management-system', 'EduMaster est une solution Laravel complète de gestion scolaire couvrant les modules d\'administration des élèves, professeurs, classes, notes, paiements et emploi du temps, avec rôles sécurisés, tableau de bord analytique, génération PDF et reporting avancé dans une interface moderne turquoise & orange.', NULL, 'https://github.com/Bayane-max219/EduMaster-Gestion-Ecole', NULL, 0, 0, '2025-11-30 11:07:23', '2025-11-30 11:07:23'),
(9, 'HelloCode – Plateforme d’apprentissage de la programmation', 'react-django', 'hellocode-plateforme-dapprentissage-de-la-programmation', 'Plateforme web interactive pour apprendre la programmation pas à pas\n(Python, JavaScript, Java, PHP, C#) avec leçons guidées, quiz et exercices de code exécutables en ligne.', NULL, 'https://github.com/Bayane-max219/HelloCode-Plateforme', NULL, 0, 0, '2025-12-03 06:07:22', '2025-12-03 06:07:22'),
(10, 'portfolio-fullstack-laravel-next', 'next-laravel', 'portfolio-fullstack-laravel-next', 'Portfolio développeur fullstack : Laravel API + Next.js frontend, vitrine projets, profil CV et espace admin.', NULL, 'https://github.com/Bayane-max219/portfolio-fullstack-laravel-next', NULL, 0, 0, '2025-12-03 07:08:30', '2025-12-03 07:08:30');

-- --------------------------------------------------------

--
-- Structure de la table `project_media`
--

DROP TABLE IF EXISTS `project_media`;
CREATE TABLE IF NOT EXISTS `project_media` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` bigint UNSIGNED NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_path` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `video_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `caption` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` smallint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_media_project_id_foreign` (`project_id`)
) ENGINE=MyISAM AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `project_media`
--

INSERT INTO `project_media` (`id`, `project_id`, `type`, `file_path`, `video_url`, `caption`, `display_order`, `created_at`, `updated_at`) VALUES
(1, 1, 'screenshot', 'project_media/socYQfNtGluqaMYE6lK0FcSUudALtKsouGXrIzWB.png', NULL, NULL, 0, '2025-11-30 03:58:04', '2025-11-30 03:58:04'),
(2, 1, 'screenshot', 'project_media/OJ7IvWxx2OahxGSqDJEFqGetm4Z98HIyMg1VBzU1.png', NULL, NULL, 0, '2025-11-30 04:23:20', '2025-11-30 04:23:20'),
(3, 1, 'screenshot', 'project_media/IlWBB7EwiCwkLWAExpV4OarZSebzteJ7ejNkykzL.png', NULL, NULL, 0, '2025-11-30 04:23:47', '2025-11-30 04:23:47'),
(4, 1, 'screenshot', 'project_media/zCnfsOUIFhuAbWZtnsfXRW6MFMSzZCZjHUvk3ihE.png', NULL, NULL, 0, '2025-11-30 04:23:53', '2025-11-30 04:23:53'),
(5, 1, 'screenshot', 'project_media/DWAXuQYWtJZ0FZWUOFCwc1ZUAKgM0XUhDhCT1azl.png', NULL, NULL, 1, '2025-11-30 08:16:00', '2025-11-30 08:16:00'),
(6, 2, 'screenshot', 'project_media/gm30qOLjmziLNFBa0ENXLmam9a71mBLOxjFSO4QN.png', NULL, NULL, 1, '2025-11-30 08:27:03', '2025-11-30 08:27:03'),
(7, 2, 'screenshot', 'project_media/IhblgKVhGhcl4MeTrEEuDKXmosQCMVtwpZE62usr.png', NULL, NULL, 2, '2025-11-30 08:27:07', '2025-11-30 08:27:07'),
(8, 3, 'screenshot', 'project_media/WkKTJAgRFYeKPS9kzuskr0CFTcLpFXoG5Rl8UqST.png', NULL, NULL, 1, '2025-11-30 08:58:59', '2025-11-30 08:58:59'),
(9, 3, 'screenshot', 'project_media/wtmuWdc588tLuVKCip5vK3qWkgkbNLL8lbJJOSoV.png', NULL, NULL, 2, '2025-11-30 08:59:03', '2025-11-30 08:59:03'),
(10, 3, 'screenshot', 'project_media/3Elj4caOzTVqcXALSurBKKfmOSpJVA9EZuzvzX8u.png', NULL, NULL, 3, '2025-11-30 08:59:06', '2025-11-30 08:59:06'),
(11, 3, 'screenshot', 'project_media/qZ4SRL79Y65nx6ElH6y14fXUIa8fVf7JUvllfsqX.png', NULL, NULL, 4, '2025-11-30 08:59:10', '2025-11-30 08:59:10'),
(12, 2, 'screenshot', 'project_media/acrMoeoDcN9EtIiB7FyZCLMCuljUle5mzRpf3cHE.png', NULL, NULL, 3, '2025-11-30 10:39:29', '2025-11-30 10:39:29'),
(13, 2, 'screenshot', 'project_media/Y4UabTXfIIOPQcwPfVuYjAamyvq5LesERPoLtUoa.png', NULL, NULL, 4, '2025-11-30 10:39:33', '2025-11-30 10:39:33'),
(14, 2, 'screenshot', 'project_media/3Jda3PREnd7TDbUp5jnb1XvE0HYPvPZlatecfo63.png', NULL, NULL, 5, '2025-11-30 10:39:38', '2025-11-30 10:39:38'),
(15, 2, 'screenshot', 'project_media/uEtBVHmTJU70p9ij4gYzA7knfsyOxFezpWmzuLNC.png', NULL, NULL, 6, '2025-11-30 10:39:42', '2025-11-30 10:39:42'),
(16, 2, 'screenshot', 'project_media/eJbSoBMAq3w1gAarCqCrLxO1MZFnfoJsI5l2e8e9.png', NULL, NULL, 7, '2025-11-30 10:39:47', '2025-11-30 10:39:47'),
(17, 2, 'screenshot', 'project_media/VZwfNeSacnwajfJ6ltDVCwX8cTWMeBN8pZAbetO0.png', NULL, NULL, 8, '2025-11-30 10:39:51', '2025-11-30 10:39:51'),
(18, 2, 'screenshot', 'project_media/tIIRvkOrUOpA9CMMsW5MdYyQ4qoSodi3nu8rzQKm.png', NULL, NULL, 9, '2025-11-30 10:39:55', '2025-11-30 10:39:55'),
(19, 2, 'screenshot', 'project_media/WeW2dAfZG8wFYl6zeD8EZGdZ7I5Km5Hk9FKWVujp.png', NULL, NULL, 10, '2025-11-30 10:40:02', '2025-11-30 10:40:02'),
(20, 3, 'screenshot', 'project_media/pOVFM6GrKiGpBxlKzSgPXeWFYEpJjm96gGIFJSTz.png', NULL, NULL, 5, '2025-11-30 10:41:19', '2025-11-30 10:41:19'),
(21, 3, 'screenshot', 'project_media/xJPBdFBBbBmnxPctRkqIrJEVYwmLkXQDGltC2tPG.png', NULL, NULL, 6, '2025-11-30 10:41:24', '2025-11-30 10:41:24'),
(22, 3, 'screenshot', 'project_media/mf0RDaDuEnqlRFOMY2kZNw8IA8IbvSmv3NubLHOK.png', NULL, NULL, 7, '2025-11-30 10:41:28', '2025-11-30 10:41:28'),
(23, 4, 'screenshot', 'project_media/C8btqwiI8BTPEFmCVRLVCk7NDiK3qV6rwVj1qZlp.png', NULL, NULL, 1, '2025-11-30 10:45:51', '2025-11-30 10:45:51'),
(24, 4, 'screenshot', 'project_media/elQEY0wAGdGSyIgbAKtFcoE7iiPgIZwEQkyL9LJA.png', NULL, NULL, 2, '2025-11-30 10:46:00', '2025-11-30 10:46:00'),
(25, 4, 'screenshot', 'project_media/1IvfquPIb1DNa1QvBXgN3CZFpWG2NoQ8WKT2mbeH.png', NULL, NULL, 3, '2025-11-30 10:46:04', '2025-11-30 10:46:04'),
(26, 4, 'screenshot', 'project_media/xnkt03MrEpkxz0mKwTKwWUgWt46pE5cTc3FPm4db.png', NULL, NULL, 4, '2025-11-30 10:46:16', '2025-11-30 10:46:16'),
(27, 4, 'screenshot', 'project_media/aqMeDYfbwfgHlhGvcuRYoy98Q0d3hfPynXzRxkMp.png', NULL, NULL, 5, '2025-11-30 10:46:21', '2025-11-30 10:46:21'),
(28, 4, 'screenshot', 'project_media/rgAUm1aBR5CMJS9w8CzX4AaS0UYVCF9ThgItU2ww.png', NULL, NULL, 6, '2025-11-30 10:46:27', '2025-11-30 10:46:27'),
(29, 4, 'screenshot', 'project_media/28lGknlS6kTIbfFgY7VTq3PHL45QTlPuo5m129nB.png', NULL, NULL, 7, '2025-11-30 10:46:31', '2025-11-30 10:46:31'),
(30, 4, 'screenshot', 'project_media/XNR7pDTbhihNj981hP5QnmIaqs039OYMItcual0T.png', NULL, NULL, 8, '2025-11-30 10:46:35', '2025-11-30 10:46:35'),
(31, 4, 'screenshot', 'project_media/fVD9xOmrzffveSt0GYhbSj4Bs5k1uiFXxhtwyOAI.png', NULL, NULL, 9, '2025-11-30 10:46:40', '2025-11-30 10:46:40'),
(32, 4, 'screenshot', 'project_media/ZPQzc9VbHKFMoz4TJRHXYmZsZZuxR8VPqIb622Q2.png', NULL, NULL, 10, '2025-11-30 10:46:44', '2025-11-30 10:46:44'),
(33, 4, 'screenshot', 'project_media/8s4YOZBE9yv2M5lyKeRH2kkHQXZEdrGJ7PQ7isxg.png', NULL, NULL, 11, '2025-11-30 10:46:50', '2025-11-30 10:46:50'),
(34, 5, 'screenshot', 'project_media/LVBleI6nimTCk2bIeer8koUgtoEPGeLygAdGxLoY.png', NULL, NULL, 1, '2025-11-30 10:50:28', '2025-11-30 10:50:28'),
(35, 5, 'screenshot', 'project_media/3Tev5XeHU7S7ZEKZOM2QUazlTMYh3iWvkTrkaQXe.png', NULL, NULL, 2, '2025-11-30 10:50:33', '2025-11-30 10:50:33'),
(36, 5, 'screenshot', 'project_media/k0iav70zhyj6vmRTc9OkI9vtH9DDRtK1rMgEArZb.png', NULL, NULL, 3, '2025-11-30 10:50:38', '2025-11-30 10:50:38'),
(37, 5, 'screenshot', 'project_media/WnSbOYRY74GdVPrz5l6dDFCHhYQtZY4GyEpmHbIa.png', NULL, NULL, 4, '2025-11-30 10:50:42', '2025-11-30 10:50:42'),
(38, 5, 'screenshot', 'project_media/bHSqljSLEVLeeKrDMkI4Xqp1IUfjaVtmBzKrBMyF.png', NULL, NULL, 5, '2025-11-30 10:50:47', '2025-11-30 10:50:47'),
(39, 5, 'screenshot', 'project_media/mJJvaXoLG8y4YcI2N51b5Yzk7WLlj5gR5f837KfT.png', NULL, NULL, 6, '2025-11-30 10:50:51', '2025-11-30 10:50:51'),
(40, 6, 'screenshot', 'project_media/ZSGxDmnAk5Kz97Y0uHmbpNvhbqrX9VtADEHxPznK.png', NULL, NULL, 1, '2025-11-30 10:57:38', '2025-11-30 10:57:38'),
(41, 6, 'screenshot', 'project_media/miSx9As5fvuOJm8Fb2typ2ANzQde8YXvOQZUNkyK.png', NULL, NULL, 2, '2025-11-30 10:57:47', '2025-11-30 10:57:47'),
(42, 6, 'screenshot', 'project_media/B3iBqLUWifIKPYImsqzTDIgbvHw9VexuP609iAjU.png', NULL, NULL, 3, '2025-11-30 10:57:51', '2025-11-30 10:57:51'),
(43, 6, 'screenshot', 'project_media/DFL0O4sbagrdjdsbdRCHpQqnkci4imvX7KW7fd09.png', NULL, NULL, 4, '2025-11-30 10:57:56', '2025-11-30 10:57:56'),
(44, 6, 'screenshot', 'project_media/c43vcntYvqzjK4zrJNNFO2NofGIzwWUrAAI7qpct.png', NULL, NULL, 5, '2025-11-30 10:58:00', '2025-11-30 10:58:00'),
(45, 6, 'screenshot', 'project_media/eKl5xjGLwv82cwcWCORckqQ5If9UEUnlFm1ACfQQ.png', NULL, NULL, 6, '2025-11-30 10:58:05', '2025-11-30 10:58:05'),
(46, 6, 'screenshot', 'project_media/d0ckmXif5xolwVH5pF16E0oMwzJQAtdiZFZFouzB.png', NULL, NULL, 7, '2025-11-30 10:58:09', '2025-11-30 10:58:09'),
(47, 6, 'screenshot', 'project_media/cYuAsDEJb5EUaqpipS3c9lFxCDv20SZbV1664POY.png', NULL, NULL, 8, '2025-11-30 10:58:13', '2025-11-30 10:58:13'),
(48, 6, 'screenshot', 'project_media/2EPo3mssaWDeXgOkE5c3NFa6fEfOlknvsjjq27fV.png', NULL, NULL, 9, '2025-11-30 10:58:18', '2025-11-30 10:58:18'),
(49, 6, 'screenshot', 'project_media/MHQaMxxeiEtPObkO961DuuMh39EzwLHZ2pcwrfKh.png', NULL, NULL, 10, '2025-11-30 10:58:22', '2025-11-30 10:58:22'),
(50, 6, 'screenshot', 'project_media/WVJnxlQv5258u8GgkmhAOi4W6ubCsLNEQhaGLS90.png', NULL, NULL, 11, '2025-11-30 10:58:28', '2025-11-30 10:58:28'),
(51, 7, 'screenshot', 'project_media/Y2IFdV7I68SH3yvCOuxmG95HqVcykJDzrJ87fNpN.png', NULL, NULL, 1, '2025-11-30 11:04:59', '2025-11-30 11:04:59'),
(52, 7, 'screenshot', 'project_media/J3SA8H3aiKsrW9D67gIR5K7KpXccFnUuviVE3iuu.png', NULL, NULL, 2, '2025-11-30 11:05:03', '2025-11-30 11:05:03'),
(53, 7, 'screenshot', 'project_media/pFxLlJiGmhqr7CiabzjIZOi3PFmEezfSCI2ABm7w.png', NULL, NULL, 3, '2025-11-30 11:05:08', '2025-11-30 11:05:08'),
(54, 7, 'screenshot', 'project_media/kl9eYIM30z0f4nAPDBNPLPg2DGmOKCWPxS4fCsX2.png', NULL, NULL, 4, '2025-11-30 11:05:13', '2025-11-30 11:05:13'),
(55, 7, 'screenshot', 'project_media/Q1vs68FGOXgnKpJRSoVKhod2IRc286OuoCCqG2WP.png', NULL, NULL, 5, '2025-11-30 11:05:18', '2025-11-30 11:05:18'),
(56, 7, 'screenshot', 'project_media/4bFQNJrnKXKlMr35tmWgY1AiyDyp1WSwx5YXyxWB.png', NULL, NULL, 6, '2025-11-30 11:05:22', '2025-11-30 11:05:22'),
(57, 7, 'screenshot', 'project_media/cr8JhtdCv4kerX2q8tIzAUDo1J0uBufeEqqzOjWB.png', NULL, NULL, 7, '2025-11-30 11:05:26', '2025-11-30 11:05:26'),
(58, 7, 'screenshot', 'project_media/IfR5ttcAO092D9Ux5hDHi10mALJ0ma90SFuBQheZ.png', NULL, NULL, 8, '2025-11-30 11:05:30', '2025-11-30 11:05:30'),
(59, 7, 'screenshot', 'project_media/iUrVq95XcDKcRJsySM4gF0ylqieOXViWvPFZ7ZbG.png', NULL, NULL, 9, '2025-11-30 11:05:34', '2025-11-30 11:05:34'),
(60, 7, 'screenshot', 'project_media/lFYNywwHcWhXXRMMPZ1cf0G9OQ62XVPw1xEOiZBy.png', NULL, NULL, 10, '2025-11-30 11:05:38', '2025-11-30 11:05:38'),
(61, 7, 'screenshot', 'project_media/SiUrpEURqpwLmjEjOqg53b7ADK407r6MKkaf5a2t.png', NULL, NULL, 11, '2025-11-30 11:05:43', '2025-11-30 11:05:43'),
(62, 7, 'screenshot', 'project_media/2KDZIM4Su4CKVzBFsaJstoGbw5wdT76kwoNEAK4E.png', NULL, NULL, 12, '2025-11-30 11:05:49', '2025-11-30 11:05:49'),
(63, 8, 'screenshot', 'project_media/gQ4cFGpKsdBLJku6EgKmsC99qopwAG0uV1vThBfx.png', NULL, NULL, 1, '2025-11-30 11:07:59', '2025-11-30 11:07:59'),
(64, 8, 'screenshot', 'project_media/cqlJzyyJYskhwgsTkD0GoN73zwwjKb2Ve7YxoV6N.png', NULL, NULL, 2, '2025-11-30 11:08:11', '2025-11-30 11:08:11'),
(65, 8, 'screenshot', 'project_media/fE8pyg3CUe6FPijH8qbCO4erNKwolT2iScg9GGlx.png', NULL, NULL, 3, '2025-11-30 11:08:16', '2025-11-30 11:08:16'),
(66, 8, 'screenshot', 'project_media/eEV1tWm5PD4yBi8yK4MVcs1aEUyfbV8tZxWhjvOK.png', NULL, NULL, 4, '2025-11-30 11:08:21', '2025-11-30 11:08:21'),
(67, 8, 'screenshot', 'project_media/BbhtCWZuHu1DneoHE1JPU3EywlHRQ2snMVWXZgKF.png', NULL, NULL, 5, '2025-11-30 11:08:26', '2025-11-30 11:08:26'),
(68, 8, 'screenshot', 'project_media/uKI0dIHsAncbA84a48xjhqkD0aOiIsV5dSfEGoJ1.png', NULL, NULL, 6, '2025-11-30 11:08:30', '2025-11-30 11:08:30'),
(69, 8, 'screenshot', 'project_media/xRPH4i00MdoGhr7h1NyCvLGceD3XxLm34kqVHBuE.png', NULL, NULL, 7, '2025-11-30 11:08:35', '2025-11-30 11:08:35'),
(70, 8, 'screenshot', 'project_media/EivzyvVY9NRY2AA15DxDhfAvu6VeNdyW0ecpzWmM.png', NULL, NULL, 8, '2025-11-30 11:08:39', '2025-11-30 11:08:39'),
(71, 8, 'screenshot', 'project_media/yqmXb3S32ywBREib5CHcZrYnWfUqeW5dybUmAlug.png', NULL, NULL, 9, '2025-11-30 11:08:44', '2025-11-30 11:08:44'),
(72, 8, 'screenshot', 'project_media/fj27G4gyZdzLx5Z8T5kIa0ivXhKZQ5mW1914TLt2.png', NULL, NULL, 10, '2025-11-30 11:08:47', '2025-11-30 11:08:47'),
(73, 8, 'screenshot', 'project_media/HGMInNQ5I35x0A1YB2C4uy20oUMfry44gFYfK09G.png', NULL, NULL, 11, '2025-11-30 11:08:54', '2025-11-30 11:08:54'),
(74, 8, 'screenshot', 'project_media/49OMuh3lZuTZZMtfmg7GUEo5KptmcBhyBReP4g6I.png', NULL, NULL, 12, '2025-11-30 11:09:01', '2025-11-30 11:09:01'),
(75, 8, 'screenshot', 'project_media/IxQCQ8cfPZ4ukhf1YJz9xroTVGcYs7c3ru6oUrzK.png', NULL, NULL, 13, '2025-11-30 11:09:08', '2025-11-30 11:09:08'),
(76, 8, 'screenshot', 'project_media/EYxp4SMuQAo0xSw3hVrXu6J0SvEecAzHx4cF0FYe.png', NULL, NULL, 14, '2025-11-30 11:09:14', '2025-11-30 11:09:14'),
(77, 8, 'screenshot', 'project_media/ylXzEcIQi7Iex385O80CxkVOvV9C0faTGe5oZ4S7.png', NULL, NULL, 15, '2025-11-30 11:09:21', '2025-11-30 11:09:21'),
(78, 8, 'screenshot', 'project_media/rwk7fz9Bxs2BtjcyUbitNfzuZC688kaeecs769Ef.png', NULL, NULL, 16, '2025-11-30 11:09:28', '2025-11-30 11:09:28'),
(79, 8, 'screenshot', 'project_media/qhhvSNMPY67ESlzzHvRYYj8t8BgYTrAYUbWysILI.png', NULL, NULL, 17, '2025-11-30 11:09:34', '2025-11-30 11:09:34'),
(80, 8, 'screenshot', 'project_media/15O43Tjj1VCVLNo7sb1PiNz1y8q6xLx3GVV8QGXK.png', NULL, NULL, 18, '2025-11-30 11:09:39', '2025-11-30 11:09:39'),
(81, 8, 'screenshot', 'project_media/ggD0F0OlWbE466VQb0xF7vafBV2PiBbPQhFcMpdP.png', NULL, NULL, 19, '2025-11-30 11:09:44', '2025-11-30 11:09:44'),
(82, 8, 'screenshot', 'project_media/vQSVM0iKIzdlTbwdgntiabz41186qsG4IZXSnTvq.png', NULL, NULL, 20, '2025-11-30 11:09:50', '2025-11-30 11:09:50'),
(83, 9, 'screenshot', 'project_media/L0qRcLIWXL6nN8bc4lkEBbfkIfZLRdkspYunKfop.png', NULL, NULL, 1, '2025-12-03 06:07:52', '2025-12-03 06:07:52'),
(84, 9, 'screenshot', 'project_media/tv6fCfTEAtG3HkU1a0NKOvGodf3B4fHAFfGFpMk8.png', NULL, NULL, 2, '2025-12-03 06:07:57', '2025-12-03 06:07:57'),
(85, 9, 'screenshot', 'project_media/t8L0Q4fxo6NOFkeUOVQL0JM2MiQkY43El4U8FegG.png', NULL, NULL, 3, '2025-12-03 06:08:02', '2025-12-03 06:08:02'),
(86, 9, 'screenshot', 'project_media/pRL0tRqIiIjVSf0RdU84ny3m2SX5Vq6FvwPZgCeA.png', NULL, NULL, 4, '2025-12-03 06:08:07', '2025-12-03 06:08:07'),
(87, 9, 'screenshot', 'project_media/klJKVej71DSFEsqB7vQxa1t7xbLCiAFh6fdpRzTd.png', NULL, NULL, 5, '2025-12-03 06:08:13', '2025-12-03 06:08:13'),
(88, 9, 'screenshot', 'project_media/VD3sIAewpx72yanPbrwp9omqWZc9CE00niQ8WFGq.png', NULL, NULL, 6, '2025-12-03 06:08:18', '2025-12-03 06:08:18'),
(89, 9, 'screenshot', 'project_media/VTbaD87rwGGPUJHv7B6NNkHMLRJNBtzxt5QpYVUO.png', NULL, NULL, 7, '2025-12-03 06:08:23', '2025-12-03 06:08:23'),
(90, 9, 'screenshot', 'project_media/jz2vOlk7yuwbgVNXG24rhC6ZWmRXyYvEwmQAYpsu.png', NULL, NULL, 8, '2025-12-03 06:08:28', '2025-12-03 06:08:28'),
(91, 9, 'screenshot', 'project_media/c1h9a7CPe8Eg9LYIAwpjIjZ61iTb2vlEmeum6BV4.png', NULL, NULL, 9, '2025-12-03 06:08:33', '2025-12-03 06:08:33'),
(92, 9, 'screenshot', 'project_media/WGY9EWP0BZxsfo1Y0QFA0mvGfBeErrabLECiZiwn.png', NULL, NULL, 10, '2025-12-03 06:08:38', '2025-12-03 06:08:38'),
(93, 10, 'screenshot', 'project_media/B9El7uGtg5Tn0RpE8fSIKOX2VrYJWFZH5OyyJmqx.png', NULL, NULL, 1, '2025-12-03 07:09:04', '2025-12-03 07:09:04'),
(94, 10, 'screenshot', 'project_media/Msfrzks7cJuTD0JQ0J44S2rUNMbrDpHMju5nOVUb.png', NULL, NULL, 2, '2025-12-03 07:09:09', '2025-12-03 07:09:09'),
(95, 10, 'screenshot', 'project_media/Faaeejc6OvuWCI7GMEFXyKaJXHLdS8k3di4Aurv4.png', NULL, NULL, 3, '2025-12-03 07:09:14', '2025-12-03 07:09:14'),
(96, 10, 'screenshot', 'project_media/1Y5jYQw7VsOx7p0OEvOjG4GHXZpPBpIr5HBBZcw9.png', NULL, NULL, 4, '2025-12-03 07:09:26', '2025-12-03 07:09:26'),
(97, 10, 'screenshot', 'project_media/jMVI6AIt8VxzHTFa9yJH3CZl4TFHiBTuzIMRYsjJ.png', NULL, NULL, 5, '2025-12-03 07:09:31', '2025-12-03 07:09:31'),
(98, 10, 'screenshot', 'project_media/5Lt2S6s9ixTkilOSIIepNxh6Z39BgBGBnmRtb50Z.png', NULL, NULL, 6, '2025-12-03 07:09:36', '2025-12-03 07:09:36'),
(99, 10, 'screenshot', 'project_media/gVINnxmgfNouxXbFw7pXrE3gIVh74xkmme88FtIA.png', NULL, NULL, 7, '2025-12-03 07:09:40', '2025-12-03 07:09:40'),
(100, 10, 'screenshot', 'project_media/7ZEQrjMvdr8XtFjC3QzCcO5pslUNGgz9zY6ibGXi.png', NULL, NULL, 8, '2025-12-03 07:09:45', '2025-12-03 07:09:45'),
(101, 10, 'screenshot', 'project_media/xgYnSTs0gseLkkrGBHHi4hxWnhU4cdQMEDNJ8qrJ.png', NULL, NULL, 9, '2025-12-03 07:09:49', '2025-12-03 07:09:49'),
(102, 10, 'screenshot', 'project_media/wSmnKXds1E2WZhQ8LqaPCALvoOHsabE3qUKPfCbW.png', NULL, NULL, 10, '2025-12-03 07:09:53', '2025-12-03 07:09:53'),
(103, 10, 'screenshot', 'project_media/NGuE19ThnEkG5hpqO3vu0Yobf2KNlyTkooE1LCL2.png', NULL, NULL, 11, '2025-12-03 07:09:58', '2025-12-03 07:09:58'),
(104, 10, 'screenshot', 'project_media/EQj17gHvA5FHLy24oCK0ICbcWeHGJT29m1ozovoV.png', NULL, NULL, 12, '2025-12-03 07:10:04', '2025-12-03 07:10:04'),
(105, 10, 'screenshot', 'project_media/wBpMt2jjBzwd0AGNbGbe9J8mvG0eXGXsUDixHzxl.png', NULL, NULL, 13, '2025-12-03 07:10:09', '2025-12-03 07:10:09');

-- --------------------------------------------------------

--
-- Structure de la table `project_technology`
--

DROP TABLE IF EXISTS `project_technology`;
CREATE TABLE IF NOT EXISTS `project_technology` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` bigint UNSIGNED NOT NULL,
  `technology_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_technology_project_id_foreign` (`project_id`),
  KEY `project_technology_technology_id_foreign` (`technology_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('jnoHOVdWFbDCgyGv4HRLgtskV7hNOaYBPh1Srwex', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoia0NSZ2lkR2hhRzBhUGhoN29lYXA0TXNWakdNNTM3bE4xcXBnSHNkVyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1764318038),
('ZJVpobGuY95wfGWrV4qRTKe6NrD1GSm0Xchcs9rT', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWVJvbjZUeHZlenhIZ25RQUI4aHBjVm5FTGRlVHFDTVFsQmVYRkIxZCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1764316593);

-- --------------------------------------------------------

--
-- Structure de la table `skills`
--

DROP TABLE IF EXISTS `skills`;
CREATE TABLE IF NOT EXISTS `skills` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` tinyint UNSIGNED NOT NULL DEFAULT '0',
  `category` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon_key` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `skills_user_id_foreign` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `skills`
--

INSERT INTO `skills` (`id`, `user_id`, `name`, `level`, `category`, `icon_key`, `created_at`, `updated_at`) VALUES
(1, 1, 'PHP', 90, 'Langage', NULL, '2025-11-30 12:59:02', '2025-11-30 12:59:02'),
(2, 1, 'JavaScript', 85, 'Langage', NULL, '2025-11-30 12:59:27', '2025-11-30 12:59:27'),
(3, 1, 'TypeScript', 75, 'Langage', NULL, '2025-11-30 12:59:49', '2025-11-30 12:59:49'),
(4, 1, 'Python', 75, 'Langage', NULL, '2025-11-30 13:00:03', '2025-11-30 13:00:03'),
(5, 1, 'HTML/CSS', 90, 'Langage', NULL, '2025-11-30 13:00:22', '2025-11-30 13:00:22'),
(6, 1, 'SQL (MySQL, PostgreSQL, SQLite)', 80, 'Base de données', NULL, '2025-11-30 13:01:03', '2025-11-30 13:01:03'),
(7, 1, 'Laravel', 85, 'Framework', NULL, '2025-11-30 13:01:45', '2025-11-30 13:01:45'),
(8, 1, 'Symfony', 85, 'Framework', NULL, '2025-11-30 13:02:05', '2025-11-30 13:02:05'),
(9, 1, 'Django', 80, 'Framework', NULL, '2025-11-30 13:02:30', '2025-11-30 13:02:30'),
(10, 1, 'React Native', 90, 'Framework', NULL, '2025-11-30 13:02:57', '2025-11-30 13:02:57'),
(11, 1, 'Vue.js', 85, 'Framework', NULL, '2025-11-30 13:03:10', '2025-11-30 13:03:10'),
(12, 1, 'Next.js', 85, 'Framework', NULL, '2025-11-30 13:03:21', '2025-11-30 13:03:21'),
(13, 1, 'Git / GitHub', 85, 'Outil', NULL, '2025-11-30 13:03:47', '2025-11-30 13:03:47'),
(14, 1, 'Postman', 75, 'Outil API', NULL, '2025-11-30 13:04:09', '2025-11-30 13:04:09'),
(15, 1, 'Résolution de problèmes', 85, 'Soft Skill', NULL, '2025-11-30 13:06:50', '2025-11-30 13:06:50'),
(16, 1, 'Travail en équipe', 75, 'Soft Skill', NULL, '2025-11-30 13:07:07', '2025-11-30 13:07:07'),
(19, 1, 'Apprentissage rapide', 90, 'Soft Skill', NULL, '2025-11-30 13:08:12', '2025-11-30 13:08:12'),
(18, 1, 'Communication technique', 70, 'Soft Skill', NULL, '2025-11-30 13:07:40', '2025-11-30 13:07:40');

-- --------------------------------------------------------

--
-- Structure de la table `technologies`
--

DROP TABLE IF EXISTS `technologies`;
CREATE TABLE IF NOT EXISTS `technologies` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon_key` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` smallint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `technologies_slug_unique` (`slug`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `transcripts`
--

DROP TABLE IF EXISTS `transcripts`;
CREATE TABLE IF NOT EXISTS `transcripts` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institution` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `semester` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `year` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_order` smallint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `transcripts_user_id_foreign` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `api_token` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_api_token_unique` (`api_token`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `api_token`, `created_at`, `updated_at`) VALUES
(1, 'Portfolio Admin', 'admin@portfolio.mg', NULL, '$2y$12$fvHpGqoyha6ZqpioBQaW7.D9ViIjMhAfTqXxqMsDHGJpsUpk3HVmy', NULL, '0AVm7a31zaCYfyY6oNExiXY5dfsEDhiksv2JwEOPU4fPPphnyAEFv5uK6Pw8', '2025-11-28 04:14:40', '2025-12-03 07:08:42');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
