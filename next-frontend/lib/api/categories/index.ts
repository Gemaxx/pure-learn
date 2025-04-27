// lib/api/categories/index.ts

import { Category } from "@/lib/types/category";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5115/api';

/**
 * Get all categories for a learner
 */
export async function getCategories(learnerId: number): Promise<Category[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/learners/${learnerId}/categories`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Get a specific category by ID
 */
export async function getCategory(learnerId: number, categoryId: number): Promise<Category | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/learners/${learnerId}/categories/${categoryId}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch category: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

// Export all other category-related functions
export * from "./create";
export * from "./update";
export * from "./delete";