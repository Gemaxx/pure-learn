"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MoreVertical, Plus, FileText, Edit, Trash2, AlertTriangle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
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
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { getNotes, softDeleteNote, hardDeleteNote, type Note } from "@/services/notes-service"

function NoteCard({
  note,
  onEdit,
  onDelete,
}: { note: Note; onEdit: (note: Note) => void; onDelete: (note: Note, type: "soft" | "hard") => void }) {
  return (
    <div className="mb-4 bg-card rounded-md border border-border hover:bg-accent/50 transition-colors">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-medium text-sm flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            {note.title}
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onEdit(note)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Note
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onDelete(note, "soft")} className="text-yellow-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Soft Delete
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(note, "hard")} className="text-destructive">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Hard Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="text-muted-foreground text-sm">
          {note.body.length > 200 ? `${note.body.substring(0, 200)}...` : note.body}
        </div>
        {note.createdAt && (
          <div className="text-xs text-muted-foreground mt-2">
            Created: {new Date(note.createdAt).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  )
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null)
  const [deleteType, setDeleteType] = useState<"soft" | "hard">("soft")

  const { user } = useAuth()
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const goalId = params.id as string

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user?.id || !goalId) return

      setIsLoading(true)
      setError(null)

      try {
        const data = await getNotes(user.id, goalId)
        setNotes(data)
      } catch (err) {
        console.error("Failed to load notes:", err)
        setError("Failed to load notes")
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotes()
  }, [user?.id, goalId])

  const handleCreateNote = () => {
    router.push(`/goals/${goalId}/notes/new`)
  }

  const handleEditNote = (note: Note) => {
    router.push(`/goals/${goalId}/notes/${note.id}/edit`)
  }

  const handleDeleteNote = (note: Note, type: "soft" | "hard") => {
    setNoteToDelete(note)
    setDeleteType(type)
    setDeleteDialogOpen(true)
  }

  const confirmDeleteNote = async () => {
    if (!noteToDelete || !user?.id) return

    try {
      if (deleteType === "soft") {
        await softDeleteNote(user.id, noteToDelete.id.toString())
        toast({
          title: "Success",
          description: "Note moved to trash",
          variant: "success",
        })
      } else {
        await hardDeleteNote(user.id, noteToDelete.id.toString())
        toast({
          title: "Success",
          description: "Note permanently deleted",
          variant: "success",
        })
      }

      setNotes((prev) => prev.filter((n) => n.id !== noteToDelete.id))
      setDeleteDialogOpen(false)
      setNoteToDelete(null)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive",
      })
      console.error(err)
    }
  }

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-32 bg-secondary rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-32 bg-secondary rounded"></div>
          <div className="h-32 bg-secondary rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="bg-destructive/10 p-4 rounded-md text-destructive">{error}</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Notes</h2>
        <Button onClick={handleCreateNote} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Note
        </Button>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No notes yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first note to start documenting your learning journey.
          </p>
          <Button onClick={handleCreateNote} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Note
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} onEdit={handleEditNote} onDelete={handleDeleteNote} />
          ))}
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{deleteType === "soft" ? "Soft Delete Note" : "Hard Delete Note"}</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteType === "soft"
                ? "This note will be moved to trash and can be restored later."
                : "This action cannot be undone. This will permanently delete the note."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteNote}
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
