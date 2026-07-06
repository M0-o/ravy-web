"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import OrderDetailDialog from "./order-detail-dialog"

type OrderRow = {
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

export default function OrdersTableClient({
  orders,
  names,
  role,
}: {
  orders: OrderRow[]
  names: Map<string, string>
  role: "student" | "client"
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = orders.find((o) => o.id === selectedId) ?? null

  const otherPartyName = (order: OrderRow) =>
    names.get(role === "student" ? order.clientId : order.studentId) ?? "—"

  if (orders.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/20 px-6 py-10 text-center">
        {role === "student" ? (
          <p className="text-sm text-muted-foreground">
            Aucune commande reçue pour le moment.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Vous n&apos;avez pas encore passé de commande.
          </p>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border/60">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-5">Service</TableHead>
              <TableHead>{role === "student" ? "Client" : "Étudiant"}</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="pr-5 text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((o) => (
              <TableRow
                key={o.id}
                className="cursor-pointer transition-colors hover:bg-muted/40"
                onClick={() => setSelectedId(o.id)}
              >
                <TableCell className="pl-5 font-medium">
                  {o.service.title}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {otherPartyName(o)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {o.service.priceFrom} <span className="text-xs">MAD</span> / {o.service.priceUnit}
                </TableCell>
                <TableCell>
                  <StatusBadge status={o.status} />
                </TableCell>
                <TableCell className="pr-5 text-right text-muted-foreground">
                  {new Date(o.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <OrderDetailDialog
        order={selected}
        userName={
          selected
            ? otherPartyName(selected)
            : ""
        }
        role={role}
        open={selectedId !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null)
        }}
      />
    </>
  )
}
