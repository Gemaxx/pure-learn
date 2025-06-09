"use client";

import { useTheme } from "@/components/theme-provider";
import { MoreVertical, Tag, ExternalLink } from "lucide-react";
import type { Task } from "@/types";
import ProgressBar from "@/components/progress-bar";

interface TasksTabProps {
  tasks: Task[];
}

export default function TasksTab({ tasks }: TasksTabProps) {
  const { theme } = useTheme();

  return (
    <div>
      <h2
        className={`text-xl font-medium mb-4 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        Tasks
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 rounded-lg ${
              theme === "dark" ? "bg-zinc-900" : "bg-white"
            } ${theme === "dark" ? "border border-zinc-800" : "shadow-md"}`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {task.title}
              </h3>
              <button
                className={theme === "dark" ? "text-zinc-400" : "text-gray-500"}
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-1 mb-2">
              <Tag
                className={`h-3 w-3 ${
                  theme === "dark" ? "text-zinc-500" : "text-gray-500"
                }`}
              />
              <span
                className={`text-xs ${
                  theme === "dark" ? "text-zinc-400" : "text-gray-500"
                }`}
              >
                {task.resourceType}
              </span>
            </div>

            <ProgressBar progress={task.progress} theme={theme} />

            <div className="flex justify-between items-center mt-1">
              <span
                className={`text-xs ${
                  theme === "dark" ? "text-zinc-400" : "text-gray-500"
                }`}
              >
                {task.completed}/{task.total} Unit Type
              </span>
              <button>
                <ExternalLink
                  className={`h-4 w-4 ${
                    theme === "dark" ? "text-zinc-400" : "text-gray-500"
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
