"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useTrash } from "@/contexts/trash-context"
import {
  getDeletedCategories,
  restoreCategory,
  hardDeleteCategory,
  type Category,
  getDeletedGoals,
  restoreGoal,
  hardDeleteGoal,
  type Goal,
} from "@/services/api-client"
import { getDeletedNotes, restoreNote, hardDeleteNote, type Note } from "@/services/notes-service"
import {
  getDeletedLearningResources,
  restoreLearningResource,
  hardDeleteLearningResource,
  type LearningResource,
} from "@/services/learning-resources-service"
import TrashSection from "@/components/TrashSection"
import TrashItem from "@/components/TrashItem"
import { Folder, Target, FileText, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TrashPage() {
  const [deletedCategories, setDeletedCategories] = useState<Category[]>([])
  const [deletedGoals, setDeletedGoals] = useState<Goal[]>([])
  const [deletedNotes, setDeletedNotes] = useState<Note[]>([])
  const [deletedResources, setDeletedResources] = useState<LearningResource[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [operatingItemId, setOperatingItemId] = useState<string | number | null>(null)

  const { user } = useAuth()
  const { triggerRefresh } = useTrash()
  const { toast } = useToast()

  const fetchAllDeleted = async () => {
    if (!user?.id) return
    if (!deletedCategories.length && !deletedGoals.length && !deletedNotes.length && !deletedResources.length) {
      setIsLoading(true)
    }
    setError(null)
    try {
      const [cats, goals, notes, resources] = await Promise.all([
        getDeletedCategories(user.id),
        getDeletedGoals(user.id),
        getDeletedNotes(user.id),
        getDeletedLearningResources(user.id),
      ])
      setDeletedCategories(cats?.filter(Boolean) || [])
      setDeletedGoals(goals?.filter(Boolean) || [])
      setDeletedNotes(notes?.filter(Boolean) || [])
      setDeletedResources(resources?.filter(Boolean) || [])
    } catch (err) {
      console.error("Error fetching deleted items:", err)
      setError("Something went wrong. Please try again later.")
    } finally {
      setIsLoading(false)
      setOperatingItemId(null)
    }
  }

  useEffect(() => {
    if (user?.id) {
      fetchAllDeleted()
    }
  }, [user?.id, triggerRefresh])

  const handleRestore = async (id: string | number, type: string) => {
    if (!user?.id) return
    setOperatingItemId(id)
    try {
      let restoredItem
      switch (type) {
        case "category":
          restoredItem = await restoreCategory(user.id, String(id))
          break
        case "goal":
          restoredItem = await restoreGoal(user.id, String(id))
          break
        case "note":
          restoredItem = await restoreNote(user.id, String(id))
          break
        case "resource":
          restoredItem = await restoreLearningResource(user.id, String(id))
          break
        default:
          throw new Error("Unknown item type")
      }
      toast({ title: "Success", description: `${type.charAt(0).toUpperCase() + type.slice(1)} restored.`, variant: "success" })
      triggerRefresh()
      // Optimistically update UI
      switch (type) {
        case "category":
          setDeletedCategories((prev) => prev.filter((i) => i.id !== id))
          break
        case "goal":
          setDeletedGoals((prev) => prev.filter((i) => i.id !== id))
          break
        case "note":
          setDeletedNotes((prev) => prev.filter((i) => i.id !== id))
          break
        case "resource":
          setDeletedResources((prev) => prev.filter((i) => i.id !== id))
          break
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message || `Failed to restore ${type}.`, variant: "destructive" })
      // On failure, refetch to get the correct state from the server
      await fetchAllDeleted()
    } finally {
      setOperatingItemId(null)
    }
  }

  const handleDelete = async (id: string | number, type: string) => {
    if (!user?.id) return
    setOperatingItemId(id)

    const isStillInList = (() => {
      switch (type) {
        case "category":
          return deletedCategories.find((c) => c.id === id)
        case "goal":
          return deletedGoals.find((g) => g.id === id)
        case "note":
          return deletedNotes.find((n) => n.id === id)
        case "resource":
          return deletedResources.find((r) => r.id === id)
        default:
          return false
      }
    })()

    if (!isStillInList) {
      toast({
        title: "Already deleted",
        description: `${type} not found or already removed.`,
        variant: "destructive",
      })
      setOperatingItemId(null)
      return
    }

    try {
      switch (type) {
        case "category":
          await hardDeleteCategory(user.id, String(id))
          setDeletedCategories((prev) => prev.filter((cat) => cat.id !== id))
          break
        case "goal":
          await hardDeleteGoal(user.id, String(id))
          setDeletedGoals((prev) => prev.filter((g) => g.id !== id))
          break
        case "note":
          await hardDeleteNote(user.id, String(id))
          setDeletedNotes((prev) => prev.filter((n) => n.id !== id))
          break
        case "resource":
          await hardDeleteLearningResource(user.id, String(id))
          setDeletedResources((prev) => prev.filter((r) => r.id !== id))
          break
      }

      toast({
        title: "Deleted",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} permanently deleted.`,
        variant: "destructive",
      })
      triggerRefresh() // Keep this to notify other components like the sidebar
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || `Failed to delete ${type}.`,
        variant: "destructive",
      })
      // On failure, refetch to get the correct state from the server
      await fetchAllDeleted()
    } finally {
      setOperatingItemId(null)
    }
  }

  const isAllEmpty = !isLoading && [deletedCategories, deletedGoals, deletedNotes, deletedResources].every((arr) => arr.length === 0)

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Trash</h1>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="text-center py-8 text-destructive">{error}</div>
      ) : isAllEmpty ? (
        <div className="text-center py-8 text-muted-foreground">Trash is empty</div>
      ) : (
        <div className="space-y-8">
          {deletedCategories.length > 0 && (
            <TrashSection title="Categories" icon={<Folder className="w-5 h-5" />}>
              {deletedCategories.map((cat) => (
                <TrashItem
                  key={`cat-${cat.id}`}
                  item={cat}
                  onDelete={() => handleDelete(cat.id, "category")}
                  onRestore={() => handleRestore(cat.id, "category")}
                  isOperating={operatingItemId === cat.id}
                />
              ))}
            </TrashSection>
          )}

          {deletedGoals.length > 0 && (
            <TrashSection title="Goals" icon={<Target className="w-5 h-5" />}>
              {deletedGoals.map((goal) => (
                <TrashItem
                  key={`goal-${goal.id}`}
                  item={goal}
                  onDelete={() => handleDelete(goal.id, "goal")}
                  onRestore={() => handleRestore(goal.id, "goal")}
                  isOperating={operatingItemId === goal.id}
                />
              ))}
            </TrashSection>
          )}

          {deletedNotes.length > 0 && (
            <TrashSection title="Notes" icon={<FileText className="w-5 h-5" />}>
              {deletedNotes.map((note) => (
                <TrashItem
                  key={`note-${note.id}`}
                  item={note}
                  onDelete={() => handleDelete(note.id, "note")}
                  onRestore={() => handleRestore(note.id, "note")}
                  isOperating={operatingItemId === note.id}
                />
              ))}
            </TrashSection>
          )}

          {deletedResources.length > 0 && (
            <TrashSection title="Resources" icon={<BookOpen className="w-5 h-5" />}>
              {deletedResources.map((res) => (
                <TrashItem
                  key={`res-${res.id}`}
                  item={res}
                  onDelete={() => handleDelete(res.id, "resource")}
                  onRestore={() => handleRestore(res.id, "resource")}
                  isOperating={operatingItemId === res.id}
                />
              ))}
            </TrashSection>
          )}
        </div>
      )}
    </div>
  )
}
