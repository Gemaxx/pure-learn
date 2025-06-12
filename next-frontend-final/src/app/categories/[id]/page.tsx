"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import {
  getCategoryDetails,
  getGoalsByCategory,
  softDeleteGoal,
  hardDeleteGoal,
  type Category,
  type Goal,
} from "@/services/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Target, Clock, MoreVertical, Trash2, AlertTriangle, Edit } from "lucide-react"
import { GoalFormModal } from "@/components/goal-form-modal"
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

export default function CategoryPage() {
  const [category, setCategory] = useState<Category | null>(null)
  const [goals, setGoals] = useState<Goal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isGoalsLoading, setIsGoalsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null)
  const [goalToEdit, setGoalToEdit] = useState<Goal | null>(null)
  const [deleteType, setDeleteType] = useState<"soft" | "hard">("soft")

  const { user } = useAuth()
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const categoryId = params.id as string

  if (!user?.id) {
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-destructive/10 p-4 rounded-md text-destructive">You must be logged in to view this page.</div>
      </div>
    );
  }

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      if (!user?.id || !categoryId) return

      setIsLoading(true)
      setError(null)

      try {
        const data = await getCategoryDetails(user.id, categoryId)
        setCategory(data)
      } catch (err) {
        setError("Failed to load category details")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategoryDetails()
  }, [user?.id, categoryId])

  useEffect(() => {
    const fetchGoals = async () => {
      if (!user?.id || !categoryId) return

      setIsGoalsLoading(true)

      try {
        const goalsData = await getGoalsByCategory(user.id, categoryId)
        setGoals(Array.isArray(goalsData) ? goalsData : [])
      } catch (err) {
        console.error("Failed to load goals:", err)
        setGoals([])
      } finally {
        setIsGoalsLoading(false)
      }
    }

    fetchGoals()
  }, [user?.id, categoryId])

  const handleAddGoal = (newGoal: Goal) => {
    setGoals((prev) => [...prev, newGoal])
  }

  const handleUpdateGoal = (updatedGoal: Goal) => {
    setGoals((prev) => prev.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)))
  }

  const handleGoalClick = (goalId: number) => {
    router.push(`/goals/${goalId}?categoryId=${categoryId}`)
  }

  const handleEditGoal = (goal: Goal) => {
    setGoalToEdit(goal)
    setIsEditModalOpen(true)
  }

  const handleDeleteGoal = (goal: Goal, type: "soft" | "hard") => {
    setGoalToDelete(goal)
    setDeleteType(type)
    setDeleteDialogOpen(true)
  }

  const confirmDeleteGoal = async () => {
    if (!goalToDelete || !user?.id) return

    try {
      if (deleteType === "soft") {
        await softDeleteGoal(user.id, goalToDelete.id.toString())
        toast({
          title: "Success",
          description: "Goal moved to trash",
          variant: "success",
        })
      } else {
        await hardDeleteGoal(user.id, goalToDelete.id.toString())
        toast({
          title: "Success",
          description: "Goal permanently deleted",
          variant: "success",
        })
      }

      setGoals((prev) => prev.filter((g) => g.id !== goalToDelete.id))
      setDeleteDialogOpen(false)
      setGoalToDelete(null)
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
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="animate-pulse">
          <div className="h-8 w-1/3 bg-secondary rounded mb-4"></div>
          <div className="h-4 w-2/3 bg-secondary rounded mb-2"></div>
          <div className="h-4 w-1/2 bg-secondary rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-destructive/10 p-4 rounded-md text-destructive">{error}</div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-secondary p-4 rounded-md">Category not found</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}></div>
        <h1 className="text-xl sm:text-2xl font-bold">{category.title}</h1>
      </div>

      {category.description && (
        <div className="mb-8 text-muted-foreground text-sm sm:text-base">{category.description}</div>
      )}

      <div className="bg-secondary/30 p-4 sm:p-6 rounded-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Target className="h-5 w-5" />
            Goals
          </h2>
          <Button onClick={() => setIsGoalModalOpen(true)} className="flex items-center gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            Add Goal
          </Button>
        </div>

        {isGoalsLoading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading goals...</p>
          </div>
        ) : goals.length === 0 ? (
          <div className="text-center py-8">
            <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">You have no goals, create a new one</p>
            <Button onClick={() => setIsGoalModalOpen(true)} variant="outline" className="w-full sm:w-auto">
              Create Your First Goal
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => (
              <Card key={goal.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3
                      className="font-medium text-sm leading-tight pr-2 cursor-pointer hover:text-primary"
                      onClick={() => handleGoalClick(goal.id)}
                    >
                      {goal.title}
                    </h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0">
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => handleGoalClick(goal.id)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditGoal(goal)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Goal
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteGoal(goal, "soft")} className="text-yellow-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Soft Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteGoal(goal, "hard")} className="text-destructive">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Hard Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {goal.description && (
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{goal.description}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="secondary" className={`text-xs px-2 py-0.5 h-5 ${termColors[goal.term]}`}>
                      <Clock className="h-3 w-3 mr-1" />
                      {goal.term}
                    </Badge>
                    <Badge variant="secondary" className={`text-xs px-2 py-0.5 h-5 ${statusColors[goal.status]}`}>
                      {goal.status}
                    </Badge>
                  </div>

                  {goal.motivation && (
                    <div className="text-xs text-muted-foreground">
                      <strong>Motivation:</strong>{" "}
                      {goal.motivation.length > 50 ? `${goal.motivation.substring(0, 50)}...` : goal.motivation}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <GoalFormModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        onSuccess={handleAddGoal}
        categoryId={categoryId}
      />

      {goalToEdit && (
        <GoalEditModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setGoalToEdit(null)
          }}
          onSuccess={handleUpdateGoal}
          goal={goalToEdit}
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
