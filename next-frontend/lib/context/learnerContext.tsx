"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { LearnerContextType } from "@/lib/types/learner";

const LearnerContext = createContext<LearnerContextType | undefined>(undefined);

export function LearnerProvider({ children }: { children: ReactNode }) {
  const [learnerId, setLearnerId] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  // ✅ تأكيد أن الكود يتم تشغيله فقط على العميل
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const storedId = localStorage.getItem("learnerId");
      if (storedId) {
        setLearnerId(Number(storedId));
      } else {
        setLearnerId(1); // 🔹 تعيين قيمة افتراضية عند عدم وجود بيانات
      }
    }
  }, []);

  // ✅ حفظ `learnerId` في `localStorage` عند تغييره
  useEffect(() => {
    if (isClient && learnerId !== null) {
      localStorage.setItem("learnerId", learnerId.toString());
    }
  }, [learnerId, isClient]);

  // ✅ تأجيل الريندر حتى لا يحصل Hydration Mismatch
  if (!isClient || learnerId === null) return null;

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
