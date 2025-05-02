// /lib/api/goals/delete.ts
export async function deleteGoal(learnerId: number | null, goalId: number): Promise<boolean> {
    // Return early if learnerId is null
    if (learnerId === null) {
      console.error("Cannot delete goal: Learner ID is null");
      return false;
    }
  
    try {
      const response = await fetch(
        `http://localhost:5115/api/learners/${learnerId}/goals/${goalId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.ok;
    } catch (error) {
      console.error("Error deleting goal:", error);
      return false;
    }
  }