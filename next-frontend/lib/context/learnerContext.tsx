"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { LearnerContextType } from "@/lib/types/learner"; 


const LearnerContext = createContext<LearnerContextType | undefined>(undefined);

export function LearnerProvider({ children }: { children: ReactNode }) {
  const [learnerId, setLearnerId] = useState("3"); // 👈 هنا بتحط الـ ID الافتراضي أو تجيبه من API

  return (
    <LearnerContext.Provider value={{ learnerId, setLearnerId }}>
      {children}
    </LearnerContext.Provider>
  );
}

export function useLearner() {
  const context = useContext(LearnerContext);
  if (!context)
    throw new Error("useLearner must be used within a LearnerProvider");
  return context;
}
