
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Filters from "../../categories/[categoryId]/goals/page";


import Link from "next/link";
//&✅
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
      categoryId: goal.categoryId
    }));
    
  } catch (error) {
    console.error("Error fetching goals:", error);
    return [];
  }
}

export default async function CategoryDetailPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const learnerId = 1;
  const categoryId = parseInt(params.categoryId, 10);
  
  const [categoryDetail, goals] = await Promise.all([
    getCategoryDetail(learnerId, categoryId),
    getGoals(learnerId, categoryId)
  ]);


  if (!categoryDetail) {
    return (
      <div className="p-8 h-[100vh] flex items-center justify-center w-[100vw]">
        <p className="text-red-500">Failed to load category detail.</p>
      </div>
    );
  }

  return (
    <div className="p-8 mx-auto w-[80vw] h-[100vh] flex flex-col items-center space-y-8"> 
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
                Created: {new Date(categoryDetail.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-500">
                Updated: {new Date(categoryDetail.updatedAt).toLocaleDateString()}
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
