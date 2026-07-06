"use client"

import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

export default function Hero({ onPosterService }: { onPosterService: () => void }) {
  const { isLoaded, isSignedIn, user } = useUser()
  const role = user?.publicMetadata?.role as string | undefined

  const showPoster = !isLoaded || !isSignedIn || role === "student"
  const showCommander = !isLoaded || !isSignedIn || role === "client"

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm font-medium text-muted-foreground">
            <span className="text-base" aria-hidden="true">🎓</span>
            Par des étudiants, pour vous
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Des compétences étudiantes
            <br />
            <span className="text-accent">à votre service</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            La plateforme qui connecte particuliers et entreprises avec des étudiants qualifiés
            proposant des services créatifs et numériques — design, traduction, montage vidéo,
            cours particuliers et assistance digitale — à des prix accessibles.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {showCommander && (
              <Button size="lg" asChild>
                {isSignedIn && role === "client" ? (
                  <a href="#services">Découvrir les services</a>
                ) : (
                  <Link href="/sign-up">Découvrir les services</Link>
                )}
              </Button>
            )}
            {showPoster && (
              <Button size="lg" variant="outline" onClick={onPosterService}>
                Poster un service
              </Button>
            )}
          </div>
        </div>
      </div>

      <div
        className="absolute -top-40 right-0 -z-10 h-[500px] w-[500px] opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, #D4735E 1px, transparent 1px),
            radial-gradient(circle at 80% 50%, #D4735E 1px, transparent 1px),
            radial-gradient(circle at 50% 20%, #C4956A 1px, transparent 1px),
            radial-gradient(circle at 50% 80%, #D4735E 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </section>
  )
}
