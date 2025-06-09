"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { getGoalDetails, type Goal } from "@/services/api-client"

export default function GoalLayout({ children }: { children: React.ReactNode }) {
  const [goal, setGoal] = useState<Goal | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { user } = useAuth()
  const params = useParams()
  const router = useRouter()
  const pathname = usePathname()
  const goalId = params.id as string

  useEffect(() => {
    const fetchGoalDetails = async () => {
      if (!user?.id || !goalId) return

      setIsLoading(true)
      setError(null)

      try {
        const data = await getGoalDetails(user.id, goalId)
        setGoal(data)
      } catch (err) {
        console.error("Failed to load goal details:", err)
        setError("Failed to load goal details")

        // Fallback to mock data for demonstration
        setGoal({
          id: Number.parseInt(goalId),
          categoryId: 1,
          title: "Learn UI-UX",
          description: "Master the fundamentals of UI/UX design and create user-friendly interfaces",
          motivation: "To improve my design skills and create better user experiences",
          term: "Medium-Term",
          status: "In-Progress",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchGoalDetails()
  }, [user?.id, goalId])

  const handleBack = () => {
    if (goal?.categoryId) {
      router.push(`/categories/${goal.categoryId}`)
    } else {
      router.push("/dashboard")
    }
  }

  const isTabActive = (tabPath: string) => {
    return pathname === `/goals/${goalId}${tabPath}`
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="font-semibold text-lg">{isLoading ? "Loading..." : goal?.title || "Goal Details"}</h1>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 -mb-px overflow-x-auto">
            <Link
              href={`/goals/${goalId}/resources`}
              className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                isTabActive("/resources")
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Resources
            </Link>
            <Link
              href={`/goals/${goalId}/tasks`}
              className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                isTabActive("/tasks")
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Tasks
            </Link>
            <Link
              href={`/goals/${goalId}/notes`}
              className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                isTabActive("/notes")
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Notes
            </Link>
            <Link
              href={`/goals/${goalId}/about`}
              className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                isTabActive("/about")
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              About
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4">{children}</div>
    </div>
  )
}
