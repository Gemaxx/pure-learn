import { fetchWithAuth } from "./api-client";

export type KanbanStatus = {
  id: number;
  name: string;
  maxTasks: number;
};

export type CreateKanbanStatusParams = {
  name: string;
  maxTasks: number;
};

export type UpdateKanbanStatusParams = {
  name?: string;
  maxTasks?: number;
};

// Get all kanban statuses for a goal
export async function getKanbanStatuses(
  goalId: string
): Promise<KanbanStatus[]> {
  try {
    const response = await fetchWithAuth(`/api/goals/${goalId}/kanbanstatuses`);
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Failed to fetch kanban statuses:", error);
    return [];
  }
}

// Create a new kanban status
export async function createKanbanStatus(
  goalId: string,
  data: CreateKanbanStatusParams
): Promise<KanbanStatus> {
  return fetchWithAuth(`/api/goals/${goalId}/kanbanstatuses`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Update a kanban status
export async function updateKanbanStatus(
  goalId: string,
  statusId: string,
  data: UpdateKanbanStatusParams
): Promise<KanbanStatus> {
  return fetchWithAuth(`/api/goals/${goalId}/kanbanstatuses/${statusId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

// Delete a kanban status
export async function deleteKanbanStatus(
  goalId: string,
  statusId: string
): Promise<void> {
  return fetchWithAuth(`/api/goals/${goalId}/kanbanstatuses/${statusId}`, {
    method: "DELETE",
  });
}
