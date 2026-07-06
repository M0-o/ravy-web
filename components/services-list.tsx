"use client"

import {
  Palette,
  Languages,
  Clapperboard,
  GraduationCap,
  Laptop2,
} from "lucide-react"
import type { Service } from "@/lib/generated/prisma"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const categoryIcons: Record<string, React.ReactNode> = {
  design: <Palette className="h-6 w-6" />,
  traduction: <Languages className="h-6 w-6" />,
  montage_video: <Clapperboard className="h-6 w-6" />,
  cours: <GraduationCap className="h-6 w-6" />,
  assistance: <Laptop2 className="h-6 w-6" />,
}

export default function ServicesList({
  services,
  onCommander,
}: {
  services: Service[]
  onCommander: (service: Service) => void
}) {
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
              className="group flex flex-col transition-all duration-200 hover:shadow-md"
            >
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-200">
                  {categoryIcons[service.category]}
                </div>
                <CardTitle className="mt-4 text-xl">{service.title}</CardTitle>
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
                <Button size="sm" onClick={() => onCommander(service)}>
                  Commander
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
