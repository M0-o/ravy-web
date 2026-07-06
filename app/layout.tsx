import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MarketPlace ALL — Services étudiants à Casablanca",
  description:
    "La plateforme qui connecte particuliers et entreprises avec des étudiants qualifiés proposant des services créatifs et numériques à prix accessibles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="fr"
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <body className="min-h-screen flex flex-col">
          {children}
          <Toaster
            position="top-center"
            richColors
            closeButton
            toastOptions={{
              style: {
                borderRadius: "0.75rem",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
