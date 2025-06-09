"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { createNote, type CreateNoteParams } from "@/services/notes-service"

export default function NewNotePage() {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { user } = useAuth()
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const goalId = params.id as string

  const handleBack = () => {
    router.push(`/goals/${goalId}/notes`)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user?.id) {
      setError("You must be logged in to create a note")
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

    setIsLoading(true)
    setError(null)

    try {
      const noteData: CreateNoteParams = {
        goalId: Number.parseInt(goalId),
        title: title.trim(),
        body: body.trim(),
      }

      await createNote(user.id, noteData)

      toast({
        title: "Success",
        description: "Note created successfully",
        variant: "success",
      })

      router.push(`/goals/${goalId}/notes`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create note")
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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
            <h1 className="font-semibold text-lg">New Note</h1>
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
                disabled={isLoading}
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
                disabled={isLoading}
                className="min-h-[300px] resize-none"
                maxLength={5000}
              />
              <div className="text-xs text-muted-foreground text-right">{body.length}/5000</div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={handleBack} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Note"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
