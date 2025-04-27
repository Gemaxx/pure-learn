import { Task } from '@/lib/types/task';
import { createTask as createTaskFn } from './create';
import { updateTask as updateTaskFn } from './update';
import { deleteTask as deleteTaskFn } from './delete';

// Export the imported functions
export const createTask = createTaskFn;
export const updateTask = updateTaskFn;
export const deleteTask = deleteTaskFn;

export async function getTasks(
  learnerId: number,
  goalId?: number
): Promise<Task[]> {
  try {
    let url = `http://localhost:5115/api/learners/${learnerId}/tasks`;
    
    // If backend supports filtering by goalId via query parameter
    if (goalId) {
      url += `?goalId=${goalId}`;
    }
    
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    
    if (!res.ok) throw new Error("Failed to fetch tasks");
    
    let tasks = await res.json();
    
    // If backend doesn't support filtering, do it client-side
    if (goalId && Array.isArray(tasks)) {
      tasks = tasks.filter(task => task.goalId === goalId);
    }
    
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}