// /components/goals/GoalList.tsx
import React, { useState } from 'react';
import { Goal } from '@/lib/types/goal';
import { GoalCard } from './GoalCard';
import { Button } from '@/components/ui/button';

interface GoalListProps {
  goals: Goal[];
  onEditGoal: (goal: Goal) => void;
  onDeleteGoal: (goalId: number) => void;
}

export function GoalList({ goals, onEditGoal, onDeleteGoal }: GoalListProps) {
  const [selectedTerm, setSelectedTerm] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredGoals = goals.filter(goal => 
    (selectedTerm === 'All' || goal.term === selectedTerm) &&
    (selectedStatus === 'All' || goal.status === selectedStatus)
  );

  return (
    <div className="w-full">
      {/* Filter buttons */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="flex gap-2 flex-wrap justify-center">
          {['All', 'Short-Term', 'Medium-Term', 'Long-Term'].map((term) => (
            <Button
              key={term}
              variant={selectedTerm === term ? 'default' : 'outline'}
              onClick={() => setSelectedTerm(term)}
              className="min-w-[120px] text-center"
            >
              {term}
            </Button>
          ))}
        </div>

        <div className="flex gap-2 flex-wrap justify-center">
          {['All', 'Not-Started', 'In-Progress', 'Done', 'Canceled', 'On-Hold'].map((status) => (
            <Button
              key={status}
              variant={selectedStatus === status ? 'default' : 'outline'}
              onClick={() => setSelectedStatus(status)}
              className="min-w-[120px] text-center"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Goal cards */}
      <div className="flex justify-center flex-col">
        <h2 className="text-xl font-bold mb-4">Goals</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full px-4">
          {filteredGoals.map((goal) => (
            <GoalCard 
              key={goal.id} 
              goal={goal} 
              onEdit={onEditGoal}
              onDelete={onDeleteGoal}
            />
          ))}
          
          {filteredGoals.length === 0 && (
            <div className="col-span-3 text-center py-8 text-gray-500">
              No goals found with the selected filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
