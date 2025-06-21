"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import {
  updateTask,
  getTaskTypes,
  type Task,
  type TaskType,
  type UpdateTaskParams,
} from "@/services/task-service";
import type { KanbanStatus } from "@/services/kanban-service";

type TaskEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (task: Task) => void;
  task: Task | null;
  kanbanStatuses: KanbanStatus[];
};

export function TaskEditModal({
  isOpen,
  onClose,
  onSuccess,
  task,
  kanbanStatuses,
}: TaskEditModalProps) {
  const [title, setTitle] = useState("");
  const [typeId, setTypeId] = useState<string>("");
  const [kanbanStatusId, setKanbanStatusId] = useState<string>("");
  const [eisenhowerStatus, setEisenhowerStatus] = useState<
    | "Not Urgent & Not Important"
    | "Urgent but Not Important"
    | "Not Urgent but Important"
    | "Urgent & Important"
  >("Not Urgent & Not Important");
  const [isCompleted, setIsCompleted] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [taskTypes, setTaskTypes] = useState<TaskType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchTaskTypes = async () => {
      if (!user?.id) return;

      setIsLoadingTypes(true);
      try {
        const types = await getTaskTypes(user.id);
        setTaskTypes(types);
      } catch (err) {
        console.error("Failed to fetch task types:", err);
      } finally {
        setIsLoadingTypes(false);
      }
    };

    if (isOpen) {
      fetchTaskTypes();
    }
  }, [user?.id, isOpen]);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setTypeId(task.typeId.toString());
      setKanbanStatusId(task.kanbanStatusId.toString());
      setEisenhowerStatus(task.eisenhowerStatus);
      setIsCompleted(task.isCompleted);
      setDueDate(task.dueDate || "");
      setEstimatedTime(task.estimatedTime || "");
      setTimeSpent(task.timeSpent || "");
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id || !task) {
      setError("Unable to update task");
      return;
    }

    if (title.trim().length < 1) {
      setError("Title is required");
      return;
    }

    if (!typeId) {
      setError("Task type is required");
      return;
    }

    if (!kanbanStatusId) {
      setError("Status is required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const taskData: UpdateTaskParams = {
        title: title.trim(),
        typeId: Number.parseInt(typeId),
        kanbanStatusId: Number.parseInt(kanbanStatusId),
        eisenhowerStatus,
        isCompleted,
        dueDate: dueDate || undefined,
        estimatedTime: estimatedTime || undefined,
        timeSpent: timeSpent || undefined,
      };

      const updatedTask = await updateTask(
        user.id,
        task.id.toString(),
        taskData
      );

      toast({
        title: "Success",
        description: "Task updated successfully",
        variant: "success",
      });

      if (onSuccess) {
        onSuccess(updatedTask);
      }

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update task");
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setError(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Task"
      className="max-h-[90vh] overflow-hidden"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-h-[70vh] overflow-y-auto pr-1"
      >
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            required
            disabled={isLoading}
            maxLength={200}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select
            value={typeId}
            onValueChange={setTypeId}
            disabled={isLoading || isLoadingTypes}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  isLoadingTypes ? "Loading types..." : "Select task type"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {taskTypes.map((type) => (
                <SelectItem key={type.id} value={type.id.toString()}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={kanbanStatusId}
            onValueChange={setKanbanStatusId}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {kanbanStatuses.map((status) => (
                <SelectItem key={status.id} value={status.id.toString()}>
                  {status.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select
            value={eisenhowerStatus}
            onValueChange={(
              value:
                | "Not Urgent & Not Important"
                | "Urgent but Not Important"
                | "Not Urgent but Important"
                | "Urgent & Important"
            ) => setEisenhowerStatus(value)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Not Urgent & Not Important">
                Not Urgent & Not Important
              </SelectItem>
              <SelectItem value="Urgent but Not Important">
                Urgent but Not Important
              </SelectItem>
              <SelectItem value="Not Urgent but Important">
                Not Urgent but Important
              </SelectItem>
              <SelectItem value="Urgent & Important">
                Urgent & Important
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="completed"
            checked={isCompleted}
            onCheckedChange={(checked) => setIsCompleted(checked as boolean)}
            disabled={isLoading}
          />
          <Label htmlFor="completed">Mark as completed</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date (Optional)</Label>
          <Input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="estimatedTime">Estimated Time</Label>
            <Input
              id="estimatedTime"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              placeholder="e.g., 2h 30m"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeSpent">Time Spent</Label>
            <Input
              id="timeSpent"
              value={timeSpent}
              onChange={(e) => setTimeSpent(e.target.value)}
              placeholder="e.g., 1h 45m"
              disabled={isLoading}
            />
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading || !typeId || !kanbanStatusId}
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
