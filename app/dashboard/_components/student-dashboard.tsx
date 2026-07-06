import { prisma } from "@/lib/prisma"
import { getDisplayNames } from "@/lib/clerk-users"
import { Card, CardContent } from "@/components/ui/card"
import ServicesTableClient from "./services-table-client"
import OrdersTableClient from "./orders-table-client"

export default async function StudentDashboard({
  userId,
}: {
  userId: string
}) {
  const [services, orders] = await Promise.all([
    prisma.service.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: "desc" },
    }),
    prisma.order.findMany({
      where: { studentId: userId },
      include: { service: true },
      orderBy: { createdAt: "desc" },
    }),
  ])

  const clientIds = orders.map((o) => o.clientId)
  const names = await getDisplayNames(clientIds)

  const pendingCount = orders.filter((o) => o.status === "pending").length
  const totalEarnings = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.service.priceFrom, 0)

  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gérez vos services et suivez vos commandes.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <Card className="border-border/60">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Services publiés
                </p>
                <p className="mt-1.5 text-3xl font-bold">{services.length}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
                  Commandes reçues
                </p>
                <p className="mt-1.5 text-3xl font-bold">
                  {orders.length}
                  {pendingCount > 0 && (
                    <span className="ml-2 text-sm font-medium text-accent">
                      ({pendingCount} en attente)
                    </span>
                  )}
                </p>
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
                  Gains (MAD)
                </p>
                <p className="mt-1.5 text-3xl font-bold">
                  {totalEarnings.toLocaleString("fr-FR")}
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

      {/* Services table */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">Mes services</h2>
          <span className="text-xs text-muted-foreground">
            {services.length} service{services.length !== 1 ? "s" : ""}
          </span>
        </div>
        <ServicesTableClient services={services} />
      </section>

      {/* Orders table */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">Commandes reçues</h2>
          <span className="text-xs text-muted-foreground">
            {orders.length} commande{orders.length !== 1 ? "s" : ""}
          </span>
        </div>
        <OrdersTableClient orders={orders} names={names} role="student" />
      </section>
    </div>
  )
}
