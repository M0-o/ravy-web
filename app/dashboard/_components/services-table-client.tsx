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
import ServiceDetailDialog from "./service-detail-dialog"

export default function ServicesTableClient({
  services,
}: {
  services: {
    id: string
    title: string
    category: string
    priceFrom: number
    priceUnit: string
    createdAt: Date
  }[]
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = services.find((s) => s.id === selectedId) ?? null

  if (services.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/20 px-6 py-10 text-center">
        <p className="text-sm text-muted-foreground">
          Vous n&apos;avez pas encore publié de service.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border/60">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-5">Titre</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead className="pr-5 text-right">Publié le</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((s) => (
              <TableRow
                key={s.id}
                className="cursor-pointer transition-colors hover:bg-muted/40"
                onClick={() => setSelectedId(s.id)}
              >
                <TableCell className="pl-5 font-medium">{s.title}</TableCell>
                <TableCell className="capitalize text-muted-foreground">
                  {s.category.replace("_", " ")}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {s.priceFrom} <span className="text-xs">MAD</span> / {s.priceUnit}
                </TableCell>
                <TableCell className="pr-5 text-right text-muted-foreground">
                  {new Date(s.createdAt).toLocaleDateString("fr-FR", {
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

      <ServiceDetailDialog
        service={selected as any}
        open={selectedId !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null)
        }}
      />
    </>
  )
}
