"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { getGoalDetails, softDeleteGoal, hardDeleteGoal, type Goal } from "@/services/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MoreVertical, Target, Clock, Trash2, AlertTriangle, Edit } from "lucide-react"
import { GoalEditModal } from "@/components/goal-edit-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

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

export default function GoalDetailsPage() {
  const [goal, setGoal] = useState<Goal | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteType, setDeleteType] = useState<"soft" | "hard">("soft")

  const { user } = useAuth()
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()

  const goalId = params.id as string
  const categoryId = searchParams.get("categoryId")

  useEffect(() => {
    const fetchGoalDetails = async () => {
      if (!user?.id || !goalId) return

      setIsLoading(true)
      setError(null)

      try {
        const data = await getGoalDetails(user.id, goalId)
        setGoal(data)
      } catch (err) {
        setError("Failed to load goal details")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGoalDetails()
  }, [user?.id, goalId])

  const handleBack = () => {
    if (categoryId) {
      router.push(`/categories/${categoryId}`)
    } else {
      router.push("/dashboard")
    }
  }

  const handleEditGoal = () => {
    setIsEditModalOpen(true)
  }

  const handleUpdateGoal = (updatedGoal: Goal) => {
    setGoal(updatedGoal)
  }

  const handleDeleteGoal = (type: "soft" | "hard") => {
    setDeleteType(type)
    setDeleteDialogOpen(true)
  }

  const confirmDeleteGoal = async () => {
    if (!goal || !user?.id) return

    try {
      if (deleteType === "soft") {
        await softDeleteGoal(user.id, goal.id.toString())
        toast({
          title: "Success",
          description: "Goal moved to trash",
          variant: "success",
        })
      } else {
        await hardDeleteGoal(user.id, goal.id.toString())
        toast({
          title: "Success",
          description: "Goal permanently deleted",
          variant: "success",
        })
      }

      setDeleteDialogOpen(false)
      handleBack()
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete goal",
        variant: "destructive",
      })
      console.error(err)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="h-6 w-32 bg-secondary rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-1/3 bg-secondary rounded"></div>
            <div className="h-4 w-2/3 bg-secondary rounded"></div>
            <div className="h-4 w-1/2 bg-secondary rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="font-semibold text-lg">Goal Details</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          <div className="bg-destructive/10 p-4 rounded-md text-destructive">{error}</div>
        </div>
      </div>
    )
  }

  if (!goal) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="font-semibold text-lg">Goal Details</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          <div className="bg-secondary p-4 rounded-md">Goal not found</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="font-semibold text-lg truncate">{goal.title}</h1>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleEditGoal}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Goal
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDeleteGoal("soft")} className="text-yellow-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Soft Delete
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDeleteGoal("hard")} className="text-destructive">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Hard Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Goal Header */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    {goal.title}
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className={`text-xs px-2 py-0.5 h-6 ${termColors[goal.term]}`}>
                      <Clock className="h-3 w-3 mr-1" />
                      {goal.term}
                    </Badge>
                    <Badge variant="secondary" className={`text-xs px-2 py-0.5 h-6 ${statusColors[goal.status]}`}>
                      {goal.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            {(goal.description || goal.motivation || goal.completionDate) && (
              <CardContent className="space-y-4">
                {goal.description && (
                  <div>
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">{goal.description}</p>
                  </div>
                )}
                {goal.motivation && (
                  <div>
                    <h3 className="font-medium mb-2">Motivation</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">{goal.motivation}</p>
                  </div>
                )}
                {goal.completionDate && (
                  <div>
                    <h3 className="font-medium mb-2">Completion Date</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      {new Date(goal.completionDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          {/* Tasks Section - Placeholder for future implementation */}
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Task management will be implemented in a future update.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {goal && (
        <GoalEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={handleUpdateGoal}
          goal={goal}
        />
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{deleteType === "soft" ? "Soft Delete Goal" : "Hard Delete Goal"}</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteType === "soft"
                ? "This goal will be moved to trash and can be restored later."
                : "This action cannot be undone. This will permanently delete the goal."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteGoal}
              className={deleteType === "hard" ? "bg-destructive hover:bg-destructive/90" : ""}
            >
              {deleteType === "soft" ? "Soft Delete" : "Hard Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
