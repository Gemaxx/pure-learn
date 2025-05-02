// /lib/api/notes/update.ts
import { Note } from '@/lib/types/note';

export async function updateNote(
  learnerId: number,
  noteId: number,
  noteData: Partial<Note>
): Promise<Note | null> {
  try {
    const response = await fetch(
      `http://localhost:5115/api/learners/${learnerId}/Notes/${noteId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noteData)
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Note update error:", errorText);
      throw new Error(errorText || "Failed to update note");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating note:", error);
    return null;
  }
}
