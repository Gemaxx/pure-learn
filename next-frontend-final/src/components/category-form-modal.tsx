"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Modal } from "@/components/ui/modal"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import {
  createCategory,
  updateCategory,
  type Category,
  type CreateCategoryParams,
  type UpdateCategoryParams,
} from "@/services/api-client"

type CategoryFormModalProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (category: Category) => void
  category?: Category // For editing existing category
  mode?: "create" | "edit"
}

export function CategoryFormModal({ isOpen, onClose, onSuccess, category, mode = "create" }: CategoryFormModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [color, setColor] = useState("#6D6FdE")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { user } = useAuth()
  const { toast } = useToast()

  // Populate form when editing
  useEffect(() => {
    if (mode === "edit" && category) {
      setTitle(category.title || "")
      setDescription(category.description || "")
      setColor(category.color || "#6D6FdE")
    }
  }, [category, mode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user?.id) {
      setError("You must be logged in to create a category")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      let newCategory: Category

      if (mode === "create") {
        const categoryData: CreateCategoryParams = {
          title,
          description,
          color,
        }
        newCategory = await createCategory(user.id, categoryData)
        toast({
          title: "Success",
          description: "Category created successfully",
          variant: "success",
        })
      } else {
        if (!category) {
          throw new Error("Category not found")
        }
        const categoryData: UpdateCategoryParams = {
          title,
          description,
          color,
        }
        newCategory = await updateCategory(user.id, category.id, categoryData)
        toast({
          title: "Success",
          description: "Category updated successfully",
          variant: "success",
        })
      }

      if (onSuccess) {
        onSuccess(newCategory)
      }

      // Reset form
      setTitle("")
      setDescription("")
      setColor("#6D6FdE")

      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save category")
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
    // Reset form
    setTitle("")
    setDescription("")
    setColor("#6D6FdE")
    setError(null)

    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={mode === "create" ? "Create Category" : "Edit Category"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title of your Category"
            required
            disabled={isLoading}
            maxLength={100}
          />
          <div className="text-xs text-muted-foreground text-right">{title.length}/100</div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="More about this Category..."
            disabled={isLoading}
            maxLength={500}
            className="resize-none h-24"
          />
          <div className="text-xs text-muted-foreground text-right">{description.length}/500</div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="color">Color</Label>
          <div className="flex flex-wrap gap-2">
            {[
              "#FF6B6B", // Red
              "#4ECDC4", // Teal
              "#FFD166", // Yellow
              "#6D6FdE", // Blue
              "#FF9F1C", // Orange
              "#7BC950", // Green
              "#9B5DE5", // Purple
              "#F15BB5", // Pink
            ].map((colorOption) => (
              <button
                key={colorOption}
                type="button"
                onClick={() => setColor(colorOption)}
                className={`w-8 h-8 rounded-full ${color === colorOption ? "ring-2 ring-offset-2 ring-ring" : ""}`}
                style={{ backgroundColor: colorOption }}
                aria-label={`Select color ${colorOption}`}
              />
            ))}
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: color }} />
              <span className="text-sm">{color}</span>
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (mode === "create" ? "Creating..." : "Updating...") : mode === "create" ? "Create" : "Update"}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
