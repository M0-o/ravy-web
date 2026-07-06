"use client"

import { useUser } from "@clerk/nextjs"
import {
  Palette,
  Languages,
  Clapperboard,
  GraduationCap,
  Laptop2,
} from "lucide-react"
import type { Service } from "@/lib/generated/prisma/client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const categoryMeta: Record<string, { icon: React.ReactNode; gradient: string; label: string }> = {
  design: { icon: <Palette className="h-8 w-8" />, gradient: "from-violet-500/20 to-purple-500/10", label: "Design" },
  traduction: { icon: <Languages className="h-8 w-8" />, gradient: "from-sky-500/20 to-blue-500/10", label: "Traduction" },
  montage_video: { icon: <Clapperboard className="h-8 w-8" />, gradient: "from-orange-500/20 to-red-500/10", label: "Montage" },
  cours: { icon: <GraduationCap className="h-8 w-8" />, gradient: "from-emerald-500/20 to-green-500/10", label: "Cours" },
  assistance: { icon: <Laptop2 className="h-8 w-8" />, gradient: "from-cyan-500/20 to-teal-500/10", label: "Assistance" },
}

export default function ServicesList({
  services,
  onCommander,
}: {
  services: Service[]
  onCommander: (service: Service) => void
}) {
  const { isLoaded, isSignedIn, user } = useUser()
  const role = user?.publicMetadata?.role as string | undefined
  const showCommander = !isLoaded || !isSignedIn || role === "client"

  return (
    <section id="services" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Nos services</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Parcourez nos offres et commandez directement auprès d&apos;étudiants spécialisés
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.id}
              className="group flex flex-col overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <CardHeader>
                {service.imageUrl ? (
                  <div className="relative -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-xl">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="h-48 w-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className={`-mx-6 -mt-6 mb-4 flex h-40 items-center justify-center bg-gradient-to-br ${categoryMeta[service.category]?.gradient || "from-muted to-muted/50"}`}
                  >
                    <div className="text-muted-foreground/40">
                      {categoryMeta[service.category]?.icon}
                    </div>
                  </div>
                )}
                {service.studentName && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <span className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center text-xs font-medium text-accent">
                      {service.studentName.charAt(0).toUpperCase()}
                    </span>
                    <span>{service.studentName}</span>
                  </div>
                )}
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  à partir de <span className="text-accent">{service.priceFrom} MAD</span>
                  <span className="text-muted-foreground"> / {service.priceUnit}</span>
                </span>
                {showCommander && (
                  <Button size="sm" onClick={() => onCommander(service)}>
                    Commander
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
