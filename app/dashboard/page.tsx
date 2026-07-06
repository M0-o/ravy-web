import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import StudentDashboard from "./_components/student-dashboard"
import ClientDashboard from "./_components/client-dashboard"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const { userId, sessionClaims } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const metadata = sessionClaims?.metadata as { role?: string } | undefined
  const role = metadata?.role

  if (role === "student") {
    return <StudentDashboard userId={userId} />
  }

  if (role === "client") {
    return <ClientDashboard userId={userId} />
  }

  redirect("/onboarding")
}
