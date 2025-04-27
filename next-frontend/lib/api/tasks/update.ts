// /lib/api/tasks/update.ts
import { Task } from '@/lib/types/task';

export async function updateTask(
  learnerId: number,
  taskId: number,
  taskData: Partial<Task>
): Promise<Task | null> {
  try {
    const response = await fetch(
      `http://localhost:5115/api/learners/${learnerId}/tasks/${taskId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData)
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Task update error:", errorText);
      throw new Error(errorText || "Failed to update task");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating task:", error);
    return null;
  }
}
