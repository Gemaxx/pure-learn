// lib/api/categories/update.ts
import { Category, UpdateCategoryData } from "@/lib/types/category";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5115/api';

/**
 * Update an existing category
 */
export async function updateCategory(
  learnerId: number,
  categoryId: number,
  updateData: UpdateCategoryData
): Promise<Category | null> {
  if (learnerId === null) {
    console.error("Cannot update category: Learner ID is null");
    return null;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/learners/${learnerId}/categories/${categoryId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update category: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating category:", error);
    return null;
  }
}