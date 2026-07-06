"use server"

import { auth, clerkClient } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createOrder(serviceId: string, formData: FormData) {
  const { userId } = await auth()

  if (!userId) {
    return { error: "Non authentifié" }
  }

  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  const role = user.publicMetadata.role as string | undefined

  if (role !== "client") {
    return { error: "Seuls les clients peuvent commander des services" }
  }

  const service = await prisma.service.findUnique({ where: { id: serviceId } })
  if (!service) {
    return { error: "Service introuvable" }
  }

  if (!service.ownerId) {
    return { error: "Ce service n'est pas associé à un étudiant" }
  }

  const message = formData.get("message") as string | null

  try {
    const order = await prisma.order.create({
      data: {
        serviceId: service.id,
        clientId: userId,
        studentId: service.ownerId,
        message: message || null,
      },
    })
    revalidatePath("/")
    return { success: true, order }
  } catch (err: any) {
    console.error("[createOrder] prisma error:", err)
    return { error: err.message || "Erreur lors de la création de la commande" }
  }
}
