// [categoryId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useLearner } from "@/lib/context/learnerContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Filters from "./goals/page";
import { toast } from "sonner";
import { useParams } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { getCategory, deleteCategory, updateCategory } from "@/lib/api/categories";
import { getGoals, deleteGoal, createGoal } from "@/lib/api/goals";

import { Category, UpdateCategoryData } from "@/lib/types/category";
import { Goal, GoalFormData } from "@/lib/types/goal";

export default function CategoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { learnerId, isLoading: learnerLoading } = useLearner();

  const categoryId = parseInt(
    typeof params.categoryId === 'string'
      ? params.categoryId
      : Array.isArray(params.categoryId)
        ? params.categoryId[0]
        : '0',
    10
  );

  const [categoryDetail, setCategoryDetail] = useState<Category | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddGoalDialogOpen, setIsAddGoalDialogOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#000000");

  const [goalData, setGoalData] = useState<GoalFormData>({
    title: "",
    description: "",
    term: "Short-Term",
    status: "Not-Started",
    motivation: "",
  });

  useEffect(() => {
    if (categoryDetail) {
      setTitle(categoryDetail.title);
      setDescription(categoryDetail.description);
      setColor(categoryDetail.color);
    }
  }, [categoryDetail]);

  const handleDelete = async () => {
    if (learnerId === null) {
      toast.error("Cannot delete category: Learner ID is not available");
      return;
    }

    const success = await deleteCategory(learnerId, categoryId);
    if (success) {
      toast.success("Category deleted successfully");
      router.push("/");
    } else {
      toast.error("Failed to delete category");
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        if (learnerId === null) {
          if (!learnerLoading) {
            setError("No learner ID available");
          }
          return;
        }

        if (isNaN(categoryId) || categoryId <= 0) {
          setError("Invalid category ID");
          return;
        }

        const [category, goalsData] = await Promise.all([
          getCategory(learnerId, categoryId),
          getGoals(learnerId, categoryId),
        ]);

        if (!category) {
          setError("Category not found");
          return;
        }

        setCategoryDetail(category);
        setGoals(goalsData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    if (learnerId !== null || learnerLoading) {
      fetchData();
    } else {
      setError("No learner ID available");
      setLoading(false);
    }
  }, [learnerId, categoryId, learnerLoading]);

  const handleUpdate = async () => {
    try {
      if (learnerId === null) {
        toast.error("Cannot update category: Learner ID is not available");
        return;
      }

      const updateData: UpdateCategoryData = {
        title: title || categoryDetail?.title,
        description: description || categoryDetail?.description,
        color: color || categoryDetail?.color
      };

      const updatedCategory = await updateCategory(
        learnerId,
        categoryId,
        updateData
      );

      if (updatedCategory) {
        setCategoryDetail(prev => ({
          ...prev!,
          ...updatedCategory
        }));
        toast.success("Updated successfully!");
      } else {
        if (learnerId !== null) {
          const freshData = await getCategory(learnerId, categoryId);
          setCategoryDetail(freshData);
        }
      }
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
      if (error instanceof Error) {
        toast.error(`Update error: ${error.message}`);
      } else {
        toast.error("Update error: Unknown error occurred");
      }
    }
  };

  const handleAddGoal = async () => {
    try {
      if (learnerId === null) {
        toast.error("Cannot add goal: Learner ID is not available");
        return;
      }

      if (!goalData.title || !goalData.term || !goalData.status || !goalData.motivation) {
        toast.error("Please fill in all required fields");
        return;
      }
      const newGoal = await createGoal(
        learnerId,
        categoryId,
        goalData
      );

      if (newGoal) {
        setGoals(prev => [...prev, newGoal]);

        setGoalData({
          title: "",
          description: "",
          term: "Short-Term",
          status: "Not-Started",
          motivation: ""
        });
        setIsAddGoalDialogOpen(false);
        toast.success("Goal created successfully!");
      } else {
        throw new Error("Failed to create goal");
      }
    } catch (error) {
      console.error("Error creating goal:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create goal");
    }
  };

  const handleDeleteGoal = async (goalId: number) => {
    try {
      if (learnerId === null) {
        toast.error("Cannot delete goal: Learner ID is not available");
        return;
      }

      const success = await deleteGoal(learnerId, goalId);
      if (!success) throw new Error('Deletion failed');
      setGoals(prev => prev.filter(g => g.id !== goalId));
      toast.success('Goal deleted!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Deletion failed");
    }
  };

  if (loading || learnerLoading) {
    return (
      <div className="p-8 h-[100vh] flex items-center justify-center w-[100vw]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <p className="text-gray-400">Loading category details...</p>
      </div>
    );
  }

  if (error || !categoryDetail) {
    return (
      <div className="p-8 h-[100vh] flex items-center justify-center w-[100vw]">
        <p className="text-red-500">{error || "Failed to load category detail."}</p>
      </div>
    );
  }

  return (
    <div className="p-8 mx-auto w-[80vw] h-[100vh] flex flex-col items-center space-y-8">
      <div className="fixed right-5 top-2 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsAddGoalDialogOpen(true)}>
              Add Goal
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
              Edit Category
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} className="text-red-600">
              Delete Category
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <Label>Color</Label>
              <Input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddGoalDialogOpen} onOpenChange={setIsAddGoalDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Goal</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input
                value={goalData.title}
                onChange={(e) => setGoalData({ ...goalData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={goalData.description}
                onChange={(e) => setGoalData({ ...goalData, description: e.target.value })}
              />
            </div>
            <div>
              <Label>Motivation *</Label>
              <Input
                value={goalData.motivation}
                onChange={(e) => setGoalData({ ...goalData, motivation: e.target.value })}
                required
                placeholder="Why is this goal important to you?"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Term *</Label>
                <Select
                  value={goalData.term}
                  onValueChange={(value) => setGoalData({ ...goalData, term: value as Goal['term'] })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Short-Term">Short-Term</SelectItem>
                    <SelectItem value="Medium-Term">Medium-Term</SelectItem>
                    <SelectItem value="Long-Term">Long-Term</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status *</Label>
                <Select
                  value={goalData.status}
                  onValueChange={(value) => setGoalData({ ...goalData, status: value as Goal['status'] })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not-Started">Not Started</SelectItem>
                    <SelectItem value="In-Progress">In Progress</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                    <SelectItem value="Canceled">Canceled</SelectItem>
                    <SelectItem value="On-Hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddGoalDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddGoal}>Create Goal</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex justify-center w-full">
        <Card className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl">
          <CardHeader>
            <CardTitle
              className="text-2xl font-bold text-center"
              style={{ color: categoryDetail.color }}
            >
              {categoryDetail.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-center">
            <p className="text-gray-600 mb-2">{categoryDetail.description}</p>
            <div className="flex gap-4 text-sm justify-center">
              <p className="text-gray-500">
                Created:{" "}
                {new Date(categoryDetail.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-500">
                Updated:{" "}
                {new Date(categoryDetail.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center w-full">
        <Filters initialGoals={goals || []} />
      </div>
    </div>
  );
}