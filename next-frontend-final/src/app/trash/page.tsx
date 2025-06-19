"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import {
  getDeletedCategories, restoreCategory, hardDeleteCategory, type Category,
  getDeletedGoals, restoreGoal, hardDeleteGoal, type Goal
} from "@/services/api-client"
import {
  getDeletedNotes, restoreNote, hardDeleteNote, type Note
} from "@/services/notes-service"
import {
  getDeletedLearningResources, restoreLearningResource, hardDeleteLearningResource
} from "@/services/learning-resources-service"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import TrashSection from "@/components/TrashSection"
import TrashItem from "@/components/TrashItem"
import { Trash2, RefreshCw, Folder, Target, FileText, BookOpen } from "lucide-react"

export default function TrashPage() {
  const [deletedCategories, setDeletedCategories] = useState<Category[]>([])
  const [deletedGoals, setDeletedGoals] = useState<Goal[]>([])
  const [deletedNotes, setDeletedNotes] = useState<Note[]>([])
  const [deletedResources, setDeletedResources] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { user } = useAuth()
  const { toast } = useToast()

  // جلب كل العناصر المحذوفة
  const fetchAllDeleted = async () => {
    if (!user?.id) return
    setIsLoading(true)
    setError(null)
    try {
      const [cats, goals, notes, resources] = await Promise.all([
        getDeletedCategories(user.id),
        getDeletedGoals(user.id),
        getDeletedNotes(user.id),
        getDeletedLearningResources(user.id)
      ])
      setDeletedCategories(Array.isArray(cats) ? cats : [])
      setDeletedGoals(Array.isArray(goals) ? goals : [])
      setDeletedNotes(Array.isArray(notes) ? notes : [])
      setDeletedResources(Array.isArray(resources) ? resources : [])
    } catch (err) {
      setError("The trash feature is not available at the moment. Please try again later.")
      toast({
        title: "Error",
        description: "Failed to load trash items. This feature might not be fully implemented yet.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAllDeleted()
    // eslint-disable-next-line
  }, [user?.id])

  // Restore & Delete handlers for each type
  const handleRestoreCategory = async (cat: Category) => {
    if (!user?.id) return
    try {
      await restoreCategory(user.id, cat.id)
      setDeletedCategories((prev) => prev.filter((c) => c.id !== cat.id))
      toast({ title: "Success", description: "Category restored.", variant: "success" })
    } catch (err) {
      toast({ title: "Error", description: "Failed to restore category.", variant: "destructive" })
    }
  }
  const handleDeleteCategory = async (cat: Category) => {
    if (!user?.id) return
    try {
      await hardDeleteCategory(user.id, cat.id)
      setDeletedCategories((prev) => prev.filter((c) => c.id !== cat.id))
      toast({ title: "Success", description: "Category permanently deleted.", variant: "destructive" })
    } catch (err) {
      toast({ title: "Error", description: "Failed to delete category.", variant: "destructive" })
    }
  }
  const handleRestoreGoal = async (goal: Goal) => {
    if (!user?.id) return
    try {
      await restoreGoal(user.id, String(goal.id))
      setDeletedGoals((prev) => prev.filter((g) => g.id !== goal.id))
      toast({ title: "Success", description: "Goal restored.", variant: "success" })
    } catch (err) {
      toast({ title: "Error", description: "Failed to restore goal.", variant: "destructive" })
    }
  }
  const handleDeleteGoal = async (goal: Goal) => {
    if (!user?.id) return
    try {
      await hardDeleteGoal(user.id, String(goal.id))
      setDeletedGoals((prev) => prev.filter((g) => g.id !== goal.id))
      toast({ title: "Success", description: "Goal permanently deleted.", variant: "destructive" })
    } catch (err) {
      toast({ title: "Error", description: "Failed to delete goal.", variant: "destructive" })
    }
  }
  const handleRestoreNote = async (note: Note) => {
    if (!user?.id) return
    try {
      await restoreNote(user.id, String(note.id))
      setDeletedNotes((prev) => prev.filter((n) => n.id !== note.id))
      toast({ title: "Success", description: "Note restored.", variant: "success" })
    } catch (err) {
      toast({ title: "Error", description: "Failed to restore note.", variant: "destructive" })
    }
  }
  const handleDeleteNote = async (note: Note) => {
    if (!user?.id) return
    try {
      await hardDeleteNote(user.id, String(note.id))
      setDeletedNotes((prev) => prev.filter((n) => n.id !== note.id))
      toast({ title: "Success", description: "Note permanently deleted.", variant: "destructive" })
    } catch (err) {
      toast({ title: "Error", description: "Failed to delete note.", variant: "destructive" })
    }
  }
  const handleRestoreResource = async (res: any) => {
    if (!user?.id) return
    try {
      await restoreLearningResource(user.id, String(res.id))
      setDeletedResources((prev) => prev.filter((r) => r.id !== res.id))
      toast({ title: "Success", description: "Resource restored.", variant: "success" })
    } catch (err) {
      toast({ title: "Error", description: "Failed to restore resource.", variant: "destructive" })
    }
  }
  const handleDeleteResource = async (res: any) => {
    if (!user?.id) return
    try {
      await hardDeleteLearningResource(user.id, String(res.id))
      setDeletedResources((prev) => prev.filter((r) => r.id !== res.id))
      toast({ title: "Success", description: "Resource permanently deleted.", variant: "destructive" })
    } catch (err) {
      toast({ title: "Error", description: "Failed to delete resource.", variant: "destructive" })
    }
  }

  // Empty Trash
  const handleEmptyTrash = async () => {
    if (!user?.id) return
    setIsLoading(true)
    try {
      await Promise.all([
        ...deletedCategories.map((cat) => hardDeleteCategory(user.id, cat.id)),
        ...deletedGoals.map((goal) => hardDeleteGoal(user.id, String(goal.id))),
        ...deletedNotes.map((note) => hardDeleteNote(user.id, String(note.id))),
        ...deletedResources.map((res) => hardDeleteLearningResource(user.id, String(res.id)))
      ])
      setDeletedCategories([])
      setDeletedGoals([])
      setDeletedNotes([])
      setDeletedResources([])
      toast({ title: "Success", description: "Trash emptied.", variant: "success" })
    } catch (err) {
      toast({ title: "Error", description: "Failed to empty trash.", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const isAllEmpty =
    deletedCategories.length === 0 &&
    deletedGoals.length === 0 &&
    deletedNotes.length === 0 &&
    deletedResources.length === 0

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Trash</h1>
        {!isAllEmpty && (
          <Button
            className="bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white hover:opacity-90"
            size="sm"
            onClick={handleEmptyTrash}
            disabled={isLoading}
          >
            <Trash2 size={16} className="mr-1" /> Empty Trash
          </Button>
        )}
      </div>
      {isLoading ? (
        <div className="bg-secondary/30 p-6 rounded-lg">
          <p className="text-center">Loading trash items...</p>
        </div>
      ) : error ? (
        <div className="bg-destructive/10 p-6 rounded-lg">
          <p className="text-destructive text-center">{error}</p>
          <p className="text-center mt-2 text-sm text-muted-foreground">
            The trash feature might still be in development. Check back later.
          </p>
        </div>
      ) : isAllEmpty ? (
        <div className="flex flex-col items-center justify-center h-96">
          <Trash2 size={56} className="text-muted-foreground mb-4" />
          <p className="text-xl font-semibold text-muted-foreground">Your trash is empty.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Items you delete will appear here and can be restored or permanently deleted.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {deletedGoals.length > 0 && (
            <TrashSection title="Goals" icon={<Target className="text-primary" size={20} />}>
              {deletedGoals.map((goal) => (
                <TrashItem
                  key={goal.id}
                  title={goal.title}
                  description={goal.description}
                  onRestore={() => handleRestoreGoal(goal)}
                  onDelete={() => handleDeleteGoal(goal)}
                  icon={<Target size={16} className="text-primary" />}
                />
              ))}
            </TrashSection>
          )}
          {deletedCategories.length > 0 && (
            <TrashSection title="Categories" icon={<Folder className="text-primary" size={20} />}>
              {deletedCategories.map((cat) => (
                <TrashItem
                  key={cat.id}
                  title={cat.title}
                  description={cat.description}
                  color={cat.color}
                  onRestore={() => handleRestoreCategory(cat)}
                  onDelete={() => handleDeleteCategory(cat)}
                  icon={<Folder size={16} className="text-primary" />}
                />
              ))}
            </TrashSection>
          )}
          {deletedNotes.length > 0 && (
            <TrashSection title="Notes" icon={<FileText className="text-primary" size={20} />}>
              {deletedNotes.map((note) => (
                <TrashItem
                  key={note.id}
                  title={note.title}
                  description={note.body}
                  onRestore={() => handleRestoreNote(note)}
                  onDelete={() => handleDeleteNote(note)}
                  icon={<FileText size={16} className="text-primary" />}
                />
              ))}
            </TrashSection>
          )}
          {deletedResources.length > 0 && (
            <TrashSection title="Learning Resources" icon={<BookOpen className="text-primary" size={20} />}>
              {deletedResources.map((res) => (
                <TrashItem
                  key={res.id}
                  title={res.title}
                  description={res.description}
                  onRestore={() => handleRestoreResource(res)}
                  onDelete={() => handleDeleteResource(res)}
                  icon={<BookOpen size={16} className="text-primary" />}
                />
              ))}
            </TrashSection>
          )}
        </div>
      )}
    </div>
  )
}
