export type DocumentKind = "releve" | "diplome" | "certificat" | "attestation";

export type PortfolioDocument = {
  id: number;
  kind: DocumentKind;
  title: string;
  institution: string;
  mention?: string;
  year?: string;
  imageUrl?: string;
};

export const transcripts: PortfolioDocument[] = [
  {
    id: 1,
    kind: "releve",
    title: "Relevé de notes S1",
    institution: "ESMIA",
    year: "2024",
    imageUrl: "/storage/certificates/hWAzVGGTR5y6vziHrcpf5XhjoGBvM1Y4OWTJBG5M.jpg",
  },
  {
    id: 2,
    kind: "releve",
    title: "Relevé de notes S2",
    institution: "ESMIA",
    year: "2024",
    imageUrl: "/storage/certificates/bSBTkMtf6BJrqk2fb7rjBYToC9XKWJPmE5DqPdXe.jpg",
  },
  {
    id: 3,
    kind: "releve",
    title: "Relevé de notes S3",
    institution: "ESMIA",
    year: "2025",
    imageUrl: "/storage/certificates/4Ug030qtKAqF1mew1QJV1zsvjuEWeM7y0M6ATmJn.jpg",
  },
  {
    id: 4,
    kind: "releve",
    title: "Relevé de notes S4",
    institution: "ESMIA",
    year: "2025",
    imageUrl: "/storage/certificates/iNAMSuPp5CwxOsQ13jWXGahWwGgpIB1j5Zp9N9pr.jpg",
  },
  {
    id: 14,
    kind: "releve",
    title: "Relevé de note S5",
    institution: "ESMIA",
    year: "2025",
    imageUrl: "/storage/certificates/3lAcGkWBSTY1kmegwoG9v6xPHDmtCFOJavT23IV8.jpg",
  },
  {
    id: 15,
    kind: "releve",
    title: "Relevé de note S6",
    institution: "ESMIA",
    year: "2025",
    imageUrl: "/storage/certificates/n5HuBL49m6Q1yiNmdQMLigziR3gCVeD2oj238XMN.jpg",
  },
  {
    id: 16,
    kind: "releve",
    title: "Relevé de note Pilote Privé (PPL)",
    institution: "ENEAM",
    year: "2023",
    imageUrl: "/storage/certificates/jkYk1awPW35aJdnhFedXFxiqX6bDuRJTtmreF1dI.jpg",
  },
];

export const certificates: PortfolioDocument[] = [
  {
    id: 6,
    kind: "certificat",
    title: "Certificat Comptabilité Général et informatisé",
    institution: "CFPM",
    imageUrl: "/storage/certificates/SK86rMPfmN69KrUtyKcrChTQllC40uvWJCZOQz4I.jpg",
  },
  {
    id: 7,
    kind: "attestation",
    title: "Attestation de Stage",
    institution: "RandevTeam",
    imageUrl: "/storage/certificates/VPJDqpmuBfQNF4TIaeRKE7GmMNoJvKUMWs0GnFV0.jpg",
  },
  {
    id: 8,
    kind: "certificat",
    title: "Certificat de Stage",
    institution: "Teko",
    imageUrl: "/storage/certificates/ApCP4CSXbfXvmhHNQvNY6zLtGxQZuaLbT3baF7v9.jpg",
  },
  {
    id: 9,
    kind: "attestation",
    title: "Attestation Formation en Informatique Bureautique",
    institution: "Help Education",
    imageUrl: "/storage/certificates/EBI02Fct4x6uhVoDcd6I8eZA7ulGPKKJ4lloJZAM.jpg",
  },
  {
    id: 10,
    kind: "attestation",
    title: "Attestation Formation en Opérateur de Saisie",
    institution: "Help Education",
    imageUrl: "/storage/certificates/J9lo7n24M2gkvZPRxbC1bZ9gLdcAM7mFNTFvvKcL.jpg",
  },
  {
    id: 11,
    kind: "certificat",
    title: "Certificat de Pasteur",
    institution: "Eglise Rhema de Madagascar",
    imageUrl: "/storage/certificates/e1Oq7aUX4tGmBbT7EusndJCuJ7GlwnEDWPsmByAZ.jpg",
  },
  {
    id: 12,
    kind: "certificat",
    title: "Certificat de Stage",
    institution: "Accès Banque",
    imageUrl: "/storage/certificates/MP4cggA1LmxIlSPtJeu5kDq6FrHCD7Czw76SSOGH.jpg",
  },
  {
    id: 13,
    kind: "certificat",
    title: "HSK Test Level 2",
    institution: "CFPM",
    imageUrl: "/storage/certificates/qZdcm93IcfzrprZAPuxCxrPy22CF0UN9PXwK6jML.jpg",
  },
];
