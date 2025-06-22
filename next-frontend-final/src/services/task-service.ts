import { fetchWithAuth } from "./api-client";

// Task Type interfaces
export type TaskType = {
  id: number;
  name: string;
  description: string;
};

export type CreateTaskTypeParams = {
  name: string;
  description: string;
};

// Task interfaces
export type Task = {
  id: number;
  goalId: number;
  title: string;
  isCompleted: boolean;
  typeId: number;
  kanbanStatusId: number;
  eisenhowerStatus:
    | "Not Urgent & Not Important"
    | "Urgent but Not Important"
    | "Not Urgent but Important"
    | "Urgent & Important";
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  isDeleted?: boolean;
  dueDate?: string;
  estimatedTime?: string;
  timeSpent?: string;
  repeatFrequency?: "Monthly" | "Weekly" | "Daily";
  repeatInterval?: number;
  repeatOnSunday?: boolean;
  repeatOnMonday?: boolean;
  repeatOnTuesday?: boolean;
  repeatOnWednesday?: boolean;
  repeatOnThursday?: boolean;
  repeatOnFriday?: boolean;
  repeatOnSaturday?: boolean;
  repeatEnds?: "After Occurrences" | "On Date" | "Never";
  repeatEndDate?: string;
  repeatEndOccurrences?: number;
};

export type CreateTaskParams = {
  title: string;
  goalId: number;
  typeId: number;
  kanbanStatusId: number;
  eisenhowerStatus:
    | "Not Urgent & Not Important"
    | "Urgent but Not Important"
    | "Not Urgent but Important"
    | "Urgent & Important";
};

export type UpdateTaskParams = {
  goalId?: number;
  kanbanStatusId?: number;
  typeId?: number;
  title?: string;
  isCompleted?: boolean;
  dueDate?: string;
  estimatedTime?: string;
  timeSpent?: string;
  eisenhowerStatus?:
    | "Not Urgent & Not Important"
    | "Urgent but Not Important"
    | "Not Urgent but Important"
    | "Urgent & Important";
  repeatFrequency?: "Monthly" | "Weekly" | "Daily";
  repeatInterval?: number;
  repeatOnSunday?: boolean;
  repeatOnMonday?: boolean;
  repeatOnTuesday?: boolean;
  repeatOnWednesday?: boolean;
  repeatOnThursday?: boolean;
  repeatOnFriday?: boolean;
  repeatOnSaturday?: boolean;
  repeatEnds?: "After Occurrences" | "On Date" | "Never";
  repeatEndDate?: string;
  repeatEndOccurrences?: number;
};

export type TaskFilters = {
  title?: string;
  goalId?: number;
  kanbanStatusId?: number;
  typeId?: number;
  eisenhowerStatus?: string;
  dueDate?: string;
  isDeleted?: boolean;
  sortBy?: string;
  isDescending?: boolean;
  pageSize?: number;
};

// Task Type API functions
export async function getTaskTypes(learnerId: string): Promise<TaskType[]> {
  try {
    const response = await fetchWithAuth(
      `/api/learners/${learnerId}/tasktypes`
    );
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Failed to fetch task types:", error);
    return [];
  }
}

export async function createTaskType(
  learnerId: string,
  data: CreateTaskTypeParams
): Promise<TaskType> {
  return fetchWithAuth(`/api/learners/${learnerId}/tasktypes`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Task API functions
export async function getTasks(
  learnerId: string,
  filters?: TaskFilters
): Promise<Task[]> {
  try {
    let url = `/api/learners/${learnerId}/tasks`;

    if (filters) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value.toString());
        }
      });

      if (params.toString()) {
        url += `?${params.toString()}`;
      }
    }

    const response = await fetchWithAuth(url);
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return [];
  }
}

export async function getTaskDetails(
  learnerId: string,
  taskId: string
): Promise<Task> {
  return fetchWithAuth(`/api/learners/${learnerId}/tasks/${taskId}`);
}

export async function createTask(
  learnerId: string,
  data: CreateTaskParams
): Promise<Task> {
  return fetchWithAuth(`/api/learners/${learnerId}/tasks`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateTask(
  learnerId: string,
  taskId: string,
  data: UpdateTaskParams
): Promise<Task> {
  return fetchWithAuth(`/api/learners/${learnerId}/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function softDeleteTask(
  learnerId: string,
  taskId: string
): Promise<void> {
  return fetchWithAuth(
    `/api/learners/${learnerId}/tasks/${taskId}/soft-delete`,
    {
      method: "DELETE",
    }
  );
}

export async function hardDeleteTask(
  learnerId: string,
  taskId: string
): Promise<void> {
  return fetchWithAuth(
    `/api/learners/${learnerId}/tasks/${taskId}/hard-delete`,
    {
      method: "DELETE",
    }
  );
}
