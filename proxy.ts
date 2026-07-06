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

  if (userId) {
    const metadata = authObj.sessionClaims?.metadata as
      | { role?: string }
      | undefined
    const hasRole = !!metadata?.role

    if (hasRole && isOnboardingRoute(req)) {
      console.log("[middleware] role already set, redirecting to /")
      return Response.redirect(new URL("/", req.url))
    }

    if (!hasRole && !isOnboardingRoute(req)) {
      console.log("[middleware] no role set, redirecting to /onboarding")
      return Response.redirect(new URL("/onboarding", req.url))
    }
  }
})

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
