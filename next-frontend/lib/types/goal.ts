// types/goal.ts
export type Goal = {
    id: number;
    title: string;
    description?: string;
    progress: number;
    term: 'Short-Term' | 'Medium-Term' | 'Long-Term';
    status: 'Not-Started' | 'In-Progress' | 'Done' | 'Canceled' | 'On-Hold';
    categoryId?: number | null;
    motivation?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  export type GoalFormData = {
    title: string;
    description?: string;
    term: 'Short-Term' | 'Medium-Term' | 'Long-Term';
    status: 'Not-Started' | 'In-Progress' | 'Done' | 'Canceled' | 'On-Hold';
    motivation?: string;
  };
  
  export type GoalFilterOptions = {
    term?: Goal['term'] | 'All';
    status?: Goal['status'] | 'All';
  };