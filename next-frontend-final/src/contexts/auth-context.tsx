"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

// Define user data type
type User = {
  id: string
  name: string
  email: string
}

// Define auth context type
type AuthContextType = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (token: string, userId: string) => void
  logout: () => void
  setUserData: (userData: User) => void
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load auth data from localStorage on initial load
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("auth_token")
      const storedUserId = localStorage.getItem("user_id")
      const storedUserData = localStorage.getItem("user_data")

      if (storedToken && storedUserId && storedUserData) {
        setToken(storedToken)
        try {
          setUser(JSON.parse(storedUserData))
        } catch (e) {
          console.error("Failed to parse user data", e)
        }
      }
    }

    setIsLoading(false)
  }, [])

  // Login function
  const login = (newToken: string, userId: string) => {
    setToken(newToken)
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", newToken)
      localStorage.setItem("user_id", userId)
    }
  }

  // Logout function
  const logout = () => {
    setToken(null)
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("user_id")
      localStorage.removeItem("user_data")
    }
  }

  // Set user data function
  const setUserData = (userData: User) => {
    setUser(userData)
    if (typeof window !== "undefined") {
      localStorage.setItem("user_data", JSON.stringify(userData))
    }
  }

  // Avoid hydration mismatch by rendering a simplified version during SSR
  if (!mounted) {
    return (
      <AuthContext.Provider
        value={{
          user: null,
          token: null,
          isAuthenticated: false,
          login,
          logout,
          setUserData,
        }}
      >
        {children}
      </AuthContext.Provider>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
