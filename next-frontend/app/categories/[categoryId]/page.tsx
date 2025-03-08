import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
  status?: string;
};

// ✅ Fetch category details from API
async function getCategoryDetail(learnerId: number, categoryId: number): Promise<CategoryDetail | null> {
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
async function getGoals(learnerId: number, categoryId: number): Promise<Goal[]> {
  try {
    // Using query parameter to filter by CategoryId
    const res = await fetch(
      `http://localhost:5115/api/learners/${learnerId}/goals?CategoryId=${categoryId}`,
      {
        headers: { Accept: "application/json" },
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch goals");
    return res.json();
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
  const learnerId = 1; // Change this as needed
  const categoryId = parseInt(params.categoryId, 10);
  
  const categoryDetail = await getCategoryDetail(learnerId, categoryId);
  const goals = await getGoals(learnerId, categoryId);

  if (!categoryDetail) {
    return (
      <div className="p-8">
        <p className="text-red-500">Failed to load category detail.</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Category Detail Card */}

      <Card className="bg-white/10 backdrop-blur-lg p-6 rounded-lg">
        <CardHeader>
          <CardTitle
            className="text-2xl font-bold"
            style={{ color: categoryDetail.color }}
          >
            {categoryDetail.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-2">{categoryDetail.description}</p>
          <p className="text-sm text-gray-400">
            Created: {new Date(categoryDetail.createdAt).toLocaleString()}
          </p>
          <p className="text-sm text-gray-400">
            Updated: {new Date(categoryDetail.updatedAt).toLocaleString()}
          </p>
        </CardContent>
      </Card>

      {/* Goals List */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-white">Goals</h2>
        {goals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {goals.map((goal) => (
              <Card
                key={goal.id}
                className="bg-white/10 backdrop-blur-lg p-4 rounded-lg hover:shadow-lg transition"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-600">
                    {goal.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm">
                    {goal.description || "No description available."}
                  </p>
                  {goal.status && (
                    <p className="text-gray-400 text-xs mt-2">
                      Status: {goal.status}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No goals found for this category.</p>
        )}
      </section>
    </div>
  );
}
