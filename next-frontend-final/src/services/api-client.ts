import { API_BASE_URL } from "@/config/api-config"

// Helper function for authenticated requests
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  // Get token from localStorage
  const token = localStorage.getItem("auth_token")

  // Add token to request headers
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  }

  try {
    // Send request with token
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    })

    // For 204 No Content responses, return null
    if (response.status === 204) {
      return null
    }

    // Check if the response is ok
    if (!response.ok) {
      let errorMessage = `Error: ${response.status}`
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorData.title || errorMessage
        if (errorData.errors) {
          const errorDetails = Object.entries(errorData.errors)
            .map(([key, value]) => `${key}: ${(value as string[]).join(", ")}`)
            .join("; ")
          errorMessage = errorDetails || errorMessage
        }
      } catch {
        // If we can't parse the error response, use the status code message
      }
      throw new Error(errorMessage)
    }

    // Check if response is empty
    const text = await response.text()
    if (!text) {
      return null
    }

    // Parse JSON response
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error("Failed to parse response as JSON:", text)
      return null
    }
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}

// Example usage of the function
export async function getUserProfile() {
  return fetchWithAuth("/api/user/profile")
}

export async function updateUserProfile(data: any) {
  return fetchWithAuth("/api/user/profile", {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

// Category service functions
export type Category = {
  id: string
  title: string
  description?: string
  color: string
}

export type CreateCategoryParams = {
  title: string
  description: string
  color: string
}

export type UpdateCategoryParams = {
  title?: string
  description?: string
  color?: string
}

export async function getCategories(learnerId: string): Promise<Category[]> {
  return fetchWithAuth(`/api/learners/${learnerId}/categories`)
}

export async function createCategory(learnerId: string, data: CreateCategoryParams): Promise<Category> {
  return fetchWithAuth(`/api/learners/${learnerId}/categories`, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function getCategoryDetails(learnerId: string, categoryId: string): Promise<Category> {
  return fetchWithAuth(`/api/learners/${learnerId}/categories/${categoryId}`)
}

export async function updateCategory(
  learnerId: string,
  categoryId: string,
  data: UpdateCategoryParams,
): Promise<Category> {
  return fetchWithAuth(`/api/learners/${learnerId}/categories/${categoryId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export async function softDeleteCategory(learnerId: string, categoryId: string): Promise<{ message: string }> {
  return fetchWithAuth(`/api/learners/${learnerId}/categories/softDelete/${categoryId}`, {
    method: "DELETE",
  })
}

export async function hardDeleteCategory(learnerId: string, categoryId: string): Promise<null> {
  return fetchWithAuth(`/api/learners/${learnerId}/categories/${categoryId}`, {
    method: "DELETE",
  })
}

export async function restoreCategory(learnerId: string, categoryId: string): Promise<Category> {
  return fetchWithAuth(`/api/learners/${learnerId}/categories/restore/${categoryId}`, {
    method: "PATCH",
  })
}

export async function getDeletedCategories(learnerId: string): Promise<Category[]> {
  try {
    const response = await fetchWithAuth(`/api/learners/${learnerId}/categories?IsDeleted=true`)
    return Array.isArray(response) ? response : []
  } catch (error) {
    console.error("Failed to fetch deleted categories:", error)
    return []
  }
}

// Goal service functions - Updated to match the API response
export type Goal = {
  id: number
  categoryId: number
  title: string
  description?: string
  motivation?: string
  term: "Short-Term" | "Medium-Term" | "Long-Term"
  status: "Not-Started" | "In-Progress" | "On-Hold" | "Done" | "Canceled"
  completionDate?: string
  createdAt?: string
  updatedAt?: string
}

export type CreateGoalParams = {
  categoryId: number
  title: string
  description: string
  motivation: string
  term: "Short-Term" | "Medium-Term" | "Long-Term"
  status: "Not-Started" | "In-Progress" | "On-Hold" | "Done" | "Canceled"
}

export type UpdateGoalParams = {
  title?: string
  description?: string
  motivation?: string
  term?: "Short-Term" | "Medium-Term" | "Long-Term"
  status?: "Not-Started" | "In-Progress" | "On-Hold" | "Done" | "Canceled"
  completionDate?: string
  categoryId?: number
}

export async function createGoal(learnerId: string, data: CreateGoalParams): Promise<Goal> {
  return fetchWithAuth(`/api/learners/${learnerId}/goals`, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// Updated to use the correct API endpoint with query parameter
export async function getGoalsByCategory(learnerId: string, categoryId: string): Promise<Goal[]> {
  try {
    const response = await fetchWithAuth(`/api/learners/${learnerId}/goals?CategoryId=${categoryId}`)
    // Ensure we always return an array, even if the API returns null or undefined
    return Array.isArray(response) ? response : []
  } catch (error) {
    console.error("Failed to fetch goals by category:", error)
    return [] // Return empty array on error
  }
}

export async function getGoalDetails(learnerId: string, goalId: string): Promise<Goal> {
  return fetchWithAuth(`/api/learners/${learnerId}/goals/${goalId}`)
}

// Update goal
export async function updateGoal(learnerId: string, goalId: string, data: UpdateGoalParams): Promise<Goal> {
  return fetchWithAuth(`/api/learners/${learnerId}/goals/${goalId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

// Soft delete goal
export async function softDeleteGoal(learnerId: string, goalId: string): Promise<void> {
  return fetchWithAuth(`/api/learners/${learnerId}/goals/${goalId}/soft-delete`, {
    method: "DELETE",
  })
}

// Hard delete goal
export async function hardDeleteGoal(learnerId: string, goalId: string): Promise<void> {
  return fetchWithAuth(`/api/learners/${learnerId}/goals/${goalId}/hard-delete`, {
    method: "DELETE",
  })
}

// جلب الأهداف المحذوفة
export async function getDeletedGoals(learnerId: string): Promise<Goal[]> {
  try {
    const response = await fetchWithAuth(`/api/learners/${learnerId}/goals?IsDeleted=true`)
    return Array.isArray(response) ? response : []
  } catch (error) {
    console.error("Failed to fetch deleted goals:", error)
    return []
  }
}

// استرجاع هدف
export async function restoreGoal(learnerId: string, goalId: string): Promise<Goal> {
  return fetchWithAuth(`/api/learners/${learnerId}/goals/${goalId}/restore`, {
    method: "PATCH",
  })
}
