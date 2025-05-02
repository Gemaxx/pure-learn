// /lib/api/goals/index.ts
import { Goal } from '@/lib/types/goal';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5115/api';

export async function getGoals(
  learnerId: number,
  categoryId?: number
): Promise<Goal[]> {
  try {
    // Build URL with optional categoryId parameter
    let url = `${API_BASE_URL}/learners/${learnerId}/goals`;
    if (categoryId !== undefined) {
      url += `?categoryId=${categoryId}`;
    }
    
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch goals: ${res.status} ${res.statusText}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error("Error fetching goals:", error);
    return []; // Return empty array instead of null
  }
}

// You should also add a function to get a single goal
export async function getGoal(learnerId: number, goalId: number): Promise<Goal | null> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/learners/${learnerId}/goals/${goalId}`,
      {
        headers: { Accept: "application/json" },
        cache: "no-store",
      }
    );
    
    if (!res.ok) {
      throw new Error(`Failed to fetch goal: ${res.status} ${res.statusText}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error("Error fetching goal:", error);
    return null;
  }
}

// Export all other goal-related functions
export * from "./create";
export * from "./update";
export * from "./delete";