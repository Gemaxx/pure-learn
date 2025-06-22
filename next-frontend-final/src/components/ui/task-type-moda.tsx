"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import {
  createTaskType,
  type TaskType,
  type CreateTaskTypeParams,
} from "@/services/task-service";

type TaskTypeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (taskType: TaskType) => void;
};

export function TaskTypeModal({
  isOpen,
  onClose,
  onSuccess,
}: TaskTypeModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      setError("You must be logged in to create a task type");
      return;
    }

    if (name.trim().length < 1) {
      setError("Name is required");
      return;
    }

    if (name.length > 100) {
      setError("Name must be 100 characters or less");
      return;
    }

    if (description.length > 500) {
      setError("Description must be 500 characters or less");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const taskTypeData: CreateTaskTypeParams = {
        name: name.trim(),
        description: description.trim(),
      };

      const newTaskType = await createTaskType(user.id, taskTypeData);

      toast({
        title: "Success",
        description: "Task type created successfully",
        variant: "success",
      });

      if (onSuccess) {
        onSuccess(newTaskType);
      }

      // Reset form
      setName("");
      setDescription("");
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create task type"
      );
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
    setName("");
    setDescription("");
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Task Type">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Task Title"
            required
            disabled={isLoading}
            maxLength={100}
          />
          <div className="text-xs text-muted-foreground text-right">
            {name.length}/100
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="More about this type ..."
            disabled={isLoading}
            maxLength={500}
            className="resize-none h-24"
          />
          <div className="text-xs text-muted-foreground text-right">
            {description.length}/500
          </div>
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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
