import { auth, clerkClient } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashboardSidebar from "./_components/dashboard-sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.username ||
    "Utilisateur"
  const role = user.publicMetadata.role as string | undefined

  return (
    <DashboardSidebar displayName={displayName} role={role}>
      {children}
    </DashboardSidebar>
  )
}
