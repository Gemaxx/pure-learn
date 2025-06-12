"use client"

import { useAuth } from "@/contexts/auth-context"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-destructive/10 p-4 rounded-md text-destructive">Please login to view your dashboard.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h1>
      <p className="text-muted-foreground">
        This is your dashboard. Select a category from the sidebar to view its details.
      </p>
    </div>
  )
}
