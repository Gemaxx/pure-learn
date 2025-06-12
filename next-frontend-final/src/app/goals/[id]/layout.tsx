"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MoreVertical, Edit, Trash, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { getGoalDetails, type Goal, softDeleteGoal } from "@/services/api-client"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { GoalEditModal } from "@/components/goal-edit-modal"
import ResourceModal from "@/components/ResourceModal"
import { useToast } from "@/hooks/use-toast"
import { getLearningResources } from "@/services/learning-resources-service"

export default function GoalLayout({ children }: { children: React.ReactNode }) {
  const [goal, setGoal] = useState<Goal | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [resourceModalOpen, setResourceModalOpen] = useState(false)
  const { toast } = useToast()

  const { user } = useAuth()
  const params = useParams()
  const router = useRouter()
  const pathname = usePathname()
  const goalId = params.id as string

  const [resources, setResources] = useState<LearningResource[]>([])

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

    const fetchResources = async () => {
      if (!user?.id || !goalId) return;
      try {
        const data = await getLearningResources(user.id);
        setResources(data);
      } catch (err) {
        console.error("Failed to load resources:", err);
      }
    };

    fetchGoalDetails()
    fetchResources()
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setEditModalOpen(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600"
                  onClick={async () => {
                    if (!user?.id || !goalId) return;
                    try {
                      await softDeleteGoal(user.id, goalId);
                      toast({ title: "Goal moved to trash", variant: "success" });
                      router.push("/dashboard");
                    } catch (err) {
                      toast({ title: "Failed to delete goal", variant: "destructive" });
                    }
                  }}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Move to trash
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Task
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Note
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setResourceModalOpen(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Resource
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

      {/* المودال الخاص بتعديل الهدف */}
      {goal && (
        <GoalEditModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          goal={goal}
          onSuccess={(updatedGoal) => {
            setGoal(updatedGoal);
            setEditModalOpen(false);
            toast({ title: "Goal updated successfully", variant: "success" });
          }}
        />
      )}
      {/* المودال الخاص بإضافة resource */}
      {goal && (
        <ResourceModal
          open={resourceModalOpen}
          onClose={() => setResourceModalOpen(false)}
          goalId={goal.id}
          onResourceAdded={async () => {
            setResourceModalOpen(false);
            toast({ title: "Resource added successfully", variant: "success" });
            const data = await getLearningResources(user.id);
            setResources(data);
          }}
        />
      )}
    </div>
  )
}
