// API configuration
export const API_BASE_URL = "https://purelearn-api-ccbgcxgreygqe4dh.uaenorth-01.azurewebsites.net"

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/api/Auth/register",
    LOGIN: "/api/Auth/login",
  },
  CATEGORIES: {
    LIST: (learnerId: string) => `/api/learners/${learnerId}/categories`,
    CREATE: (learnerId: string) => `/api/learners/${learnerId}/categories`,
    DETAILS: (learnerId: string, categoryId: string) => `/api/learners/${learnerId}/categories/${categoryId}`,
  },
}
