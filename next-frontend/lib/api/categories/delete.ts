// lib/api/categories/delete.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5115/api';

export async function deleteCategory(
  learnerId: number,
  categoryId: number
): Promise<boolean> {
  if (learnerId === null) {
    console.error("Cannot delete category: Learner ID is null");
    return false;
  }
  
  try {
    const response = await fetch(
      `${API_BASE_URL}/learners/${learnerId}/categories/${categoryId}`,
      {
        method: "DELETE",
      }
    );
    
    return response.ok;
  } catch (error) {
    console.error("Error deleting category:", error);
    return false;
  }
}