"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { getGoalDetails, type Goal } from "@/services/api-client"
import { Badge } from "@/components/ui/badge"
import { Clock, Target } from "lucide-react"

const termColors = {
  "Short-Term": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "Medium-Term": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  "Long-Term": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
}

const statusColors = {
  "Not-Started": "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  "In-Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "On-Hold": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Done: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Canceled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

export default function AboutPage() {
  const [goal, setGoal] = useState<Goal | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { user } = useAuth()
  const params = useParams()
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

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-1/3 bg-secondary rounded"></div>
        <div className="h-4 w-2/3 bg-secondary rounded"></div>
        <div className="h-4 w-1/2 bg-secondary rounded"></div>
      </div>
    )
  }

  if (error) {
    return <div className="bg-destructive/10 p-4 rounded-md text-destructive">{error}</div>
  }

  if (!goal) {
    return <div className="bg-secondary p-4 rounded-md">Goal not found</div>
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          <h2 className="text-lg font-medium">{goal.title}</h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {goal.term && (
            <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
              <Clock className="h-3 w-3 mr-1" />
              {goal.term}
            </Badge>
          )}
          {goal.status && (
            <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/80">{goal.status}</Badge>
          )}
        </div>
      </div>

      {goal.description && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Description</h3>
          <p className="text-sm text-muted-foreground">{goal.description}</p>
        </div>
      )}

      {goal.motivation && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Motivation</h3>
          <p className="text-sm text-muted-foreground">{goal.motivation}</p>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Created</h3>
        <p className="text-sm text-muted-foreground">{new Date(goal.createdAt || Date.now()).toLocaleDateString()}</p>
      </div>

      {goal.updatedAt && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Last Updated</h3>
          <p className="text-sm text-muted-foreground">{new Date(goal.updatedAt).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  )
}
