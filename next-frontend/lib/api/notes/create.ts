// /lib/api/notes/create.ts
import { Note, NoteFormData } from '@/lib/types/note';

export async function createNote(
  learnerId: number,
  noteData: NoteFormData
): Promise<Note | null> {
  try {
    // تأكد من أن بيانات الملاحظة تحتوي على حقل body
    if (!noteData.body) {
      throw new Error("Body is required for creating a note");
    }

    const response = await fetch(
      `http://localhost:5115/api/learners/${learnerId}/Notes`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: noteData.title,
          body: noteData.body, // تأكد من إرسال body
          goalId: noteData.goalId
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Note creation error:", errorText);
      throw new Error(errorText || "Failed to create note");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating note:", error);
    throw error; // إعادة إلقاء الخطأ ليتم التعامل معه في المكون
  }
}