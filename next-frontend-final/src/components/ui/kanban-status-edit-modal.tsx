"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/hooks/use-toast";
import {
  updateKanbanStatus,
  type KanbanStatus,
  type UpdateKanbanStatusParams,
} from "@/services/kanban-service";

type KanbanStatusEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (status: KanbanStatus) => void;
  goalId: string;
  status: KanbanStatus | null;
};

export function KanbanStatusEditModal({
  isOpen,
  onClose,
  onSuccess,
  goalId,
  status,
}: KanbanStatusEditModalProps) {
  const [name, setName] = useState("");
  const [maxTasks, setMaxTasks] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    if (status) {
      setName(status.name);
      setMaxTasks(status.maxTasks.toString());
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!status) return;

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
      const statusData: UpdateKanbanStatusParams = {
        name: name.trim(),
        maxTasks: maxTasksNum,
      };

      const updatedStatus = await updateKanbanStatus(
        goalId,
        status.id.toString(),
        statusData
      );

      toast({
        title: "Success",
        description: "Kanban board updated successfully",
        variant: "success",
      });

      if (onSuccess) {
        onSuccess(updatedStatus);
      }

      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update kanban board"
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
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Kanban Board">
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
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
