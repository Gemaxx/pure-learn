"use client"

import { useState } from "react"
import { useTheme } from "@/components/theme-provider"
import GoalHeader from "@/components/goal-header"
import ResourcesTab from "@/components/resources-tab"
import TasksTab from "@/components/tasks-tab"
import NotesTab from "@/components/notes-tab"
import AboutTab from "@/components/about-tab"
import type { ResourceType, Resource, Task } from "@/types"

type TabType = "resources" | "tasks" | "notes" | "about"

export default function GoalPage({ params }: { params: { id: string } }) {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState<TabType>("resources")
  const [resourceTypes, setResourceTypes] = useState<ResourceType[]>([
    {
      id: "1",
      name: "Video",
      units: "Min",
      resources: [
        {
          id: "1",
          title: "How to Create a Component",
          progress: 60,
          total: 50,
          completed: 30,
          status: "not-started",
        },
      ],
    },
    {
      id: "2",
      name: "Book",
      units: "Chapters",
      resources: [
        {
          id: "2",
          title: "Responsive Design",
          progress: 8.3,
          total: 12,
          completed: 1,
          status: "not-started",
        },
      ],
    },
  ])

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Do Research about AI",
      resourceType: "Resource Type",
      progress: 66.6,
      total: 12,
      completed: 8,
      status: "in-progress",
    },
    {
      id: "2",
      title: "Finish the first 2 videos",
      resourceType: "Resource Type",
      progress: 66.6,
      total: 12,
      completed: 8,
      status: "done",
    },
  ])

  const addResourceType = (resourceType: ResourceType) => {
    setResourceTypes([...resourceTypes, resourceType])
  }

  const addResource = (resourceTypeId: string, resource: Resource) => {
    setResourceTypes(
      resourceTypes.map((rt) => (rt.id === resourceTypeId ? { ...rt, resources: [...rt.resources, resource] } : rt)),
    )
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-black" : "bg-gray-100"}`}>
      <GoalHeader title="Learn UI-UX" activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="p-4">
        {activeTab === "resources" && (
          <ResourcesTab resourceTypes={resourceTypes} onAddResourceType={addResourceType} onAddResource={addResource} />
        )}
        {activeTab === "tasks" && <TasksTab tasks={tasks} />}
        {activeTab === "notes" && <NotesTab />}
        {activeTab === "about" && <AboutTab />}
      </div>
    </div>
  )
}
