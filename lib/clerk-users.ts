import { clerkClient } from "@clerk/nextjs/server"

export async function getDisplayNames(
  userIds: string[]
): Promise<Map<string, string>> {
  const unique = [...new Set(userIds.filter(Boolean))]
  if (unique.length === 0) return new Map()

  const client = await clerkClient()
  const { data } = await client.users.getUserList({ userId: unique })

  return new Map(
    data.map((u) => [
      u.id,
      u.fullName ?? u.username ?? "Utilisateur",
    ])
  )
}
