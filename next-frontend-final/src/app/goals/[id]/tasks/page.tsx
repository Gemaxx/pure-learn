"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tag, MoreVertical } from "lucide-react"

type TaskStatus = "not-started" | "in-progress" | "done" | "on-hold"

type Task = {
  id: string
  title: string
  resourceType: string
  progress: number
  currentUnit: number
  totalUnits: number
  unitType: string
  status: TaskStatus
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Do Research about AI",
    resourceType: "Resource Type",
    progress: 66.6,
    currentUnit: 8,
    totalUnits: 12,
    unitType: "Unit Type",
    status: "in-progress",
  },
  {
    id: "2",
    title: "Finish the first 2 videos",
    resourceType: "Resource Type",
    progress: 66.6,
    currentUnit: 8,
    totalUnits: 12,
    unitType: "Unit Type",
    status: "done",
  },
]

function TaskCard({ task }: { task: Task }) {
  return (
    <div className="mb-3 bg-card rounded-md border border-border hover:bg-accent/50 transition-colors">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-medium text-sm leading-tight pr-2">{task.title}</h3>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
            <MoreVertical className="h-3 w-3" />
          </Button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{task.resourceType}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{task.progress.toFixed(1)}%</span>
            <span>
              {task.currentUnit}/{task.totalUnits} {task.unitType}
            </span>
          </div>
          <div className="bg-secondary rounded-full h-2 overflow-hidden">
            <div className="bg-primary h-full" style={{ width: `${task.progress}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TasksPage() {
  const [inProgressTasks] = useState<Task[]>(mockTasks.filter((task) => task.status === "in-progress"))
  const [doneTasks] = useState<Task[]>(mockTasks.filter((task) => task.status === "done"))

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-medium text-sm">Not-Started</h2>
            <span className="bg-secondary text-xs px-1.5 py-0.5 rounded-md">0</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground border-dashed h-8 text-xs bg-transparent hover:bg-accent"
        >
          + Add Task
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-medium text-sm">In-Progress</h2>
            <span className="bg-secondary text-xs px-1.5 py-0.5 rounded-md">{inProgressTasks.length}</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground border-dashed h-8 text-xs bg-transparent hover:bg-accent"
        >
          + Add Task
        </Button>

        {inProgressTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-medium text-sm">Done</h2>
            <span className="bg-secondary text-xs px-1.5 py-0.5 rounded-md">{doneTasks.length}</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground border-dashed h-8 text-xs bg-transparent hover:bg-accent"
        >
          + Add Task
        </Button>

        {doneTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-medium text-sm">On-Hold</h2>
            <span className="bg-secondary text-xs px-1.5 py-0.5 rounded-md">0</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground border-dashed h-8 text-xs bg-transparent hover:bg-accent"
        >
          + Add Task
        </Button>
      </div>
    </div>
  )
}
