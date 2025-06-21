"use client";

import { Button } from "@/components/ui/button";
import { MoreVertical, Plus, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { TaskCard } from "@/components/ui/task-card";
import type { KanbanStatus } from "@/services/kanban-service";
import type { Task, TaskType } from "@/services/task-service";

type KanbanColumnProps = {
  status: KanbanStatus;
  tasks: Task[];
  taskTypes: TaskType[];
  goalId: string;
  onEdit: (status: KanbanStatus) => void;
  onDelete: (status: KanbanStatus) => void;
  onAddTask: (status: KanbanStatus) => void;
  onAddTaskType: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task, type: "soft" | "hard") => void;
  onUpdateTask: (task: Task) => void;
};

export function KanbanColumn({
  status,
  tasks,
  taskTypes,
  goalId,
  onEdit,
  onDelete,
  onAddTask,
  onAddTaskType,
  onEditTask,
  onDeleteTask,
  onUpdateTask,
}: KanbanColumnProps) {
  // فصل المهام المكتملة عن غير المكتملة
  const activeTasks = tasks.filter((task) => !task.isCompleted);
  const completedTasks = tasks.filter((task) => task.isCompleted);

  const activeTaskCount = activeTasks.length;
  const completedTaskCount = completedTasks.length;
  const totalTaskCount = tasks.length;
  const canAddTask = activeTaskCount < status.maxTasks;

  return (
    <div className="bg-card border border-border rounded-lg p-4 min-w-[280px] max-w-[320px] flex-shrink-0">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-sm">{status.name}</h3>
          <span className="bg-secondary text-xs px-1.5 py-0.5 rounded-md">
            {activeTaskCount}
          </span>
          <span className="text-xs text-muted-foreground">
            MAX: {status.maxTasks}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-muted-foreground"
            >
              <MoreVertical className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => onEdit(status)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Board
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(status)}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Board
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Add Task Button */}
      <Button
        variant="outline"
        className="w-full justify-start text-muted-foreground border-dashed h-8 text-xs bg-transparent hover:bg-accent mb-3"
        onClick={() => onAddTask(status)}
        disabled={!canAddTask}
      >
        <Plus className="h-3 w-3 mr-1" />
        Add Task
      </Button>

      {/* Type and Priority Buttons */}
      <div className="flex gap-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          className="text-xs h-7 px-2 bg-transparent hover:bg-accent"
          onClick={onAddTaskType}
        >
          <Plus className="h-3 w-3 mr-1" />
          Type
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-xs h-7 px-2 bg-transparent hover:bg-accent"
          disabled
        >
          <Plus className="h-3 w-3 mr-1" />
          Priority
        </Button>
      </div>

      {/* Active Tasks List - المهام النشطة فقط */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {activeTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            taskTypes={taskTypes}
            goalId={goalId}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onUpdate={onUpdateTask}
          />
        ))}

        {!canAddTask && activeTaskCount >= status.maxTasks && (
          <div className="text-xs text-muted-foreground text-center py-2 bg-secondary/50 rounded">
            Maximum tasks reached
          </div>
        )}

        {activeTaskCount === 0 && (
          <div className="text-xs text-muted-foreground text-center py-4">
            No active tasks
          </div>
        )}
      </div>

      {/* Completed Tasks Section - المهام المكتملة */}
      {completedTaskCount > 0 && (
        <div className="mt-4 pt-3 border-t border-border">
          <details className="group">
            <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors flex items-center justify-between">
              <span>Completed Tasks ({completedTaskCount})</span>
              <span className="group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
              {completedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  taskTypes={taskTypes}
                  goalId={goalId}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                  onUpdate={onUpdateTask}
                />
              ))}
            </div>
          </details>
        </div>
      )}
    </div>
  );
}
