"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

type TrashContextType = {
  refreshCounter: number
  triggerRefresh: () => void
}

const TrashContext = createContext<TrashContextType | undefined>(undefined)

export function TrashProvider({ children }: { children: ReactNode }) {
  const [refreshCounter, setRefreshCounter] = useState(0)

  const triggerRefresh = useCallback(() => {
    setRefreshCounter((count) => count + 1)
  }, [])

  return (
    <TrashContext.Provider value={{ refreshCounter, triggerRefresh }}>
      {children}
    </TrashContext.Provider>
  )
}

export function useTrash() {
  const context = useContext(TrashContext)
  if (context === undefined) {
    throw new Error("useTrash must be used within a TrashProvider")
  }
  return context
} 