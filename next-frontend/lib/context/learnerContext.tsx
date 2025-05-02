// lib/context/learnerContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define your Learner type
interface Learner {
  id: number;
  name: string;
  // Add other properties as needed
}

// Create properly typed context
interface LearnerContextType {
  learnerId: number | null;
  learner: Learner | null;
  isLoading: boolean;
  setLearnerId: (id: number | null) => void;
  // Add other functions as needed
}

// Create context with default values
const LearnerContext = createContext<LearnerContextType>({
  learnerId: null,
  learner: null,
  isLoading: true,
  setLearnerId: () => {},
});

// Provider component
export function LearnerProvider({ children }: { children: ReactNode }) {
  const [learnerId, setLearnerId] = useState<number | null>(null);
  const [learner, setLearner] = useState<Learner | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch learner data when learnerId changes
  useEffect(() => {
    async function fetchLearner() {
      if (learnerId === null) {
        setLearner(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5115/api/learners/${learnerId}`);
        if (!response.ok) throw new Error("Failed to fetch learner");
        const data = await response.json();
        setLearner(data);
      } catch (error) {
        console.error("Error fetching learner:", error);
        setLearner(null);
      } finally {
        setIsLoading(false);
      }
    }

    // Initialize with learner ID from local storage if available
    if (typeof window !== 'undefined' && learnerId === null) {
      const storedLearnerId = localStorage.getItem("learnerId");
      if (storedLearnerId) {
        setLearnerId(parseInt(storedLearnerId, 10));
      } else {
        setIsLoading(false); // No stored ID, we're not loading
      }
    } else {
      fetchLearner();
    }
  }, [learnerId]);

  // Store learnerId in localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && learnerId !== null) {
      localStorage.setItem("learnerId", learnerId.toString());
    }
  }, [learnerId]);

  return (
    <LearnerContext.Provider value={{ learnerId, learner, isLoading, setLearnerId }}>
      {children}
    </LearnerContext.Provider>
  );
}

// Custom hook to use the context
export function useLearner() {
  return useContext(LearnerContext);
}