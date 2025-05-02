// /lib/types/note.ts
export interface Note {
  id: number;
  title: string;
  body: string; 
  goalId: number;
  createdAt?: string;
  updatedAt?: string;
}
export type NoteFormData = {
  title: string;
  body: string;
  goalId: number;
};