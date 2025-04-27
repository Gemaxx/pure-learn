// /components/goals/GoalCard.tsx
import React from 'react';
import Link from 'next/link';
import { Goal } from '@/lib/types/goal';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreVertical, Trash } from "lucide-react";

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (goalId: number) => void;
}

export function GoalCard({ goal, onEdit, onDelete }: GoalCardProps) {
  const statusColors: { [key: string]: string } = {
    'Not-Started': 'bg-gray-200',
    'In-Progress': 'bg-blue-200',
    'Done': 'bg-green-200',
    'Canceled': 'bg-red-200',
    'On-Hold': 'bg-yellow-200'
  };

  const getProgress = (status: string): string => {
    const statusMap: { [key: string]: string } = {
      'Not-Started': '0%',
      'In-Progress': '50%',
      'Done': '100%',
      'Canceled': '0%',
      'On-Hold': '30%'
    };
    return statusMap[status] || '0%';
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow relative">
      <div className="absolute top-2 right-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(goal)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Goal
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-red-600"
              onClick={() => onDelete(goal.id)}
            >
              <Trash className="h-4 w-4 mr-2 text-red-500" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <Link href={`/categories/${goal.categoryId}/goals/${goal.id}`} className="text-lg font-semibold mb-4 block text-center pt-2">
        {goal.title}
      </Link>
      
      <div className="flex justify-between items-center mb-3">
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[goal.status]}`}>
          {goal.status}
        </span>
        <span className="text-gray-600">{getProgress(goal.status)}</span>
      </div>
      
      <p className="text-sm text-gray-500 text-center">
        {goal.term}
      </p>
    </div>
  );
}

