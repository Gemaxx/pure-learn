import { fetchWithAuth } from "./api-client"

export type Note = {
  id: number
  goalId: number
  title: string
  body: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  learnerId?: number
  isDeleted?: boolean
}

export type CreateNoteParams = {
  goalId: number
  title: string
  body: string
}

export type UpdateNoteParams = {
  title?: string
  body?: string
}

// Get all notes for a learner, optionally filtered by goalId
export async function getNotes(learnerId: string, goalId?: string): Promise<Note[]> {
  const url = goalId ? `/api/learners/${learnerId}/Notes?GoalId=${goalId}` : `/api/learners/${learnerId}/Notes`

  try {
    const response = await fetchWithAuth(url)
    return Array.isArray(response) ? response : []
  } catch (error) {
    console.error("Failed to fetch notes:", error)
    return []
  }
}

// Create a new note
export async function createNote(learnerId: string, data: CreateNoteParams): Promise<Note> {
  return fetchWithAuth(`/api/learners/${learnerId}/Notes`, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// Get a specific note
export async function getNoteDetails(learnerId: string, noteId: string): Promise<Note> {
  return fetchWithAuth(`/api/learners/${learnerId}/Notes/${noteId}`)
}

// Update a note
export async function updateNote(learnerId: string, noteId: string, data: UpdateNoteParams): Promise<Note> {
  return fetchWithAuth(`/api/learners/${learnerId}/Notes/${noteId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

// Soft delete a note
export async function softDeleteNote(learnerId: string, noteId: string): Promise<void> {
  return fetchWithAuth(`/api/learners/${learnerId}/Notes/${noteId}/soft-delete`, {
    method: "DELETE",
  })
}

// Hard delete a note
export async function hardDeleteNote(learnerId: string, noteId: string): Promise<void> {
  return fetchWithAuth(`/api/learners/${learnerId}/Notes/${noteId}/hard-delete`, {
    method: "DELETE",
  })
}

// Restore a note
export async function restoreNote(learnerId: string, noteId: string): Promise<Note> {
  return fetchWithAuth(`/api/learners/${learnerId}/Notes/${noteId}/restore`, {
    method: "PATCH",
  })
}

// جلب الملاحظات المحذوفة
export async function getDeletedNotes(learnerId: string): Promise<Note[]> {
  try {
    const response = await fetchWithAuth(`/api/learners/${learnerId}/Notes?IsDeleted=true`)
    return Array.isArray(response) ? response : []
  } catch (error) {
    const allNotes = await fetchWithAuth(`/api/learners/${learnerId}/Notes`)
    return Array.isArray(allNotes)
      ? allNotes.filter((note) => note.isDeleted || note.deletedAt)
      : []
  }
}
