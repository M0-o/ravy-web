import { createUploadthing, type FileRouter } from "uploadthing/next"
import { auth } from "@clerk/nextjs/server"

const f = createUploadthing()

export const ourFileRouter = {
  serviceImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const a = await auth()
      const { userId, sessionClaims } = a

      console.log("[uploadthing middleware] auth result:", JSON.stringify({
        userId,
        sessionClaimsKeys: sessionClaims ? Object.keys(sessionClaims) : null,
        metadata: sessionClaims?.metadata,
      }))

      if (!userId) throw new Error("Non authentifié")

      const metadata = sessionClaims?.metadata as { role?: string } | undefined
      const role = metadata?.role
      if (role !== "student") {
        throw new Error(
          "Seuls les étudiants peuvent publier des services. Rôle actuel: " + (role || "non défini")
        )
      }

      return { userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("[uploadthing] upload complete for user", metadata.userId, "url:", file.url)
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
