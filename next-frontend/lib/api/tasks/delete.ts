// /lib/api/tasks/delete.ts
export async function deleteTask(
    learnerId: number,
    taskId: number
  ): Promise<boolean> {
    try {
      const response = await fetch(
        `http://localhost:5115/api/learners/${learnerId}/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );
  
      if (!response.ok) throw new Error("Failed to delete task");
      return true;
    } catch (error) {
      console.error("Error deleting task:", error);
      return false;
    }
  }
  