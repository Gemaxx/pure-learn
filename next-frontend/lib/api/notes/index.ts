// /lib/api/notes/index.ts
import { Note } from '@/lib/types/note';

export async function getNotes(
  learnerId: number,
  goalId?: number
): Promise<Note[]> {
  try {
    let url = `http://localhost:5115/api/learners/${learnerId}/Notes`;
    
    // If backend supports filtering by goalId via query parameter
    if (goalId) {
      url += `?goalId=${goalId}`;
    }
    
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    
    if (!res.ok) throw new Error("Failed to fetch notes");
    
    let notes = await res.json();
    
    // If backend doesn't support filtering, do it client-side
    if (goalId && Array.isArray(notes)) {
      notes = notes.filter(note => note.goalId === goalId);
    }
    
    return notes;
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
}
// Export all other note-related functions
export * from "./create";
export * from "./update";
export * from "./delete";