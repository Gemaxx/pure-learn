"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Modal } from "@/components/ui/modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { updateGoal, type Goal, type UpdateGoalParams } from "@/services/api-client"

type GoalEditModalProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (goal: Goal) => void
  goal: Goal
}

export function GoalEditModal({ isOpen, onClose, onSuccess, goal }: GoalEditModalProps) {
  const [title, setTitle] = useState("")
  const [motivation, setMotivation] = useState("")
  const [description, setDescription] = useState("")
  const [term, setTerm] = useState<"Short-Term" | "Medium-Term" | "Long-Term">("Long-Term")
  const [status, setStatus] = useState<"Not-Started" | "In-Progress" | "On-Hold" | "Done" | "Canceled">("On-Hold")
  const [completionDate, setCompletionDate] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { user } = useAuth()
  const { toast } = useToast()

  // Populate form when goal changes
  useEffect(() => {
    if (goal) {
      setTitle(goal.title || "")
      setMotivation(goal.motivation || "")
      setDescription(goal.description || "")
      setTerm(goal.term || "Long-Term")
      setStatus(goal.status || "On-Hold")
      setCompletionDate(goal.completionDate || "")
    }
  }, [goal])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user?.id) {
      setError("You must be logged in to update a goal")
      return
    }

    // Validation
    if (title.length < 3 || title.length > 255) {
      setError("Title must be between 3 and 255 characters")
      return
    }

    if (description.length < 1) {
      setError("Description is required")
      return
    }

    if (motivation.length < 1) {
      setError("Motivation is required")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const goalData: UpdateGoalParams = {
        title,
        description,
        motivation,
        term,
        status,
        categoryId: goal.categoryId,
      }

      // Only include completion date if it's provided
      if (completionDate) {
        goalData.completionDate = completionDate
      }

      const updatedGoal = await updateGoal(user.id, goal.id.toString(), goalData)

      toast({
        title: "Success",
        description: "Goal updated successfully",
        variant: "success",
      })

      if (onSuccess) {
        onSuccess(updatedGoal)
      }

      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update goal")
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setError(null)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Goal" className="max-h-[90vh] overflow-hidden">
      <form onSubmit={handleSubmit} className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title of your Goal"
            required
            disabled={isLoading}
            maxLength={255}
          />
          <div className="text-[10px] text-muted-foreground text-right">{title.length}/255</div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="motivation">Motivation</Label>
          <Textarea
            id="motivation"
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            placeholder="Why this goal?"
            required
            disabled={isLoading}
            maxLength={500}
            className="resize-none h-16"
          />
          <div className="text-[10px] text-muted-foreground text-right">{motivation.length}/500</div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="More about this Goal..."
            required
            disabled={isLoading}
            maxLength={1000}
            className="resize-none h-16"
          />
          <div className="text-[10px] text-muted-foreground text-right">{description.length}/1000</div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="term">Term</Label>
          <Select
            value={term}
            onValueChange={(value: "Short-Term" | "Medium-Term" | "Long-Term") => setTerm(value)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Short-Term">Short-Term</SelectItem>
              <SelectItem value="Medium-Term">Medium-Term</SelectItem>
              <SelectItem value="Long-Term">Long-Term</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="status">Status</Label>
          <Select
            value={status}
            onValueChange={(value: "Not-Started" | "In-Progress" | "On-Hold" | "Done" | "Canceled") => setStatus(value)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Not-Started">Not-Started</SelectItem>
              <SelectItem value="In-Progress">In-Progress</SelectItem>
              <SelectItem value="On-Hold">On-Hold</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
              <SelectItem value="Canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="completionDate">Completion Date (Optional)</Label>
          <Input
            id="completionDate"
            type="date"
            value={completionDate}
            onChange={(e) => setCompletionDate(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
