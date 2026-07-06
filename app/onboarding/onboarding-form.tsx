"use client"

import { useState } from "react"
import { useClerk } from "@clerk/nextjs"
import { toast } from "sonner"
import { completeOnboarding } from "./_actions"

export function OnboardingForm({
  role,
  children,
}: {
  role: "student" | "client"
  children: React.ReactNode
}) {
  const clerk = useClerk()
  const [pending, setPending] = useState(false)

  return (
    <form
      action={async () => {
        setPending(true)
        console.log("[onboarding form] submitting role:", role)

        const result = await completeOnboarding(role)
        console.log("[onboarding form] server action result:", result)

        if (result.success) {
          console.log("[onboarding form] reloading session...")
          await clerk.session?.reload()
          console.log("[onboarding form] session reloaded, hard-navigating to /")
          toast.success("Profil enregistré !", {
            description: "Votre choix a bien été pris en compte.",
          })
          window.location.href = "/"
        }
        setPending(false)
      }}
    >
      <button type="submit" disabled={pending} className="w-full text-left">
        {children}
      </button>
    </form>
  )
}
