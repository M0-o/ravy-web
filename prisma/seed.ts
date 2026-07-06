import { config } from "dotenv"
import { resolve } from "path"
config({ path: resolve(".env") })
config({ path: resolve(".env.local") })

import { PrismaClient } from "../lib/generated/prisma/client"
import { PrismaNeonHttp } from "@prisma/adapter-neon"
import { services } from "../lib/data/services"

const connectionString = process.env.RAVY_DATABASE_URL_UNPOOLED!
if (!connectionString) {
  console.error("RAVY_DATABASE_URL_UNPOOLED is not set")
  process.exit(1)
}

const adapter = new PrismaNeonHttp(connectionString, {})
const prisma = new PrismaClient({ adapter })

async function main() {
  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: {
        category: service.category,
        title: service.title,
        description: service.description,
        tags: service.tags,
        priceFrom: service.priceFrom,
        priceUnit: service.priceUnit,
        studentName: service.studentName ?? null,
      },
      create: {
        id: service.id,
        category: service.category,
        title: service.title,
        description: service.description,
        tags: service.tags,
        priceFrom: service.priceFrom,
        priceUnit: service.priceUnit,
        studentName: service.studentName ?? null,
      },
    })
  }
  console.log("Seeded 5 services successfully.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
