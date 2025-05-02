// components/tasks/TaskList.tsx
import React from 'react';
import { Task } from '@/lib/types/task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onUpdateTask: (taskId: number, taskData: Partial<Task>) => Promise<void>;
  onDeleteTask: (taskId: number) => Promise<void>;
}

export function TaskList({ tasks, onEditTask, onUpdateTask, onDeleteTask }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tasks found. Create a task to get started.
      </div>
    );
  }

  // Sort tasks by priority (high > medium > low)
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
  });

  return (
    <div className="space-y-3">
      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onComplete={(taskId) => onUpdateTask(taskId, { completed: !task.completed })}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          priorityColors={{ high: 'red', medium: 'yellow', low: 'green' }}
        />
      ))}
    </div>
  );
}
