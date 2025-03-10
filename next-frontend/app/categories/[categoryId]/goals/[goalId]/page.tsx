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
  high: "border-red-500",
  medium: "border-yellow-500",
  low: "border-blue-500"
};

export default function Page({ params }: { params: { goalId: string } }) {
  const { goalId } = params;
  const goal = goals.find((goal, index) => (index + 1).toString() === goalId);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState('');
  const [taskPriority, setTaskPriority] = useState<"high" | "medium" | "low" | ''>('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleCreateTask = () => {
    if (taskName && taskPriority) {
      setTasks([...tasks, { name: taskName, priority: taskPriority as "high" | "medium" | "low", description: taskDescription }]);
      setIsDialogOpen(false);
      setTaskName('');
      setTaskPriority('');
      setTaskDescription('');
    }
  };

  const [notes, setNotes] = useState<{ title: string; description: string }[]>([]);
  const [noteName, setnoteName] = useState('');
  const [noteDescription, setnoteDescription] = useState('');

  const handleCreateNote = () => {
    if (noteName && noteDescription) {
      setNotes([...notes, { title: noteName, description: noteDescription }]);
      setIsNoteDialogOpen(false);
      setnoteName('');
      setnoteDescription('');
    }
  };

  const handleTaskClick = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="flex flex-col h-screen w-screen p-6">
        <div className='fixed top-0 left-0 w-full h-16 bg-white flex items-center justify-between px-6'>
          <h1>{goal?.title}</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="p-2">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white px-2">
              <DropdownMenuItem className="py-1 cursor-pointer hover:bg-transparent hover:outline-none">Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="py-1 cursor-pointer hover:bg-transparent hover:outline-none" onSelect={() => setIsDialogOpen(true)}>Add Task</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="py-1 cursor-pointer hover:bg-transparent hover:outline-none" onSelect={() => setIsNoteDialogOpen(true)}>Add Note</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="py-1 cursor-pointer text-red-600 hover:bg-transparent hover:outline-none">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Task Management Section */}
        <div className="mt-20 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tasks</h2>
          <ul className="space-y-4">
            {tasks.map((task, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span 
                  onMouseEnter={(e) => e.currentTarget.innerHTML = '✓'}
                  onMouseLeave={(e) => e.currentTarget.innerHTML = ''}>
                </span>
                <span>{task.name}</span>
              </li>
            ))}
            <li className="flex items-center space-x-2 text-red-600 cursor-pointer" onClick={() => setIsDialogOpen(true)}>
              <span className="text-lg">+</span>
              <span>Add Task</span>
            </li>
          </ul>
        </div>

        {/* Note Management Section */}
        <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Notes</h2>
          <ul className="space-y-4">
            {notes.map((note, index) => (
              <li key={index} className="flex flex-col space-y-2">
                <h2 className='font-bold'>{note.title}</h2>
                <span className='pl-1'>⁘ {note.description}</span>
              </li>
            ))}
            <li className="flex items-center space-x-2 text-red-600 cursor-pointer" onClick={() => setIsNoteDialogOpen(true)}>
              <span className="text-lg">+</span>
              <span>Add Note</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Task Addition Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
            <DialogDescription>Enter task details below</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Task Name</Label>
              <Input placeholder="Enter task name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
            </div>
            <div>
              <Label>Task Priority</Label>
              <Select value={taskPriority} onValueChange={(value) => setTaskPriority(value as "high" | "medium" | "low")}>
                <SelectTrigger>Choose Priority</SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">🔴 High</SelectItem>
                  <SelectItem value="medium">🟡 Medium</SelectItem>
                  <SelectItem value="low">🔵 Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Description</Label>
              <Input placeholder="Enter task description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateTask}>Create</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Note Addition Dialog */}
      <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
            <DialogDescription>Enter note details below</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Note Title</Label>
              <Input placeholder="Enter Note Name" value={noteName} onChange={(e) => setnoteName(e.target.value)} />
            </div>
            <div>
              <Label>Note Description</Label>
              <Input placeholder="Enter Note Description" value={noteDescription} onChange={(e) => setnoteDescription(e.target.value)} />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsNoteDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateNote}>Create</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
