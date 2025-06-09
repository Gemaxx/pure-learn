"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, MoreVertical, ExternalLink, Plus, Tag, BookOpen, Video, FileText, LinkIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type TaskStatus = "not-started" | "in-progress" | "done" | "on-hold"

type ResourceType = "video" | "book" | "article" | "link" | "document"

type Task = {
  id: string
  title: string
  resourceType: ResourceType
  progress: number
  currentUnit: number
  totalUnits: number
  unitType: string
  status: TaskStatus
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "How to Create a Component",
    resourceType: "video",
    progress: 60,
    currentUnit: 30,
    totalUnits: 50,
    unitType: "Min",
    status: "not-started",
  },
  {
    id: "2",
    title: "Responsive Design",
    resourceType: "book",
    progress: 8.3,
    currentUnit: 1,
    totalUnits: 12,
    unitType: "Chapters",
    status: "not-started",
  },
  {
    id: "3",
    title: "Do Research about AI",
    resourceType: "article",
    progress: 66.6,
    currentUnit: 8,
    totalUnits: 12,
    unitType: "Unit Type",
    status: "in-progress",
  },
  {
    id: "4",
    title: "Do Research about AI",
    resourceType: "article",
    progress: 66.6,
    currentUnit: 8,
    totalUnits: 12,
    unitType: "Unit Type",
    status: "in-progress",
  },
  {
    id: "5",
    title: "Do Research about AI",
    resourceType: "article",
    progress: 66.6,
    currentUnit: 8,
    totalUnits: 12,
    unitType: "Unit Type",
    status: "in-progress",
  },
  {
    id: "6",
    title: "Do Research about AI",
    resourceType: "article",
    progress: 66.6,
    currentUnit: 8,
    totalUnits: 12,
    unitType: "Unit Type",
    status: "done",
  },
  {
    id: "7",
    title: "Finish the first 2 videos",
    resourceType: "video",
    progress: 66.6,
    currentUnit: 8,
    totalUnits: 12,
    unitType: "Unit Type",
    status: "done",
  },
  {
    id: "8",
    title: "Do Research about AI",
    resourceType: "article",
    progress: 66.6,
    currentUnit: 8,
    totalUnits: 12,
    unitType: "Unit Type",
    status: "on-hold",
  },
  {
    id: "9",
    title: "Finish the first 2 videos",
    resourceType: "video",
    progress: 66.6,
    currentUnit: 8,
    totalUnits: 12,
    unitType: "Unit Type",
    status: "on-hold",
  },
]

const statusConfig = {
  "not-started": { title: "Not-Started", color: "bg-gray-500" },
  "in-progress": { title: "In-Progress", color: "bg-blue-500" },
  done: { title: "Done", color: "bg-green-500" },
  "on-hold": { title: "On-Hold", color: "bg-yellow-500" },
}

const resourceTypeIcons = {
  video: Video,
  book: BookOpen,
  article: FileText,
  link: LinkIcon,
  document: FileText,
}

function TaskCard({ task }: { task: Task }) {
  const ResourceIcon = resourceTypeIcons[task.resourceType]

  return (
    <Card className="mb-3 bg-card border-border hover:bg-accent/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-medium text-sm leading-tight pr-2">{task.title}</h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ExternalLink className="h-3 w-3" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Tag className="h-3 w-3 text-muted-foreground" />
          <Badge variant="secondary" className="text-xs px-2 py-0.5 h-5">
            <ResourceIcon className="h-3 w-3 mr-1" />
            Resource Type
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{task.progress.toFixed(1)}%</span>
            <span>
              {task.currentUnit}/{task.totalUnits} {task.unitType}
            </span>
          </div>
          <Progress value={task.progress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}

function StatusColumn({ status, tasks }: { status: TaskStatus; tasks: Task[] }) {
  const config = statusConfig[status]
  const taskCount = tasks.length

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-medium text-sm">{config.title}</h2>
          <Badge variant="secondary" className="text-xs px-1.5 py-0.5 h-5">
            {taskCount}
          </Badge>
        </div>
      </div>

      <div className="space-y-3">
        <Button variant="outline" className="w-full justify-start text-muted-foreground border-dashed h-8 text-xs">
          <Plus className="h-3 w-3 mr-2" />
          {status === "not-started" ? "Add Resource" : "Add Task"}
        </Button>

        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default function GoalsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("Resources")

  const tabs = ["Resources", "Tasks", "Notes", "About"]

  const tasksByStatus = {
    "not-started": mockTasks.filter((task) => task.status === "not-started"),
    "in-progress": mockTasks.filter((task) => task.status === "in-progress"),
    done: mockTasks.filter((task) => task.status === "done"),
    "on-hold": mockTasks.filter((task) => task.status === "on-hold"),
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="font-semibold text-lg">Learn UI-UX</h1>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {(Object.keys(tasksByStatus) as TaskStatus[]).map((status) => (
            <StatusColumn key={status} status={status} tasks={tasksByStatus[status]} />
          ))}
        </div>
      </div>
    </div>
  )
}
