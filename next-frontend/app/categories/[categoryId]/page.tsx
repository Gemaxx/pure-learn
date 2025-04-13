//[categoryId] is a dynamic route that will be passed as a prop to the page component
"use client";

import { useEffect, useState } from "react";
import { useLearner } from "@/lib/context/learnerContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Filters from "../../categories/[categoryId]/goals/page";
import { toast } from "sonner"; 
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { deleteCategory } from "@/lib/api/categories/delete";
import { updateCategory } from "@/lib/api/categories/update";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CategoryDetail = {
  description: string;
  createdAt: string;
  updatedAt: string;
  parentCategoryId: number | null;
  learnerId: number;
  isDeleted: boolean;
  id: number;
  title: string;
  color: string;
};

type Goal = {
  id: number;
  title: string;
  description?: string;
  term: string;
  status: string;
  progress: string;
  category: string;
};

// ✅ Fetch category details from API
async function getCategoryDetail(
  learnerId: number,
  categoryId: number
): Promise<CategoryDetail | null> {
  try {
    const res = await fetch(
      `http://localhost:5115/api/learners/${learnerId}/categories/${categoryId}`,
      {
        headers: { Accept: "application/json" },
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch category detail");
    return res.json();
  } catch (error) {
    console.error("Error fetching category detail:", error);
    return null;
  }
}

// ✅ Fetch goals for a specific category
async function getGoals(
  learnerId: number,
  categoryId: number
): Promise<Goal[]> {
  try {
    const res = await fetch(
      `http://localhost:5115/api/learners/${learnerId}/goals?CategoryId=${categoryId}`,
      {
        headers: { Accept: "application/json" },
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch goals");

    const data = await res.json();

    return data.map((goal: any) => ({
      id: goal.id,
      title: goal.title,
      term: goal.term,
      status: goal.status,
      categoryId: goal.categoryId,
    }));
  } catch (error) {
    console.error("Error fetching goals:", error);
    return [];
  }
}

export default function CategoryDetailPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const router = useRouter();
  const { learnerId } = useLearner();
  const categoryId = parseInt(params.categoryId, 10);

  // ✅ استخدام `useState` لتخزين البيانات
  const [categoryDetail, setCategoryDetail] = useState<CategoryDetail | null>(
    null
  );
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    if (categoryDetail) {
      setTitle(categoryDetail.title);
      setDescription(categoryDetail.description);
      setColor(categoryDetail.color);
    }
  }, [categoryDetail]);

  const handleDelete = async () => {
    const success = await deleteCategory(learnerId, categoryId);
    if (success) {
      router.push("/");
    }
  };

  const handleUpdate = async () => {
    try {
      // 1. جمع البيانات من الحالة
      const updateData = {
        title: title || categoryDetail?.title,
        description: description || categoryDetail?.description,
        color: color || categoryDetail?.color
      };
  
      // 2. استدعاء API التحديث
      const updatedCategory = await updateCategory(
        learnerId,
        categoryId,
        updateData
      );
  
      // 3. إذا كانت الاستجابة ناجحة
      if (updatedCategory) {
        // تحديث الحالة المحلية
        setCategoryDetail(prev => ({
          ...prev!,
          ...updatedCategory
        }));
  
        // إظهار إشعار النجاح
        toast.success("تم التحديث بنجاح!");
      } else {
        // إعادة جلب البيانات إذا لم تكن هناك استجابة
        const freshData = await getCategoryDetail(learnerId, categoryId);
        setCategoryDetail(freshData);
      }
  
      // 4. إغلاق النافذة المنبثقة
      setIsEditDialogOpen(false);
  
    } catch (error) {
      // معالجة الأخطاء
      console.error("فشل التحديث:", error);
      if (error instanceof Error) {
        toast.error(`خطأ في التحديث: ${error.message}`);
      } else {
        toast.error("خطأ في التحديث: حدث خطأ غير معروف");
      }
    }
  };

  // ✅ استخدام `useEffect` لتحميل البيانات عند تحميل المكون
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [category, goalsData] = await Promise.all([
          getCategoryDetail(learnerId, categoryId),
          getGoals(learnerId, categoryId),
        ]);
        setCategoryDetail(category);
        setGoals(goalsData);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [learnerId, categoryId]);

  // ✅ عرض رسالة أثناء التحميل
  if (loading) {
    return (
      <div className="p-8 h-[100vh] flex items-center justify-center w-[100vw]">
        <p className="text-gray-400">Loading category details...</p>
      </div>
    );
  }

  // ✅ عرض رسالة في حالة الخطأ
  if (error || !categoryDetail) {
    return (
      <div className="p-8 h-[100vh] flex items-center justify-center w-[100vw]">
        <p className="text-red-500">Failed to load category detail.</p>
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
            <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
              Edit Category
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} className="text-red-600">
              Delete Category
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Edit Dialog */}
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

      {/* الفلاتر والأهداف  */}
      <div className="flex justify-center w-full">
        <Filters initialGoals={goals || []} />
      </div>
    </div>
  );
}
