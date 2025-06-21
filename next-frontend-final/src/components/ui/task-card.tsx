"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MoreVertical,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Circle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { updateTask, type Task, type TaskType } from "@/services/task-service";

type TaskCardProps = {
  task: Task;
  taskTypes: TaskType[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task, type: "soft" | "hard") => void;
  onUpdate: (task: Task) => void;
};

const priorityColors = {
  "Not Urgent & Not Important":
    "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  "Urgent but Not Important":
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  "Not Urgent but Important":
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "Urgent & Important":
    "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const priorityLabels = {
  "Not Urgent & Not Important": "Low",
  "Urgent but Not Important": "Medium",
  "Not Urgent but Important": "High",
  "Urgent & Important": "Critical",
};

export function TaskCard({
  task,
  taskTypes,
  onEdit,
  onDelete,
  onUpdate,
}: TaskCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const taskType = taskTypes.find((type) => type.id === task.typeId);

  const handleToggleComplete = async () => {
    if (!user?.id) return;

    setIsUpdating(true);
    try {
      const updatedTask = await updateTask(user.id, task.id.toString(), {
        isCompleted: !task.isCompleted,
      });

      // إضافة تأخير بسيط لجعل الانتقال أكثر سلاسة
      setTimeout(() => {
        onUpdate(updatedTask);
        toast({
          title: "Success",
          description: `Task ${
            updatedTask.isCompleted ? "completed" : "reactivated"
          }`,
          variant: "success",
        });
      }, 150);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div
      className={`bg-card border border-border rounded-lg p-3 mb-3 hover:bg-accent/50 transition-all duration-200 ${
        task.isCompleted ? "opacity-75 bg-muted/50" : ""
      } ${isUpdating ? "scale-95 opacity-50" : ""}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start gap-2 flex-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 p-0 mt-0.5 hover:scale-110 transition-transform"
            onClick={handleToggleComplete}
            disabled={isUpdating}
          >
            {task.isCompleted ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <Circle className="h-4 w-4 text-muted-foreground hover:text-green-600 transition-colors" />
            )}
          </Button>
          <h4
            className={`font-medium text-sm leading-tight flex-1 transition-all duration-200 ${
              task.isCompleted ? "line-through text-muted-foreground" : ""
            }`}
          >
            {task.title}
          </h4>
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
            <DropdownMenuItem onClick={() => onEdit(task)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(task, "soft")}
              className="text-yellow-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Soft Delete
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(task, "hard")}
              className="text-destructive"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Hard Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-wrap items-center gap-1 text-xs">
        {taskType && (
          <Badge variant="outline" className="text-xs px-2 py-0.5 h-5">
            {taskType.name}
          </Badge>
        )}
        <Badge
          variant="outline"
          className={`text-xs px-2 py-0.5 h-5 ${
            priorityColors[task.eisenhowerStatus]
          }`}
        >
          {priorityLabels[task.eisenhowerStatus]}
        </Badge>
      </div>

      {/* إضافة معلومات إضافية للمهام المكتملة */}
      {task.isCompleted && task.updatedAt && (
        <div className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
          Completed: {new Date(task.updatedAt).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}
