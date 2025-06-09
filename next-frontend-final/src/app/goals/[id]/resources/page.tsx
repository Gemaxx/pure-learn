"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Video, BookOpen, FileText, LinkIcon, MoreVertical } from "lucide-react"

type ResourceType = "video" | "book" | "article" | "link" | "document"

type Resource = {
  id: string
  title: string
  type: ResourceType
  progress: number
  currentUnit: number
  totalUnits: number
  unitType: string
}

const mockResources: Resource[] = [
  {
    id: "1",
    title: "How to Create a Component",
    type: "video",
    progress: 60,
    currentUnit: 30,
    totalUnits: 50,
    unitType: "Min",
  },
  {
    id: "2",
    title: "Responsive Design",
    type: "book",
    progress: 8.3,
    currentUnit: 1,
    totalUnits: 12,
    unitType: "Chapters",
  },
]

const resourceTypeIcons = {
  video: Video,
  book: BookOpen,
  article: FileText,
  link: LinkIcon,
  document: FileText,
}

function ResourceCard({ resource }: { resource: Resource }) {
  const ResourceIcon = resourceTypeIcons[resource.type]

  return (
    <div className="mb-3 bg-card rounded-md border border-border hover:bg-accent/50 transition-colors">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-medium text-sm leading-tight pr-2">{resource.title}</h3>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
            <MoreVertical className="h-3 w-3" />
          </Button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <ResourceIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground capitalize">{resource.type}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{resource.progress.toFixed(1)}%</span>
            <span>
              {resource.currentUnit}/{resource.totalUnits} {resource.unitType}
            </span>
          </div>
          <div className="bg-secondary rounded-full h-2 overflow-hidden">
            <div className="bg-primary h-full" style={{ width: `${resource.progress}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResourcesPage() {
  const [notStartedResources] = useState<Resource[]>(mockResources)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-medium text-sm">Not-Started</h2>
            <span className="bg-secondary text-xs px-1.5 py-0.5 rounded-md">2</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground border-dashed h-8 text-xs bg-transparent hover:bg-accent"
        >
          + Add Resource
        </Button>

        {notStartedResources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-medium text-sm">In-Progress</h2>
            <span className="bg-secondary text-xs px-1.5 py-0.5 rounded-md">5</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground border-dashed h-8 text-xs bg-transparent hover:bg-accent"
        >
          + Add Task
        </Button>

        {/* Placeholder for in-progress resources */}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-medium text-sm">Done</h2>
            <span className="bg-secondary text-xs px-1.5 py-0.5 rounded-md">2</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground border-dashed h-8 text-xs bg-transparent hover:bg-accent"
        >
          + Add Task
        </Button>

        {/* Placeholder for done resources */}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-medium text-sm">On-Hold</h2>
            <span className="bg-secondary text-xs px-1.5 py-0.5 rounded-md">2</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground border-dashed h-8 text-xs bg-transparent hover:bg-accent"
        >
          + Add Task
        </Button>

        {/* Placeholder for on-hold resources */}
      </div>
    </div>
  )
}
