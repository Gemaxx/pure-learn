"use client";

import { useState } from "react";
import { addCategory } from "@/lib/api/categories/post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

export default function AddCategoryForm({ learnerId }: { learnerId: number }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#09AD5d"); // ✅ اللون الافتراضي
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    const learnerId = 3;
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await addCategory(learnerId, { title: name, color, description }); // ✅ `color` يتم إرساله الآن
      setSuccess("Category added successfully!");
      setName("");
      setColor("#09AD5d"); // ✅ إعادة تعيين اللون الافتراضي
      setDescription("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Add New Category
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category Name"
              className="col-span-3"
              type="text"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Color</Label>
            <Input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="col-span-3 w-12"
              type="color"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Description</Label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="You can write a description here"
              className="col-span-3 border border-gray-300 rounded-md p-2"
              rows={4}
              cols={50}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
