// /lib/api/goals/create.ts - Updated
import { Goal, GoalFormData } from '@/lib/types/goal';

export async function createGoal(
  learnerId: number,
  categoryId: number,
  data: GoalFormData
): Promise<Goal | null> {
  try {
    const response = await fetch(
      `http://localhost:5115/api/learners/${learnerId}/goals`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Goal creation error:", errorText);
      throw new Error(errorText || "Failed to create goal");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating goal:", error);
    return null;
  }
}