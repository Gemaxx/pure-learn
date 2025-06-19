"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tag,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  Plus,
  PlusCircle,
} from "lucide-react";

// Task types and mock data
const TAGS = [
  "Research",
  "Priority",
  "DB Task",
  "Urgent & Important",
  "Task Type",
];

const mockTasks = [
  {
    id: "1",
    title: "Do Research about AI",
    tags: ["Research", "Priority"],
    status: "todo",
    completed: false,
  },
  {
    id: "2",
    title: "Work on Task Entity",
    tags: ["DB Task", "Urgent & Important"],
    status: "todo",
    completed: true,
  },
  {
    id: "3",
    title: "Do Research about AI",
    tags: ["Task Type", "Priority"],
    status: "todo",
    completed: true,
  },
  {
    id: "4",
    title: "Do Research about AI",
    tags: ["Task Type", "Priority"],
    status: "in-progress",
    completed: false,
  },
  {
    id: "5",
    title: "Do Research about AI",
    tags: ["Task Type", "Priority"],
    status: "in-progress",
    completed: false,
  },
  {
    id: "6",
    title: "Do Research about AI",
    tags: ["Task Type", "Priority"],
    status: "in-progress",
    completed: false,
  },
  {
    id: "7",
    title: "Do Research about AI",
    tags: ["Task Type", "Priority"],
    status: "done",
    completed: false,
  },
  {
    id: "8",
    title: "Finish the first 2 videos",
    tags: ["Task Type", "Priority"],
    status: "done",
    completed: false,
  },
  {
    id: "9",
    title: "Do Research about AI",
    tags: ["Task Type", "Priority"],
    status: "done",
    completed: false,
  },
  {
    id: "10",
    title: "Do Research about AI",
    tags: ["Task Type", "Priority"],
    status: "done",
    completed: false,
  },
];

function TaskCard({ task }: { task: any }) {
  return (
    <div className="bg-card rounded-md border border-border hover:bg-accent/50 transition-colors mb-2">
      <div className="p-3 flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <span className="font-medium text-sm leading-tight pr-2">
            {task.title}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-1">
          {task.tags.map((tag: string) => (
            <span
              key={tag}
              className="bg-secondary text-xs px-2 py-0.5 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ColumnHeader({
  title,
  count,
  max,
  onMenu,
}: {
  title: string;
  count: number;
  max: number;
  onMenu?: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-1">
        <span className="font-semibold text-base">{title}</span>
        <span className="text-xs text-muted-foreground align-top">{count}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-xs bg-secondary px-1.5 py-0.5 rounded-md">
          MAX: {max}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground"
          onClick={onMenu}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default function TasksPage() {
  const [showCompleted, setShowCompleted] = useState(true);

  const todoTasks = mockTasks.filter(
    (t) => t.status === "todo" && !t.completed
  );
  const completedTasks = mockTasks.filter(
    (t) => t.status === "todo" && t.completed
  );
  const inProgressTasks = mockTasks.filter((t) => t.status === "in-progress");
  const doneTasks = mockTasks.filter((t) => t.status === "done");

  return (
    <div className="flex gap-4 w-full">
      {/* To-DO Column */}
      <div className="flex-1 min-w-[260px] max-w-xs bg-muted/40 rounded-lg p-3 flex flex-col">
        <ColumnHeader title="To-DO" count={todoTasks.length} max={5} />
        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground border-dashed h-8 text-xs bg-transparent hover:bg-accent mb-2"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Task
        </Button>
        {todoTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {/* Completed Task Section */}
        <div className="mt-2">
          <button
            className="flex items-center gap-1 text-xs text-muted-foreground mb-1"
            onClick={() => setShowCompleted((v) => !v)}
          >
            {showCompleted ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
            Completed Task
          </button>
          {showCompleted && (
            <div className="flex flex-col gap-2">
              {completedTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* In-Progress Column */}
      <div className="flex-1 min-w-[260px] max-w-xs bg-muted/40 rounded-lg p-3 flex flex-col">
        <ColumnHeader
          title="In-Progress"
          count={inProgressTasks.length}
          max={5}
        />
        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground border-dashed h-8 text-xs bg-transparent hover:bg-accent mb-2"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Task
        </Button>
        {inProgressTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      {/* Done Column */}
      <div className="flex-1 min-w-[260px] max-w-xs bg-muted/40 rounded-lg p-3 flex flex-col">
        <ColumnHeader title="Done" count={doneTasks.length} max={5} />
        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground border-dashed h-8 text-xs bg-transparent hover:bg-accent mb-2"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Task
        </Button>
        {doneTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      {/* Add List Column */}
      <div className="flex-1 min-w-[180px] max-w-xs bg-muted/40 rounded-lg p-3 flex flex-col items-center justify-start">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground h-8 text-xs bg-transparent hover:bg-accent mb-2"
        >
          <PlusCircle className="h-4 w-4 mr-1" /> Add List
        </Button>
        <span className="text-xs text-muted-foreground mt-2">
          Max Tasks: ex. 1
        </span>
      </div>
    </div>
  );
}
