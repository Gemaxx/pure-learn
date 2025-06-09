"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { getNoteDetails, updateNote, type Note, type UpdateNoteParams } from "@/services/notes-service"

export default function EditNotePage() {
  const [note, setNote] = useState<Note | null>(null)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { user } = useAuth()
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const goalId = params.id as string
  const noteId = params.noteId as string

  useEffect(() => {
    const fetchNote = async () => {
      if (!user?.id || !noteId) return

      setIsLoading(true)
      setError(null)

      try {
        const data = await getNoteDetails(user.id, noteId)
        setNote(data)
        setTitle(data.title)
        setBody(data.body)
      } catch (err) {
        setError("Failed to load note")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNote()
  }, [user?.id, noteId])

  const handleBack = () => {
    router.push(`/goals/${goalId}/notes`)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user?.id || !note) {
      setError("Unable to update note")
      return
    }

    if (title.trim().length < 1) {
      setError("Title is required")
      return
    }

    if (body.trim().length < 1) {
      setError("Body is required")
      return
    }

    setIsSaving(true)
    setError(null)

    try {
      const updateData: UpdateNoteParams = {
        title: title.trim(),
        body: body.trim(),
      }

      await updateNote(user.id, note.id.toString(), updateData)

      toast({
        title: "Success",
        description: "Note updated successfully",
        variant: "success",
      })

      router.push(`/goals/${goalId}/notes`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update note")
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="border-b border-border bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 h-14">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="font-semibold text-lg">Loading...</h1>
            </div>
          </div>
        </div>
        <div className="container mx-auto p-4">
          <div className="max-w-2xl mx-auto animate-pulse space-y-4">
            <div className="h-8 w-1/3 bg-secondary rounded"></div>
            <div className="h-4 w-2/3 bg-secondary rounded"></div>
            <div className="h-32 w-full bg-secondary rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error && !note) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="border-b border-border bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 h-14">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="font-semibold text-lg">Edit Note</h1>
            </div>
          </div>
        </div>
        <div className="container mx-auto p-4">
          <div className="bg-destructive/10 p-4 rounded-md text-destructive">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 h-14">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="font-semibold text-lg">Edit Note</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                required
                disabled={isSaving}
                maxLength={200}
              />
              <div className="text-xs text-muted-foreground text-right">{title.length}/200</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="body">Content</Label>
              <Textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your note content here..."
                required
                disabled={isSaving}
                className="min-h-[300px] resize-none"
                maxLength={5000}
              />
              <div className="text-xs text-muted-foreground text-right">{body.length}/5000</div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={handleBack} disabled={isSaving}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
