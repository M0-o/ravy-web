"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Service } from "@/lib/generated/prisma/client"
import { createOrder } from "@/app/actions/orders"

export default function CommanderDialog({
  service,
  open,
  onOpenChange,
}: {
  service: Service | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!service) return null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    const result = await createOrder(service.id, formData)

    if (result.error) {
      setError(result.error)
      return
    }

    setSubmitted(true)
  }

  const handleClose = () => {
    onOpenChange(false)
    setTimeout(() => {
      setSubmitted(false)
      setError(null)
    }, 200)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-accent" />
            <DialogTitle>Commande envoyée !</DialogTitle>
            <DialogDescription>
              Votre commande pour &laquo;&nbsp;{service.title}&nbsp;&raquo; a bien été reçue.
              L&apos;étudiant vous contactera dans les plus brefs délais.
            </DialogDescription>
            <Button onClick={handleClose} className="mt-2">
              Fermer
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Commander : {service.title}</DialogTitle>
              <DialogDescription>
                à partir de {service.priceFrom} MAD / {service.priceUnit}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom complet</Label>
                <Input
                  id="nom"
                  name="nom"
                  placeholder="Votre nom"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="votre@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message / Brief</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Décrivez votre besoin en quelques lignes..."
                  rows={4}
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full">
                Envoyer la demande
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
