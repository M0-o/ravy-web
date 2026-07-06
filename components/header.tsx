"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useUser, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "À propos", href: "#a-propos" },
  { label: "Services", href: "#services" },
  { label: "Comment ça marche", href: "#comment-ca-marche" },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isLoaded, isSignedIn } = useUser()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground text-sm font-bold">
            M
          </span>
          MarketPlace ALL
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isLoaded && !isSignedIn && (
            <Button variant="outline" size="sm" className="hidden md:inline-flex" asChild>
              <Link href="/sign-up">Se connecter</Link>
            </Button>
          )}
          {isLoaded && isSignedIn && (
            <>
              <Link
                href="/dashboard"
                className="hidden md:inline-flex text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Tableau de bord
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-8 w-8",
                  },
                }}
              />
            </>
          )}
          <button
            className="flex md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border md:hidden">
          <nav className="flex flex-col gap-2 px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {isLoaded && !isSignedIn && (
              <Button variant="outline" size="sm" className="mt-2 w-full" asChild>
                <Link href="/sign-up">Se connecter</Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
