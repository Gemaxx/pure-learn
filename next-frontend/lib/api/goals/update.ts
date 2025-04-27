// lib/api/goals/update.ts
import { Goal, GoalFormData } from '@/lib/types/goal';

const API_BASE_URL = 'http://localhost:5115/api';

/**
 * Update an existing goal
 */
export async function updateGoal(
  learnerId: number,
  goalId: number,
  data: Partial<GoalFormData>
): Promise<Goal | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/learners/${learnerId}/goals/${goalId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Goal update error:', errorText);
      throw new Error(`Failed to update goal: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating goal:', error);
    return null;
  }
}