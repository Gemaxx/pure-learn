// components/tasks/TaskForm.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Plus, CalendarIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task } from '@/lib/types/task';
import { useTasks } from '@/lib/hooks/useTasks';

export interface TaskFormProps {
  onClose?: () => void;
  isEditing?: boolean;
  taskId?: number | null;
  goalId?: number;
  onCreateTask?: (taskData: Omit<Task, 'id'>) => Promise<void>;
  onUpdateTask?: (taskId: number, taskData: Partial<Task>) => Promise<void>;
}

// Make sure to export the TaskForm component
export function TaskForm({
  onClose = () => {},
  isEditing = false,
  taskId = null,
  goalId = 1,
  onCreateTask = async () => {},
  onUpdateTask = async () => {}
}: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  // For editing mode, fetch the task data
  const { tasks } = useTasks(1); // Fixed: providing a default learnerId

  useEffect(() => {
    if (isEditing && taskId) {
      const taskToEdit = tasks.find(t => t.id === taskId);
      if (taskToEdit) {
        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description || '');
        setPriority(taskToEdit.priority as 'low' | 'medium' | 'high');
        setDueDate(taskToEdit.dueDate ? new Date(taskToEdit.dueDate) : undefined);
      }
    }
  }, [isEditing, taskId, tasks]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const taskData = {
        title,
        description,
        priority,
        dueDate: dueDate ? dueDate.toISOString() : null,
        goalId,
        completed: false,
      };

      if (isEditing && taskId) {
        await onUpdateTask(taskId, taskData);
      } else {
        await onCreateTask(taskData as Omit<Task, 'id'>);
      }
      handleClose();
    } catch (error) {
      console.error('Failed to save task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Task' : 'Add Task'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter task title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={priority}
              onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}
            >
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date (optional)</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate ? dueDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setDueDate(e.target.value ? new Date(e.target.value) : undefined)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : isEditing ? 'Update Task' : 'Create Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Define interface for QuickTaskInput
export interface QuickTaskInputProps {
  addTask: (taskData: Omit<Task, 'id'>) => Promise<void>;
  goalId: number;
}

// Export the QuickTaskInput component
export function QuickTaskInput({ addTask, goalId }: QuickTaskInputProps) {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    // Create a basic task from the text input
    const newTask = {
      title: taskText,
      description: '',
      priority: 'medium' as 'low' | 'medium' | 'high',
      dueDate: null,
      goalId: goalId,
      completed: false,
    };

    // Call the addTask function passed from parent
    addTask(newTask);

    // Clear the input
    setTaskText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 flex items-center">
      <Plus className="text-gray-400 mr-2" size={20} />
      <input
        type="text"
        placeholder="Add a task to 'Tasks', press [Enter] to save"
        className="flex-1 bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="flex space-x-1">
        <button className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-xs text-gray-500">1</button>
        <button className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-xs text-gray-500">2</button>
        <button className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-xs text-gray-500">3</button>
        <button className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-xs text-gray-500">4</button>
        <button className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-xs text-gray-500">5</button>
      </div>
    </div>
  );
}