// app/Sidebare/AddCategoryForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AddCategoryForm({
  learnerId,
  onCategoryAdded,
}: {
  learnerId: number;
  onCategoryAdded?: () => void;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    color: "#09AD5d",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Direct API call rather than using the imported function which might have issues
      const response = await fetch(`http://localhost:5115/api/learners/${learnerId}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create category");
      }

      const newCategory = await response.json();

      // Success handling
      if (onCategoryAdded) onCategoryAdded();
      setIsOpen(false);
      router.push(`/categories/${newCategory.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 mt-2 ml-3">
          <Plus className="h-4 w-4" />
          New Category
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Category Name</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <Input
              type="color"
              value={formData.color}
              onChange={(e) => setFormData({...formData, color: e.target.value})}
              className="w-16 h-10"
            />
          </div>

          <div className="space-y-2">
            <Label>Description (Optional)</Label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-2 border rounded-md h-24"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}