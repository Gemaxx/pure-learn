// خدمات API للـ Learning Resources
import { API_BASE_URL } from "@/config/api-config";
import { fetchWithAuth } from "./api-client";

export type LearningResource = {
  id: number;
  title: string;
  description?: string;
  url?: string;
  progress?: number;
  totalUnits?: number;
  typeId?: number;
  goalId?: number;
  isDeleted?: boolean;
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateLearningResourceParams = {
  title: string;
  description?: string;
  url?: string;
  progress?: number;
  totalUnits?: number;
  typeId?: number;
  goalId?: number;
};

export type UpdateLearningResourceParams = Partial<CreateLearningResourceParams>;

// Get all learning resources
export async function getLearningResources(
  learnerId: string,
  goalId?: string
): Promise<LearningResource[]> {
  try {
    let url = `/api/learners/${learnerId}/LearningResources`;
    if (goalId) {
      url += `?goalId=${goalId}`;
    }
    const response = await fetchWithAuth(url);
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Failed to fetch learning resources:", error);
    return [];
  }
}

// Add a new learning resource with proper validation
export async function addLearningResource(learnerId: string, data: CreateLearningResourceParams): Promise<LearningResource> {
  // Validate required fields
  if (!data.title?.trim()) {
    throw new Error("Title is required");
  }

  // Validate progress and totalUnits
  if (data.progress !== undefined && data.totalUnits !== undefined) {
    if (data.progress < 0 || data.progress > data.totalUnits) {
      throw new Error("Progress cannot be negative or greater than total units");
    }
  }

  try {
    const response = await fetchWithAuth(`/api/learners/${learnerId}/LearningResources`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response;
  } catch (error: any) {
    console.error("Failed to add learning resource:", error);
    // Parse error message from API if available
    if (error.message && error.message.includes("{")) {
      try {
        const errorData = JSON.parse(error.message);
        if (errorData.errors) {
          const errorMessages = Object.entries(errorData.errors)
            .map(([key, value]) => `${key}: ${(value as string[]).join(", ")}`)
            .join("; ");
          throw new Error(errorMessages);
        }
      } catch (parseError) {
        // If parsing fails, throw the original error message
      }
    }
    throw error;
  }
}

// Update a learning resource
export async function updateLearningResource(learnerId: string, id: string, data: UpdateLearningResourceParams): Promise<LearningResource> {
  // Validate progress and totalUnits if provided
  if (data.progress !== undefined && data.totalUnits !== undefined) {
    if (data.progress < 0 || data.progress > data.totalUnits) {
      throw new Error("Progress cannot be negative or greater than total units");
    }
  }

  try {
    const response = await fetchWithAuth(`/api/learners/${learnerId}/LearningResources/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error("Failed to update learning resource:", error);
    throw error;
  }
}

// Soft delete a learning resource
export async function softDeleteLearningResource(learnerId: string, id: string): Promise<void> {
  try {
    await fetchWithAuth(`/api/learners/${learnerId}/LearningResources/${id}/soft-delete`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Failed to soft delete learning resource:", error);
    throw error;
  }
}

// Hard delete a learning resource
export async function hardDeleteLearningResource(learnerId: string, id: string): Promise<void> {
  try {
    await fetchWithAuth(`/api/learners/${learnerId}/LearningResources/${id}/hard-delete`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Failed to hard delete learning resource:", error);
    throw error;
  }
}

// Restore a learning resource
export async function restoreLearningResource(learnerId: string, id: string): Promise<LearningResource> {
  try {
    const response = await fetchWithAuth(`/api/learners/${learnerId}/LearningResources/${id}/restore`, {
      method: "PATCH",
    });
    return response;
  } catch (error) {
    console.error("Failed to restore learning resource:", error);
    throw error;
  }
}

// Get deleted learning resources
export async function getDeletedLearningResources(learnerId: string): Promise<LearningResource[]> {
  try {
    const response = await fetchWithAuth(`/api/learners/${learnerId}/LearningResources?IsDeleted=true`);
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Failed to fetch deleted learning resources:", error);
    return [];
  }
}

export async function getResourceTypes(learnerId: string) {
  const res = await fetch(
    `${API_BASE_URL}/api/learners/${learnerId}/learningResourceTypes`
  );
  if (!res.ok) return [];
  return res.json();
}

export async function addResourceType(learnerId: string, data: any) {
  const res = await fetch(
    `${API_BASE_URL}/api/learners/${learnerId}/learningResourceTypes`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  const errorText = await res.text();
  if (!res.ok) {
    console.error(
      "Failed to add resource type:",
      errorText,
      "Status:",
      res.status
    );
    throw new Error("Failed to add resource type");
  }
  return JSON.parse(errorText);
}
