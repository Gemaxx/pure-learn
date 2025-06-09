import { API_BASE_URL, API_ENDPOINTS } from "@/config/api-config"

type RegisterParams = {
  name: string
  email: string
  password: string
}

type LoginParams = {
  email: string
  password: string
}

type AuthResponse = {
  id: string
  name: string
  email: string
  token: string
}

export async function registerUser(data: RegisterParams): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.REGISTER}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Registration failed")
  }

  return await response.json()
}

export async function loginUser(data: LoginParams): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Login failed")
  }

  return await response.json()
}
