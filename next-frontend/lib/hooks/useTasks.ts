// /hooks/useTasks.ts
import { useState, useEffect } from 'react';
import { Task } from '@/lib/types/task';
import { getTasks } from '@/lib/api/tasks';
import { createTask } from '@/lib/api/tasks/create';
import { updateTask } from '@/lib/api/tasks/update';
import { deleteTask } from '@/lib/api/tasks/delete';
import { toast } from 'sonner';

export function useTasks(learnerId: number) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // This URL might be incorrect or not handling parameters properly
      const response = await fetch(`/api/tasks?learnerId=${learnerId}`);
      
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError("Failed to fetch tasks: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setLoading(false);
    }
  };
  
  const addTask = async (taskData: Omit<Task, 'id'>) => {
    try {
      const newTask = await createTask(learnerId, taskData);
      if (newTask) {
        setTasks(prev => [...prev, newTask]);
        toast.success('Task created successfully!');
        return newTask;
      }
      throw new Error('Failed to create task');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create task');
      return null;
    }
  };
  
  const editTask = async (taskId: number, taskData: Partial<Task>) => {
    try {
      const updatedTask = await updateTask(learnerId, taskId, taskData);
      if (updatedTask) {
        setTasks(prev => prev.map(task => 
          task.id === taskId ? updatedTask : task
        ));
        toast.success('Task updated successfully!');
        return updatedTask;
      }
      throw new Error('Failed to update task');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update task');
      return null;
    }
  };
  
  const removeTask = async (taskId: number) => {
    try {
      const success = await deleteTask(learnerId, taskId);
      if (success) {
        setTasks(prev => prev.filter(task => task.id !== taskId));
        toast.success('Task deleted successfully!');
        return true;
      }
      throw new Error('Failed to delete task');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete task');
      return false;
    }
  };
  
  useEffect(() => {
    if (learnerId) {
      fetchTasks();
    }
  }, [learnerId]);
  
  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask: editTask,  // Rename here
    deleteTask: removeTask  // Rename here
  };
}
