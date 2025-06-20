"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/hooks/use-toast";
import {
  createKanbanStatus,
  type KanbanStatus,
  type CreateKanbanStatusParams,
} from "@/services/kanban-service";

type KanbanBoardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (status: KanbanStatus) => void;
  goalId: string;
};

export function KanbanBoardModal({
  isOpen,
  onClose,
  onSuccess,
  goalId,
}: KanbanBoardModalProps) {
  const [name, setName] = useState("");
  const [maxTasks, setMaxTasks] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim().length < 1) {
      setError("Name is required");
      return;
    }

    const maxTasksNum = Number.parseInt(maxTasks);
    if (isNaN(maxTasksNum) || maxTasksNum < 1) {
      setError("Max tasks must be a valid number greater than 0");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const statusData: CreateKanbanStatusParams = {
        name: name.trim(),
        maxTasks: maxTasksNum,
      };

      const newStatus = await createKanbanStatus(goalId, statusData);

      toast({
        title: "Success",
        description: "Kanban board created successfully",
        variant: "success",
      });

      if (onSuccess) {
        onSuccess(newStatus);
      }

      // Reset form
      setName("");
      setMaxTasks("");
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create kanban board"
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
    setMaxTasks("");
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Kanban Board">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Title of your Kanban Board"
            required
            disabled={isLoading}
            maxLength={100}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxTasks">maxTasks</Label>
          <Input
            id="maxTasks"
            type="number"
            value={maxTasks}
            onChange={(e) => setMaxTasks(e.target.value)}
            placeholder="ex.1, 10..."
            required
            disabled={isLoading}
            min="1"
            max="1000"
          />
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
