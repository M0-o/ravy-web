"use server"

import { auth, clerkClient } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteService(serviceId: string) {
  const { userId } = await auth()

  if (!userId) {
    return { error: "Non authentifié" }
  }

  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  })

  if (!service) {
    return { error: "Service introuvable" }
  }

  if (service.ownerId !== userId) {
    return { error: "Vous n'êtes pas autorisé à supprimer ce service" }
  }

  try {
    await prisma.service.delete({ where: { id: serviceId } })
    revalidatePath("/")
    revalidatePath("/dashboard")
    return { success: true }
  } catch (err: any) {
    console.error("[deleteService] prisma error:", err)
    return { error: err.message || "Erreur lors de la suppression" }
  }
}

export async function postService(formData: {
  title: string
  category: string
  description: string
  priceFrom: number
  priceUnit: string
  tags: string[]
  imageUrl?: string
}) {
  const { userId } = await auth()

  if (!userId) {
    return { error: "Non authentifié" }
  }

  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  const role = user.publicMetadata.role as string | undefined

  if (role !== "student") {
    return {
      error:
        "Seuls les étudiants peuvent publier des services. Votre rôle actuel est : " +
        (role || "non défini")
    }
  }

  const studentName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.username ||
    "Étudiant"

  try {
    const service = await prisma.service.create({
      data: {
        category: formData.category as any,
        title: formData.title,
        description: formData.description,
        tags: formData.tags,
        priceFrom: formData.priceFrom,
        priceUnit: formData.priceUnit,
        ownerId: userId,
        imageUrl: formData.imageUrl ?? null,
        studentName,
      },
    })

    revalidatePath("/")

    return { success: true, service }
  } catch (err: any) {
    console.error("[postService] prisma error:", err)
    return { error: err.message || "Erreur lors de la création du service" }
  }
}
