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
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import {
  createTask,
  getTaskTypes,
  type Task,
  type TaskType,
  type CreateTaskParams,
} from "@/services/task-service";
import type { KanbanStatus } from "@/services/kanban-service";

type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (task: Task) => void;
  goalId: string;
  kanbanStatus: KanbanStatus;
};

export function TaskModal({
  isOpen,
  onClose,
  onSuccess,
  goalId,
  kanbanStatus,
}: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [typeId, setTypeId] = useState<string>("");
  const [eisenhowerStatus, setEisenhowerStatus] = useState<
    | "Not Urgent & Not Important"
    | "Urgent but Not Important"
    | "Not Urgent but Important"
    | "Urgent & Important"
  >("Not Urgent & Not Important");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      setError("You must be logged in to create a task");
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

    setIsLoading(true);
    setError(null);

    try {
      const taskData: CreateTaskParams = {
        title: title.trim(),
        goalId: Number.parseInt(goalId),
        typeId: Number.parseInt(typeId),
        kanbanStatusId: kanbanStatus.id,
        eisenhowerStatus,
      };

      const newTask = await createTask(user.id, taskData);

      toast({
        title: "Success",
        description: "Task created successfully",
        variant: "success",
      });

      if (onSuccess) {
        onSuccess(newTask);
      }

      // Reset form
      setTitle("");
      setTypeId("");
      setEisenhowerStatus("Not Urgent & Not Important");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create task");
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
    setTitle("");
    setTypeId("");
    setEisenhowerStatus("Not Urgent & Not Important");
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Task">
      <form onSubmit={handleSubmit} className="space-y-4">
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

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading || !typeId}>
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
