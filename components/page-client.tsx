"use client"

import { useState, useCallback } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Stats from "@/components/stats"
import ServicesList from "@/components/services-list"
import HowItWorks from "@/components/how-it-works"
import Footer from "@/components/footer"
import CommanderDialog from "@/components/commander-dialog"
import PosterServiceDialog from "@/components/poster-service-dialog"
import type { Service } from "@/lib/generated/prisma/client"

export default function PageClient({ services }: { services: Service[] }) {
  const [commanderService, setCommanderService] = useState<Service | null>(null)
  const [posterOpen, setPosterOpen] = useState(false)

  const handleCommander = useCallback((service: Service) => {
    setCommanderService(service)
  }, [])

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero onPosterService={() => setPosterOpen(true)} />
        <Stats />
        <ServicesList services={services} onCommander={handleCommander} />
        <HowItWorks />
      </main>
      <Footer />

      <CommanderDialog
        service={commanderService}
        open={commanderService !== null}
        onOpenChange={(open) => {
          if (!open) setCommanderService(null)
        }}
      />

      <PosterServiceDialog
        open={posterOpen}
        onOpenChange={setPosterOpen}
      />
    </>
  )
}
