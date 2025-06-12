"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, Calendar, Search, Settings, ChevronDown, ChevronRight, Plus, Edit, Trash2, Target, MoreVertical } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { getCategories, softDeleteCategory, type Category, getCategoryDetails } from "@/services/api-client"
import { Button } from "@/components/ui/button"
import { CategoryFormModal } from "@/components/category-form-modal"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Sidebar() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [editMode, setEditMode] = useState<"create" | "edit">("create")

  const { user } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  const fetchCategories = async () => {
    if (!user?.id) return

    setIsLoading(true)
    setError(null)

    try {
      const data = await getCategories(user.id)
      setCategories(data)
    } catch (err) {
      setError("Failed to load categories")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [user?.id])

  const handleAddCategory = (newCategory: Category) => {
    setCategories((prev) => [...prev, newCategory])
  }

  const handleUpdateCategory = (updatedCategory: Category) => {
    setCategories((prev) => prev.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat)))
  }

  const handleEditCategory = async (category: Category) => {
    if (!user?.id) return

    try {
      // Fetch full category details including description
      const fullCategory = await getCategoryDetails(user.id, category.id)
      setSelectedCategory(fullCategory)
      setEditMode("edit")
      setIsCategoryModalOpen(true)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load category details. Please try again.",
        variant: "destructive",
      })
      console.error(err)
    }
  }

  const handleDeleteCategory = async (category: Category) => {
    if (!user?.id) return

    try {
      await softDeleteCategory(user.id, category.id)
      setCategories((prev) => prev.filter((cat) => cat.id !== category.id))
      toast({
        title: "Success",
        description: "Category moved to Trash.",
        variant: "success",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
      console.error(err)
    }
  }

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen)
  }

  const openCreateModal = () => {
    setSelectedCategory(null)
    setEditMode("create")
    setIsCategoryModalOpen(true)
  }

  const isActive = (path: string) => pathname === path

  return (
    <>
      <aside className="w-64 h-screen fixed left-0 top-0 pt-14 border-r border-border bg-background">
        <div className="p-4">
          <div className="space-y-2">
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 p-2 rounded-md ${isActive("/dashboard") ? "bg-secondary" : "hover:bg-secondary/50"}`}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link
              href="/calendar"
              className={`flex items-center gap-2 p-2 rounded-md ${isActive("/calendar") ? "bg-secondary" : "hover:bg-secondary/50"}`}
            >
              <Calendar size={20} />
              <span>Calendar</span>
            </Link>
            <Link
              href="/search"
              className={`flex items-center gap-2 p-2 rounded-md ${isActive("/search") ? "bg-secondary" : "hover:bg-secondary/50"}`}
            >
              <Search size={20} />
              <span>Search</span>
            </Link>
            <Link
              href="/goals"
              className={`flex items-center gap-2 p-2 rounded-md ${isActive("/goals") ? "bg-secondary" : "hover:bg-secondary/50"}`}
            >
              <Target size={20} />
              <span>Goals</span>
            </Link>
            <Link
              href="/settings"
              className={`flex items-center gap-2 p-2 rounded-md ${isActive("/settings") ? "bg-secondary" : "hover:bg-secondary/50"}`}
            >
              <Settings size={20} />
              <span>Settings</span>
            </Link>
            <Link
              href="/trash"
              className={`flex items-center gap-2 p-2 rounded-md ${isActive("/trash") ? "bg-secondary" : "hover:bg-secondary/50"}`}
            >
              <Trash2 size={20} />
              <span>Trash</span>
            </Link>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between p-2 group">
              <button onClick={toggleCategories} className="flex items-center gap-2 font-medium">
                {isCategoriesOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                All Categories
              </button>
              <Button
                variant="ghost"
                size="icon"
                onClick={openCreateModal}
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Plus size={16} />
                <span className="sr-only">Add Category</span>
              </Button>
            </div>

            {isCategoriesOpen && (
              <div className="mt-2 space-y-1 pl-4">
                {isLoading ? (
                  <div className="text-sm text-muted-foreground p-2">Loading categories...</div>
                ) : error ? (
                  <div className="text-sm text-destructive p-2">{error}</div>
                ) : categories.length === 0 ? (
                  <div className="text-sm text-muted-foreground p-2">
                    You have no categories yet. Create your first category.
                  </div>
                ) : (
                  categories.map((category) => (
                    <div
                      key={category.id}
                      className="group/category relative flex items-center rounded-md hover:bg-secondary/50"
                    >
                      <div className="flex-1 flex items-center">
                        <Link
                          href={`/categories/${category.id}`}
                          className={`flex-1 flex items-center gap-2 p-2 ${
                            isActive(`/categories/${category.id}`) ? "bg-secondary rounded-md" : ""
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full border"
                            style={{ backgroundColor: category.color }}
                            aria-hidden="true"
                          />
                          <span>{category.title}</span>
                        </Link>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical size={14} />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEditCategory(category)
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Update
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteCategory(category)
                              }}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </aside>

      <CategoryFormModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSuccess={editMode === "create" ? handleAddCategory : handleUpdateCategory}
        category={selectedCategory || undefined}
        mode={editMode}
      />
    </>
  )
}
