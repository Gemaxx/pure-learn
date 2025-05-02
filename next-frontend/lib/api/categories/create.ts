// lib/api/categories/create.ts
import { Category, UpdateCategoryData } from "@/lib/types/category";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5115/api';

/**
 * Create a new category
 */
export async function createCategory(
  learnerId: number,
  categoryData: UpdateCategoryData,
  onSuccess?: () => void
): Promise<Category | null> {
  try {
    const url = `${API_BASE_URL}/learners/${learnerId}/categories`;

    console.log("Sending request to:", url);
    console.log("Request body:", JSON.stringify(categoryData));

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoryData),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Response Error:", errorText);
      throw new Error(errorText || "Failed to add category");
    }

    const responseText = await response.text();
    if (!responseText) {
      throw new Error(`Empty response from server (${response.status})`);
    }

    const newCategory = JSON.parse(responseText);

    if (onSuccess) {
      onSuccess();
    }
    
    return newCategory;
  } catch (error) {
    console.error("Error adding category:", error);
    return null;
  }
}