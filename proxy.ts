import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)", "/api/uploadthing"])
const isOnboardingRoute = createRouteMatcher(["/onboarding"])

export default clerkMiddleware(async (auth, req) => {
  const authObj = await auth()
  const { userId } = authObj

  console.log(`[middleware] path=${req.nextUrl.pathname} userId=${!!userId}`)

  if (!userId && !isPublicRoute(req)) {
    console.log("[middleware] redirecting to sign-in (protected route)")
    return authObj.redirectToSignIn()
  }

  if (userId && isOnboardingRoute(req)) {
    const metadata = authObj.sessionClaims?.metadata as
      | { role?: string }
      | undefined
    console.log("[middleware] onboarding route, role=", metadata?.role)
    if (metadata?.role) {
      console.log("[middleware] role already set, redirecting to /")
      return Response.redirect(new URL("/", req.url))
    }
  }
})

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
