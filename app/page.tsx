import { prisma } from "@/lib/prisma"
import PageClient from "@/components/page-client"

export default async function Home() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "asc" },
  })

  return <PageClient services={services} />
}
