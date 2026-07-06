"use client"

import { useState } from "react"
import { CheckCircle2, Upload } from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Service } from "@/lib/generated/prisma"

const categories: { value: Service["category"]; label: string }[] = [
  { value: "design", label: "Design graphique" },
  { value: "traduction", label: "Traduction" },
  { value: "montage_video", label: "Montage vidéo" },
  { value: "cours", label: "Cours particuliers" },
  { value: "assistance", label: "Assistance digitale" },
]

const priceUnits = ["projet", "page", "vidéo", "heure", "tâche"] as const

export default function PosterServiceDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    titre: "",
    categorie: "" as string,
    description: "",
    prix: "",
    unite: "projet",
    tags: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nouveau service:", form)
    setSubmitted(true)
  }

  const handleClose = () => {
    onOpenChange(false)
    setTimeout(() => {
      setSubmitted(false)
      setForm({
        titre: "",
        categorie: "",
        description: "",
        prix: "",
        unite: "projet",
        tags: "",
      })
    }, 200)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-accent" />
            <DialogTitle>Service publié !</DialogTitle>
            <DialogDescription>
              Votre service a été soumis avec succès. Il sera visible sur la plateforme après
              vérification.
            </DialogDescription>
            <Button onClick={handleClose} className="mt-2">
              Fermer
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Poster un service</DialogTitle>
              <DialogDescription>
                Proposez votre service aux particuliers et entreprises.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titre">Titre du service</Label>
                <Input
                  id="titre"
                  placeholder="ex: Création de logo professionnel"
                  required
                  value={form.titre}
                  onChange={(e) => setForm({ ...form, titre: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categorie">Catégorie</Label>
                <Select
                  value={form.categorie}
                  onValueChange={(value) => setForm({ ...form, categorie: value })}
                  required
                >
                  <SelectTrigger id="categorie">
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez ce que vous proposez..."
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prix">Prix de départ (MAD)</Label>
                  <Input
                    id="prix"
                    type="number"
                    min={0}
                    placeholder="150"
                    required
                    value={form.prix}
                    onChange={(e) => setForm({ ...form, prix: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unite">Unité</Label>
                  <Select
                    value={form.unite}
                    onValueChange={(value) => setForm({ ...form, unite: value })}
                  >
                    <SelectTrigger id="unite">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priceUnits.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          / {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
                <Input
                  id="tags"
                  placeholder="ex: logo, branding, moderne"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Image / Vidéo (optionnel)</Label>
                <div className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 p-8 transition-colors hover:bg-muted/50">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Cliquez pour ajouter un fichier
                    </span>
                    <span className="text-xs text-muted-foreground">
                      PNG, JPG, MP4 (max 10 Mo)
                    </span>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Publier le service
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
