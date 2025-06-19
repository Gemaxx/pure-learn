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
import type { KanbanStatus } from "@/services/kanban-service";

type KanbanColumnProps = {
  status: KanbanStatus;
  taskCount: number;
  onEdit: (status: KanbanStatus) => void;
  onDelete: (status: KanbanStatus) => void;
  onAddTask: (status: KanbanStatus) => void;
};

export function KanbanColumn({
  status,
  taskCount,
  onEdit,
  onDelete,
  onAddTask,
}: KanbanColumnProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 min-w-[280px] max-w-[320px] flex-shrink-0">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-sm">{status.name}</h3>
          <span className="bg-secondary text-xs px-1.5 py-0.5 rounded-md">
            {taskCount}
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
        className="w-full justify-start text-muted-foreground border-dashed h-8 text-xs bg-transparent hover:bg-accent mb-4"
        onClick={() => onAddTask(status)}
        disabled={taskCount >= status.maxTasks}
      >
        <Plus className="h-3 w-3 mr-1" />
        Add Task
      </Button>

      {/* Task List - Placeholder for now */}
      <div className="space-y-2">
        {/* Tasks will be rendered here in future implementation */}
        {taskCount >= status.maxTasks && (
          <div className="text-xs text-muted-foreground text-center py-2 bg-secondary/50 rounded">
            Maximum tasks reached
          </div>
        )}
      </div>
    </div>
  );
}
