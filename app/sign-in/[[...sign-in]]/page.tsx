import { SignIn } from "@clerk/nextjs"

const clerkAppearance = {
  elements: {
    card: "shadow-sm border border-border",
    headerTitle: "text-foreground text-xl",
    headerSubtitle: "text-muted-foreground",
    socialButtonsBlockButton:
      "border-border bg-background text-foreground hover:bg-muted rounded-xl",
    socialButtonsBlockButtonText: "font-medium",
    dividerLine: "bg-border",
    dividerText: "text-muted-foreground text-xs",
    formFieldLabel: "text-foreground text-sm font-medium",
    formFieldInput:
      "rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-accent",
    formButtonPrimary:
      "bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 shadow-sm",
    footerActionText: "text-muted-foreground",
    footerActionLink: "text-accent hover:text-accent/80 font-medium",
    identityPreviewText: "text-foreground",
    identityPreviewEditButton: "text-accent",
    formFieldAction: "text-accent",
    otpInputField:
      "rounded-xl border-border text-foreground focus:ring-accent",
    alert: "rounded-xl",
    alertText: "text-sm",
    alertIcon: "text-accent",
  },
  variables: {
    colorPrimary: "#D4735E",
    colorBackground: "#FFFFFF",
    colorText: "#1E293B",
    colorInputBackground: "#FAF8F5",
    colorInputText: "#1E293B",
    colorNeutral: "#6B7280",
    colorDanger: "#DC2626",
    borderRadius: "0.75rem",
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
  },
}

export default function SignInPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 bg-background">
      <SignIn appearance={clerkAppearance} />
    </div>
  )
}
