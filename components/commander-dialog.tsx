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
  const [form, setForm] = useState({ nom: "", email: "", message: "" })

  if (!service) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleClose = () => {
    onOpenChange(false)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ nom: "", email: "", message: "" })
    }, 200)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-accent" />
            <DialogTitle>Demande envoyée !</DialogTitle>
            <DialogDescription>
              Votre demande pour &laquo;&nbsp;{service.title}&nbsp;&raquo; a bien été reçue.
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
                  placeholder="Votre nom"
                  required
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message / Brief</Label>
                <Textarea
                  id="message"
                  placeholder="Décrivez votre besoin en quelques lignes..."
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
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
