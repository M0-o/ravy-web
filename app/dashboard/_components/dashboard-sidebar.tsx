"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Grid3X3,
  ShoppingCart,
  Package,
  Plus,
  Search,
  Menu,
  X,
  LogOut,
  User,
} from "lucide-react"
import { useClerk } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import PosterServiceDialog from "@/components/poster-service-dialog"

const studentNav = [
  { label: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
]

const clientNav = [
  { label: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
]

export default function DashboardSidebar({
  displayName,
  role,
  children,
}: {
  displayName: string
  role?: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { signOut } = useClerk()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [posterOpen, setPosterOpen] = useState(false)

  const nav = role === "student" ? studentNav : clientNav
  const initial = displayName.charAt(0).toUpperCase()

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-card pt-16 transition-transform md:sticky md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* User info */}
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
            {initial}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{displayName}</p>
            <Badge
              variant="outline"
              className="mt-0.5 h-5 px-1.5 text-[10px] uppercase tracking-wider"
            >
              {role === "student" ? "Étudiant" : "Client"}
            </Badge>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-accent/10 text-accent"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Quick actions */}
        <div className="border-t border-border px-4 py-4">
          {role === "student" ? (
            <Button
              size="sm"
              className="w-full gap-2"
              onClick={() => setPosterOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Poster un service
            </Button>
          ) : (
            <Button size="sm" className="w-full gap-2" asChild>
              <Link href="/#services">
                <Search className="h-4 w-4" />
                Découvrir les services
              </Link>
            </Button>
          )}
        </div>

        {/* Bottom links */}
        <div className="border-t border-border px-3 py-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Grid3X3 className="h-4 w-4" />
            Retour au site
          </Link>
          <button
            onClick={() => signOut({ redirectUrl: "/" })}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Mobile hamburger */}
      <button
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Menu"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <PosterServiceDialog open={posterOpen} onOpenChange={setPosterOpen} />
    </div>
  )
}
