// app/categories/goals/[goalId]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Plus, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from 'next/navigation';

// Import components
import { TaskForm } from '@/components/tasks/TaskForm';
import { TaskItem } from '@/components/tasks/TaskItem';
import { NoteForm } from '@/components/notes/NoteForm';
import { NoteItem } from '@/components/notes/NoteItem';

// Import API functions
import { getGoal } from '@/lib/api/goals';
import { getTasks, createTask, updateTask, deleteTask } from '@/lib/api/tasks';
import { getNotes, createNote, updateNote, deleteNote } from '@/lib/api/notes';

// Import types
import { Task } from '@/lib/types/task';
import { Note, NoteFormData } from '@/lib/types/note';
import { Goal } from '@/lib/types/goal';

const priorityColors = {
  high: "border-red-500 text-red-500",
  medium: "border-yellow-500 text-yellow-500",
  low: "border-blue-500 text-blue-500"
};

export default function GoalDetailPage() {
  // Get route params and router
  const params = useParams();
  const router = useRouter();
  const categoryId = Number(params.categoryId);
  const goalId = Number(params.goalId);

  // Fixed learnerId to prevent localStorage issues
  const learnerId = 1;

  // Data states
  const [goal, setGoal] = useState<Goal | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  // UI states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dialog states
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);

  // Editing states
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);

  // Load all data at once to prevent multiple rerenders
  useEffect(() => {
    let isMounted = true;
    
    async function loadData() {
      if (!goalId || !learnerId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch data from all endpoints using the imported API functions
        const [fetchedGoal, fetchedTasks, fetchedNotes] = await Promise.all([
          getGoal(learnerId, goalId),
          getTasks(learnerId, goalId),
          getNotes(learnerId, goalId)
        ]);
        
        // Only update state if component is still mounted
        if (isMounted) {
          if (!fetchedGoal) {
            setError("Goal not found");
          } else {
            setGoal(fetchedGoal);
            setTasks(fetchedTasks);
            setNotes(fetchedNotes);
            setError(null);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error loading data:", err);
          setError("Failed to load goal data. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    
    loadData();
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [goalId, learnerId]);

  // Task handlers
  const handleCreateTask = async (taskData: Omit<Task, 'id'>) => {
    if (!goalId) {
      toast.error("Cannot create task: Goal ID is missing");
      return;
    }

    try {
      const newTask = await createTask(learnerId, {
        ...taskData,
        goalId: goalId
      });

      if (newTask) {
        setTasks(prev => [...prev, newTask]);
        toast.success("Task created successfully!");
        setIsTaskDialogOpen(false);
      } else {
        throw new Error("Failed to create task");
      }
    } catch (err) {
      toast.error(`Failed to create task: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleUpdateTask = async (taskId: number, taskData: Partial<Task>) => {
    try {
      const updatedTask = await updateTask(learnerId, taskId, taskData);

      if (updatedTask) {
        setTasks(prev => prev.map(task =>
          task.id === taskId ? updatedTask : task
        ));
        toast.success("Task updated successfully!");
        setIsTaskDialogOpen(false);
        setIsEditingTask(false);
        setEditingTaskId(null);
      } else {
        throw new Error("Failed to update task");
      }
    } catch (err) {
      toast.error(`Failed to update task: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      const success = await deleteTask(learnerId, taskId);

      if (success) {
        setTasks(prev => prev.filter(task => task.id !== taskId));
        toast.success("Task deleted successfully!");
      } else {
        throw new Error("Failed to delete task");
      }
    } catch (err) {
      toast.error(`Failed to delete task: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  // Note handlers
  const handleCreateNote = async (noteData: NoteFormData) => {
    if (!goalId) {
      toast.error("Cannot create note: Goal ID is missing");
      return;
    }

    try {
      const newNote = await createNote(learnerId, noteData);

      if (newNote) {
        setNotes(prev => [...prev, newNote]);
        toast.success("Note created successfully!");
        setIsNoteDialogOpen(false);
      } else {
        throw new Error("Failed to create note");
      }
    } catch (err) {
      toast.error(`Failed to create note: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleUpdateNote = async (noteId: number, noteData: Partial<Note>) => {
    try {
      const updatedNote = await updateNote(learnerId, noteId, noteData);

      if (updatedNote) {
        setNotes(prev => prev.map(note =>
          note.id === noteId ? updatedNote : note
        ));
        toast.success("Note updated successfully!");
        setIsNoteDialogOpen(false);
        setIsEditingNote(false);
        setEditingNoteId(null);
      } else {
        throw new Error("Failed to update note");
      }
    } catch (err) {
      toast.error(`Failed to update note: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    try {
      const success = await deleteNote(learnerId, noteId);

      if (success) {
        setNotes(prev => prev.filter(note => note.id !== noteId));
        toast.success("Note deleted successfully!");
      } else {
        throw new Error("Failed to delete note");
      }
    } catch (err) {
      toast.error(`Failed to delete note: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  // Handle edit task
  const handleEditTask = (task: Task) => {
    setIsEditingTask(true);
    setEditingTaskId(task.id);
    setIsTaskDialogOpen(true);
  };

  // Handle edit note
  const handleEditNote = (note: Note) => {
    setIsEditingNote(true);
    setEditingNoteId(note.id);
    setIsNoteDialogOpen(true);
  };

  return (
    <div className="flex flex-col h-full w-full mx-auto p-6">
      {/* Header */}
      <div className='fixed top-0 w-[82%] bg-white z-50'>
        <div className='h-16 flex items-center justify-between px-6 shadow-sm'>
          <h1 className="text-xl font-semibold">
            {isLoading ? (
              <span className="animate-pulse">Loading...</span>
            ) : error ? (
              <span className="text-red-500">Error: {error}</span>
            ) : goal ? (
              goal.title
            ) : (
              "Goal not found"
            )}
          </h1>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="p-2">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white p-2 rounded-md shadow-lg border">
              <DropdownMenuItem
                className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                onSelect={() => {
                  if (!goal) {
                    toast.error("Cannot add tasks to a non-existent goal");
                    return;
                  }
                  setIsEditingTask(false);
                  setEditingTaskId(null);
                  setIsTaskDialogOpen(true);
                }}
              >
                Add Task
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1 bg-gray-200 h-px" />
              <DropdownMenuItem
                className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                onSelect={() => {
                  if (!goal) {
                    toast.error("Cannot add notes to a non-existent goal");
                    return;
                  }
                  setIsEditingNote(false);
                  setEditingNoteId(null);
                  setIsNoteDialogOpen(true);
                }}
              >
                Add Note
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-20 mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <div>
            <p><strong>Error:</strong> {error}</p>
            <p className="text-sm mt-1">Please check if the goal exists or try again later.</p>
          </div>
        </div>
      )}

      {/* Tasks Section */}
      <div className={`${error ? '' : 'mt-20'} p-6 bg-white rounded-lg shadow-md w-full`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tasks</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 flex items-center gap-1"
            onClick={() => {
              if (!goal) {
                toast.error("Cannot add tasks to a non-existent goal");
                return;
              }
              setIsEditingTask(false);
              setEditingTaskId(null);
              setIsTaskDialogOpen(true);
            }}
            disabled={!goal || isLoading}
          >
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-100 animate-pulse rounded" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8 text-gray-500">
            Tasks cannot be displayed due to an error.
          </div>
        ) : tasks.length > 0 ? (
          <ul className="space-y-3">
            {tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onComplete={handleDeleteTask}
                onEdit={handleEditTask}
                priorityColors={priorityColors}
              />
            ))}
          </ul>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No tasks yet. Click "Add Task" to create one.
          </div>
        )}
      </div>

      {/* Notes Section */}
      <div className="mt-6 p-6 bg-white rounded-lg shadow-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Notes</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 flex items-center gap-1"
            onClick={() => {
              if (!goal) {
                toast.error("Cannot add notes to a non-existent goal");
                return;
              }
              setIsEditingNote(false);
              setEditingNoteId(null);
              setIsNoteDialogOpen(true);
            }}
            disabled={!goal || isLoading}
          >
            <Plus className="h-4 w-4" />
            <span>Add Note</span>
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-24 bg-gray-100 animate-pulse rounded" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8 text-gray-500">
            Notes cannot be displayed due to an error.
          </div>
        ) : notes.length > 0 ? (
          <ul className="space-y-4">
            {notes.map(note => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={handleDeleteNote}
                onEdit={handleEditNote}
              />
            ))}
          </ul>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No notes yet. Click "Add Note" to create one.
          </div>
        )}
      </div>

      {/* Task Form Dialog */}
      {isTaskDialogOpen && (
        <TaskForm
          onClose={() => setIsTaskDialogOpen(false)}
          isEditing={isEditingTask}
          taskId={editingTaskId}
          goalId={goalId}
          onCreateTask={handleCreateTask}
          onUpdateTask={handleUpdateTask}
        />
      )}

      {/* Note Form Dialog */}
      {isNoteDialogOpen && (
        <NoteForm
          onClose={() => setIsNoteDialogOpen(false)}
          isEditing={isEditingNote}
          initialData={editingNoteId ? notes.find(note => note.id === editingNoteId) : undefined}
          goalId={goalId}
          onCreateNote={handleCreateNote}
          onUpdateNote={handleUpdateNote}
        />
      )}
    </div>
  );
}