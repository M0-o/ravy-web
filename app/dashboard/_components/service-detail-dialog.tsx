"use client"

import { useState } from "react"
import Image from "next/image"
import { Trash2, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { deleteService } from "@/app/actions/services"
import type { Service } from "@/lib/generated/prisma/client"

export default function ServiceDetailDialog({
  service,
  open,
  onOpenChange,
}: {
  service: Service | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [deleting, setDeleting] = useState(false)
  const [confirmName, setConfirmName] = useState("")

  if (!service) return null

  const handleDelete = async () => {
    setDeleting(true)
    const result = await deleteService(service.id)
    if (result.error) {
      toast.error(result.error)
      setDeleting(false)
      return
    }
    toast.success("Service supprimé")
    onOpenChange(false)
  }

  const canDelete = confirmName === service.title

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 pr-10">
            <div>
              <DialogTitle className="text-xl">{service.title}</DialogTitle>
              <p className="mt-1 text-sm text-muted-foreground capitalize">
                {service.category.replace("_", " ")}
              </p>
            </div>
            <Badge variant="accent" className="shrink-0">
              {service.priceFrom} MAD / {service.priceUnit}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-5">
          {/* Image */}
          {service.imageUrl ? (
            <div className="overflow-hidden rounded-xl border border-border/60">
              <img
                src={service.imageUrl}
                alt={service.title}
                className="max-h-64 w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center rounded-xl bg-muted/30 text-sm text-muted-foreground">
              Aucune image
            </div>
          )}

          {/* Description */}
          <div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {service.description}
            </p>
          </div>

          {/* Tags */}
          {service.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {service.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Delete section */}
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-destructive mb-3">
              <Trash2 className="h-4 w-4" />
              Zone de danger
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Tapez <strong>{service.title}</strong> pour confirmer la suppression définitive.
            </p>
            <Input
              placeholder="Tapez le nom du service"
              value={confirmName}
              onChange={(e) => setConfirmName(e.target.value)}
              className="mb-3 border-destructive/30 focus-visible:ring-destructive"
            />
            <Button
              variant="destructive"
              size="sm"
              className="w-full gap-2"
              disabled={!canDelete || deleting}
              onClick={handleDelete}
            >
              {deleting ? "Suppression..." : "Supprimer définitivement"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
