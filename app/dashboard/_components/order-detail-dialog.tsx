"use client"

import { CalendarDays, FileText, User, MessageSquare } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

type OrderWithService = {
  id: string
  serviceId: string
  clientId: string
  studentId: string
  status: string
  message: string | null
  createdAt: Date
  service: {
    id: string
    title: string
    priceFrom: number
    priceUnit: string
    imageUrl: string | null
  }
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { variant: "accent" | "default" | "secondary" | "destructive"; label: string }> = {
    pending: { variant: "accent", label: "En attente" },
    accepted: { variant: "default", label: "Acceptée" },
    completed: { variant: "secondary", label: "Terminée" },
    rejected: { variant: "destructive", label: "Refusée" },
  }
  const s = map[status] ?? { variant: "outline" as const, label: status }
  return <Badge variant={s.variant}>{s.label}</Badge>
}

export default function OrderDetailDialog({
  order,
  userName,
  role,
  open,
  onOpenChange,
}: {
  order: OrderWithService | null
  userName: string
  role: "client" | "student"
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!order) return null

  const otherPartyLabel = role === "student" ? "Client" : "Étudiant"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 pr-10">
            <div>
              <DialogTitle className="text-xl">{order.service.title}</DialogTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Commande #{order.id.slice(0, 8)}
              </p>
            </div>
            <StatusBadge status={order.status} />
          </div>
        </DialogHeader>

        <div className="space-y-5">
          {order.service.imageUrl && (
            <div className="overflow-hidden rounded-xl border border-border/60">
              <img
                src={order.service.imageUrl}
                alt={order.service.title}
                className="max-h-48 w-full object-cover"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <User className="h-3 w-3" />
                {otherPartyLabel}
              </div>
              <p className="text-sm font-medium">{userName}</p>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <CalendarDays className="h-3 w-3" />
                Date
              </div>
              <p className="text-sm font-medium">
                {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <FileText className="h-3 w-3" />
              Prix
            </div>
            <p className="text-sm font-medium">
              {order.service.priceFrom} MAD / {order.service.priceUnit}
            </p>
          </div>

          {order.message && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <MessageSquare className="h-3 w-3" />
                Message
              </div>
              <div className="rounded-xl bg-muted/30 p-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {order.message}
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
