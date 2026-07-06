"use server"

import { clerkClient } from "@clerk/nextjs/server"
import { auth } from "@clerk/nextjs/server"

export async function completeOnboarding(role: "student" | "client") {
  const { userId } = await auth()

  console.log("[onboarding action] userId:", userId, "role:", role)

  if (!userId) {
    console.log("[onboarding action] no userId, returning error")
    return { error: "Non authentifié" }
  }

  const client = await clerkClient()
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { role },
  })

  console.log("[onboarding action] metadata updated successfully")

  return { success: true }
}
