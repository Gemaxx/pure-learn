// components/tasks/TaskItem.tsx
import React from 'react';
import { Task } from '@/lib/types/task';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TaskItemProps {
  task: Task;
  onComplete: (taskId: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  priorityColors: Record<string, string>;
}

export function TaskItem({ task, onComplete, onEdit, onDelete, priorityColors }: TaskItemProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-start">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onComplete(task.id)}
        className="mr-3 mt-1"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </h3>
          <Badge variant="outline" className={`bg-${priorityColors[task.priority]}-100 text-${priorityColors[task.priority]}-800`}>
            {task.priority}
          </Badge>
        </div>
        {task.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            {task.description}
          </p>
        )}
        {task.dueDate && (
          <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
      </div>
      <div className="flex ml-2 space-x-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(task)}
          title="Edit task"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
