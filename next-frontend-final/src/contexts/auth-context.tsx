"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Define user data type
type User = {
  id: string;
  name: string;
  email: string;
};

// Define auth context type
type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, userId: string) => void;
  logout: () => void;
  setUserData: (userData: User) => void;
};

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Mock user data for temporary access
  const mockUser: User = {
    id: "1",
    name: "Temporary User",
    email: "temp@example.com",
  };

  // Mock token
  const mockToken = "temp-token";

  // Login function (kept for future use)
  const login = (newToken: string, userId: string) => {
    // Temporarily disabled
    console.log("Login temporarily disabled");
  };

  // Logout function (kept for future use)
  const logout = () => {
    // Temporarily disabled
    console.log("Logout temporarily disabled");
  };

  // Set user data function (kept for future use)
  const setUserData = (userData: User) => {
    // Temporarily disabled
    console.log("Set user data temporarily disabled");
  };

  return (
    <AuthContext.Provider
      value={{
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        login,
        logout,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
