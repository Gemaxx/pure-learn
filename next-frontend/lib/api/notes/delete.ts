// /lib/api/notes/delete.ts
export async function deleteNote(
  learnerId: number,
  noteId: number
): Promise<boolean> {
  try {
    // According to Swagger, there's soft-delete and restore options
    const response = await fetch(
      `http://localhost:5115/api/learners/${learnerId}/Notes/${noteId}/soft-delete`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) return true;
    
    // If soft-delete path fails, try the hard-delete path
    const hardDeleteResponse = await fetch(
      `http://localhost:5115/api/learners/${learnerId}/Notes/${noteId}/hard-delete`,
      {
        method: "DELETE",
      }
    );
    
    if (!hardDeleteResponse.ok) throw new Error("Failed to delete note");
    return true;
  } catch (error) {
    console.error("Error deleting note:", error);
    return false;
  }
}