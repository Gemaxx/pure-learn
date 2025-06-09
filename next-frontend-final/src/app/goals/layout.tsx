import type React from "react"
import { ProtectedRoute } from "@/components/protected-route"

export default function GoalsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen">{children}</div>
    </ProtectedRoute>
  )
}
