import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { TrashProvider } from "@/contexts/trash-context"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "PureLearn",
  description: "A Learning Framework",
  generator: "v0.dev",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background text-foreground font-sans antialiased", fontSans.variable)} suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
            <TrashProvider>
              <Navbar />
              <main className="pt-14">{children}</main>
              <Toaster />
            </TrashProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
