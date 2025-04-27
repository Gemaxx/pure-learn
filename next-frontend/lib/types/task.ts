// lib/types/task.ts
export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  completed: boolean;
  goalId: number;
}
