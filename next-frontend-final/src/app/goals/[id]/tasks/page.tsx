"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Kanban } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { KanbanBoardModal } from "@/components/ui/kanban-board-modal";
import { KanbanStatusEditModal } from "@/components/ui/kanban-status-edit-modal";
import { KanbanColumn } from "@/components/ui/kanban-column";
import {
  getKanbanStatuses,
  deleteKanbanStatus,
  type KanbanStatus,
} from "@/services/kanban-service";

export default function TasksPage() {
  const [kanbanStatuses, setKanbanStatuses] = useState<KanbanStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusToEdit, setStatusToEdit] = useState<KanbanStatus | null>(null);
  const [statusToDelete, setStatusToDelete] = useState<KanbanStatus | null>(
    null
  );

  const params = useParams();
  const { toast } = useToast();
  const goalId = params.id as string;

  useEffect(() => {
    const fetchKanbanStatuses = async () => {
      if (!goalId) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await getKanbanStatuses(goalId);
        setKanbanStatuses(data);
      } catch (err) {
        console.error("Failed to load kanban statuses:", err);
        setError("Failed to load kanban boards");
      } finally {
        setIsLoading(false);
      }
    };

    fetchKanbanStatuses();
  }, [goalId]);

  const handleAddStatus = (newStatus: KanbanStatus) => {
    setKanbanStatuses((prev) => [...prev, newStatus]);
  };

  const handleUpdateStatus = (updatedStatus: KanbanStatus) => {
    setKanbanStatuses((prev) =>
      prev.map((status) =>
        status.id === updatedStatus.id ? updatedStatus : status
      )
    );
  };

  const handleEditStatus = (status: KanbanStatus) => {
    setStatusToEdit(status);
    setIsEditModalOpen(true);
  };

  const handleDeleteStatus = (status: KanbanStatus) => {
    setStatusToDelete(status);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteStatus = async () => {
    if (!statusToDelete) return;

    try {
      await deleteKanbanStatus(goalId, statusToDelete.id.toString());
      setKanbanStatuses((prev) =>
        prev.filter((status) => status.id !== statusToDelete.id)
      );
      toast({
        title: "Success",
        description: "Kanban board deleted successfully",
        variant: "success",
      });
      setDeleteDialogOpen(false);
      setStatusToDelete(null);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete kanban board",
        variant: "destructive",
      });
      console.error(err);
    }
  };

  const handleAddTask = (status: KanbanStatus) => {
    // Placeholder for future task creation functionality
    toast({
      title: "Coming Soon",
      description: "Task creation will be implemented in the next update",
    });
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-6 w-32 bg-secondary rounded"></div>
          <div className="h-8 w-24 bg-secondary rounded"></div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="min-w-[280px] h-64 bg-secondary rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="bg-destructive/10 p-4 rounded-md text-destructive">
          {error}
        </div>
        <Button onClick={() => window.location.reload()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-medium">Tasks</h2>
        
      </div>

      {kanbanStatuses.length === 0 ? (
        <div className="text-center py-12">
          <Kanban className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Kanban boards yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first Kanban board to start organizing your tasks.
          </p>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            variant="outline"
            className="w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Board
          </Button>
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {kanbanStatuses.map((status) => (
            <KanbanColumn
              key={status.id}
              status={status}
              taskCount={0} // Placeholder - will be replaced with actual task count
              onEdit={handleEditStatus}
              onDelete={handleDeleteStatus}
              onAddTask={handleAddTask}
            />
          ))}

          {/* Add List Button */}
          <div className="min-w-[280px] flex-shrink-0">
            <Button
              variant="outline"
              className="w-full h-12 border-dashed text-muted-foreground bg-transparent hover:bg-accent"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add List
            </Button>
          </div>
        </div>
      )}

      {/* Modals */}
      <KanbanBoardModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleAddStatus}
        goalId={goalId}
      />

      {statusToEdit && (
        <KanbanStatusEditModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setStatusToEdit(null);
          }}
          onSuccess={handleUpdateStatus}
          goalId={goalId}
          status={statusToEdit}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Kanban Board</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{statusToDelete?.name}"? This
              action cannot be undone and will remove all tasks in this board.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteStatus}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
