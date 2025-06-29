import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth"
import { AchievementToastManager } from "@/components/gamification/achievement-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EcoHunt - Gamify Your Green Habits",
  description: "Turn sustainable living into an exciting adventure with EcoHunt",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AchievementToastManager>{children}</AchievementToastManager>
        </AuthProvider>
      </body>
    </html>
  )
}
