"use client"

import { useTheme } from "@/components/theme-provider"
import { MoreVertical, Tag, ExternalLink } from "lucide-react"
import type { Task } from "@/types"
import ProgressBar from "@/components/progress-bar"
import TaskCards from "@/components/task/Taskcards";

interface TasksTabProps {
  tasks: Task[]
}

export default function TasksTab({ tasks }: TasksTabProps) {
  const { theme } = useTheme()

  return (
    <div>
      <TaskCards />
    </div>
  )
}
