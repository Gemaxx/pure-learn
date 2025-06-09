"use client";

import { useState } from "react";
import { MoreVertical, Tag, Pencil, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/theme-provider";
import Link from "next/link";
import { useParams } from "next/navigation";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export default function TodoApp() {
    const params = useParams();
     const categoryId = Number(params.categoryId);
  const goalId = Number(params.goalId);
  const { theme } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Do Research about AI", completed: false },
    { id: "2", text: "Finish the first 2 videos", completed: false },
    { id: "3", text: "Do Research about AI", completed: false },
    { id: "4", text: "Do Research about AI", completed: false },
  ]);

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (tasks.length >= 5) return; // MAX: 5
    const newTask = {
      id: Date.now().toString(),
      text: "New Task",
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const startEditing = (id: string, text: string) => {
    setEditingTaskId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editingTaskId) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTaskId ? { ...task, text: editText } : task
        )
      );
      setEditingTaskId(null);
    }
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
  };

  // For debugging - show current theme
  console.log("Current theme:", theme);

  return (
    <div className="rounded-lg border  bg-background text-foreground overflow-hidden shadow-lg">
      <div className="flex items-center justify-between border-b p-4">
        <h1 className="text-lg font-medium">To-DO</h1>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">MAX: 5</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <button
          onClick={addTask}
          className="flex w-full items-center gap-2 rounded-md border px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors"
        >
          <span>+</span> Add Task
        </button>

        {tasks.map((task) => (
          <div
            key={task.id}
            className="rounded-md border bg-card p-3 space-y-2"
          >
            <div className="flex items-start gap-2">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTaskCompletion(task.id)}
                className="mt-1"
              />
              {editingTaskId === task.id ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 bg-background text-foreground text-sm rounded px-2 py-1 border focus:outline-none focus:border-purple-600"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={saveEdit}
                    className="h-7 px-2 text-green-500 hover:text-green-600 hover:bg-muted"
                  >
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={cancelEdit}
                    className="h-7 px-2 text-red-500 hover:text-red-600 hover:bg-muted"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex-1 flex justify-between items-start">
                  <span
                    className={`text-sm ${
                      task.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {task.text}
                  </span>
                  <div className="flex items-center gap-1">
                     <Link href={`/categories/${categoryId}/goals/${goalId}/tasks`} className="h-6 w-6 p-0 text-muted-foreground hover:text-green-500 hover:bg-muted"
                      aria-label="Start pomodoro timer">
                      <Play className="h-3.5 w-3.5" />
                   </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEditing(task.id, task.text)}
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground hover:bg-muted"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 pl-6">
              <Tag className="h-3 w-3 text-muted-foreground" />
              <Badge
                variant="outline"
                className="rounded-full text-xs font-normal text-muted-foreground hover:bg-muted"
              >
                Task Type
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full text-xs font-normal text-muted-foreground hover:bg-muted"
              >
                Priority
              </Badge>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>+</span> Add List
          </button>
          <span className="text-xs text-muted-foreground/60">
            Max Tasks: ex. 1
          </span>
        </div>
      </div>
    </div>
  );
}
