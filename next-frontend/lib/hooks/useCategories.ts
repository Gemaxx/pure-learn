// /hooks/useCategories.ts
import { useState, useEffect } from 'react';
import { Category } from '@/lib/types/category';
import { toast } from 'sonner';

// Assuming there's a getCategoryDetail function in the categories API
async function getCategoryDetail(
  learnerId: number,
  categoryId: number
): Promise<Category | null> {
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

export function useCategory(learnerId: number, categoryId: number) {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchCategory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCategoryDetail(learnerId, categoryId);
      setCategory(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch category');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (learnerId && categoryId) {
      fetchCategory();
    }
  }, [learnerId, categoryId]);
  
  return {
    category,
    loading,
    error,
    fetchCategory,
  };
}