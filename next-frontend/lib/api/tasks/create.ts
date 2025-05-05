// lib/api/tasks/create.ts
import { Task } from '@/lib/types/task';

export async function createTask(
  learnerId: number,
  taskData: Omit<Task, 'id'>
): Promise<Task | null> {
  try {
    const response = await fetch(
      `http://localhost:5115/api/learners/${learnerId}/tasks`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData)
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Task creation error:", errorText);
      throw new Error(errorText || "Failed to create task");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating task:", error);
    return null;
  }
}