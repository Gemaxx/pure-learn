"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { LearnerContextType } from "@/lib/types/learner"; 


const LearnerContext = createContext<LearnerContextType | undefined>(undefined);

export function LearnerProvider({ children }: { children: ReactNode }) {
 const [learnerId, setLearnerId] = useState<number>(() => {
   const storedId = localStorage.getItem("learnerId");
   return storedId ? Number(storedId) : 1; // تحويل إلى رقم أو تعيين قيمة افتراضية
 });


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
