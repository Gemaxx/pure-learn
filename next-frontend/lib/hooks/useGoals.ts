// /hooks/useGoals.ts
import { useState, useEffect } from 'react';
import { Goal ,GoalFormData} from '@/lib/types/goal';
import { getGoals } from '@/lib/api/goals';
import { createGoal } from '@/lib/api/goals/create';
import { updateGoal } from '@/lib/api/goals/update';
import { deleteGoal } from '@/lib/api/goals/delete';
import { toast } from 'sonner';

export function useGoals(learnerId: number, categoryId?: number) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchGoals = async () => {
    setLoading(true);
    setError(null);
    try {
      // getGoals now returns Goal[] instead of Goal | null
      const data = await getGoals(learnerId, categoryId);
      setGoals(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch goals');
      setGoals([]); // Set to empty array on error
    } finally {
      setLoading(false);
    }
  };
  
  const addGoal = async (goalData: GoalFormData) => {
    if (!categoryId) {
      toast.error('Category ID is required to create a goal');
      return null;
    }
    
    try {
      const newGoal = await createGoal(learnerId, categoryId, goalData);
      if (newGoal) {
        setGoals(prev => [...prev, newGoal]);
        toast.success('Goal created successfully!');
        return newGoal;
      }
      throw new Error('Failed to create goal');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create goal');
      return null;
    }
  };
  
  const editGoal = async (goalId: number, goalData: Partial<Goal>) => {
    try {
      const updatedGoal = await updateGoal(learnerId, goalId, goalData);
      if (updatedGoal) {
        setGoals(prev => prev.map(goal => 
          goal.id === goalId ? updatedGoal : goal
        ));
        toast.success('Goal updated successfully!');
        return updatedGoal;
      }
      throw new Error('Failed to update goal');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update goal');
      return null;
    }
  };
  
  const removeGoal = async (goalId: number) => {
    try {
      const success = await deleteGoal(learnerId, goalId);
      if (success) {
        setGoals(prev => prev.filter(goal => goal.id !== goalId));
        toast.success('Goal deleted successfully!');
        return true;
      }
      throw new Error('Failed to delete goal');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete goal');
      return false;
    }
  };
  
  useEffect(() => {
    if (learnerId) {
      fetchGoals();
    }
  }, [learnerId, categoryId]);
  
  return {
    goals,
    loading,
    error,
    fetchGoals,
    addGoal,
    editGoal,
    removeGoal
  };
}