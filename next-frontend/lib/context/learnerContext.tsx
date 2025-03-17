"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { LearnerContextType } from "@/lib/types/learner";

const LearnerContext = createContext<LearnerContextType | undefined>(undefined);

export function LearnerProvider({ children }: { children: ReactNode }) {
  const [learnerId, setLearnerId] = useState<number>(1); // Default value

  // ✅ Load from localStorage on client-side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedId = localStorage.getItem("learnerId");
      if (storedId) {
        setLearnerId(Number(storedId));
      }
    }
  }, []);

  // ✅ Save to localStorage on change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("learnerId", learnerId.toString());
    }
  }, [learnerId]);

  return (
    <LearnerContext.Provider value={{ learnerId, setLearnerId }}>
      {children}
    </LearnerContext.Provider>
  );
}

export function useLearner() {
  const context = useContext(LearnerContext);
  if (!context) {
    throw new Error("useLearner must be used within a LearnerProvider");
  }
  return context;
}