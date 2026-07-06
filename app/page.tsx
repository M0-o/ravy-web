"use client"

import { useState, useCallback } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Stats from "@/components/stats"
import ServicesGrid from "@/components/services-grid"
import HowItWorks from "@/components/how-it-works"
import Footer from "@/components/footer"
import CommanderDialog from "@/components/commander-dialog"
import PosterServiceDialog from "@/components/poster-service-dialog"
import type { Service } from "@/lib/data/services"

export default function Home() {
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
        <ServicesGrid onCommander={handleCommander} />
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
