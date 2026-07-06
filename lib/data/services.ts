import type { ServiceCategory } from "@/lib/generated/prisma/client"

export type Service = {
  id: string
  category: ServiceCategory
  title: string
  description: string
  tags: string[]
  priceFrom: number
  priceUnit: string
  studentName?: string | null
}

export const services: Service[] = [
  {
    id: "1",
    category: "design",
    title: "Design graphique",
    description: "Création de logos, affiches, cartes de visite et supports visuels pour votre marque ou événement.",
    tags: ["logo", "affiche", "branding"],
    priceFrom: 150,
    priceUnit: "projet",
    studentName: "Sofia El Amrani",
  },
  {
    id: "2",
    category: "traduction",
    title: "Traduction",
    description: "Traduction anglais-français-arabe de documents académiques, professionnels et personnels.",
    tags: ["anglais", "français", "arabe"],
    priceFrom: 80,
    priceUnit: "page",
    studentName: "Youssef Benali",
  },
  {
    id: "3",
    category: "montage_video",
    title: "Montage vidéo",
    description: "Montage, colorimétrie et habillage de vos vidéos pour réseaux sociaux, projets ou événements.",
    tags: ["montage", "colorimétrie", "habillage"],
    priceFrom: 200,
    priceUnit: "vidéo",
    studentName: "Lina Tazi",
  },
  {
    id: "4",
    category: "cours",
    title: "Cours particuliers",
    description: "Soutien scolaire et cours particuliers en mathématiques, langues, sciences et matières universitaires.",
    tags: ["maths", "langues", "sciences"],
    priceFrom: 100,
    priceUnit: "heure",
    studentName: "Amine El Fassi",
  },
  {
    id: "5",
    category: "assistance",
    title: "Assistance digitale",
    description: "Aide à la saisie, gestion de documents, veille informationnelle et support administratif en ligne.",
    tags: ["saisie", "documents", "support"],
    priceFrom: 120,
    priceUnit: "tâche",
    studentName: "Inès Belhaj",
  },
]
