import { GraduationCap, UserCircle } from "lucide-react"
import { OnboardingForm } from "./onboarding-form"

export default function OnboardingPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Vous êtes&nbsp;?
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Choisissez votre profil pour commencer
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <OnboardingForm role="student">
            <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-border bg-card p-8 transition-all hover:border-accent hover:shadow-md">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-semibold">Je suis étudiant(e)</h2>
              <p className="text-sm text-muted-foreground">
                Je propose mes services aux particuliers et entreprises
              </p>
            </div>
          </OnboardingForm>

          <OnboardingForm role="client">
            <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-border bg-card p-8 transition-all hover:border-accent hover:shadow-md">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                <UserCircle className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-semibold">Je suis client(e)</h2>
              <p className="text-sm text-muted-foreground">
                Je cherche des services proposés par des étudiants
              </p>
            </div>
          </OnboardingForm>
        </div>
      </div>
    </div>
  )
}
