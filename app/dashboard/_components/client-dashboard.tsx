import { prisma } from "@/lib/prisma"
import { getDisplayNames } from "@/lib/clerk-users"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import OrdersTableClient from "./orders-table-client"

export default async function ClientDashboard({
  userId,
}: {
  userId: string
}) {
  const orders = await prisma.order.findMany({
    where: { clientId: userId },
    include: { service: true },
    orderBy: { createdAt: "desc" },
  })

  const studentIds = orders.map((o) => o.studentId)
  const names = await getDisplayNames(studentIds)

  const pendingCount = orders.filter((o) => o.status === "pending").length
  const totalSpent = orders.reduce((sum, o) => sum + o.service.priceFrom, 0)

  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Suivez vos commandes et retrouvez vos services préférés.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <Card className="border-border/60">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Commandes passées
                </p>
                <p className="mt-1.5 text-3xl font-bold">{orders.length}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  En attente
                </p>
                <p className="mt-1.5 text-3xl font-bold">{pendingCount}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Badge variant="accent" className="h-6 w-6 rounded-full p-0 flex items-center justify-center">
                  <span className="text-xs font-bold">!</span>
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Total dépensé (MAD)
                </p>
                <p className="mt-1.5 text-3xl font-bold">
                  {totalSpent.toLocaleString("fr-FR")}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders table */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">Mes commandes</h2>
          <span className="text-xs text-muted-foreground">
            {orders.length} commande{orders.length !== 1 ? "s" : ""}
          </span>
        </div>
        <OrdersTableClient orders={orders} names={names} role="client" />
      </section>
    </div>
  )
}
