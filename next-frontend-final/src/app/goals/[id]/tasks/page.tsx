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
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { KanbanBoardModal } from "@/components/ui/kanban-board-modal";
import { KanbanStatusEditModal } from "@/components/ui/kanban-status-edit-modal";
import { TaskTypeModal } from "@/components/ui/task-type-moda";
import { TaskModal } from "@/components/ui/task-modal";
import { TaskEditModal } from "@/components/ui/task-edit-modal";
import { KanbanColumn } from "@/components/ui/kanban-column";
import {
  getKanbanStatuses,
  deleteKanbanStatus,
  type KanbanStatus,
} from "@/services/kanban-service";
import {
  getTasks,
  getTaskTypes,
  softDeleteTask,
  hardDeleteTask,
  type Task,
  type TaskType,
} from "@/services/task-service";

export default function TasksPage() {
  const [kanbanStatuses, setKanbanStatuses] = useState<KanbanStatus[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTypes, setTaskTypes] = useState<TaskType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false);
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
  const [isTaskTypeModalOpen, setIsTaskTypeModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isTaskEditModalOpen, setIsTaskEditModalOpen] = useState(false);
  const [deleteBoardDialogOpen, setDeleteBoardDialogOpen] = useState(false);
  const [deleteTaskDialogOpen, setDeleteTaskDialogOpen] = useState(false);

  // Selected items
  const [statusToEdit, setStatusToEdit] = useState<KanbanStatus | null>(null);
  const [statusToDelete, setStatusToDelete] = useState<KanbanStatus | null>(
    null
  );
  const [selectedKanbanStatus, setSelectedKanbanStatus] =
    useState<KanbanStatus | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [deleteTaskType, setDeleteTaskType] = useState<"soft" | "hard">("soft");

  const params = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const goalId = params.id as string;

  useEffect(() => {
    const fetchData = async () => {
      if (!goalId || !user?.id) return;

      setIsLoading(true);
      setError(null);

      try {
        const [statusesData, tasksData, typesData] = await Promise.all([
          getKanbanStatuses(goalId),
          getTasks(user.id, { goalId: Number.parseInt(goalId) }),
          getTaskTypes(user.id),
        ]);

        setKanbanStatuses(statusesData);
        setTasks(tasksData);
        setTaskTypes(typesData);
      } catch (err) {
        console.error("Failed to load data:", err);
        setError("Failed to load task data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [goalId, user?.id]);

  // Kanban Status handlers
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
    setIsEditBoardModalOpen(true);
  };

  const handleDeleteStatus = (status: KanbanStatus) => {
    setStatusToDelete(status);
    setDeleteBoardDialogOpen(true);
  };

  const confirmDeleteStatus = async () => {
    if (!statusToDelete) return;

    try {
      await deleteKanbanStatus(goalId, statusToDelete.id.toString());
      setKanbanStatuses((prev) =>
        prev.filter((status) => status.id !== statusToDelete.id)
      );
      // Remove tasks associated with this status
      setTasks((prev) =>
        prev.filter((task) => task.kanbanStatusId !== statusToDelete.id)
      );
      toast({
        title: "Success",
        description: "Kanban board deleted successfully",
        variant: "success",
      });
      setDeleteBoardDialogOpen(false);
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

  // Task Type handlers
  const handleAddTaskType = (newTaskType: TaskType) => {
    setTaskTypes((prev) => [...prev, newTaskType]);
  };

  // Task handlers
  const handleAddTask = (status: KanbanStatus) => {
    setSelectedKanbanStatus(status);
    setIsTaskModalOpen(true);
  };

  const handleTaskCreated = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsTaskEditModalOpen(true);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDeleteTask = (task: Task, type: "soft" | "hard") => {
    setTaskToDelete(task);
    setDeleteTaskType(type);
    setDeleteTaskDialogOpen(true);
  };

  const confirmDeleteTask = async () => {
    if (!taskToDelete || !user?.id) return;

    try {
      if (deleteTaskType === "soft") {
        await softDeleteTask(user.id, taskToDelete.id.toString());
        toast({
          title: "Success",
          description: "Task moved to trash",
          variant: "success",
        });
      } else {
        await hardDeleteTask(user.id, taskToDelete.id.toString());
        toast({
          title: "Success",
          description: "Task permanently deleted",
          variant: "success",
        });
      }

      setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
      setDeleteTaskDialogOpen(false);
      setTaskToDelete(null);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
      console.error(err);
    }
  };

  const getTasksForStatus = (statusId: number) => {
    return tasks.filter(
      (task) => task.kanbanStatusId === statusId && !task.isDeleted
    );
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
        <Button
          onClick={() => setIsCreateBoardModalOpen(true)}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Add List
        </Button>
      </div>

      {kanbanStatuses.length === 0 ? (
        <div className="text-center py-12">
          <Kanban className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Kanban boards yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first Kanban board to start organizing your tasks.
          </p>
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {kanbanStatuses.map((status) => (
            <KanbanColumn
              key={status.id}
              status={status}
              tasks={getTasksForStatus(status.id)}
              taskTypes={taskTypes}
              goalId={goalId}
              onEdit={handleEditStatus}
              onDelete={handleDeleteStatus}
              onAddTask={handleAddTask}
              onAddTaskType={() => setIsTaskTypeModalOpen(true)}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onUpdateTask={handleUpdateTask}
            />
          ))}

          {/* Add List Button */}
          <div className="min-w-[280px] flex-shrink-0">
            <Button
              variant="outline"
              className="w-full h-12 border-dashed text-muted-foreground bg-transparent hover:bg-accent"
              onClick={() => setIsCreateBoardModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add List
            </Button>
          </div>
        </div>
      )}

      {/* Modals */}
      <KanbanBoardModal
        isOpen={isCreateBoardModalOpen}
        onClose={() => setIsCreateBoardModalOpen(false)}
        onSuccess={handleAddStatus}
        goalId={goalId}
      />

      {statusToEdit && (
        <KanbanStatusEditModal
          isOpen={isEditBoardModalOpen}
          onClose={() => {
            setIsEditBoardModalOpen(false);
            setStatusToEdit(null);
          }}
          onSuccess={handleUpdateStatus}
          goalId={goalId}
          status={statusToEdit}
        />
      )}

      <TaskTypeModal
        isOpen={isTaskTypeModalOpen}
        onClose={() => setIsTaskTypeModalOpen(false)}
        onSuccess={handleAddTaskType}
      />

      {selectedKanbanStatus && (
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => {
            setIsTaskModalOpen(false);
            setSelectedKanbanStatus(null);
          }}
          onSuccess={handleTaskCreated}
          goalId={goalId}
          kanbanStatus={selectedKanbanStatus}
        />
      )}

      {taskToEdit && (
        <TaskEditModal
          isOpen={isTaskEditModalOpen}
          onClose={() => {
            setIsTaskEditModalOpen(false);
            setTaskToEdit(null);
          }}
          onSuccess={handleUpdateTask}
          task={taskToEdit}
          kanbanStatuses={kanbanStatuses}
        />
      )}

      {/* Delete Confirmation Dialogs */}
      <AlertDialog
        open={deleteBoardDialogOpen}
        onOpenChange={setDeleteBoardDialogOpen}
      >
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

      <AlertDialog
        open={deleteTaskDialogOpen}
        onOpenChange={setDeleteTaskDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {deleteTaskType === "soft"
                ? "Soft Delete Task"
                : "Hard Delete Task"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTaskType === "soft"
                ? "This task will be moved to trash and can be restored later."
                : "This action cannot be undone. This will permanently delete the task."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteTask}
              className={
                deleteTaskType === "hard"
                  ? "bg-destructive hover:bg-destructive/90"
                  : ""
              }
            >
              {deleteTaskType === "soft" ? "Soft Delete" : "Hard Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
