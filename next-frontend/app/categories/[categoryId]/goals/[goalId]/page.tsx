'use client';

import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';

const goals = [
  { title: "Jetpack Compose Course", status: "In-Progress", progress: "1%", category: "Short-Term" },
  { title: "React Native Project", status: "Not-Started", progress: "0%", category: "Medium-Term" },
  { title: "Angular Mastery", status: "Done", progress: "100%", category: "Long-Term" }
];

type Task = {
  name: string;
  priority: "high" | "medium" | "low";
  description: string;
};

const priorityColors = {
  high: "border-red-500 text-red-500",
  medium: "border-yellow-500 text-yellow-500",
  low: "border-blue-500 text-blue-500"
};

export default function Page({ params }: { params: { goalId: string } }) {
  const { goalId } = params;
  const goal = goals.find((goal, index) => (index + 1).toString() === goalId);
  
  // States for tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState('');
  const [taskPriority, setTaskPriority] = useState<"high" | "medium" | "low" | ''>('');
  const [taskDescription, setTaskDescription] = useState('');
  
  // States for notes
  const [notes, setNotes] = useState<{ title: string; description: string }[]>([]);
  const [noteName, setNoteName] = useState('');
  const [noteDescription, setNoteDescription] = useState('');
  
  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [isEditNoteDialogOpen, setIsEditNoteDialogOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<{title: string, description: string, index: number} | null>(null);

  // Task handlers
  const handleCreateTask = () => {
    if (taskName && taskPriority) {
      setTasks([...tasks, { 
        name: taskName, 
        priority: taskPriority, 
        description: taskDescription 
      }]);
      setIsDialogOpen(false);
      setTaskName('');
      setTaskPriority('');
      setTaskDescription('');
    }
  };

  const handleTaskClick = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Note handlers
  const handleCreateNote = () => {
    if (noteName && noteDescription) {
      setNotes([...notes, { 
        title: noteName, 
        description: noteDescription 
      }]);
      setIsNoteDialogOpen(false);
      setNoteName('');
      setNoteDescription('');
    }
  };

  const handleDeleteNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const handleEditNote = () => {
    if (selectedNote) {
      const updatedNotes = [...notes];
      updatedNotes[selectedNote.index] = {
        title: selectedNote.title,
        description: selectedNote.description
      };
      setNotes(updatedNotes);
      setIsEditNoteDialogOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full mx-auto p-6">
      
      {/* Header  */}
      <div className='fixed top-0 w-[82%] bg-white z-50'>
        <div className='h-16 flex items-center justify-between px-6 shadow-sm'>
        <h1 className="text-xl font-semibold">{goal?.title}</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="p-2">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white p-2 rounded-md shadow-lg">
            <DropdownMenuItem className="cursor-pointer p-2 hover:bg-gray-100 rounded">
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1 h-px bg-gray-200" />
            <DropdownMenuItem 
              className="cursor-pointer p-2 hover:bg-gray-100 rounded"
              onSelect={() => setIsDialogOpen(true)}
            >
              Add Task
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1 h-px bg-gray-200" />
            <DropdownMenuItem 
              className="cursor-pointer p-2 hover:bg-gray-100 rounded"
              onSelect={() => setIsNoteDialogOpen(true)}
            >
              Add Note
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1 h-px bg-gray-200" />
            <DropdownMenuItem className="cursor-pointer p-2 text-red-600 hover:bg-red-50 rounded">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      </div>

      {/* Task Section */}
      <div className="mt-20 p-6 bg-white rounded-lg shadow-md w-full">
        <h2 className="text-xl font-semibold mb-4">Tasks</h2>
        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <li 
              key={index}
              className="flex items-center gap-3 group cursor-pointer p-2 rounded hover:bg-gray-50"
              onClick={() => handleTaskClick(index)}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center 
                ${priorityColors[task.priority]} transition-colors`}>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">✓</span>
              </div>
              <span className="flex-1">{task.name}</span>
            </li>
          ))}
          <li 
            className="flex items-center gap-2 text-red-600 cursor-pointer p-2"
            onClick={() => setIsDialogOpen(true)}
          >
            <span className="text-lg">+</span>
            <span>Add Task</span>
          </li>
        </ul>
      </div>

      {/* Notes Section */}
      <div className="mt-6 p-6 bg-white rounded-lg shadow-md w-full">
        <h2 className="text-xl font-semibold mb-4">Notes</h2>
        <ul className="space-y-4">
          {notes.map((note, index) => (
            <li 
              key={index}
              className="group relative p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold mb-1">{note.title}</h3>
                  <p className="text-gray-600 text-sm">⁘ {note.description}</p>
                </div>
                <div className="hidden group-hover:flex gap-2 absolute right-3 top-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNote({ ...note, index });
                      setIsEditNoteDialogOpen(true);
                    }}
                    className="p-1 text-blue-500 hover:bg-blue-50 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNote(index);
                    }}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))}
          <li
            className="flex items-center gap-2 text-red-600 cursor-pointer p-2"
            onClick={() => setIsNoteDialogOpen(true)}
          >
            <span className="text-lg">+</span>
            <span>Add Note</span>
          </li>
        </ul>
      </div>

      {/* Task Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
            <DialogDescription>Create a new task for this goal</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Task Name</Label>
              <Input
                placeholder="Enter task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Priority</Label>
              <Select
                value={taskPriority}
                onValueChange={(value) => setTaskPriority(value as typeof taskPriority)}
              >
                <SelectTrigger>
                  {taskPriority ? (
                    <span className="capitalize">{taskPriority}</span>
                  ) : (
                    "Select priority"
                  )}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">🔴 High</SelectItem>
                  <SelectItem value="medium">🟡 Medium</SelectItem>
                  <SelectItem value="low">🔵 Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Input
                placeholder="Enter description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTask}>Create</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Note Edit Dialog */}
      <Dialog open={isEditNoteDialogOpen} onOpenChange={setIsEditNoteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input
                value={selectedNote?.title || ''}
                onChange={(e) =>
                  setSelectedNote(prev =>
                    prev ? { ...prev, title: e.target.value } : null
                  )
                }
              />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Input
                value={selectedNote?.description || ''}
                onChange={(e) =>
                  setSelectedNote(prev =>
                    prev ? { ...prev, description: e.target.value } : null
                  )
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditNoteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditNote}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Note Creation Dialog */}
      <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Note</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input
                placeholder="Enter note title"
                value={noteName}
                onChange={(e) => setNoteName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Input
                placeholder="Enter note description"
                value={noteDescription}
                onChange={(e) => setNoteDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsNoteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateNote}>Create</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}