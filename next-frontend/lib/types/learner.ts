export interface LearnerContextType {
  learnerId: number;
  setLearnerId: (id: number) => void;
}

export interface Learner {
  id: number;
  // Add other properties your learner might have
  name?: string;
  email?: string;
  // etc.
}