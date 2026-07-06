"use client"

import { useState, useRef } from "react"
import { CheckCircle2, Loader2, Upload } from "lucide-react"
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
import { generateReactHelpers } from "@uploadthing/react"
import type { OurFileRouter } from "@/app/api/uploadthing/core"
import { postService } from "@/app/actions/services"
import type { Service } from "@/lib/generated/prisma/client"

const { useUploadThing } = generateReactHelpers<OurFileRouter>()

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
  const [imageUrl, setImageUrl] = useState<string | undefined>()
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState({
    titre: "",
    categorie: "" as string,
    description: "",
    prix: "",
    unite: "projet",
    tags: "",
  })

  const { startUpload, isUploading } = useUploadThing("serviceImage", {
    onClientUploadComplete: (res) => {
      if (res?.[0]?.url) setImageUrl(res[0].url)
    },
    onUploadError: (err) => {
      setError(err.message || "Erreur lors du téléchargement")
    },
  })

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    e.target.value = ""
    setError(null)
    await startUpload([file])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    console.log("[poster dialog] submitting service", { ...form, imageUrl })

    const result = await postService({
      title: form.titre,
      category: form.categorie,
      description: form.description,
      priceFrom: parseInt(form.prix, 10),
      priceUnit: form.unite,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      imageUrl,
    })

    console.log("[poster dialog] server action result:", result)

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
      setImageUrl(undefined)
      setError(null)
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
      <DialogContent className="sm:max-w-3xl">
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-accent" />
            <DialogTitle>Service publié !</DialogTitle>
            <DialogDescription>
              Votre service est désormais visible sur la plateforme.
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
            <form onSubmit={handleSubmit}>
              <div className="flex gap-6">
                <div className="flex-1 space-y-4">
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
                </div>

                <div className="w-56 shrink-0 space-y-2">
                  <Label>Image (optionnel)</Label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={isUploading}
                    onChange={handleFileChange}
                  />
                  <div
                    className={`flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed transition-colors h-44 ${
                      isUploading
                        ? "cursor-not-allowed border-muted-foreground/30 bg-muted/20"
                        : imageUrl
                          ? "border-accent bg-accent/5"
                          : "border-border bg-muted/30 hover:bg-muted/50"
                    }`}
                    onClick={() => {
                      if (!isUploading) fileInputRef.current?.click()
                    }}
                  >
                    <div className="flex flex-col items-center gap-2 text-center px-4">
                      {isUploading ? (
                        <>
                          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                          <span className="text-sm font-medium text-muted-foreground">
                            Téléchargement...
                          </span>
                        </>
                      ) : imageUrl ? (
                        <>
                          <Upload className="h-6 w-6 text-accent" />
                          <span className="text-sm font-medium text-accent">
                            ✓ Image téléchargée
                          </span>
                        </>
                      ) : (
                        <>
                          <Upload className="h-6 w-6 text-muted-foreground" />
                          <span className="text-sm font-medium text-muted-foreground">
                            Ajouter une image
                          </span>
                          <span className="text-xs text-muted-foreground">
                            PNG, JPG (max 4 Mo)
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <p className="mt-4 text-sm text-destructive">{error}</p>
              )}

              <Button type="submit" className="mt-4 w-full" disabled={isUploading}>
                {isUploading ? "Téléchargement en cours..." : "Publier le service"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
