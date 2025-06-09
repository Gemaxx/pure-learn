"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { getDeletedCategories, restoreCategory, hardDeleteCategory, type Category } from "@/services/api-client"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Trash2, RefreshCw } from "lucide-react"

// Update the TrashPage component to handle API errors gracefully
export default function TrashPage() {
  const [deletedCategories, setDeletedCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { user } = useAuth()
  const { toast } = useToast()

  const fetchDeletedCategories = async () => {
    if (!user?.id) return

    setIsLoading(true)
    setError(null)

    try {
      const data = await getDeletedCategories(user.id)
      setDeletedCategories(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Error fetching deleted categories:", err)
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
    fetchDeletedCategories()
  }, [user?.id])

  const handleRestore = async (category: Category) => {
    if (!user?.id) return

    try {
      await restoreCategory(user.id, category.id)
      setDeletedCategories((prev) => prev.filter((cat) => cat.id !== category.id))
      toast({
        title: "Success",
        description: "Category restored.",
        variant: "success",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to restore category. This feature might not be fully implemented yet.",
        variant: "destructive",
      })
      console.error(err)
    }
  }

  const handlePermanentDelete = async (category: Category) => {
    if (!user?.id) return

    try {
      await hardDeleteCategory(user.id, category.id)
      setDeletedCategories((prev) => prev.filter((cat) => cat.id !== category.id))
      toast({
        title: "Success",
        description: "Category permanently deleted.",
        variant: "destructive",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete category. This feature might not be fully implemented yet.",
        variant: "destructive",
      })
      console.error(err)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Trash</h1>

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
      ) : deletedCategories.length === 0 ? (
        <div className="bg-secondary/30 p-6 rounded-lg text-center">
          <p className="text-muted-foreground">Your trash is empty.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Items you delete will appear here and can be restored or permanently deleted.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {deletedCategories.map((category) => (
            <div key={category.id} className="border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} aria-hidden="true" />
                <div>
                  <h3 className="font-medium">{category.title}</h3>
                  {category.description && (
                    <p className="text-sm text-muted-foreground line-clamp-1">{category.description}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRestore(category)}
                  className="flex items-center gap-1"
                >
                  <RefreshCw size={14} />
                  <span>Restore</span>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handlePermanentDelete(category)}
                  className="flex items-center gap-1"
                >
                  <Trash2 size={14} />
                  <span>Delete Permanently</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
